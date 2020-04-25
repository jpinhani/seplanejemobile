import React from 'react';
import { View } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';

class visao extends React.Component {
    render() {
        return (
            <View style={{ width: '20%', paddingLeft: 15 }}>
                <Feather onPress={() => { this.props.navigation.dispatch(DrawerActions.toggleDrawer()); }}
                    name="more-horizontal" size={50} color="black" />
            </View>
        );
    }
}


export default visao;