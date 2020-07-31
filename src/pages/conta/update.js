
import  React,{useState} from 'react';
import { useDispatch } from 'react-redux';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TextInput, Button, Divider } from 'react-native-paper';
import { View, Modal, TouchableHighlight, Text } from 'react-native';
import { Feather,AntDesign } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text';


import moment from 'moment';
import { config, userID } from './../../components/auth'
import api from '../../services/api'

import LoadingData from './../../components/loadingData';
import style from './style';

export default (props) => {
    
        const dispatch = useDispatch();
        const [modalVisible,setModalVisible] = useState(false);
        const [conta,setConta] = useState(props.data.DESCR_CONTA);
        const [date,setDate] = useState(moment(props.data.DTSALDO).format("DD-MM-YYYY"));
        const [isDatePickerVisible, setisDatePickerVisible] = useState(false);
        const [saldo,setSaldo] =  useState(props.data.SALDO);
        const [loadingData,setLoadingData] =  useState(false);
        

    async function handleSubmit() {
        setLoadingData(true)
    
        const idUser = await userID();
        const token = await config();
        const dtsaldo = moment(date, "DD-MM-YYYY").format("YYYY-MM-DD")
        const sd = typeof saldo === 'number'
            ? saldo :
            (saldo).replace('R$ ', '').replace('.', '').replace('.', '').replace('.', '').replace(',', '.')
        
            const body = {
            idUser: idUser,
            id: props.data.ID,
            descrConta: conta,
            saldo: sd,
            data: dtsaldo,
            status: "Ativo"
            }  

        if (body.descrConta) {
            const response = await api.put(`/api/contas/${body.id}`, body, token)

            if (response.status === 200) {
                alert('Conta Atualizada com Sucesso')
                const response = await api.get(`/api/contas/${idUser}`, token)

                dispatch({
                    type: "LIST_CONTA",
                    payload: response.data
                });

                setModalVisible(false)
            }

        } else {
            alert('Informe a Conta')
        }
        setModalVisible(false)
        setLoadingData(false)
    }

    const hideDatePicker = () => {
        setisDatePickerVisible(false)
    };

    const handleConfirm = (date) => {
        setisDatePickerVisible(false)
        setDate(moment(date).format("DD-MM-YYYY"));
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
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                marginTop: 15
                            }}>Editar Conta</Text>
                            <Divider theme="dark" style={{ padding: 5 }} />
                            <LoadingData data={loadingData} />
                            <View style={style.icon}>
                                <View style={{ width: '8%' }}>
                                    <Feather name="check-square" size={30} color="black" />
                                </View>
                                <View style={{ width: '90%' }}>
                                    <TextInput
                                        style={style.contaInput}
                                        value={conta}
                                        placeholderTextColor='black'
                                        label='Informe a Conta'
                                        onChangeText={valor => setConta(valor) } />
                                </View>
                            </View>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                marginTop: 15
                            }}>Data Inicial</Text>
                            <Divider theme="dark" style={{ padding: 5 }} />
                            <TouchableHighlight
                                onPress={()=> setisDatePickerVisible(true)} 
                             >
                               <View style={style.icon}>
                                 <View style={{ width: '8%' }}>
                                    <AntDesign name="calendar" size={30} color="black" />
                                 </View>
                                <View style={{ width: '90%' }}>
                                    <TextInput
                                    style={style.contaInput}
                                    placeholder="Informe a Data Inicial do Saldo"
                                    value={date}
                                    editable={false}
                                    onTouchStart={()=> setisDatePickerVisible(true)}
                                    />
                                </View>
                               </View>
                         </TouchableHighlight>                           
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                textColor='black'
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />

                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                marginTop: 35
                            }}>Saldo Inicial</Text>
                            <Divider theme="dark" style={{ padding: 5 }} />
                            <View style={style.icon}>
                                <View style={{ width: '8%' }}>
                                    <Feather name="dollar-sign" size={30} color="black" />
                                </View>
                                <View style={{ width: '90%' }}>
                                    <TextInputMask
                                        type={'money'}
                                        placeholder='Informe o Saldo Inicial'
                                        placeholderTextColor='#808080'
                                        maxLength={18}

                                        style={style.saldo}
                                        options={{
                                            precision: 2,
                                            separator: ',',
                                            // delimiter: ',',
                                            unit: 'R$ ',
                                            suffixUnit: ''
                                        }}
                                        value={saldo}
                                        onChangeText={text => { setSaldo(text)
                                            
                                        }}
                                    />
                                </View>
                            </View>
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
                                    onPress={() => 
                                     setModalVisible(false)
                                    }
                                    >Sair</Button>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View >
        );
    }



