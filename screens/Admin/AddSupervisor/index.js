import React from 'react'
import {SafeAreaView, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert,ActivityIndicator,ScrollView,Image} from 'react-native'
//react native vector icons
import FontAwesome from 'react-native-vector-icons/FontAwesome'
//importing styles
import styles from './styles'
import * as ImagePicker from "react-native-image-picker"
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore';
import en from '../../../en'
import spn from '../../../spn'
import AsyncStorage from '@react-native-async-storage/async-storage'
class AddSupervisor extends React.Component{
    state = {
        profile_image:'',
        name:'',
        email:'',
        password:'',
        isLoading:false,
        uri:'',
        imageName:'',

        lang:en
    }
    pickImage =  () => {
        const options = {
            noData:true
          };
        ImagePicker.launchImageLibrary(options, response => {
           
            console.log("response", response);
            if(response.assets){
            
         response.assets.map(data=>{
        console.log(data);

         this.setState({profile_image: data,uri:data.uri,imageName:data.fileName});
        })
        
      }
        })
    
     
      }
      upload_image = async()=>{
       
       
         await storage().ref('profile_pics/'+this.state.imageName).putFile(this.state.uri)
         
 
      
        
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

      AddSupervisor = ()=>{
          this.setState({isLoading:true})
         
      
          firestore().collection('users').where("email",'==',this.state.email).get()
          .then(res=>{
            if(res.size <1){
                this.upload_image()
                .then(i=>{
                    firestore().collection("users").add({
                        name:this.state.name,
                        email:this.state.email,
                        password:this.state.password,
                        profile_image:this.state.profile_image.fileName,
                        role:'supervisor'
                     })
                     .then(res=>{
                      this.setState({isLoading:false})
          
                         Alert.alert("Addded")
                     }).catch(err=>{
                    console.log(err)
            
                    this.setState({isLoading:false})
            
                        Alert.alert("Something Went Wrong")
                        return false
                    })
                })
                .catch(err=>{
                    console.log("Image Error"+err)
                    this.setState({isLoading:false})
            
                    Alert.alert("Something Went Wrong")
                    return false
                })
           
        }else{
            Alert.alert("Email Already Exist.Please Try Another One")
            this.setState({isLoading:false})

        }
          })
           
      }

      componentDidMount(){
        this.translate()
      }
    render(){
        return(
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView>
            <SafeAreaView style={styles.container}>
                
               

                <TouchableOpacity onPress={this.pickImage} style={{alignSelf:'center',marginTop:20}}>
                    {this.state.profile_image.uri?<Image  style={{width:100,height:100,borderRadius:50}} source={{uri:this.state.profile_image.uri}} />:<FontAwesome name="user-circle" color="#18708f" size={100}/>}
                </TouchableOpacity>


                <View style={[styles.EnteringData,{marginTop:20}]}>
                <TextInput style={styles.NameInput} placeholderTextColor="#929292" onChangeText={(val)=>this.setState({name:val})} placeholder={this.state.lang.name}/>
                    <TextInput style={styles.EmailInput} placeholderTextColor="#929292" onChangeText={(val)=>this.setState({email:val})} placeholder={this.state.lang.email}/>
                    
                <View style={styles.PasswordInput}>

                <TextInput placeholderTextColor="#929292" secureTextEntry placeholder={this.state.lang.password} onChangeText={(val)=>this.setState({password:val})} style={styles.InputField}/>

            </View>
            <TouchableOpacity disabled={this.state.isLoading} onPress={this.AddSupervisor} style={styles.LoginButton}>
                {this.state.isLoading?<ActivityIndicator size="small" color="black"/>:null}
                    <Text style={styles.LoginButtonText}>{this.state.lang.add_supervisor}</Text>
            </TouchableOpacity>
                </View>
            </SafeAreaView>
            </ScrollView>
            </TouchableWithoutFeedback>
        )
    }
}

export default AddSupervisor