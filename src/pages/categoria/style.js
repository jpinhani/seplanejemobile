import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    novoCartao: {
        marginTop: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        display: 'flex'
    },
    container: {
        marginHorizontal: 20,
        marginTop: 5,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    containerfilho: {
        marginHorizontal: 20,
        marginTop: 5,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15
    },
    containerfilhobutton: {
        fontSize: 15,
        height: 50
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
    Topico: {
        fontWeight: 'bold',
        fontSize: 16,
        paddingTop: 15
    },
    Item: {
        fontSize: 20,
        paddingLeft: 8
    },
    buttonsOptions: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})