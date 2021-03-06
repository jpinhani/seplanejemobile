import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 5,
        height: '100%'
    },
    novoVisao: {
        marginTop: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        display: 'flex'
    },
    searchbar: {
        paddingTop: 10,
        paddingHorizontal: 20,
        width: '100%',
        borderRadius: 15,
    },
    flatContainer: {
        backgroundColor: 'white',
        padding: 8,
        marginVertical: 6,
        borderRadius: 10,
        flexDirection: 'row'
    },
    flatContainerTopics: {
        fontSize: 14,
        paddingLeft: 10,
        fontWeight: 'bold',
    },
    flatContainerItens: {
        fontSize: 16,
        paddingVertical: 1,
        color: 'blue',
        paddingLeft: 15
    },
    flatRows: {
        flexDirection: 'column',
    },
    flatRows2: {
        flexDirection: 'row',
        alignItems:`center`
    },
    gridButtons: {
        paddingLeft: 20,
        width: '20%',
        justifyContent: 'space-evenly'
    },
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
        alignSelf: 'stretch',
    },
    icon: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    visaoInput:
    {
        width: '100%',
        backgroundColor: '#fff',
        fontSize: 20,
        marginLeft: 8,
    },
    Listvencimento: {
        width: '90%',
        height: 55,
        backgroundColor: '#fff',
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
    datainsert: {
        width: '100%',
    },
})