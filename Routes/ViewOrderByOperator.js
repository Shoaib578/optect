import React, { useEffect, useState } from 'react'
import {View, Text} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { CardStyleInterpolators  ,createStackNavigator} from '@react-navigation/stack'

//styles import
import styles from './styles'
import ViewOrder from '../screens/Operator/Vieworder'
import Details from '../screens/Operator/Vieworder/details'
import AddStatus from '../screens/Operator/Vieworder/add_status'
import ViewStatus from '../screens/Operator/Vieworder/view_status'
//screen imports
import spn from '../spn'
import en from '../en'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Tab = createMaterialTopTabNavigator()
const Stack = createStackNavigator()

const OrderStack = (props)=>(
    <Stack.Navigator screenOptions={{gestureEnabled:true,gestureDirection:'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,}}>
        <Stack.Screen initialParams={{ id: props.route.params.id }} name="status" component={ViewOrder} options={{headerShown:false}}/>
        <Stack.Screen initialParams={{ id: props.route.params.id }} name="add_status" component={AddStatus} options={{headerShown:false}}/>
        <Stack.Screen initialParams={{ id: props.route.params.id }} name="view_status" component={ViewStatus} options={{headerShown:false}}/>

    </Stack.Navigator>
)


const ViewOrderByOperator = (props) => {
   
    const [lang,setLang] = useState(spn)
    console.log("View Order By Operator")
   
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
                        <Text style={styles.UpcomingEventsBarText}>{lang.status}</Text>
                        </View>
                      )
                    }else{
                        return(
                            <View style={styles.TabarWithNoSkyButton}>
                                <Text style={styles.UpcomingEventsBarBlackText}>{lang.status}</Text>
                            </View>
                        )
                    }
                }}) }
                name="orderStatus" initialParams={{ id: props.route.params.id }} component={OrderStack} />
        </Tab.Navigator>

    )
}

export default ViewOrderByOperator