import React from 'react'
import {SafeAreaView, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert,ActivityIndicator,ScrollView,Image} from 'react-native'
//react native vector icons
import FontAwesome from 'react-native-vector-icons/FontAwesome'
//importing styles
import styles from './styles'
import * as ImagePicker from "react-native-image-picker"
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'
import en from '../../../en'
import spn from '../../../spn'
class EditSuperVisor extends React.Component{
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
     
     
     getUser = ()=>{
         firestore().collection("users").doc(this.props.route.params.id).get()
         .then(res=>{
            this.setState({
                email:res._data.email,
                password:res._data.password,
                name:res._data.name
            })
         })
     }

      UpdateSuperVisor = ()=>{
          this.setState({isLoading:true})
        
        if(this.state.profile_pic){
            console.log("This is the previous uri "+this.props.route.params.prev_uri)
    
                this.setState({isLoading:true})
                storage().refFromURL(this.props.route.params.prev_uri).delete()
                .then(res=>{
                    this.upload_image()
    
                    firestore().collection("users").doc(this.props.route.params.data.id).update({
                        name:this.state.name,
                        email:this.state.email,
                       
                      
                        profile_pic:this.state.imageName,
                        password:this.state.password
                    })
                    .then(res=>{
                    this.setState({isLoading:false})
            
                        Alert.alert("Updated Successfully")
                    })
                    .catch(err=>{
                    this.setState({isLoading:false})
            
                        Alert.alert("Something Went Wrong")
                    })
    
    
    
                })
                .catch(err=>{
                    Alert.alert("Something Went Wrong")
                    return false
                })
            }else{
                this.setState({isLoading:true})
                firestore().collection("users").doc(this.props.route.params.id).update({
                    name:this.state.name,
                    email:this.state.email,
                   
                    password:this.state.password,
                
                   
                })
                .then(res=>{
                this.setState({isLoading:false})
        
                    Alert.alert("Updated Successfully")
                })
                .catch(err=>{
                this.setState({isLoading:false})
        
                    Alert.alert("Something Went Wrong")
                })
            }
    
           
      }

      componentDidMount(){
        this.translate()

          this.getUser()

      }
    render(){
        return(
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView>
            <SafeAreaView style={styles.container}>
                
               

                <TouchableOpacity onPress={this.pickImage} style={{alignSelf:'center',marginTop:20}}>
                    {this.state.profile_image.uri?<Image  style={{width:100,height:100,borderRadius:50}} source={{uri:this.state.profile_image.uri}} />:<Image  style={{width:100,height:100,borderRadius:50}} source={{uri:this.props.route.params.prev_uri}} />}
                </TouchableOpacity>


                <View style={[styles.EnteringData,{marginTop:20}]}>
                <TextInput style={styles.NameInput} placeholderTextColor="#929292" value={this.state.name} onChangeText={(val)=>this.setState({name:val})} placeholder={this.state.lang.name}/>
                    <TextInput style={styles.EmailInput} placeholderTextColor="#929292" value={this.state.email} onChangeText={(val)=>this.setState({email:val})} placeholder={this.state.lang.email}/>
                    
                <View style={styles.PasswordInput}>

                <TextInput placeholderTextColor="#929292" secureTextEntry placeholder={this.state.lang.password} value={this.state.password} onChangeText={(val)=>this.setState({password:val})} style={styles.InputField}/>

            </View>
            <TouchableOpacity disabled={this.state.isLoading} onPress={this.UpdateSuperVisor} style={styles.LoginButton}>
                {this.state.isLoading?<ActivityIndicator size="small" color="black"/>:null}
                    <Text style={styles.LoginButtonText}>{this.state.lang.update_supervisor}</Text>
            </TouchableOpacity>
                </View>
            </SafeAreaView>
            </ScrollView>
            </TouchableWithoutFeedback>
        )
    }
}

export default EditSuperVisor
