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
        data:'',
        lang:en
        
    }

    translate = async()=>{
        const user_lang =await AsyncStorage.getItem("lang")

        if(user_lang != null){
            if(user_lang == "spanish"){
                this.setState({lang:spn})

            }else{
                this.setState({lang:en})

            }
        }
    }

    getData = ()=>{
        firestore().collection('orders').doc(this.props.route.params.id).onSnapshot(data=>{
            
            this.setState({data:data._data})
        })
    }

    changeStatus = (status)=>{

        firestore().collection('orders').doc(this.props.route.params.id).update({
            "status":status
        })
        .then(res=>{
            this.getData()
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
        })
    }
    componentDidMount(){
     this.getData()
        this.translate()
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

          {this.state.data.status == 'Working'?<View>
          <TouchableOpacity onPress={()=>this.changeStatus('completed')} style={styles.submit_btn} >
                        
                           
                        <Text style={{ fontSize:16,fontWeight:'bold',color:'white'}}>{this.state.lang.complete}</Text>
        </TouchableOpacity>



        <TouchableOpacity onPress={()=>this.changeStatus('cancelled')} style={[styles.submit_btn,{backgroundColor:'red',borderColor:'red'}]} >
                        
                           
            <Text style={{ fontSize:16,fontWeight:'bold',color:'white'}}>{this.state.lang.cancel}</Text>
        </TouchableOpacity>
          </View>:null}
      

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