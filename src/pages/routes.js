import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';

import Header from './header/index'
import Home from './home';
import Categoria from './categoria';
import Cartao from './cartao';
import Conta from './conta';
import Visao from './visao';
import { StyleSheet } from 'react-native';

const AppDrawer = createDrawerNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Header />

            <AppDrawer.Navigator
                drawerContentOptions={{
                    activeTintColor: '#fff',
                    activeBackgroundColor: '#81d6f3',
                    inactiveBackgroundColor: '#b6bec5',
                    itemStyle: {
                        marginVertical: 2, borderWidth: 1, /* backgroundColor: '#81d6f3', */ borderColor: 'white'
                    },
                    labelStyle: {
                        fontWeight: 'bold',
                        paddingLeft: '25%',
                    }
                }}
                drawerStyle={{
                    backgroundColor: '#dde2eb',
                    width: 240,
                }}
            >

                <AppDrawer.Screen name='Home' component={Home} />
                <AppDrawer.Screen name='Categoria' component={Categoria} />
                <AppDrawer.Screen name='Cartão' component={Cartao} />
                <AppDrawer.Screen name='Conta' component={Conta} />
                <AppDrawer.Screen name='Visao' component={Visao} />
            </AppDrawer.Navigator>

        </NavigationContainer >

    )
}

const styles = StyleSheet.create({
    div: {
        alignItems: 'center',
        marginTop: 0,
        paddingTop: 25,
    },
    menu: {
        backgroundColor: '#98FB98',
        fontWeight: 'bold',
        color: 'red',
    },
})