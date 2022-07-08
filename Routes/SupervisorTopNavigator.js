import React, { useEffect, useState } from 'react'
import {View, Text} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
//styles import
import styles from './styles'
//screen imports
import AllOrders from '../screens/Supervisor/AllOrders'
import CreateOrder from '../screens/Supervisor/Createorder'
import AsyncStorage from '@react-native-async-storage/async-storage'
import en from '../en'
import spn from '../spn'

const Tab = createMaterialTopTabNavigator()






const SupervisorTopNavigator = (navigation) => {
    const [lang,setLang] = useState(spn)
    console.log("Navigation")
    console.log(navigation)

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
            <Tab.Screen   options={ ({route}) => ({
                tabBarLabel:({focused}) => {
                    if (focused) {
                      return(
                        <View style={[styles.SkyTabBar,{width:'100%'}]}>
                        <Text style={[styles.UpcomingEventsBarText,{fontSize:13}]}>{lang.all_orders}</Text>
                        </View>
                      )
                    }else{
                        return(
                            <View style={styles.TabarWithNoSkyButton}>
                                <Text style={[styles.UpcomingEventsBarBlackText,{width:'100%',fontSize:13}]}>{lang.all_orders}</Text>
                            </View>
                        )
                    }
                }}) }
             name="AllOrders" component={AllOrders} />
            <Tab.Screen 
            options={ ({route}) => ({
                tabBarLabel:({focused}) => {
                    if (focused) {
                      return(
                        <View style={styles.SkyTabBar}>
                        <Text style={styles.UpcomingEventsBarText}>{lang.create_order}</Text>
                        </View>
                      )
                    }else{
                        return(
                            <View style={styles.TabarWithNoSkyButton}>
                                <Text style={styles.UpcomingEventsBarBlackText}>{lang.create_order}</Text>
                            </View>
                        )
                    }
                }}) }
                name="CreateOrder" component={CreateOrder} />
        </Tab.Navigator>

    )
}

export default SupervisorTopNavigator