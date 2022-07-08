import React from "react"
import {SafeAreaView, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard,ActivityIndicator, Alert} from 'react-native'
//styles import
import styles from './styles'
//react native vector icons
import Icon from 'react-native-vector-icons/AntDesign'
import AsyncStorage from "@react-native-async-storage/async-storage"
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from "react-native-gesture-handler"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import storage from '@react-native-firebase/storage'
import en from "../../../en"
import spn from "../../../spn"
export default class AdminAllOrders extends React.Component{
    state = {
        data:[],
        searched_order:[],
        is_loading:true,
        delete_loading:false,
        lang:en
    }
    logout = ()=>{
        AsyncStorage.removeItem("user")
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login'}]
        });
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


     getMyorders = ()=>{
        

         firestore().collection('orders').get()
         .then(res=>{
             this.setState({data:res.docs})   
             this.setState({searched_order:this.state.data},()=>{
                 this.setState({is_loading:false})
             })
         })
     }

     search_order = (val)=>{
         this.setState({searched_order:this.state.data.filter(i=>i._data.order_title.toLowerCase().includes(val.toLowerCase()))})
     }

     delete_order =(id)=>{
        console.log("Hello there")
        this.setState({delete_loading:true})
            firestore().collection("orders").doc(id).delete()
            .then(()=>{

            firestore().collection("assigned_operators").where("order_id","==",id).get()
            .then(data=>{
                data.docs.forEach(i=>{
                    firestore().collection("assigned_operators").doc(i.id).delete()
                })
                firestore().collection("status").where("order_id","==",id).get()
                .then(s=>{
                    s.docs.forEach(async(status)=>{
                     
                        var image1_ref = storage().ref().child(`order_images/${status._data.image1}`);
                        await image1_ref.delete()


                        var image2_ref = storage().ref().child(`order_images/${status._data.image2}`);
                        await image2_ref.delete()


                        var image3_ref = storage().ref().child(`order_images/${status._data.image3}`);
                        await image3_ref.delete()

                        firestore().collection("status_feedback").where("status_id","==",status.id).get()
                        .then(feedback=>{
                            feedback.forEach(f=>{
                                firestore().collection("status_feedback").doc(f.id).delete()
                            })
                        })
                    
                        firestore().collection("status").doc(status.id).delete()
                        


                    })
                    this.setState({delete_loading:false})
                })
                .catch(err=>{
                    this.setState({delete_loading:false})

                    Alert.alert(err.message)
                })
               
            })
            .catch(err=>{
                this.setState({delete_loading:false})

                Alert.alert(err.message)
            })
        })
        .catch(err=>{
            Alert.alert(err.message)
        })
        
       
      setTimeout(async()=>{
        await this.getMyorders()
      },200)
     }

     componentDidMount(){
        this.translate()

         this.getMyorders()
         this.props.navigation.addListener("focus",()=>{
            this.translate()

             this.getMyorders()
         })
     }
    render(){
        if(this.state.is_loading == false){

        return(
            <SafeAreaView style={styles.container}>
                
                <Text style={{marginTop:10}}> </Text>
                <TextInput style={styles.EmailInput} placeholderTextColor="#929292" onChangeText={val=>{
                    if(val.length>0){
                        this.search_order(val)

                    }else{
                        this.getMyorders()
                    }
                }} placeholder={this.state.lang.search_order}/>
               
              <ScrollView style={{marginTop:20}}>

               {this.state.searched_order.map((order,index)=>{
                   return  <TouchableOpacity key={index} onPress={()=>this.props.navigation.navigate('VieworderBySupervisor',{id:order.id})} style={styles.OrderCard}>
                 

                   {order._data.status =="completed"?<Text style={{ left:'77%',top:10,fontSize:13,color:'white',fontWeight:'bold' ,borderColor:"green",borderRadius:10,padding:5,borderWidth:1,backgroundColor:"green",position:'absolute'}}>{this.state.lang.completed}</Text>:null}
                   {order._data.status =="cancelled"?<Text style={{ left:'77%',top:10,fontSize:13,color:'white',fontWeight:'bold' ,borderColor:"red",borderRadius:10,padding:5,borderWidth:1,backgroundColor:"red",position:'absolute'}}>{this.state.lang.cancelled}</Text>:null}
                   {order._data.status =="Working"?<Text style={{ left:'77%',top:10,fontSize:13,color:'white',fontWeight:'bold' ,borderColor:"orange",borderRadius:10,padding:5,borderWidth:1,backgroundColor:"orange",position:'absolute'}}>{this.state.lang.working}</Text>:null}
                    
                   <View style={styles.OrderTitleFull}>
                   <Text style={styles.OrderTitleText}>{order._data.order_title}</Text>
                     

                   </View>

                   <View style={styles.OrderTitleFull}>
                       
                       
                       <Text style={styles.OrderFromText}>{this.state.lang.area} :  </Text>
    
                           <View style={styles.OrderTitleTag}>
                           <Text style={styles.OrderTitle}>{order._data.area}</Text>
                           </View>
                       </View>
                   
                   <View style={styles.OrderTitleFull}>
                       
                   <Text style={styles.OrderFromText}>{this.state.lang.expected_date} : {order._data.expected_date} </Text>
                   
                   </View>
                    {this.state.delete_loading == false?<View>
                    {order._data.status == 'completed' || order._data.status == 'cancelled'?<TouchableOpacity onPress={()=>this.delete_order(order.id)} style={{marginLeft:'90%'}}>
                        <FontAwesome name="trash" color="red" size={25}/>
                    </TouchableOpacity>:null}
                    </View>:<ActivityIndicator size="small" color='red' style={{marginLeft:'90%'}}/>}
                  
                 
                  
                   <View style={styles.Bottom}>
                  
                  
                   </View>
               </TouchableOpacity>
               })}
              </ScrollView>

            </SafeAreaView>
        )
    }else{
        return <ActivityIndicator size="large" color="black" style={{alignItems:'center',marginTop:30}}/>
    }

    }
}

