import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingBottom:'100%',
        backgroundColor:'#FFFFFF',
        paddingRight:'5%',
        paddingLeft:'5%',
        paddingTop:'5%'
    },

    OrderInfo:{
        marginTop:'8%',
        marginBottom:'12%'
    },

    CreateOrderText:{
        color:'#333333', 
        fontSize:28
    },

    EnterEmailText:{
        fontSize:16,
        marginTop:'3%',
        color:'gray'
    },

    EnteringData:{
        width:'100%',

    },

    OrderTitle:{
        backgroundColor:'#F2F2F7',
        width:'100%',
        height:48,
        fontSize:17,
        color:'#929292',
        paddingLeft:10
    },

    Companyname:{
        backgroundColor:'#F2F2F7',
        width:'100%',
        height:48,
        fontSize:17,
        color:'#929292',
        paddingLeft:10,
        marginTop:'3%',
        borderRadius:10
        
    },

    InputField:{
        flex:1,
        fontSize:17,
        color:'#929292',
        paddingLeft:10,
        borderRadius:10

    },

    CreateOrderButton:{
        width:'100%',
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#5FA7C0',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'5%',
        borderRadius:10
    },

    LoginButtonText:{
        color:'#fff',
        fontSize:20
    },

    CreateOrderButtonText:{
        color:'white',
        fontSize:16
    }
})

export default styles;