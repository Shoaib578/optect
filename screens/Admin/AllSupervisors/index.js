import React from 'react'
import {SafeAreaView, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback,Alert, Keyboard,ActivityIndicator} from 'react-native'
//styles import
import styles from './styles'
//react native vector icons
import Icon from 'react-native-vector-icons/AntDesign'
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import SuperVisorContainer from './SuperVisorContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AllSupervisors extends React.Component{
    state = {
        data:[],
        isLoading:true
    }
    getAllSuperVisors = ()=>{
        firestore().collection("users").where("role","==","supervisor").get()
        .then(res=>{
            console.log(res.docs)
           this.setState({data:res.docs},()=>{
               this.setState({isLoading:false})
           })
        })
    }


    
    logout = async()=>{
        AsyncStorage.removeItem("user")
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login'}]
        });
    }

    componentDidMount(){
        this.getAllSuperVisors()
        this.props.navigation.addListener("focus",()=>{
            this.getAllSuperVisors()
        })
    }
    render(){
        if(this.state.isLoading == false){

        
        return(
            <SafeAreaView style={styles.container}>
                <ScrollView>
               
                    {this.state.data.map((data,index)=>{
                        return <SuperVisorContainer getAllSuperVisors={this.getAllSuperVisors} navigation={this.props.navigation} data={data} key={index}/>
                    })}
              
                </ScrollView>
              
            </SafeAreaView>
        )
    }else{
        return <ActivityIndicator color="black" size="large"/>
    }
    }
}

export default AllSupervisors