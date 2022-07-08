import React from 'react'
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage"
import firestore from '@react-native-firebase/firestore';
import en from '../../../en';
import spn from '../../../spn';
// onPress={()=>this.props.navigation.navigate('VieworderBySupervisor',{id:order.id})}
export default class OrderContainer extends React.Component{
    state ={
        data:[],
        order_id:'',
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
   getOrderData =async()=>{
    const user = await AsyncStorage.getItem("user")
     const parse = JSON.parse(user)
     firestore().collection("orders").doc(this.props.order.item._data.order_id).onSnapshot(data=>{
         this.setState({data:data._data,order_id:data.id})
     })
   }
//    ViewOrderByOperator
   componentDidMount(){
    this.translate()
       this.getOrderData()
   }
    render(){
        return(
            <TouchableOpacity  onPress={()=>this.props.navigation.navigate('ViewOrderByOperator',{id:this.props.order.item.id,order_id:this.state.order_id})} style={styles.OrderCard}>
                  
                   {this.state.data.status? <View>

                   {this.state.data.status =="completed"?<Text style={{ left:'77%',top:10,fontSize:13,color:'white',fontWeight:'bold' ,borderColor:"green",borderRadius:10,padding:5,borderWidth:1,backgroundColor:"green",position:'absolute'}}>{this.state.lang.completed}</Text>:null}
                   {this.state.data.status =="cancelled"?<Text style={{ left:'77%',top:10,fontSize:13,color:'white',fontWeight:'bold' ,borderColor:"red",borderRadius:10,padding:5,borderWidth:1,backgroundColor:"red",position:'absolute'}}>{this.state.lang.cancelled}</Text>:null}
                   {this.state.data.status =="Working"?<Text style={{ left:'77%',top:10,fontSize:13,color:'white',fontWeight:'bold' ,borderColor:"orange",borderRadius:10,padding:5,borderWidth:1,backgroundColor:"orange",position:'absolute'}}>{this.state.lang.working}</Text>:null}
                   </View>:null}
                  
                   <View style={styles.OrderTitleFull}>
                   <Text style={styles.OrderTitleText}>{this.state.data.order_title}</Text>
                     

                   </View>

                   <View style={styles.OrderTitleFull}>
                       
                       
                       <Text style={styles.OrderFromText}>{this.state.lang.area} :  </Text>
    
                           <View style={styles.OrderTitleTag}>
                           <Text style={styles.OrderTitle}>{this.state.data.area}</Text>
                           </View>
                       </View>
                   
                   <View style={styles.OrderTitleFull}>
                       
                   <Text style={styles.OrderFromText}>{this.state.lang.expected_date} : {this.state.data.expected_date} </Text>
                   
                   </View>


                 
                
                   <View style={styles.Bottom}>
                  
                  
                   </View>
               </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FFFFFF',
        flex:1,
        paddingRight:'5%',
        paddingLeft:'5%',
        paddingTop:'5%'
    },

    OrderCard:{
        width:'100%',
        backgroundColor:'#5FA7C0',
        flexDirection:'column',
        justifyContent:'space-between',
        paddingLeft:'5%',
        paddingRight:'5%',
        paddingTop:10,
        paddingBottom:10,
        marginTop:10,
        borderRadius:10
    },

    OrderTitle:{
        fontSize:17,
        color:'#5FA7C0',
        marginBottom:'1%'
    },

    icons:{
        flexDirection:'row',
        width:'20%',
        justifyContent:'space-between',
        paddingTop:'2%'
    },

    OrderDescription:{
        color:'#FFFFFF',
        fontSize:16,
    },

    OrderTitleText:{
        fontSize:18,
        color:'#FFFFFF',
        marginBottom:'1%'
    },

    OrderFromText:{
        fontSize:18,
        color:'#FFFFFF',
        marginBottom:'1%'
    },

    OrderTitleFull:{
        flexDirection:'row',
        alignItems:'center',
        paddingBottom:5
    },

    OrderTitleTag:{
        backgroundColor:'white',
        padding:5,
        marginLeft:5
    },

    Bottom:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:5
    },

    assignButton:{
        backgroundColor:'white',
        width:'30%',
        justifyContent:'center',
        alignItems:'center',
    },

    assignButtonText:{
        color:'#5FA7C0',
        fontSize:16
    },
    EmailInput:{
        backgroundColor:'#F2F2F7',
        width:'100%',
        height:48,
        fontSize:17,
        color:'#929292',
        paddingLeft:10
        
    },
})