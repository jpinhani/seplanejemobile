import React from 'react';
import { Text, View } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';




class home extends React.Component {
    render() {
        return (
            <>
                {/* <Header /> */}
                <View style={{ width: '20%', paddingLeft: 15 }}>

                    <AntDesign name="menufold" onPress={() => { this.props.navigation.dispatch(DrawerActions.toggleDrawer()); }}
                        size={50} color="black" />

                    <Text>Home</Text>
                </View>
            </>
        );
    }
}


export default home;