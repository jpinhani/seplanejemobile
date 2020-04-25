import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Header from './header/index'
import Home from './home';
import Categoria from './categoria';
import Cartao from './cartao';
import Conta from './conta';
import Visao from './visao';

// import Icon from 'react-native-vector-icons/Ionicons';
import { Feather } from '@expo/vector-icons';


const AppDrawer = createDrawerNavigator();

export default function Routes() {

    return (
        <NavigationContainer  >
            <Header />
            <AppDrawer.Navigator
                drawerContentOptions={{
                    activeTintColor: '#fff',
                    activeBackgroundColor: '#81d6f3',
                    // inactiveBackgroundColor: '#fff',
                    itemStyle: {
                        marginVertical: 5,
                        // borderColor: 'white',
                        // borderRadius: 20,
                    },
                    labelStyle: {
                        fontWeight: 'bold',
                        borderBottomWidth: 1,
                        // paddingLeft: '25%',
                        fontSize: 18,
                    },
                }}
                drawerStyle={{
                    // backgroundColor: '#BBD1E6',
                    width: 240,
                }}
            >
                <AppDrawer.Screen name='Home' component={Home}
                    options={{
                        drawerIcon: config =>
                            // <Icon size={23} name='home' />
                            <Feather name="home" size={40} color="blue" />
                    }} />
                <AppDrawer.Screen name='Categoria' component={Categoria}
                    options={{
                        drawerIcon: config =>
                            // <Icon size={23} name='home' />
                            <Feather name="flag" size={40} color="orange" />
                    }} />
                <AppDrawer.Screen name='Cartão' component={Cartao}
                    options={{
                        drawerIcon: config =>
                            // <Icon size={23} name='home' />
                            <Feather name="credit-card" size={40} color="black" />
                    }} />
                <AppDrawer.Screen name='Conta' component={Conta}
                    options={{
                        drawerIcon: config =>
                            // <Icon size={23} name='home' />
                            <Feather name="check-square" size={40} color="orange" />
                    }} />
                <AppDrawer.Screen name='Visao' component={Visao}
                    options={{
                        drawerIcon: config =>
                            // <Icon size={23} name='home' />
                            <Feather name="calendar" size={40} color="black" />
                    }} />
                <AppDrawer.Screen name='Meta Despesa' component={Visao}
                    options={{
                        drawerIcon: config =>
                            // <Icon size={23} name='home' />
                            <Feather name="thumbs-down" size={40} color="red" />
                    }} />
                <AppDrawer.Screen name='Meta Receita' component={Visao}
                    options={{
                        drawerIcon: config =>
                            // <Icon size={23} name='home' />
                            <Feather name="thumbs-up" size={40} color="blue" />
                    }} />
                <AppDrawer.Screen name='Despesa' component={Visao}
                    options={{
                        drawerIcon: config =>
                            // <Icon size={23} name='home' />
                            <Feather name="trending-down" size={40} color="red" />
                    }} />
                <AppDrawer.Screen name='Fatura' component={Visao}
                    options={{
                        drawerIcon: config =>
                            // <Icon size={23} name='home' />
                            <Feather name="credit-card" size={40} color="red" />
                    }} />
                <AppDrawer.Screen name='Receita' component={Visao}
                    options={{
                        drawerIcon: config =>
                            // <Icon size={23} name='home' />
                            <Feather name="trending-up" size={40} color="blue" />
                    }} />
                <AppDrawer.Screen name='Transferencias' component={Visao}
                    options={{
                        drawerIcon: config =>
                            // <Icon size={23} name='home' />
                            <Feather name="repeat" size={40} color="black" />
                    }} />
                <AppDrawer.Screen name='Resumo' component={Visao} options={{
                    drawerIcon: config =>
                        // <Icon size={23} name='home' />
                        <Feather name="activity" size={40} color="blue" />
                }} />

            </AppDrawer.Navigator>

        </NavigationContainer >

    )
}
