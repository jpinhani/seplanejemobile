import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    div: {
        alignItems: 'center',
        height: '100%',
        // width: '100%',
        marginTop: 0,
        paddingTop: Constants.statusBarHeight + 20,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    se: {
        fontSize: 68,
        fontWeight: 'bold',
        color: 'red',
    },
    planeje: {
        // marginTop: 45,
        fontSize: 48,
        color: 'white',
    },
    inputs: {
        width: '100%',
        display: 'flex',
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    inputUser: {
        height: 60,
        marginBottom: 15,
    },
    inputPsw: {
        height: 60,
    },
    buttonLogin: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    bentrar: {
        width: 120,
        backgroundColor: 'blue',
        height: 45,
        textAlignVertical: "center"
    },
    bsenha: {
        color: 'blue',
        fontStyle: "italic",
        textAlignVertical: "center"
    }
})