import React from "react"
import {SafeAreaView, View, Text, TextInput, Button,TouchableOpacity, TouchableWithoutFeedback, Keyboard,Alert} from 'react-native'
//styles import
import styles from './styles'
//react native vector icons
import Icon from 'react-native-vector-icons/AntDesign'
import { ScrollView } from "react-native-gesture-handler"
import AsyncStorage from "@react-native-async-storage/async-storage"
import firestore from '@react-native-firebase/firestore';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Modal from "react-native-modal";
import en from "../../../en"
import spn from "../../../spn"
//dropdown
import {Dropdown} from 'react-native-element-dropdown';

export default class Statuses extends React.Component{

   
    state = {
        is_loading:true,
        is_visible:false,
        data:[],
        order_id:"",
        id:'',
        lang:en


    }

   
     getData = ()=>{
        
        
        
        firestore().collection('assigned_operators').doc(this.props.route.params.id).onSnapshot(data=>{
            console.log("Operator id")
            console.log(this.props.route.params.operator_id)
            console.log(data._data)
            if(data._data.order_id != null){

            this.setState({order_id:data._data.order_id})
            firestore().collection("orders").doc(data._data.order_id).onSnapshot(r=>{
                
                firestore().collection("status").where("operator_id","==",this.props.route.params.operator_id).where("order_id","==",r.id).get()
                .then(res=>{
                    console.log(res.docs)
                    this.setState({data:res.docs},()=>{
                        this.setState({is_loading:false})
                    })
                })
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
  async componentDidMount(){
    await this.translate()
  await  this.getData()
    
    
   }


    render(){
        if(this.state.data.length > 0){
            return(
                <View >
                   
    
                    
                    <ScrollView>
    
                    {this.state.data.map((order,index)=>{
                        return   <TouchableOpacity onPress={()=>this.props.navigation.navigate('view_status',{status_id:order.id,id:this.state.order_id})} key={index} style={styles.OrderCard}>
                       
                     
                        <View style={styles.OrderTitleFull}>
                        <Text style={{color:'white',fontWeight:'bold'}}>{Date(order._data.date)}</Text>
                          
     
                        </View>
                    </TouchableOpacity>
                    })}
    
    
                    
                  </ScrollView>
    
    
                  
                </View>
            )
        }else{
            return <Text style={{color:"red",fontWeight:"bold",marginTop:20,textAlign:"center"}}>{this.state.lang.dont_have_any}</Text>

        }
       
    }
}

