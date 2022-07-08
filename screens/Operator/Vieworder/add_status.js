import React from 'react'
import {View,Text,TouchableOpacity,StyleSheet,Image,ActivityIndicator,Alert} from 'react-native'
import * as ImagePicker from "react-native-image-picker"
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore';
import styles from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from '../../../en';
import spn from '../../../spn';
export default class AddStatus extends React.Component{
    state = {
        image1:'',
        image1Name:'',
        image1_uri:'',

        image2:'',
        image2Name:'',
        image2_uri:'',


        image3:'',
        image3Name:'',
        image3_uri:'',

        selected_status:'checked_in',
        is_loading:false,
        id:'',

        lang:en

    }
    pickImage1 =  () => {
        const options = {
            noData:true
          };
        ImagePicker.launchImageLibrary(options, response => {
           
            console.log("response", response);
            if(response.assets){
            
         response.assets.map(data=>{
        console.log(data);

         this.setState({image1: data,image1_uri:data.uri,image1Name:data.fileName});
        })
        
      }
        })
    
     
      }
      translate = async()=>{
        const user_lang = await AsyncStorage.getItem("lang")
        if(user_lang != null){
            if(user_lang == "spanish"){
                this.setState({lang:spn})
            }else{
                this.setState({lang:en})
                
            }
        }
       
    }


      pickImage2 =  () => {
        const options = {
            noData:true
          };
        ImagePicker.launchImageLibrary(options, response => {
           
            console.log("response", response);
            if(response.assets){
            
         response.assets.map(data=>{
        console.log(data);

         this.setState({image2: data,image2_uri:data.uri,image2Name:data.fileName});
        })
        
      }
        })
    
     
      }

      pickImage3 =  () => {
        const options = {
            noData:true
          };
        ImagePicker.launchImageLibrary(options, response => {
           
            console.log("response", response);
            if(response.assets){
            
         response.assets.map(data=>{
        console.log(data);

         this.setState({image3: data,image3_uri:data.uri,image3Name:data.fileName});
        })
        
      }
        })
    
     
      }
      upload_image = async()=>{
       
       
        await storage().ref('order_images/'+this.state.image1Name).putFile(this.state.image1_uri)
        
        await storage().ref('order_images/'+this.state.image2Name).putFile(this.state.image2_uri)
        await storage().ref('order_images/'+this.state.image3Name).putFile(this.state.image3_uri)

     
       

    }  


    getId = ()=>{
      firestore().collection('assigned_operators').doc(this.props.route.params.id).onSnapshot(data=>{
     
       
     
        firestore().collection("orders").doc(data._data.order_id).onSnapshot(res=>{
            console.log(res.id)
            this.setState({id:res.id})
        })
        
    })
    }


    add_status = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        if(this.state.image1.length<1 || this.state.image2.length<1 || this.state.image3.length<1){
          Alert.alert("All the images are required")
          return false
        }
        this.setState({is_loading:true})
        this.upload_image()
        .then(()=>{
          firestore().collection("status").add({
            operator_id:parse.id,
            status:this.state.selected_status,
            image1:this.state.image1Name,
            image2:this.state.image2Name,
            image3:this.state.image3Name,
  
            order_id:this.state.id,
            date:new Date()
          })
          .then(res=>{
            Alert.alert("Your Status Has Been Added")
            this.setState({is_loading:false})
            
          })
          .catch(err=>{
            Alert.alert(err.message)
            this.setState({is_loading:false})

          })
        })
        .catch(err=>{
          Alert.alert(err.message)
          this.setState({is_loading:false})

        })
       
    }


    componentDidMount(){
      this.translate()
      this.getId()
    }

    render(){
        return <View>
            <View style={{flexDirection:'row',padding:30,justifyContent:'space-between'}}>
                <TouchableOpacity style={{width:90,height:90,borderRadius:10}} onPress={this.pickImage1}>
                <Image source={this.state.image1.uri?{uri:this.state.image1.uri}:require('../../../assets/pick_image.png')} style={{width:'100%',height:'100%',borderRadius:10}}/>

                </TouchableOpacity>
                <TouchableOpacity style={{width:90,height:90,borderRadius:10}} onPress={this.pickImage2}>
            <Image source={this.state.image2.uri?{uri:this.state.image2.uri}:require('../../../assets/pick_image.png')} style={{width:'100%',height:'100%',borderRadius:10}}/>
                </TouchableOpacity>
                <TouchableOpacity style={{width:90,height:90,borderRadius:10}} onPress={this.pickImage3}>

            <Image source={this.state.image3.uri?{uri:this.state.image3.uri}:require('../../../assets/pick_image.png')} style={{width:'100%',height:'100%',borderRadius:10}}/>
            </TouchableOpacity>

            </View>
            

            <View style={{flexDirection:'row',justifyContent:'space-between',padding:30}}>
               <TouchableOpacity onPress={()=>this.setState({selected_status:'checked_in'})} style={{borderColor:'blue',borderWidth:1,backgroundColor:this.state.selected_status == 'checked_in'?'blue':'white',justifyContent:'center',alignItems:'center',width:'35%',padding:10,borderRadius:10}}>
                <Text style={{color:this.state.selected_status == 'checked_in'?'white':'black'}}>{this.state.lang.checked_in}</Text>
               </TouchableOpacity>

               <TouchableOpacity onPress={()=>this.setState({selected_status:'checked_out'})} style={{borderColor:'blue',backgroundColor:this.state.selected_status == 'checked_out'?'blue':'white',borderWidth:1,justifyContent:'center',alignItems:'center',width:'35%',padding:10,borderRadius:10}}>

                <Text style={{color:this.state.selected_status == 'checked_out'?'white':'black'}}>{this.state.lang.checked_out}</Text>
               </TouchableOpacity>
            </View>
            <TouchableOpacity disabled={this.state.is_loading} onPress={this.add_status}  style={styles.LoginButton}>
                {this.state.is_loading?<ActivityIndicator size="small" color="black"/>:null}
                    <Text style={styles.LoginButtonText}>{this.state.lang.add}</Text>
            </TouchableOpacity>
            </View>
          
    
    }
}