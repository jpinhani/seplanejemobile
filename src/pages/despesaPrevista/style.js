import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    container:{
        marginHorizontal: 20,
        marginTop: 5,
        height: '100%'
    },
    flatlistcontainer:{
        backgroundColor: 'white',
        borderBottomWidth: 5,
        borderColor: '#fff',
        marginBottom: 20,
        paddingTop: 15,
        borderRadius: 15
    },
    containerdescription:{
        flexDirection:'row',
        alignItems:'center',
        paddingLeft: 8
    },
    flatlistdescription:{
        flexDirection:"column",
        width:"100%"
    },
    type:{
        fontSize: 14,
        paddingTop: 3,
        fontWeight: "bold",
        paddingLeft: 3
    },
    detail:{
        fontSize: 16,
        color: 'blue',
        paddingLeft: 10,
        paddingBottom: 10,
        paddingTop: 5
    },
    datandvalue:{
        flexDirection: 'row-reverse',
    },
    datandvaluedetail:{
        width: '50%'
    },
    flatlistitens:{
        width: "80%",
        // backgroundColor:'orange'
    },
    flatlistitenscontainer:{
        flexDirection:"row"
    },
    flatlisticons:{
        // backgroundColor: 'yellow',
        width:'20%',
        alignItems:'center',
        justifyContent:'space-around'
    },
    iconelist:{
        // paddingTop: 20
    },
    novoDespesa: {
        marginTop: 10,
        // paddingHorizontal: 5,
        flexDirection: 'row',
        display: 'flex'
    },
    searchbar:{
        marginTop: 10,
        marginBottom: 15
    }
})