import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { TextInput, Button } from 'react-native-paper';
import { View, Text, AsyncStorage, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import api from './../../services/api';

import styles from './styles.js'
import { useDispatch } from 'react-redux';
import LoadingData from './../../components/loadingData'


export default () => {

    const [user, setUser] = useState("carlos.inhani@gmmail.com")
    const [psw, setPsw] = useState("280787pri")
    const [loadingData, setLoadingData] = useState(false)

    const dispatch = useDispatch();

    const navigation = useNavigation()

    function navigationtoDrawerMain() {
        navigation.navigate('drawerMain');
    }

    async function handleSubmit() {
        setLoadingData(true);
        const body = {
            email: user,
            password: psw
        }

        const response = await api.post('/api/authenticate', body)


        if (response.data.status === 401)
            console.log('Conta Cancelada')

        if (response.data.status === 400)
            Alert.alert(
                'SePlaneje - Login',
                'Usuário ou Senha Não Reconhecida',
                [

                    { text: 'OK', onPress: () => true }
                ],
                { cancelable: false }
            );

        else if (response.data.status !== 400) {
            const token = response.data.token
            const userId = response.data.user

            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('userId', userId.toString());

            dispatch({
                type: 'ISLOGED',
                payload: true
            })

        }

        setLoadingData(false);
    }

    return (<LinearGradient
        colors={['#81d6f3', '#B6BAC5']}
        style={[{ flex: 0 }, styles.div]}
    >
        <View style={loadingData ? { height: '110%' } : { height: '0%' }}>
            <LoadingData data={loadingData} />
        </View>
        <View>
            <Text style={styles.se}>Se<Text style={styles.planeje}>Planeje</Text></Text>
        </View>
        <View style={styles.inputs}>
            <TextInput
                label='Usuário'
                style={styles.inputUser}
                value={user}
                onChangeText={valor => setUser(valor)}
            />

            <TextInput
                label='Senha'
                secureTextEntry={true}
                style={styles.inputPsw}
                value={psw}
                onChangeText={valor => setPsw(valor)}
            />
        </View>

        {/* <LoadingData data={loadingData} /> */}

        <View style={styles.buttonLogin}>
            <Button style={styles.bsenha} mode='text' onPress={() => navigationtoDrawerMain()}>Esqueci Minha Senha</Button>
            <Button icon="login" on disabled={false} style={styles.bentrar} mode='contained' onPress={() => handleSubmit()}>Entrar</Button>
        </View>

    </LinearGradient>
    )
}