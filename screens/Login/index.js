import React from "react"
import {Text, Image,  SafeAreaView, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback, TextInput,ActivityIndicator, ScrollView,Alert} from 'react-native'
import styles from './styles'
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'
import en from "../../en";
import spn from "../../spn";
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
 class Login extends React.Component{

    state = {
        showPass:true,
        email:"",
        password:"",
        isLoading:false,
        remember_me:false,
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

    CheckRemeber = async()=>{
        const user = await AsyncStorage.getItem("remember")
        const parse = JSON.parse(user)

        if(parse != null){
            this.setState({email:parse.email,password:parse.password})
            console.log(parse)
        }else{
            this.setState({email:"",password:""})

        }
    }
    SignIn(){
        this.setState({isLoading:true})
        firestore()
        .collection('users')
        .where('email', '==', this.state.email).get()
        .then(async(res)=>{
            if(res.size>0){
    
            
               
                if(res._docs[0]._data.password == this.state.password){
                    
                    this.setState({isLoading:false})
                    const user = {
                       
                      
                        "role":res._docs[0]._data.role,
                        
                        
                        "id":res._docs[0].id,
                       
    
    
    
                    }
                    
                    await AsyncStorage.setItem('user',JSON.stringify(user))

                    if(this.state.remember_me){
                        const remember = {
                            "email":this.state.email,
                            "password":this.state.password
                        }

                        await AsyncStorage.setItem("remember",JSON.stringify(remember))
                    }
                    if(res._docs[0]._data.role == 'admin'){
                        console.log("Admin")
                        this.props.navigation.reset({
                            index: 0,
                            routes:[{ name: 'AdminHome'}],
                        });
                       
                    }else if(res._docs[0]._data.role == "supervisor"){
                        
                        this.props.navigation.reset({
                            index: 0,
                            routes:[{ name: 'SupervisorHome'}],
                        });
                       

                    }else if(res._docs[0]._data.role == "operator"){
                        this.props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'AssignedOrdersToOperator' }]
                        });
                    }
                    
                }else{
                this.setState({isLoading:false,})
    
                    Alert.alert("Invalid Email or Password")
                    
                }
           
        }else{
            this.setState({isLoading:false})
    
            Alert.alert("Invalid Email or Password")
           
        }
    
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
            this.setState({isLoading:false})

        })
    }

    toggleRemeberMe = ()=>{
        if(this.state.remember_me){
            this.setState({remember_me:false})
        }else{
            this.setState({remember_me:true})

        }
    }

    componentDidMount(){
        this.translate()
        this.CheckRemeber()
    }

    render(){
        return(
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView>
            <SafeAreaView style={styles.container}>
                
                <View style={styles.LoginInfo}>
                    <Text style={styles.LoginText}>{this.state.lang.login}</Text>
                    <Text style={styles.EnterEmailText}>{this.state.lang.login_below_title}</Text>
                </View>
                <View style={styles.EnteringData}>
                    <TextInput style={styles.EmailInput} value={this.state.email} placeholderTextColor="#929292" onChangeText={(val)=>this.setState({email:val})} placeholder={this.state.lang.email}/>
                    
                <View style={styles.PasswordInput}>
                {this.state.showPass == true ? 
                <TouchableOpacity onPress={() => this.setState({showPass:!(this.state.showPass)})} style={styles.EyeButton}>
                <Image source={require('../../assets/eye.png')} style={styles.imageStyle}/>
                </TouchableOpacity>:
                <TouchableOpacity onPress={() => this.setState({showPass:!(this.state.showPass)})} style={styles.EyeButton}>
                <Image source={require('../../assets/crosseye.png')} style={styles.imageStyle}/>
                </TouchableOpacity>
                }
                

                <TextInput placeholderTextColor="#929292" value={this.state.password} secureTextEntry={this.state.showPass} onChangeText={(val)=>this.setState({password:val})} placeholder={this.state.lang.password} style={styles.InputField}/>

            </View>
            <View style={{flexDirection:"row",marginTop:30}}>
            <TouchableOpacity onPress={this.toggleRemeberMe} style={{borderColor:'gray',borderWidth:1,backgroundColor:"gray",padding:0,borderRadius:5,alignItems:'center',justifyContent:'center' , }}>
                {this.state.remember_me?<Ionicons name="checkmark-sharp" color="white" size={20} style={{alignSelf:"center",textAlign:"center"}}/>:<EvilIcons name="close" color='white' size={20}/>}
            </TouchableOpacity>

            <Text style={{color:'black',marginLeft:20}}>Remember Me</Text>
            </View>
          
            <TouchableOpacity  disabled={this.state.isLoading} onPress={() => this.SignIn()} style={styles.LoginButton}>
                {this.state.isLoading?<ActivityIndicator size="small" color="black"/>:null}
                    <Text style={styles.LoginButtonText}>{this.state.lang.login}</Text>
            </TouchableOpacity>
                </View>
            </SafeAreaView>
            </ScrollView>
            </TouchableWithoutFeedback>
        )
    }
}

export default Login