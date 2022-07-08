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
        width:'83%',
        backgroundColor:'#5FA7C0',
        flexDirection:'row',
        marginTop:20,
        paddingLeft:'5%',
        paddingRight:'5%',
        paddingTop:10,
        paddingBottom:10,
        borderRadius:10,
        alignSelf:'center'
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
        marginBottom:'1%',
        marginLeft:20
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
    dropdown: {
        marginTop:'6%',
        height: 50,
        borderBottomColor: '#5FA7C0',
        borderBottomWidth: 1,
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

      WorkPartToBeAssignedField:{
        width:'100%',
        height:48,
        fontSize:17,
        color:'#929292',
        paddingLeft:10,
        marginTop:'6%',
        borderColor:'#5FA7C0',
        borderWidth:1
        
    },

    AssignButton:{
      width:'100%',
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#5FA7C0',
      justifyContent:'center',
      alignItems:'center',
      marginTop:'8%'
  },

  AssignButtonText:{
      color:'#fff',
      fontSize:20
  },
  EmailInput:{
    backgroundColor:'#F2F2F7',
    width:'100%',
    height:48,
    fontSize:17,
    color:'#929292',
    paddingLeft:10
    
},
supervisorCard:{
    width:'90%',
    height:60,
    backgroundColor:'#5FA7C0',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingLeft:'5%',
    paddingRight:'5%',
    alignSelf:'center',
    borderRadius:10,

},

supervisorName:{
    fontSize:20,
    fontWeight:'bold',
    color:'white'
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
    marginTop:'5%',
    borderRadius:10
},

LoginButtonText:{
    color:'#fff',
    fontSize:20
},

})

export default styles