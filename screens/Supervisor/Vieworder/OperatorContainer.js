import React from 'react'
import {SafeAreaView, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback,Alert, Keyboard,ActivityIndicator,Image} from 'react-native'
//styles import
import styles from './styles'
//react native vector icons
import Icon from 'react-native-vector-icons/AntDesign'
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import storage from '@react-native-firebase/storage'

export default class OperatorContainer extends React.Component{
    state = {
        profile_pic:'',
        name:''
    }
    DeleteAssignedOperator = (id)=>{
        console.log(id)
        firestore().collection("assigned_operators").doc(id).delete()
        .then(res=>{
            setTimeout(async()=>{
               await this.props.getData()

            },200)
            Alert.alert("Deleted Successfully")
        })
        .catch(err=>{
            console.log(err)
            Alert.alert("Something Went Wrong")
        })
    }

    getUser = ()=>{
        firestore().collection("users").doc(this.props.data._data.operator_id).onSnapshot(data=>{
            this.setState({name:data._data.name})
                this.getImage(data._data.profile_image)
        })
    }



    getImage = (image)=>{
       
        storage()
        .ref('profile_pics/' + image) //name in storage in firebase console
        .getDownloadURL()
        .then((url) => {
            console.log(url)
         this.setState({profile_pic:url})
        })
        .catch((e) => console.log('Errors while downloading => ', e));
    }


    componentDidMount(){
       this.getUser()
    }
    render(){
        return   <TouchableOpacity onPress={()=>this.props.navigation.navigate('statuses',{id:this.props.data.id,operator_id:this.props.data._data.operator_id})} style={styles.supervisorCard}>
            <Image style={{width:40,height:40,borderRadius:40}} source={{uri:this.state.profile_pic}}/>
        <Text style={styles.supervisorName}>{this.state.name}</Text>
        <View style={styles.icons}>
        <TouchableOpacity onPress={()=>this.DeleteAssignedOperator(this.props.data.id)}>
            <Icon name="delete" size={25} color="#FFFFFF"/>
        </TouchableOpacity>
       
        </View>
    </TouchableOpacity>
    }
}