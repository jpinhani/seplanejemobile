import React from 'react';
import { Text, StyleSheet, View, AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants'
import { useDispatch } from 'react-redux';


export default () => {

    const dispatch = useDispatch()

    async function logout() {
        await AsyncStorage.removeItem("token")
        await AsyncStorage.removeItem("user");

        dispatch({
            type: 'ISLOGED',
            payload: false
        })

    }

    return (
        <LinearGradient
            colors={['#81d6f3', '#B6BAC5']}
            style={[{ flex: 0 }, styles.div]}
        >
            <View style={styles.container} >
                <Text style={styles.se}>Se<Text style={styles.planeje}>Planeje</Text></Text>
                <View style={{ paddingTop: 15 }}>
                    <AntDesign sytle={styles.logout} name="poweroff" size={38} color="red" onPress={() => logout()} />
                </View>
            </View>
        </LinearGradient >
    )
}

const styles = StyleSheet.create({
    div: {
        alignItems: 'center',
        marginTop: 0,
        paddingTop: Constants.statusBarHeight + 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    container: {
        width: '100%',
        paddingHorizontal: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    se: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'red',
    },
    planeje: {
        // marginTop: 45,
        fontSize: 28,
        color: 'white',
    }
});

