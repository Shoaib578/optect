import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FFFFFF',
        flex:1,
        paddingRight:'5%',
        paddingLeft:'5%',
        paddingTop:'5%'
    },

    OrderCard:{
        width:'100%',
        backgroundColor:'#5FA7C0',
        flexDirection:'column',
        justifyContent:'space-between',
        paddingLeft:'5%',
        paddingRight:'5%',
        paddingTop:10,
        paddingBottom:10,
        marginTop:10,
        borderRadius:10
    },

    OrderTitle:{
        fontSize:17,
        color:'#5FA7C0',
        marginBottom:'1%'
    },

    icons:{
        flexDirection:'row',
        width:'20%',
        justifyContent:'space-between',
        paddingTop:'2%'
    },

    OrderDescription:{
        color:'#FFFFFF',
        fontSize:16,
    },

    OrderTitleText:{
        fontSize:18,
        color:'#FFFFFF',
        marginBottom:'1%'
    },

    OrderFromText:{
        fontSize:18,
        color:'#FFFFFF',
        marginBottom:'1%'
    },

    OrderTitleFull:{
        flexDirection:'row',
        alignItems:'center',
        paddingBottom:5
    },

    OrderTitleTag:{
        backgroundColor:'white',
        padding:5,
        marginLeft:5
    },

    Bottom:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:5
    },

    assignButton:{
        backgroundColor:'white',
        width:'30%',
        justifyContent:'center',
        alignItems:'center',
    },

    assignButtonText:{
        color:'#5FA7C0',
        fontSize:16
    },
    EmailInput:{
        backgroundColor:'#F2F2F7',
        width:'100%',
        height:48,
        fontSize:17,
        color:'#929292',
        paddingLeft:10
        
    },
})

export default styles