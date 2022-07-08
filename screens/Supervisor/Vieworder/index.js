import React from "react"
import {SafeAreaView, View, Text, TextInput, Button,TouchableOpacity, TouchableWithoutFeedback, Keyboard,Alert} from 'react-native'
//styles import
import styles from './styles'
//react native vector icons
import Icon from 'react-native-vector-icons/AntDesign'
import { ScrollView } from "react-native-gesture-handler"
import OperatorContainer from "./OperatorContainer"
import AsyncStorage from "@react-native-async-storage/async-storage"
import firestore from '@react-native-firebase/firestore';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Modal from "react-native-modal";

//dropdown
import {Dropdown} from 'react-native-element-dropdown';
import en from "../../../en"
import spn from "../../../spn"
const data = [
    { label: 'Sunday', value: 'Sunday' },
    { label: 'Monday', value: 'Monday' },
    { label: 'Tuesday', value: 'Tuesday' },
    { label: 'Wednesday', value: 'Wednesday' },
    { label: 'Thursday', value: 'Thursday' },
    { label: 'Friday', value: 'Friday' },
    { label: 'Saturday', value: 'Saturday' },
  ];

  
class ViewOrder extends React.Component{
    state = {
        data:[],
        all_operators:[],
        floor:'',
        selected_operator:'',
        from_day:'',
        to_day:'',
        is_visible:false,
        is_loading:false,

        lang:en,
        role:""
      
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
    getData = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        this.setState({role:parse.role})
        firestore().collection('assigned_operators').where("order_id","==",this.props.route.params.id).get()
        .then(res=>{
            console.log("operators")
            console.log(res.docs)
            let op = []
            res.docs.forEach(data=>{
               op.push(data)
            })
          
            this.setState({data:op})
            
        })
    }

    getAllOperators = ()=>{
        firestore().collection('users').where("role","==","operator").get()
        .then(res=>{
           
            let operators = []
            res.docs.forEach(data=>{
                operators.push({label:data._data.name,value:data.id})

            })
            this.setState({all_operators:operators})
        })
    }

    AssignOperator = ()=>{
        if(this.state.floor.length<1 || this.state.from_day.length<1 || this.state.to_day.length<1 || this.state.selected_operator.length<1){
            Alert.alert("All the fields are required")
            return false
        }
        this.setState({is_loading:true})
        firestore().collection('assigned_operators').add({
            operator_id:this.state.selected_operator,
            order_id:this.props.route.params.id,
           
        })
        .then(res=>{
            Alert.alert("Operator is Assigned to this order successfully")
        this.setState({is_loading:false})

            this.getData()
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
        this.setState({is_loading:false})

        })
    }

    componentDidMount(){
        this.translate()

        this.getAllOperators()
        this.getData()
        this.props.navigation.addListener("focus",()=>{
        this.translate()

            this.getAllOperators()
            this.getData()

        })
    }
   
    render(){
        return(
            <ScrollView >
              

                <Text style={{marginTop:20}}> </Text>

                {this.state.data.map((data,index)=>{
             return  <OperatorContainer route={this.props.route}  navigation={this.props.navigation} key={index} data={data} getData={this.getData}/>

                })}


                <Modal isVisible={this.state.is_visible}>
                    <View style={{marginTop:'10%',backgroundColor:"gray",padding:10,borderRadius:10}}>
                        <ScrollView>

                    <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={this.state.all_operators}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={this.state.lang.select_operator}
                    searchPlaceholder="Search..."
                    value={this.state.selected_operator}
                    onChange={item => {
                    this.setState({selected_operator:item.value});
                    }}
                    />
                            
       
    <Text style={{marginTop:10}}> </Text>
    
   


                <Button disabled={this.state.is_loading}  title={this.state.lang.add} onPress={this.AssignOperator}/>
                    <Text style={{marginTop:10}}> </Text>

                    <Button  title={this.state.lang.close} onPress={()=>this.setState({is_visible:false})}/>
                    </ScrollView>

                    </View>
                </Modal>
            </ScrollView>
        )
    }
}

export default ViewOrder