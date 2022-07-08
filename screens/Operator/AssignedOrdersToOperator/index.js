import React from "react"
import {SafeAreaView, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ActivityIndicator} from 'react-native'
//styles import
import styles from './styles'
//react native vector icons
import Icon from 'react-native-vector-icons/AntDesign'
import AsyncStorage from "@react-native-async-storage/async-storage"
import firestore from '@react-native-firebase/firestore';
import { FlatList } from "react-native-gesture-handler"
import OrderContainer from "./OrderContainer"
class AllOrders extends React.Component{
   

    state = {
        data:[],
        is_loading:true
    }
    getOrders = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        firestore().collection("assigned_operators").where("operator_id","==",parse.id).get()
        .then(res=>{
            this.setState({data:res.docs},()=>{
                this.setState({is_loading:false})
            })
        })

    }

    componentDidMount(){
        this.getOrders()
    }
    render(){
        if(this.state.is_loading == false){
            if(this.state.data.length>0){
                return(
                    <SafeAreaView style={styles.container}>
                        
        
                        <FlatList 
                        data={this.state.data}
                        keyExtractor={(order)=>order.id}
                        renderItem={(order)=>{
                            
                          
                                return <OrderContainer order={order} navigation={this.props.navigation}/>
        
                           
                        }}
                        />
                    </SafeAreaView>
                )
            }else{
                return <Text style={{color:"red",textAlign:"center",marginTop:30,fontWeight:"bold"}}>You Dont Have Any Orders Yet!</Text>
            }
           
        }else{
            return <ActivityIndicator size="large" color="black" style={{alignSelf:'center'}}/>
        }
        
    }
}

export default AllOrders