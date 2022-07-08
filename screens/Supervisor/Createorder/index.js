import React from 'react'
import {SafeAreaView, View, Text, TextInput, TouchableOpacity,FlatList, TouchableWithoutFeedback, Button, Keyboard,ScrollView,Alert,ActivityIndicator,Dimensions} from 'react-native'
//styles import
import styles from './styles'
//react native vector icons
import Icon from 'react-native-vector-icons/AntDesign'
//date picker
import DatePicker from 'react-native-date-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore';
import en from '../../../en'
import spn from '../../../spn'

import MultiSelect from 'react-native-multiple-select';

class CreateOrder extends React.Component{
    constructor(props){
        super(props)
        this.operatorRef = ''

        this.state = {
            date:new Date(),
            open:false,
            order_title:'',
            order_description:'',
            area:'',
            area_or_location:'',
            all_operators:[],
            selected_operators:[],
            is_loading:false,
            lang:en
        }
    
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

    getAllOperators = ()=>{
        firestore().collection("users").where("role","==","operator").get()
        .then(res=>{
            let operators = []
            res.docs.forEach(data=>{
                operators.push({name:data._data.name,id:data.id})
            })

            console.log(operators)
            this.setState({all_operators:operators})
        })
    }


    AssignOperator = (operator_id,order_id)=>{
        console.log("Assign Operator")
        console.log(operator_id)
        console.log(order_id)
        firestore().collection('assigned_operators').add({
            operator_id:operator_id,
            order_id:order_id,
           
        })
        .then(res=>{
          console.log("Assigned")
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
        return false

        })
    }
    createOrder = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        if(this.state.order_title.length<1){
            Alert.alert("Order Title is required")
            return false
        }


        if(this.state.order_description.length<1){
            Alert.alert("Order Description is required")
            return false
        }



        if(this.state.area.length<1){
            Alert.alert("Hall Area Field is required")
            return false
        }



        if(this.state.area_or_location.length<1){
            Alert.alert("Area or Location Field is required")
            return false
        }

        if(this.state.selected_operators.length<1){
            Alert.alert("Please Pick Atleast one operator")
            return false
        }


        this.setState({is_loading:true})

        firestore().collection('orders').add({
            supervisor_id:parse.id,
            order_title:this.state.order_title,
            order_description:this.state.order_description,
            area:this.state.area,
            area_or_location:this.state.area_or_location,
           
            status:'Working',
            expected_date:this.state.date.toDateString()
        })
        .then(res=>{
            this.state.selected_operators.map(op=>{
                this.AssignOperator(op,res.id)
            })
            
            this.setState({
                date:new Date(),
                open:false,
                order_title:'',
                order_description:'',
                area:'',
                area_or_location:'',
               
            },()=>{
                this.setState({is_loading:false})
                Alert.alert('Order Created Successfully')
            })
        })


    }

    onSelectOperator = (operator)=>{
        this.setState({selected_operators:operator})
    }

    componentDidMount(){
        this.translate()
        this.getAllOperators()
    }
    render(){
        return(
            <View  style={{alignItems: 'center',flex:1}}>
            <FlatList showsVerticalScrollIndicator={false} keyExtractor={item=>item._id} data={[{id:'sdsd'}]} renderItem={()=>(
            <SafeAreaView style={styles.container}>
                
                <View style={styles.OrderInfo}>
                    <Text style={styles.CreateOrderText}>{this.state.lang.create_order}</Text>
                </View>
                <View style={styles.EnteringData}>
                <TextInput style={styles.OrderTitle} value={this.state.order_title} onChangeText={(val)=>this.setState({order_title:val})} placeholderTextColor="#929292" placeholder={this.state.lang.order_title}/>
                <TextInput style={styles.Companyname} value={this.state.area} onChangeText={(val)=>this.setState({area:val})} placeholderTextColor="#929292" placeholder={this.state.lang.area}/>
                <TextInput style={styles.Companyname}  value={this.state.area_or_location} onChangeText={(val)=>this.setState({area_or_location:val})} placeholderTextColor="#929292" placeholder={this.state.lang.area_or_location}/>
               
               
               
                <Text style={{ marginTop:20 }}>Select Operator</Text>

        
                <View 
                style={{ borderWidth:1,borderColor:'#F2F2F7',borderRadius:5,width:Dimensions.get('window').width*2/2.2,padding:5,marginTop:10,backgroundColor:"#F2F2F7" }}
                
                >


                <MultiSelect
                

                items={this.state.all_operators}
                uniqueKey="id"
                ref={(component) => { this.operatorRef = component }}
                onSelectedItemsChange={this.onSelectOperator}
                selectedItems={this.state.selected_operators}
                selectText="Select Operators"
                searchInputPlaceholderText="Search Operator..."
                onChangeInput={ (text)=> console.log(text)}
                altFontFamily="ProximaNova-Light"
                tagRemoveIconColor="red"
                tagBorderColor="blue"

                tagTextColor="blue"
                selectedItemTextColor="blue"
                selectedItemIconColor="blue"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: '#CCC' }}
                submitButtonColor="blue"
                submitButtonText="Submit"
                />
                
                </View>

               
                <TextInput style={[styles.Companyname,{height:100}]} value={this.state.order_description} onChangeText={(val)=>this.setState({order_description:val})} multiline={true} placeholderTextColor="#929292" placeholder={this.state.lang.description}/>
                {/* datapicker starts */}
                <TouchableOpacity onPress={() => this.setState({open:true})} style={styles.CreateOrderButton}>
                    <Text style={styles.CreateOrderButtonText}>{this.state.date?this.state.lang.expected_date+' '+this.state.date.toDateString():this.state.lang.expected_date}</Text>
                </TouchableOpacity>


                <DatePicker
                    modal
                    open={this.state.open}
                    date={this.state.date}
                    onConfirm={(date) => {
                    this.setState({open:false})
                    this.setState({date:date})
                    }}
                    onCancel={() => {
                    this.setState({open:false})
                    }}
                    />
                {/* datapicker ends */}
            <TouchableOpacity disabled={this.state.is_loading} onPress={this.createOrder} style={[styles.CreateOrderButton,{flexDirection:'row'}]}>
                {this.state.is_loading?<ActivityIndicator size="small" color="black"/>:null}
                    <Text style={styles.CreateOrderButtonText}>{this.state.lang.create_order}</Text>
            </TouchableOpacity>
                </View>
            </SafeAreaView>
        )}/>
           </View>
        )
    }
}

export default CreateOrder