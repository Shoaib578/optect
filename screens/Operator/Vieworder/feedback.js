import React from 'react'
import {View,Text,StyleSheet,Image} from 'react-native'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore';
export default class Feedback extends React.Component{ 
    state = {
        uri:"",
        supervisor_name:"",
        
    }
    getSuperVisor =()=>{
        console.log(this.props.data._data.supervisor_id)
        firestore().collection("users").doc(this.props.data._data.supervisor_id).onSnapshot(data=>{
            console.log(data)
            
            this.setState({supervisor_name:data._data.name})
            this.getUserImage(data._data.profile_image)
        })
    }

    getUserImage =(image_name)=>{
        storage()
        .ref('profile_pics/' + image_name) //name in storage in firebase console
        .getDownloadURL()
        .then((url) => {
            console.log(url)
         this.setState({uri:url})
        })
        .catch((e) => console.log('Errors while downloading => ', e));
    }
    componentDidMount(){
        console.log(this.props.data._data)
        this.getSuperVisor()
    }
    render() {  
        return <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                <Image source={{uri:this.state.uri}} style={{borderRadius:50,width:40,height:40,marginTop:10}}/>
                <Text style={{color:"white",fontWeight:"bold",marginTop:20,left:10}}>{this.state.supervisor_name}</Text>
                </View>
            <Text style={{color:'white',fontWeight:'bold',marginTop:10,marginLeft:20}}>{this.props.data._data.feedback}</Text>
        </View>
    }
  }

const styles = StyleSheet.create({
    container:{
        borderColor:'#5FA7C0',
        backgroundColor:"#5FA7C0",
        padding:10,
        borderRadius:5,
        marginTop:20,
        width:'90%',
        alignSelf:"center"

    }
})