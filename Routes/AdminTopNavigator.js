import React, { useEffect, useState } from 'react'
import {View, Text} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
//styles import
import styles from './styles'
import  {createStackNavigator}  from '@react-navigation/stack'
//screen imports
import AddOperator from '../screens/Admin/AddOperator'
import AllOperators from '../screens/Admin/AllOperators'
import AddSupervisor from '../screens/Admin/AddSupervisor'
import AllSupervisors from '../screens/Admin/AllSupervisors'
import EditSuperVisor from '../screens/Admin/AllSupervisors/EditSuperVisor'
import EditOperator from '../screens/Admin/AllOperators/EditOperator'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SupervisorTopNavigator from './SupervisorTopNavigator'
import en from '../en'
import spn from '../spn'
import AllOrders from '../screens/Supervisor/AllOrders'
import AdminAllOrders from '../screens/Admin/AllOrders'

const Tab = createMaterialTopTabNavigator()
const Stack = createStackNavigator()

const logout = (navigation)=>{
    AsyncStorage.removeItem("user")
    navigation.reset({
        index: 0,
        routes: [{ name: 'Login'}]
    });
}



const SupervisorStack = ()=>(
<Stack.Navigator >
    <Stack.Screen name="Home" component={AllSupervisors} options={{headerShown:false}}/>
    <Stack.Screen name="EditSuperVisor" component={EditSuperVisor} options={{headerShown:false}}/>

</Stack.Navigator>
)

const OperatorStack = ()=>(
    <Stack.Navigator >
    <Stack.Screen name="Home" component={AllOperators} options={{headerShown:false}}/>
    <Stack.Screen name="EditOperator" component={EditOperator} options={{headerShown:false}}/>

</Stack.Navigator>
)
const Supervisor = (navigation) => {
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
        <Tab.Navigator>
            <Tab.Screen 
            options={ ({route}) => ({
                tabBarLabel:({focused}) => {
                    if (focused) {
                      return(
                        <View>
                        <Text style={styles.skyText}>{lang.all_supervisors}</Text>
                        </View>
                      )
                    }else{
                        return(
                            <View>
                                <Text style={styles.UpcomingEventsBarBlackText}>{lang.all_supervisors}</Text>
                            </View>
                        )
                    }
                }}) }
             name="AllSupervisors" 
             component={SupervisorStack} />
            <Tab.Screen 
            options={ ({route}) => ({
                tabBarLabel:({focused}) => {
                    if (focused) {
                      return(
                        <View>
                        <Text style={styles.skyText}>{lang.add_supervisor}</Text>
                        </View>
                      )
                    }else{
                        return(
                            <View>
                                <Text style={styles.UpcomingEventsBarBlackText}>{lang.add_supervisor}</Text>
                            </View>
                        )
                    }
                }}) }
            name="AddSupervisor" 
            component={AddSupervisor} />
        </Tab.Navigator>
    )
}

const Operator = (navigation) => {
    const [lang,setLang] = useState(spn)
   
  

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
        <Tab.Navigator  options={{
            
            indicatorStyle: {
              width: 0, height: 0, elevation: 0,      
          }
          }}>
            <Tab.Screen
            options={ ({route}) => ({
                tabBarLabel:({focused}) => {
                    if (focused) {
                      return(
                        <View>
                        <Text style={styles.skyText}>{lang.all_operators}</Text>
                        </View>
                      )
                    }else{
                        return(
                            <View>
                                <Text style={styles.UpcomingEventsBarBlackText}>{lang.all_operators}</Text>
                            </View>
                        )
                    }
                }}) }
             name="AllOperators"
             component={OperatorStack} />
            <Tab.Screen 
            options={ ({route}) => ({
                tabBarLabel:({focused}) => {
                    if (focused) {
                      return(
                        <View>
                        <Text style={styles.skyText}>{lang.add_operator}</Text>
                        </View>
                      )
                    }else{
                        return(
                            <View>
                                <Text style={styles.UpcomingEventsBarBlackText}>{lang.add_operator}</Text>
                            </View>
                        )
                    }
                }}) }
            name="AddOperator" 
            component={AddOperator} />
        </Tab.Navigator>
    )
}


const AdminTopNavigator = (navigation) => {
    console.log("ADmin Tops")
    console.log(navigation.route.params.async_lang)
    const [lang,setLang] = useState(spn)
   
  

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
        <Tab.Navigator >
            <Tab.Screen 
             options={ ({route}) => ({
                tabBarLabel:({focused}) => {
                    if (focused) {
                      return(
                        <View style={styles.SkyTabBar}>
                        <Text style={styles.UpcomingEventsBarText}>{lang.supervisor}</Text>
                        </View>
                      )
                    }else{
                        return(
                            <View style={styles.TabarWithNoSkyButton}>
                                <Text style={styles.UpcomingEventsBarBlackText}>{lang.supervisor}</Text>
                            </View>
                        )
                    }
                }}) }
             name="Supervisor" 
             initialParams={{async_lang:navigation.route.params.async_lang}}
             component={Supervisor} />

            <Tab.Screen 
            options={ ({route}) => ({
                tabBarLabel:({focused}) => {
                    if (focused) {
                      return(
                        <View style={styles.SkyTabBar}>
                        <Text style={styles.UpcomingEventsBarText}>{lang.operators}</Text>
                        </View>
                      )
                    }else{
                        return(
                            <View style={styles.TabarWithNoSkyButton}>
                                <Text style={styles.UpcomingEventsBarBlackText}>{lang.operators}</Text>
                            </View>
                        )
                    }
                }}) }
            name="Operator" 
            initialParams={{async_lang:navigation.route.params.async_lang}}

            component={Operator} />


            <Tab.Screen 
            options={ ({route}) => ({
                tabBarLabel:({focused}) => {
                    if (focused) {
                      return(
                        <View style={styles.SkyTabBar}>
                        <Text style={styles.UpcomingEventsBarText}>{lang.orders}</Text>
                        </View>
                      )
                    }else{
                        return(
                            <View style={styles.TabarWithNoSkyButton}>
                                <Text style={styles.UpcomingEventsBarBlackText}>{lang.orders}</Text>
                            </View>
                        )
                    }
                }}) }
            name="orders" 
           

            component={AdminAllOrders} />

        </Tab.Navigator>
    )
}

export default AdminTopNavigator