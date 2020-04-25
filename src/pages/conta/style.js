import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 5,
    },
    itens: {
        // backgroundColor: '#DCDCDC',
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 10,
        borderRadius: 15,
    },
    type: {
        fontSize: 15,
        fontWeight: 'bold',

    },
    value: {
        fontSize: 20,
        paddingVertical: 5,
        color: 'blue',
    },
    inputs: {
        marginVertical: 20,
    },
    button: {
        borderRadius: 15,
        backgroundColor: '#00BFFF',
        marginHorizontal: '20%',
        width: 200,
    },
    detailButton: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    detailButtonGrid: {
        width: 90,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    detailButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    novaconta: {
        marginTop: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: '#000',
    },
    searchbar: {
        width: '80%',
    }
});

