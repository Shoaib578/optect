import React, { useEffect, useState } from 'react'
import {View, Text} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { CardStyleInterpolators  ,createStackNavigator} from '@react-navigation/stack'

//styles import
import styles from './styles'
import ViewOrder from '../screens/Supervisor/Vieworder'
import Details from '../screens/Supervisor/Vieworder/details'
import ViewOperator from '../screens/Supervisor/ViewOperator'
import Statuses from '../screens/Supervisor/ViewOperator/statuses'
import ViewStatus from '../screens/Supervisor/ViewOperator'
import spn from '../spn'
import en from '../en'
import AsyncStorage from '@react-native-async-storage/async-storage'
//screen imports


const Tab = createMaterialTopTabNavigator()
const Stack = createStackNavigator()

const OrderStack = (props)=>(
    <Stack.Navigator screenOptions={{gestureEnabled:true,gestureDirection:'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,}}>
        <Stack.Screen initialParams={{ id: props.route.params.id }} name="operators" component={ViewOrder} options={{headerShown:false}}/>
        <Stack.Screen name="viewoperator" component={ViewOperator} options={{headerShown:false}}/>
        <Stack.Screen name="statuses" component={Statuses} options={{headerShown:false}}/>
        <Stack.Screen initialParams={{ id: props.route.params.id }} name="view_status" component={ViewStatus} options={{headerShown:false}}/>

    </Stack.Navigator>
)


const ViewOrderBySuperVisorTopNavigator = (props) => {
    const [lang,setLang] = useState(spn)
   
    console.log("SupervisorTopNavigator")
    console.log(props.route.params.async_lang)
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
        <Tab.Navigator initialRouteName='OrderDetails'>
            <Tab.Screen  options={ ({route}) => ({
                tabBarLabel:({focused}) => {
                    if (focused) {
                      return(
                        <View style={styles.SkyTabBar}>
                        <Text style={styles.UpcomingEventsBarText}>{lang.details}</Text>
                        </View>
                      )
                    }else{
                        return(
                            <View style={styles.TabarWithNoSkyButton}>
                                <Text style={styles.UpcomingEventsBarBlackText}>{lang.details}</Text>
                            </View>
                        )
                    }
                }}) }
             name="OrderDetails" initialParams={{ id: props.route.params.id }} component={Details} />
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
                name="OrderOperators" initialParams={{ id: props.route.params.id }} component={OrderStack} />
        </Tab.Navigator>

    )
}

export default ViewOrderBySuperVisorTopNavigator