import React from 'react'
import {SafeAreaView, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback,Alert, Keyboard,ActivityIndicator,Image} from 'react-native'
//styles import
import styles from './styles'
//react native vector icons
import Icon from 'react-native-vector-icons/AntDesign'
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import storage from '@react-native-firebase/storage'

export default class SuperVisorContainer extends React.Component{
    state = {
        profile_pic:''
    }
    DeleteSuperVisor = (id)=>{
        
        firestore().collection("users").doc(id).delete()
        .then(res=>{
            this.props.getAllSuperVisors()
            Alert.alert("Deleted Successfully")
        })
        .catch(err=>{
            console.log(err)
            Alert.alert("Something Went Wrong")
        })
    }

    getImage = ()=>{
        console.log(this.props.data._data.profile_pic)
        storage()
        .ref('profile_pics/' + this.props.data._data.profile_image) //name in storage in firebase console
        .getDownloadURL()
        .then((url) => {
            console.log(url)
         this.setState({profile_pic:url})
        })
        .catch((e) => console.log('Errors while downloading => ', e));
    }


    componentDidMount(){
        this.getImage()
    }
    render(){
        return   <View  style={[styles.supervisorCard,{marginTop:20}]}>
            <Image style={{width:40,height:40,borderRadius:40}} source={{uri:this.state.profile_pic}}/>
        <Text style={styles.supervisorName}>{this.props.data._data.name}</Text>
        <View style={styles.icons}>
        <TouchableOpacity onPress={()=>this.DeleteSuperVisor(this.props.data.id)}>
            <Icon name="delete" size={25} color="#FFFFFF"/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('EditSuperVisor',{id:this.props.data.id,prev_uri:this.state.profile_pic})}>
            <Icon name="edit" size={25} color="#FFFFFF"/>
        </TouchableOpacity>
        </View>
    </View>
    }
}