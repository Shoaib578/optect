

import React from 'react'
import {View,Text,Image, Alert} from 'react-native'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Feedback from './feedback';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import styles from './styles';
import en from '../../../en';
import spn from '../../../spn';
export default class ViewStatus extends React.Component{
    state = {
        image1_uri:'',
        image2_uri:'',
        image3_uri:'',
        is_loading:true,
        status:'',
        date:'',
        add_feedback_loading:false,
        feedback:"",
        feedbacks:[],

        lang:en

    }

    translate = async()=>{
        const user_lang = await AsyncStorage.getItem("lang")
        if(user_lang != null) {
            if(user_lang == "spanish"){
                this.setState({lang:spn})
            }else{
                this.setState({lang:en})
            }
        }
    }
    getImage1 = (image_name)=>{
     
        storage()
        .ref('order_images/' + image_name) //name in storage in firebase console
        .getDownloadURL()
        .then((url) => {
            console.log(url)
         this.setState({image1_uri:url})
        })
        .catch((e) => console.log('Errors while downloading => ', e));
    }


    getImage2 = (image_name)=>{
     
        storage()
        .ref('order_images/' + image_name) //name in storage in firebase console
        .getDownloadURL()
        .then((url) => {
            console.log(url)
         this.setState({image2_uri:url})
        })
        .catch((e) => console.log('Errors while downloading => ', e));
    }


    getImage3 = (image_name)=>{
     
        storage()
        .ref('order_images/' + image_name) //name in storage in firebase console
        .getDownloadURL()
        .then((url) => {
            console.log(url)
         this.setState({image3_uri:url})
        })
        .catch((e) => console.log('Errors while downloading => ', e));
    }


    getData= ()=>{
        firestore().collection('status').doc(this.props.route.params.status_id).onSnapshot(data=>{
           
            this.setState({status:data._data.status,date:data._data.data})
            this.getImage1(data._data.image1)
            this.getImage2(data._data.image2)
            this.getImage3(data._data.image3)

        })
    }

   

    add_feedback = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        this.setState({add_feedback_loading:true})

        firestore().collection("status_feedback").add({
            status_id:this.props.route.params.status_id,
            feedback:this.state.feedback,
            supervisor_id:parse.id
        })
        .then(res=>{
            Alert.alert("Feedback Added")
            this.setState({add_feedback_loading:false})

        })
        .catch(err=>{
            Alert.alert(err.message)
            this.setState({add_feedback_loading:false})

        })
    }

    getFeedbacks = ()=>{
        firestore().collection("status_feedback").where("status_id","==",this.props.route.params.status_id).get()
        .then(res=>{
            this.setState({feedbacks:res.docs})
        })
    }
    componentDidMount(){
        this.translate()
        this.getData()
        this.getFeedbacks()
    }
    render(){
        return <ScrollView>
            <View style={{flexDirection:'row',padding:30,justifyContent:'space-between'}}>
            <Image source={{uri:this.state.image1_uri}} style={{width:'32%',height:110,borderRadius:10}}/>
            <Image source={{uri:this.state.image2_uri}} style={{width:'32%',height:110,borderRadius:10}}/>
            <Image source={{uri:this.state.image2_uri}} style={{width:'32%',height:110,borderRadius:10}}/>

            </View>
            <View style={{width:'85%',backgroundColor:'orange',borderColor:'orange',borderWidth:1,borderRadius:5,justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
                <Text style={{fontWeight:'bold',color:'white',fontSize:20}}>{Date(this.state.date)}</Text>
            </View>
            <View style={{width:'85%',backgroundColor:'green',borderColor:'green',borderWidth:1,borderRadius:5,justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
                <Text style={{fontWeight:'bold',color:'white',fontSize:20}}>{this.state.status == "checked_in"?this.state.lang.checked_in:this.state.lang.checked_out}</Text>
            </View>

            <Text style={{color:"#5FA7C0",marginLeft:18,marginTop:10,fontSize:18,fontWeight:'bold'}}>{this.state.lang.feedbacks}</Text>
           
           
          
           
          
            {this.state.feedbacks.map((data,index)=>{
                return <Feedback data={data} key={index} /> 
            })}

          

            <Text style={{marginTop:20}}> </Text>
        </ScrollView>
    }
}