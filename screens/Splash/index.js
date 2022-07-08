import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { render } from 'react-native/Libraries/Renderer/implementations/ReactNativeRenderer-prod'
import Loading from './loading'
import firestore from '@react-native-firebase/firestore';

export default class Splash extends React.Component{
    state = {
        isLoggedIn:false,
      
      }

    CreateAdmin = ()=>{
        firestore().collection("users").where("role","==","admin").get()
        .then(res=>{
            if(res.size < 1){
                firestore().collection("users").add({
                    "email":"theadmin26@gmail.com",
                    "password":"Games587",
                    "role":"admin",
                    "profile_pic":"null"
                })
            }
        })
    }
    isLoggedIn = async()=>{
        const user =await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)

        if(parse == null){
            this.setState({isLoggedIn:false})
          }else{
            this.setState({isLoggedIn:true})
          }
          setTimeout(()=>{
            if(this.state.isLoggedIn){
                if(parse.role == "operator"){
                    this.props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'AssignedOrdersToOperator' }]
                    });
                }else if(parse.role == "admin"){
                    this.props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'AdminHome' }]
                    });
                }else if(parse.role == "supervisor"){
                    this.props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'SupervisorHome' }]
                    });
                }
             
          }else{
              this.props.navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login'}]
              });
          }
          },1000)  
    }

    componentDidMount(){
        this.CreateAdmin()
        this.isLoggedIn()
        
    }
    render(){
        return <Loading />
    }
}