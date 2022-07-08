

import React from 'react'
import {View,Text,Image,TextInput, ActivityIndicator,TouchableOpacity, Dimensions,Alert} from 'react-native'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Feedback from '../../Operator/Vieworder/feedback';
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import en from '../../../en';
import spn from '../../../spn';
import ImageView from "react-native-image-viewing";

export default class ViewStatus extends React.Component{
    state = {
        image1_uri:'',
        image2_uri:'',
        image3_uri:'',
        image1_visible:false,
        is_loading:true,
        status:'',
        date:'',
        add_feedback_loading:false,
        feedback:"",
        feedbacks:[],
        role:"",
        image1_visible:false,
        image2_visible:false,
        image3_visible:false,
        lang:en

    }

    translate = async()=>{
        const user_lang =await AsyncStorage.getItem("lang")

        if(user_lang != null){
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
            this.getFeedbacks()
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


    getData= async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        this.setState({role:parse.role})
        firestore().collection('status').doc(this.props.route.params.status_id).onSnapshot(data=>{
           
            this.setState({status:data._data.status,date:data._data.date})
            this.getImage1(data._data.image1)
            this.getImage2(data._data.image2)
            this.getImage3(data._data.image3)

        })
    }
    
    changeStatus = (status)=>{

        firestore().collection('orders').doc(this.props.route.params.id).update({
            "status":status
        })
        .then(res=>{
            Alert.alert("Order is completed successfully")
            this.getData()
            
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
        })
    }



    componentDidMount(){
        this.translate()
        this.getData()
        this.getFeedbacks()
        
    }
    render(){
        return <ScrollView>

            <ImageView
                images={[{uri:this.state.image1_uri},{uri:this.state.image2_uri},{uri:this.state.image3_uri}]}
                imageIndex={0}
                visible={this.state.image1_visible}
                onRequestClose={() => this.setState({image1_visible:false})}
                style={{width:'32%',height:110,borderRadius:10}}
                />

            <ImageView
                images={[{uri:this.state.image2_uri},{uri:this.state.image3_uri}]}
                imageIndex={1}
                visible={this.state.image2_visible}
                onRequestClose={() => this.setState({image2_visible:false})}
                
                />

            <ImageView
                images={[{uri:this.state.image3_uri}]}
                imageIndex={0}
                visible={this.state.image3_visible}
                onRequestClose={() => this.setState({image3_visible:false})}
                
                />
            <View style={{flexDirection:'row',padding:30,justifyContent:'space-between'}}>
           
            
            

            <TouchableOpacity style={{width:'32%',height:110,borderRadius:10}} onPress={()=>this.setState({image1_visible:true})}>
            <Image source={{uri:this.state.image1_uri}} style={{width:'100%',height:110,borderRadius:10}}/>

            </TouchableOpacity>


            <TouchableOpacity style={{width:'32%',height:110,borderRadius:10}} onPress={()=>this.setState({image2_visible:true})}>
            <Image source={{uri:this.state.image2_uri}} style={{width:'100%',height:110,borderRadius:10}}/>

            </TouchableOpacity>


            <TouchableOpacity style={{width:'32%',height:110,borderRadius:10}} onPress={()=>this.setState({image3_visible:true})}>
            <Image source={{uri:this.state.image3_uri}} style={{width:'100%',height:110,borderRadius:10}}/>
                
            </TouchableOpacity>

            </View>
            <View style={{width:'85%',backgroundColor:'orange',borderColor:'orange',borderWidth:1,borderRadius:5,justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
                <Text style={{fontWeight:'bold',color:'white',fontSize:20}}>{Date(this.state.date)}</Text>
            </View>
            <View style={{width:'85%',backgroundColor:'green',borderColor:'green',borderWidth:1,borderRadius:5,justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
                <Text style={{fontWeight:'bold',color:'white',fontSize:20}}>{this.state.status == "checked_in"?this.state.lang.checked_in:this.state.lang.checked_out}</Text>
            </View>


            {this.state.status != "completed"?<TouchableOpacity onPress={()=>this.changeStatus("completed")} style={{width:'85%',backgroundColor:'green',borderColor:'green',borderWidth:1,borderRadius:5,justifyContent:'center',alignItems:'center',alignSelf:'center',marginTop:20,padding:10}}>
                <Text style={{fontWeight:'bold',color:'white',fontSize:20}}>{this.state.lang.complete}</Text>
            </TouchableOpacity>:null}
            
            <Text style={{color:"#5FA7C0",marginLeft:18,marginTop:20,fontSize:18,fontWeight:'bold'}}>{this.state.lang.feedbacks}</Text>
           
          
            {this.state.role =="supervisor"?<View style={{marginTop:20,alignSelf:'center'}}>
           <TextInput placeholder={this.state.lang.leave_your_feedback} onChangeText={(val)=>this.setState({feedback:val})} multiline={true} style={{borderColor:'gray',borderWidth:1,width:Dimensions.get("window").width*2/2.3,borderRadius:10,height:100,right:5}}/>
           <TouchableOpacity onPress={this.add_feedback} disabled={this.state.add_feedback_loading}  style={styles.LoginButton}>
                
                   {this.state.add_feedback_loading == false?
                   <View>
                    <Text style={styles.LoginButtonText}>{this.state.lang.leave_feedback}</Text>
                   </View>
                :<ActivityIndicator size="small" color="black"/>} 
            </TouchableOpacity>
            </View>:null}

           
          
            {this.state.feedbacks.map((data,index)=>{
                return <Feedback data={data} key={index} /> 
            })}
            <Text style={{marginTop:20}}> </Text>

        </ScrollView>
    }
}