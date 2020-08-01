
import React, { useState } from 'react';
import { useDispatch } from 'react-redux'

import { TextInput, Button, Divider } from 'react-native-paper';
import { View, Modal, TouchableHighlight, Text, Picker ,FlatList, RecyclerViewBackedScrollViewComponent} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { config, userID } from '../../components/auth'
import api from '../../services/api';
import LoadingData from '../../components/loadingData';

import style from './style';


export default (props) => {

    const [VetorDiasCompra, setVetorDiasCompra] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [cartao, setCartao] = useState('');
    const [diaCompa, setDiaCompra] = useState('');
    const [diaVencimento, setDiaVencimento] = useState('');
    const [loadingData, setLoadingData] = useState(false);
    const [modalcompra, setModalCompra] = useState(false)

    const dispatch = useDispatch();

    async function handleSubmit() {
        setLoadingData(true)
        const userId = await userID();
        const token = await config();

        if (cartao === '') {
            setLoadingData(false)
            return alert('Informe todos os dados solicitados')
        }

        const body = {
            idUser: userId,
            cartao: cartao,
            dtVencimento: diaVencimento ? diaVencimento : 1,
            diaCompra: diaCompa ? diaCompa : 1,
            status: "Ativo"
        }

        const response = await api.post('/api/cartoes', body, token)

        if (response.status === 200) {
            alert('Cartão Inserido com Sucesso')
            const response = await api.get(`/api/cartoes/${userId}`, token)

            dispatch({
                type: 'LIST_CARTAO',
                payload: response.data
            })
            setModalVisible(false)
        }
        else {
            alert('Ocorreu um erro ao tentar registar o cartão')
        }
        setLoadingData(false)
    }

    
    let VetorDiasCompraTemp = [];

    function vetorcompra(){
        for (let index = 1; index <= 31; index++) {
            VetorDiasCompraTemp.push(
            
           {id: index,
            compra: index
        })
    }
    setVetorDiasCompra(VetorDiasCompraTemp)
        console.log("VetorDiasCompra",VetorDiasCompraTemp[2])
    }

    function handleDiaMelhorCompra(dia){
        setDiaCompra(String(dia))
        setModalCompra(false)
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
                                    style={style.cartaoInput}
                                    value={cartao}
                                    placeholderTextColor='black'
                                    label='Informe o nome do Cartão'
                                    onChangeText={valor => setCartao(valor)} />
                            </View>
                        </View>

                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginTop: 15
                        }}>Melhor dia de Compra</Text>
                        <Divider theme="dark" style={{ padding: 5 }} />
                        <View style={style.icon}>
                            <View style={{ width: '8%' }}>
                                <AntDesign name="pushpino" size={30} color="black" />
                            </View>

                          <TouchableHighlight
                               style={style.Listvencimento}
                               onPress={()=>{
                                vetorcompra()
                                setModalCompra(true)}
                                }
                          >


                            <TextInput
                                    // style={style.Listvencimento}
                                    value={diaCompa}
                                    placeholderTextColor='black'
                                    label='Informe o dia de Melhor Compra'
                                    onTouchStart={()=>{
                                        vetorcompra()
                                        setModalCompra(true)}}
                                    editable={false}/>

                          </TouchableHighlight>
                        </View>
                        <Modal
                              animationType={'slide'}
                              transparent={false}
                              visible={modalcompra}
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

                                   <Text 
                                   style={{fontWeight:"bold", 
                                   fontSize: 20, 
                                   textAlign:"center",
                                   paddingBottom: 10}}>Escolha o dia de Melhor Compra do Cartão</Text>
                                  
                                        <View style={style.flatlistModal} >
                                                {VetorDiasCompra.map((data)=> {
                                                    return <Button
                                                    style={{margin:5}}
                                                    mode='contained'
                                                    key={data.id}
                                                    color='blue'
                                                    contentStyle={{ height: 70, width: 70}}
                                                   onPress={() => handleDiaMelhorCompra(data.compra)}>{data.compra}</Button>
                                                })}
                                        </View>
                                   
                               
                               </View>
                        </Modal>

                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginTop: 15
                        }}>Dia de Vencimento da Fatura</Text>
                        <Divider theme="dark" style={{ padding: 5 }} />
                        <View style={style.icon}>
                            <View style={{ width: '8%' }}>
                                <AntDesign name="pushpin" size={30} color="black" />
                            </View>

                            <Picker
                                selectedValue={diaVencimento}
                                style={style.Listvencimento}
                                mode="dropdown"
                                onValueChange={(itemValue, itemIndex) => setDiaVencimento(itemValue)}
                            >
                                <Picker.Item label="01" value="1" />
                                <Picker.Item label="02" value="2" />
                                <Picker.Item label="03" value="3" />
                                <Picker.Item label="04" value="4" />
                                <Picker.Item label="05" value="5" />
                                <Picker.Item label="06" value="6" />
                                <Picker.Item label="07" value="7" />
                                <Picker.Item label="08" value="8" />
                                <Picker.Item label="09" value="9" />
                                <Picker.Item label="10" value="10" />
                                <Picker.Item label="11" value="11" />
                                <Picker.Item label="12" value="12" />
                                <Picker.Item label="13" value="13" />
                                <Picker.Item label="14" value="14" />
                                <Picker.Item label="15" value="15" />
                                <Picker.Item label="16" value="16" />
                                <Picker.Item label="16" value="17" />
                                <Picker.Item label="18" value="18" />
                                <Picker.Item label="19" value="19" />
                                <Picker.Item label="20" value="20" />
                                <Picker.Item label="21" value="21" />
                                <Picker.Item label="22" value="22" />
                                <Picker.Item label="23" value="23" />
                                <Picker.Item label="24" value="24" />
                                <Picker.Item label="25" value="25" />
                                <Picker.Item label="26" value="26" />
                                <Picker.Item label="27" value="27" />
                                <Picker.Item label="28" value="28" />
                                <Picker.Item label="29" value="29" />
                                <Picker.Item label="30" value="30" />
                                <Picker.Item label="31" value="31" />
                            </Picker>
                        </View>

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
            </View>
        </View>
    )
}