import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import {View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';

import Header from './header/index'
import Home from './home';
import Categoria from './categoria';
import Cartao from './cartao';
import Conta from './conta';
import Visao from './visao';
import Loading from './loading';
// import loading from './loading';
import DespesaMeta from './despesaPrevista';

const AppDrawer = createDrawerNavigator();
const Stack = createStackNavigator();

async function login(userId, token) {
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("user", userId);
}


function drawerMain() {

    return (
        <>
            <Header />
            <AppDrawer.Navigator
                edgeWidth={250}
                // initialRouteName='Categoria'
                drawerType='slide'
                drawerContentOptions={{
                    activeTintColor: '#fff',
                    activeBackgroundColor: '#4682B4',
                    inactiveBackgroundColor: '#87CEEB',
                    marginTop: -30,
                    heigth: '100%',

                    itemStyle: {
                        marginVertical: 2,
                        borderRadius: 10,
                        borderColor: 'white',
                        borderStyle: 'solid',
                        borderWidth: 2,


                    },
                    labelStyle: {
                        fontWeight: 'bold',
                        fontSize: 15,
                    },
                }}
                drawerStyle={{
                    backgroundColor: '#D3D3D3',
                    width: '80%',
                }}
            >

                <AppDrawer.Screen name='Home' component={Home}
                    options={{
                        drawerIcon: config =>
                            // <Icon size={23} name='home' />
                            <Feather name="home" size={25} color="black" />
                    }} />

                <AppDrawer.Screen name='Categoria' component={Categoria}
                    options={{
                        drawerIcon: config =>
                            // <Icon size={23} name='home' />
                            <Feather name="flag" size={25} color="black" />
                    }} />

                <AppDrawer.Screen name='Cartão' component={Cartao}
                    options={{
                        drawerIcon: config =>
                            // <Icon size={23} name='home' />
                            <Feather name="credit-card" size={25} color="black" />
                    }} />

                <AppDrawer.Screen name='Conta' component={Conta}
                    options={{
                        drawerIcon: config =>
                            // <Icon size={23} name='home' />
                            <Feather name="check-square" size={25} color="black" />
                    }} />

                <AppDrawer.Screen name='Visao' component={Visao}
                    options={{
                        drawerIcon: config =>
                            // <Icon size={23} name='home' />
                            <Feather name="calendar" size={25} color="black" />
                    }} />

                <AppDrawer.Screen name='Meta Despesa' component={DespesaMeta}
                    options={{
                        drawerIcon: config =>
                            // <Icon size={23} name='home' />
                            <Feather name="thumbs-down" size={25} color="red" />
                    }} />

                <AppDrawer.Screen name='Meta Receita' component={Visao}
                    options={{
                        drawerIcon: config =>
                            // <Icon size={23} name='home' />
                            <Feather name="thumbs-up" size={25} color="blue" />
                    }} />

                <AppDrawer.Screen name='Despesa' component={Visao}
                    options={{
                        drawerIcon: config =>
                            // <Icon size={23} name='home' />
                            <Feather name="trending-down" size={25} color="red" />
                    }} />

                <AppDrawer.Screen name='Fatura' component={Visao}
                    options={{
                        drawerIcon: config =>
                            // <Icon size={23} name='home' />
                            <Feather name="credit-card" size={25} color="red" />
                    }} />

                <AppDrawer.Screen name='Receita' component={Visao}
                    options={{
                        drawerIcon: config =>
                            // <Icon size={23} name='home' />
                            <Feather name="trending-up" size={25} color="blue" />
                    }} />

                <AppDrawer.Screen name='Transferencias' component={Visao}
                    options={{
                        drawerIcon: config =>
                            // <Icon size={23} name='home' />
                            <Feather name="repeat" size={25} color="black" />
                    }} />

                <AppDrawer.Screen name='Resumo' component={Visao} options={{
                    drawerIcon: config =>
                        // <Icon size={23} name='home' />
                        <Feather name="activity" size={25} color="blue" />
                }} />

            </AppDrawer.Navigator>
        </>
    )
}


export default (props) => {

    const isloged = useSelector(state => state.isloged)
    const dispatch = useDispatch();

    const isloading = useCallback(async () => {
        const verify = await AsyncStorage.getItem('token').then(response => response)

        dispatch({
            type: 'ISLOGED',
            payload: verify === null ? false : true

        })

    }, [dispatch])



    useEffect(() => {
        isloading();
    }, [isloading])

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* <Stack.Screen name='loading' component={Loading} options={{ headerShown: false }} /> */}
                {(isloged) ? (
                    <Stack.Screen name='drawerMain' component={drawerMain} options={{ headerShown: false }} />
                ) :
                    (
                        <Stack.Screen name='loading' component={Loading} options={{ headerShown: false }} />
                    )}
            </Stack.Navigator>
        </NavigationContainer>
    )

}
