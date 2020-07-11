import React from 'react';
import { View } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';

class visao extends React.Component {
    render() {
        return (
            <View style={{ width: '20%', paddingLeft: 15 }}>
                {/* <AntDesign name="menufold" size={24} color="black" /> */}
                <AntDesign name="menufold" onPress={() => { this.props.navigation.dispatch(DrawerActions.toggleDrawer()); }}
                    size={50} color="black" />
            </View>
        );
    }
}


export default visao;