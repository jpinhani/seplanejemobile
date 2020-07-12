import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    //Listagem de Contas
    container: {
        marginHorizontal: 20,
        marginTop: 5,
        height: '100%'
    },
    itens: {
        // backgroundColor: '#DCDCDC',
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 8,
        marginVertical: 6,
        borderRadius: 10,
    },
    type: {
        fontSize: 14,
        paddingLeft: 6,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
        paddingVertical: 1,
        color: 'blue',
    },
    details: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    inputs: {
        marginVertical: 20,
    },
    button: {
        borderRadius: 15,
        backgroundColor: '#00BFFF',
        marginHorizontal: '10%',
        width: 200,
    },
    detailButton: {
        paddingTop: 10,
        width: '20%',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    detailButtonGrid: {
        width: '100%',
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'space-evenly',

        // paddingHorizontal: 10,
        // backgroundColor: 'red',
    },
    detailButtonText: {
        fontSize: 15,
        // backgroundColor: 'blue',
        // paddingLeft: '45%',
        fontWeight: 'bold',
        // width: '65%'
    },
    novaconta: {
        marginTop: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    searchbar: {
        paddingTop: 10,
        paddingHorizontal: 20,
        width: '100%',
        borderRadius: 15,
    },
    //Insert
    modal1: {
        backgroundColor: 'black',
        shadowColor: "#000",
    },
    modal: {
        backgroundColor: '#ADD8E6',
        height: '100%',
        flexDirection: 'column',
        paddingTop: '25%',
        paddingHorizontal: 15,
        // justifyContent: 'center',
        alignSelf: 'stretch',

    },
    icon: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    contaInput:
    {
        width: '100%',
        backgroundColor: '#fff',
        fontSize: 20,
        marginLeft: 8,
    },
    datainsert: {
        width: '100%',
        // backgroundColor: '#fff',
        // height: 50
    },
    saldo: {
        backgroundColor: '#fff',
        height: 60,
        width: '100%',
        paddingLeft: 15,
        fontSize: 20,
        marginLeft: 8,
    },
    botoesInsert: {
        justifyContent: 'space-between',
        marginVertical: 30,
        flexDirection: 'row',
    },
    bregistrar: {
        backgroundColor: 'blue',
        color: 'blue',
        width: '50%'
    },
    bcancelar: {
        tintColor: 'blue',
        color: 'blue',
        width: '50%'
    },
    containerloading: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        // justifyContent: "space-around",
        padding: 10
    }
});

