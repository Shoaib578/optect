import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingBottom:'100%',
        backgroundColor:'#FFFFFF',
        paddingRight:'5%',
        paddingLeft:'5%',
        paddingTop:'5%',
    },

    BackArrow:{
        width:8.49,
        height:14
    },

    BackText:{
        color:'#5FA7C0',
        fontSize:16,
        marginLeft:5
    },

    Back:{
        flexDirection:'row',
        alignItems:'center',
        width:'15%'
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

    EmailInput:{
        backgroundColor:'#F2F2F7',
        width:'100%',
        height:48,
        fontSize:17,
        color:'#929292',
        paddingLeft:10
        
    },

    PasswordInput:{
        backgroundColor:'#F2F2F7',
        width:'100%',
        height:48,
        fontSize:17,
        marginTop:'3%',
        color:'#929292',
        flexDirection:'row-reverse',
        justifyContent:'space-between'
    },

    imageStyle: {
        padding: 0,
        height: 24,
        width: 24,
        resizeMode: 'stretch',
        alignItems: 'center',
    },

    InputField:{
        flex:1,
        fontSize:17,
        color:'#929292',
        paddingLeft:10
    },

    LoginButton:{
        flexDirection:'row',
        width:'85%',
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#5FA7C0',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        marginTop:'10%',
        borderRadius:10
    },

    LoginButtonText:{
        color:'#fff',
        fontSize:20
    },

    EyeButton:{
        margin:12,
        marginRight:20,
    },
})

export default styles;