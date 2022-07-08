import React, { useEffect, useState } from 'react'
import { NavigationContainer,useNavigation } from '@react-navigation/native'
import { CardStyleInterpolators  ,createStackNavigator} from '@react-navigation/stack'
//screens
import Login from '../screens/Login/index'
import AssignedOrdersToOperator from '../screens/Operator/AssignedOrdersToOperator'
//Navigators
import AdminTopNavigator from './AdminTopNavigator'
import SupervisorTopNavigator from './SupervisorTopNavigator'
import ViewOrder from '../screens/Supervisor/Vieworder'
import Splash from '../screens/Splash'
import ViewOrderBySuperVisorTopNavigator from './ViewOrderBySuperVisorTopNavigator'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ViewOrderByOperator from './ViewOrderByOperator'
import {View,Text,StyleSheet,Alert, BackHandler} from 'react-native'
import en from '../en'
import spn from '../spn'

import {Dropdown} from 'react-native-element-dropdown';

const Stack = createStackNavigator()

const languages = [
    {label: 'English',value:"english"},
    {label: 'Spanish',value:"spanish"},

]

function logout (navigation){

    console.log(navigation)
 
    AsyncStorage.removeItem("user")
    navigation.reset({
        index: 0,
        routes: [{ name: 'Login'}]
    });
}




const headerRight =(navigation)=>{
    const [lang,setLang] = useState({label: "English", value: "english"})
    
     
    useEffect(()=>{
     

        async function check_lang(){
            const lang = await AsyncStorage.getItem("lang")
            console.log(lang)

            if(lang != null){
                if(lang == "spanish"){
                    setLang({label: "Spanish", value: "spanish"})
    
                }else{
                    setLang({label: "English", value: "english"})
        
                }
            }
        }
        
        check_lang()
        
    },[])
    
    return <View style={{flexDirection:'row'}}>
         


        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={languages}
        
        maxHeight={300}
        labelField="label"
        valueField="value"
        
        searchPlaceholder="Search..."
        value={lang.value}
        onChange={(item) => {
            Alert.alert(
                "Are your sure?",
                "Are you sure you want to change language.The App will be closing",
                [
                  // The "Yes" button
                  {
                    text: "Yes",
                    onPress: async() => {
                        await AsyncStorage.setItem("lang", item.value)
                        BackHandler.exitApp()

                    },
                  },
                  // The "No" button
                  // Does nothing but dismiss the dialog when tapped
                  {
                    text: "No",
                  },
                ]
            )

            
        }}
      />
<TouchableOpacity onPress={()=>logout(navigation)} style={{marginRight:20,marginTop:20}}>
        <AntDesign name="logout" color="red" size={20}/>

       
        </TouchableOpacity>
    


    </View>
}



const OperatorsStack = (props)=>{
    const [lang,setLang] = useState(spn)
    console.log("This is async lang")
   console.log(props.async_lang)
   const use_navigation = useNavigation();

    useEffect(()=>{
        async function check_lang(){
            const lang = await AsyncStorage.getItem("lang")
            console.log(lang)

            if(lang != null){
                if(lang == "spanish"){
                    setLang(spn)

    
                }else{
                    setLang(en)

        
                }
            }
        }
        
        check_lang()
    },[])
return <Stack.Navigator screenOptions={{headerRight:()=>headerRight(use_navigation), headerTitleStyle:{color:'#5FA7C0'}, headerTintColor:'#5FA7C0',headerTitle:lang.operator}}>
    <Stack.Screen name="operator" component={AssignedOrdersToOperator}/>
</Stack.Navigator>
}

const SuperVisorStack = (props)=>{
    const [lang,setLang] = useState(spn)
    console.log("This is async lang")
   console.log(props.async_lang)
   const use_navigation = useNavigation();

    useEffect(()=>{
        async function check_lang(){
            const lang = await AsyncStorage.getItem("lang")
            console.log(lang)

            if(lang != null){
                if(lang == "spanish"){
                    setLang(spn)

    
                }else{
                    setLang(en)

        
                }
            }
        }
        
        check_lang()
    },[])
    return <Stack.Navigator screenOptions={{headerRight:()=>headerRight(use_navigation), headerTitleStyle:{color:'#5FA7C0'},headerTitleAlign:"left", headerTintColor:'#5FA7C0',headerTitle:lang.supervisor}}>
        <Stack.Screen name="superVisor" initialParams={{async_lang:props.async_lang}} component={SupervisorTopNavigator}/>
    </Stack.Navigator>
    }

const AdminStack =(props)=>{
    const [lang,setLang] = useState(spn)
const use_navigation = useNavigation();
   
   console.log("Admin Stack")
    console.log(props)
    useEffect(()=>{
        async function check_lang(){
            const lang = await AsyncStorage.getItem("lang")
            console.log(lang)

            if(lang != null){
                if(lang == "spanish"){
                    setLang(spn)

    
                }else{
                    setLang(en)

        
                }
            }
        }
        
        check_lang()
    },[])
    return <Stack.Navigator screenOptions={{headerRight:()=>headerRight(use_navigation), headerTitleStyle:{color:'#5FA7C0'}, headerTintColor:'#5FA7C0',headerTitle:lang.admin}}>
    <Stack.Screen initialParams={{ async_lang:props.async_lang }} name="admin" component={AdminTopNavigator}/>
</Stack.Navigator>
}



const Routes = (props) => {
    console.log("asdad2")
    console.log(props.async_lang)
    const [lang,setLang] = useState(en)
    
    useEffect(()=>{
        async function check_lang(){
            const lang = await AsyncStorage.getItem("lang")
            console.log(lang)

            if(lang != null){
                if(lang == "spanish"){
                    setLang(spn)

    
                }else{
                    setLang(en)

        
                }
            }
        }
        
        check_lang()
    },[])
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{gestureEnabled:true,gestureDirection:'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,}}>
            <Stack.Screen options={{headerShown:false}} name="Splash" component={Splash} />

                <Stack.Screen options={{headerShown:false}} name="Login" component={Login} />

                <Stack.Screen options={{  
                headerTitleStyle:{color:'#5FA7C0'}, 
                headerShadowVisible:false, 
                headerShown:false,
                headerTintColor:'white',}} initialParams={{async_lang:props.async_lang}}  name="AdminHome" component={()=>AdminStack(props)} />

                <Stack.Screen options={{headerTitle:"Supervisor",  
                headerTitleStyle:{color:'#5FA7C0'}, 
                headerShadowVisible:false, 
                headerShown:false,
                headerTitleAlign:"left",
                headerTintColor:'white'}} 
                name="SupervisorHome" initialParams={{async_lang:props.async_lang}}  component={()=>SuperVisorStack(props)} />


                <Stack.Screen options={{headerTitle:lang.order,
                headerTitleStyle:{color:'#5FA7C0'}, 
                headerShadowVisible:false, 
                headerTitleAlign:"left",

                headerShown:true
               }} 
                name="VieworderBySupervisor"  initialParams={{async_lang:props.async_lang}} component={ViewOrderBySuperVisorTopNavigator} />

                <Stack.Screen options={{headerTitle:lang.order, 
                headerTitleStyle:{color:'#5FA7C0'}, 
                headerShadowVisible:false, 
                headerTitleAlign:"left",

                headerShown:true
               }} 
                name="ViewOrderByOperator" initialParams={{async_lang:props.async_lang}}  component={ViewOrderByOperator} />

              

                <Stack.Screen options={{ headerShown:false}} 
                 name="AssignedOrdersToOperator" initialParams={{async_lang:props.async_lang}}  component={()=>OperatorsStack(props)} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({  

    dropdown: {
       
        height: 50,
        borderBottomColor: '#5FA7C0',
        borderBottomWidth: 1,
        marginRight:30,
        width:150
      },
      icon: {
        marginRight: 5,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
        color:'#5FA7C0'
      },
      iconStyle: {
        width: 20,
        height: 20,
        tintColor:'#5FA7C0'
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
})
export default Routes