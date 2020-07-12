import React, { useState } from 'react';
import { useDispatch } from 'react-redux'

import { TextInput, Button, Divider } from 'react-native-paper';
import DatePicker from 'react-native-datepicker';
import { View, Modal, TouchableHighlight, Text, Picker } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { config, userID } from '../../components/auth'

import moment from 'moment';

import api from '../../services/api';
import LoadingData from '../../components/loadingData';

import style from './style';


export default (props) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [visao, setVisao] = useState('');
    const [dateInicio, setDateInicio] = useState(moment().format("DD-MM-YYYY"));
    const [dateFim, setDateFim] = useState(moment().format("DD-MM-YYYY"));
    const [loadingData, setLoadingData] = useState(false);

    const dispatch = useDispatch();

    async function handleSubmit() {
        setLoadingData(true)

        const userId = await userID();
        const token = await config();

        const dtinicio = moment(dateInicio, "DD-MM-YYYY").format("YYYY-MM-DD");
        const dtfim = moment(dateFim, "DD-MM-YYYY").format("YYYY-MM-DD");

        if (visao === '') {
            setLoadingData(false)
            return alert('Informe todos os dados solicitados')
        }

        if (dtfim <= dtinicio) {
            setLoadingData(false)
            return alert('A data fim deve ser maior do que a data início')
        }

        const body = {
            ID_USER: userId,
            VISAO: visao,
            STATUS: "Ativo",
            DT_INICIO: dtinicio,
            DT_FIM: dtfim
        }

        const response = await api.post('/api/visions', body, token)

        if (response.status === 200) {
            alert('Visão Inserida com Sucesso')
            const response = await api.get(`/api/visions/${userId}`, token)

            dispatch({
                type: 'LIST_VISAO',
                payload: response.data
            })

            setModalVisible(false)
        }
        else {
            alert('Ocorreu um erro ao tentar registar a Visão')
        }
        setLoadingData(false)
    }


    return (
        <View>
            <TouchableHighlight
                onPress={() => {
                    setModalVisible(true)
                }}
            >
                <AntDesign name="pluscircle" size={50} color="blue" />
            </TouchableHighlight>

            <View style={style.modal1}>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={modalVisible}
                >
                    <View style={style.modal}>
                        <View>

                            <Text style={{
                                fontSize: 48,
                                fontWeight: 'bold',
                                color: 'red'
                            }}>Se<Text style={{
                                fontSize: 28,
                                color: 'white',
                            }}>Planeje</Text></Text>
                        </View>
                        <LoadingData data={loadingData} />
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginTop: 15
                        }}>Novo Cartão</Text>
                        <Divider theme="dark" style={{ padding: 5 }} />
                        <View style={style.icon}>
                            <View style={{ width: '8%' }}>
                                <Feather name="credit-card" size={30} color="black" />
                            </View>
                            <View style={{ width: '90%' }}>
                                <TextInput
                                    style={style.visaoInput}
                                    value={visao}
                                    placeholderTextColor='black'
                                    label='Informe o nome da Visão'
                                    onChangeText={valor => setVisao(valor)} />
                            </View>
                        </View>

                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginTop: 15
                        }}>Data Inicio:</Text>
                        <Divider theme="dark" style={{ padding: 5 }} />
                        <DatePicker
                            style={style.datainsert}
                            date={dateInicio}
                            mode="date"
                            placeholder="Data Inicio"
                            format="DD-MM-YYYY"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 10,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    backgroundColor: '#fff',
                                    marginTop: 20,
                                    marginLeft: 36,
                                    height: 60,

                                },
                                dateText: {
                                    fontSize: 20,
                                    paddingLeft: 15,
                                    width: '100%',
                                    textAlign: 'left'
                                }
                            }}
                            onDateChange={(date) => setDateInicio(date)}
                        />

                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginTop: 15
                        }}>Data Fim:</Text>
                        <Divider theme="dark" style={{ padding: 5 }} />

                        <DatePicker
                            style={style.datainsert}
                            date={dateFim}
                            mode="date"
                            placeholder="Data Fim"
                            format="DD-MM-YYYY"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 10,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    backgroundColor: '#fff',
                                    marginTop: 20,
                                    marginLeft: 36,
                                    height: 60,

                                },
                                dateText: {
                                    fontSize: 20,
                                    paddingLeft: 15,
                                    width: '100%',
                                    textAlign: 'left'
                                }
                            }}
                            onDateChange={(date) => setDateFim(date)}
                        />


                        <View style={style.botoesInsert}>
                            <Button
                                style={style.bregistrar}
                                mode='contained'
                                icon='send'
                                color='blue'
                                contentStyle={{ height: 50 }}
                                onPress={() => handleSubmit()}>Inserir</Button>
                            <Button
                                style={style.bcancelar}
                                icon='logout'
                                mode='outlined'
                                color='blue'
                                contentStyle={{ height: 50 }}
                                onPress={() => setModalVisible(false)}>Sair</Button>
                        </View>

                    </View>
                </Modal>
            </View >
        </View >
    )
}