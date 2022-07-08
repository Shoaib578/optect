import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FFFFFF',
        flex:1,
        paddingRight:'5%',
        paddingLeft:'5%',
        paddingTop:'5%'
    },

    supervisorCard:{
        width:'100%',
        height:60,
        backgroundColor:'#5FA7C0',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingLeft:'5%',
        paddingRight:'5%',
        borderRadius:10,

    },

    supervisorName:{
        fontSize:20,
        fontWeight:'bold',
        color:'white'
    },

    icons:{
        flexDirection:'row',
        width:'20%',
        justifyContent:'space-between'
    },
    LoginInfo:{
        marginTop:'8%',
        marginBottom:'12%'
    },

    LoginText:{
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

    NameInput:{
        backgroundColor:'#F2F2F7',
        width:'100%',
        height:48,
        fontSize:17,
        borderRadius:6,
        color:'#929292',
        paddingLeft:10
    },

    EmailInput:{
        backgroundColor:'#F2F2F7',
        width:'100%',
        height:48,
        fontSize:17,
        borderRadius:6,
        color:'#929292',
        paddingLeft:10,
        marginTop:'3%',
        
    },

    PasswordInput:{
        backgroundColor:'#F2F2F7',
        width:'100%',
        height:48,
        fontSize:17,
        borderRadius:6,
        marginTop:'3%',
        color:'#929292',
        flexDirection:'row-reverse',
        justifyContent:'space-between'
    },

    InputField:{
        flex:1,
        fontSize:17,
        color:'#929292',
        paddingLeft:10
    },

    LoginButton:{
        flexDirection:'row',
        width:'100%',
        paddingTop:10,
        paddingBottom:10,
        borderRadius:15,
        backgroundColor:'#5FA7C0',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'5%'
    },

    LoginButtonText:{
        color:'#fff',
        fontSize:20
    },
})

export default styles