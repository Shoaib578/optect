import React from 'react'
import {View,Text,Dimensions,TouchableOpacity,StyleSheet,Alert} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ReadMore from '@fawazahmed/react-native-read-more';
import { ScrollView } from 'react-native-gesture-handler';
import en from '../../../en';
import spn from '../../../spn';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Details extends React.Component{
    state = {
        assigned_order_details:'',
        data:'',
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
    getData = ()=>{
        firestore().collection('assigned_operators').doc(this.props.route.params.id).onSnapshot(data=>{
            console.log(data._data)
            this.setState({assigned_order_details:data._data})
            console.log(data._data.order_id)
            firestore().collection("orders").doc(data._data.order_id).onSnapshot(res=>{
               
                this.setState({data:res._data})
            })
            
        })
    }

   
    componentDidMount(){
        this.translate()
     this.getData()

     this.props.navigation.addListener('focus',()=>{
         this.getData()
        this.translate()

     })
    }


    render(){
        return <ScrollView>

         <View style={{ marginLeft:Dimensions.get('window').width*2/75,marginTop:10,borderColor:'#D3D3D3',borderWidth:1,backgroundColor:'#D3D3D3',width:'95%',padding:10, borderRadius:10 }}>
        <Text style={{ fontWeight:'bold',fontSize:16 }}>{this.state.lang.details}</Text>

        <View style={{ marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
        
        <Text style={{ fontSize:20,color:'black',fontWeight:'bold' }}>{this.state.data.order_title}</Text>
        </View>



        <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
        <Text style={{ fontSize:15 }}>{this.state.lang.area}</Text>
        <Text style={{ right:20,fontSize:15,color:'blue',fontWeight:'bold' }}>{this.state.data.area} </Text>
        </View>

      
        

        <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
        <Text style={{ fontSize:15 }}>{this.state.lang.area_or_location}</Text>
        <Text style={{ right:20,fontSize:15,color:'blue',fontWeight:'bold' }}>{this.state.data.area_or_location} </Text>
        </View>


        


       

        <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
        <Text style={{ fontSize:15 }}>{this.state.lang.expected_date}</Text>
        <Text style={{ right:20,fontSize:15,color:'blue',fontWeight:'bold' }}>{this.state.data.expected_date} </Text>
        </View>


        <View style={{ flexDirection:'row',justifyContent:'space-between',marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
        <Text style={{ fontSize:15 }}>{this.state.lang.status}</Text>
        {this.state.data.status =="completed"?<Text style={{ right:20,fontSize:15,color:'white',fontWeight:'bold' ,borderColor:"green",borderRadius:10,padding:5,borderWidth:1,backgroundColor:"green"}}>{this.state.lang.completed}</Text>:null}
                   {this.state.data.status =="cancelled"?<Text style={{ right:20,fontSize:15,color:'white',fontWeight:'bold' ,borderColor:"red",borderRadius:10,padding:5,borderWidth:1,backgroundColor:"red"}}>{this.state.lang.cancelled}</Text>:null}
                   {this.state.data.status =="Working"?<Text style={{ right:20,fontSize:15,color:'white',fontWeight:'bold' ,borderColor:"orange",borderRadius:10,padding:5,borderWidth:1,backgroundColor:"orange"}}>{this.state.lang.working}</Text>:null}
        
        </View>


      
    



        <View style={{ marginTop:10,borderBottomWidth:1,borderColor:'black',width:'95%' }}>
        <ReadMore numberOfLines={3} >
          {
            this.state.data.order_description
          }
        </ReadMore>
        
        </View>

         

      </View>
      </ScrollView>

    }
}

const styles = StyleSheet.create({
    submit_btn:{
        
        borderWidth:1,
        borderColor:"green",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'green',
        borderRadius:10,
        height:50,
        width:'100%',
        marginTop:20,
        
      }
})