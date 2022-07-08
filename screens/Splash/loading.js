import React from 'react'
import {View,Text,Image,StyleSheet} from 'react-native'


export default class Loading extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Image source={require('../../assets/logo.png')} style={{width:400,height:400}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#18708f'
    }
})