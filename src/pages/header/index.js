import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

import { DrawerActions } from '@react-navigation/native';



// const teste = DrawerActions;


class headerSePlaneje extends React.Component {
    render() {
        return (
            <LinearGradient
                colors={['#81d6f3', '#B6BAC5']}
                style={[{ flex: 0 }, styles.div]}
            >
                {/* <View style={{ width: '20%', paddingLeft: 15 }}>
                    <Feather
                        onPress={() => {
                            this.props.navigation.dispatch(DrawerActions.toggleDrawer())
                        }} name="more-horizontal" size={50} color="black" />
                </View> */}
                <View /* style={{ width: '80%', paddingLeft: 15 }} */
                >
                    <Text style={styles.se}>Se<Text style={styles.planeje}>Planeje</Text></Text>
                </View>
            </LinearGradient >
        );
    }
}

const styles = StyleSheet.create({
    div: {
        alignItems: 'center',
        marginTop: 0,
        paddingTop: 45,
        flexDirection: 'row',
        justifyContent: 'center',
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



export default headerSePlaneje;