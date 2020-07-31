import React, { useState } from 'react';
import { useDispatch } from 'react-redux'

import { TextInput, Button, Divider } from 'react-native-paper';
// import DatePicker from 'react-native-datepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { View, Modal, TouchableHighlight, Text } from 'react-native';
import { Feather,AntDesign } from '@expo/vector-icons';
import { config, userID } from '../../components/auth'

import moment from 'moment';

import api from '../../services/api';
import LoadingData from '../../components/loadingData';

import style from './style';


export default (props) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [visao, setVisao] = useState(props.data.VISAO);
    const [dateInicio, setDateInicio] = useState(moment(props.data.DT_INICIO).format("DD-MM-YYYY"));
    const [isDatePickerVisibleInicio, setisDatePickerVisibleInicio] = useState(false);
    const [dateFim, setDateFim] = useState(moment(props.data.DT_FIM).format("DD-MM-YYYY"));
    const [isDatePickerVisibleFim, setisDatePickerVisibleFim] = useState(false);
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
            ID: props.data.ID,
            ID_USER: userId,
            VISAO: visao,
            STATUS: "Ativo",
            DT_INICIO: dtinicio,
            DT_FIM: dtfim
        }

        const response = await api.put(`/api/visions`, body, token)

        if (response.status === 200) {
            alert('Visão Editada com Sucesso')
            const response = await api.get(`/api/visions/${userId}`, token)

            dispatch({
                type: 'LIST_VISAO',
                payload: response.data
            })

            setModalVisible(false)
        }
        else {
            alert('Ocorreu um erro ao tentar alterar a Visão')
        }

        setLoadingData(false)
    }

    const hideDatePickerInicio = () => {
        setisDatePickerVisibleInicio(false)
    };

    const handleConfirmInicio = (date) => {
        setisDatePickerVisibleInicio(false)
        setDateInicio(moment(date).format("DD-MM-YYYY"));
    };

    const hideDatePickerFim = () => {
        setisDatePickerVisibleFim(false)
    };

    const handleConfirmFim = (date) => {
        setisDatePickerVisibleFim(false)
        setDateFim(moment(date).format("DD-MM-YYYY"));
    };

    return (
        <View>
            <TouchableHighlight
                onPress={() => {
                    setModalVisible(true)
                }}
            >
                <Feather name="edit" size={35} color="blue" />
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
                        

                        <TouchableHighlight
                                
                                onPress={()=> setisDatePickerVisibleInicio(true)} 
                                >
                          <View style={style.icon}>
                            <View style={{ width: '8%' }}>
                                <AntDesign name="calendar" size={30} color="black" />
                            </View>
                            <View style={{ width: '90%' }}>
                                <TextInput
                                style={style.visaoInput}
                                placeholder="Informe a Data Inicial da Visão"
                                value={dateInicio}
                                editable={false}
                                onTouchStart={()=> setisDatePickerVisibleInicio(true)}
                                />
                            </View>
                          </View>
                         </TouchableHighlight>                           
                            <DateTimePickerModal
                                isVisible={isDatePickerVisibleInicio}   
                                textColor='black'
                                mode="date"
                                onConfirm={handleConfirmInicio}
                                onCancel={hideDatePickerInicio}
                            />

                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginTop: 15
                        }}>Data Fim:</Text>
                        <Divider theme="dark" style={{ padding: 5 }} />


                        <TouchableHighlight
                                
                                onPress={()=> setisDatePickerVisibleFim(true)} 
                                >
                          <View style={style.icon}>
                            <View style={{ width: '8%' }}>
                                <AntDesign name="calendar" size={30} color="black" />
                            </View>
                            <View style={{ width: '90%' }}>
                                <TextInput
                                style={style.visaoInput}
                                placeholder="Informe a Data Final da Visão"
                                value={dateFim}
                                editable={false}
                                onTouchStart={()=> setisDatePickerVisibleFim(true)}
                                />
                            </View>
                          </View>
                         </TouchableHighlight>                           
                            <DateTimePickerModal
                                isVisible={isDatePickerVisibleFim}   
                                textColor='black'
                                mode="date"
                                onConfirm={handleConfirmFim}
                                onCancel={hideDatePickerFim}
                            />


                        <View style={style.botoesInsert}>
                            <Button
                                style={style.bregistrar}
                                mode='contained'
                                icon='send'
                                color='blue'
                                contentStyle={{ height: 50 }}
                                onPress={() => handleSubmit()}>Alterar</Button>
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