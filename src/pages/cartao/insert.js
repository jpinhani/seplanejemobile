
import React, { useState } from 'react';
import { useDispatch } from 'react-redux'

import { TextInput, Button, Divider } from 'react-native-paper';
import { View, Modal, TouchableHighlight, Text ,ScrollView} from 'react-native';
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
    const [modalcompra, setModalCompra] = useState(false);
    const [modalvencimento, setModalVencimento] = useState(false);

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

    function handleDiaVencimento(dia){
        setDiaVencimento(String(dia))
        setModalVencimento(false)
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
                                   style={{backgroundColor:"#fff",fontSize:20}}
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
                                 <ScrollView 
                                 showsVerticalScrollIndicator={false}
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
                                    <Divider theme="dark" style={{ padding: 5 }} />
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
                               </ScrollView>
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

                            <TouchableHighlight
                               style={style.Listvencimento}
                               onPress={()=>{
                                vetorcompra()
                                setModalVencimento(true)}
                                }
                          >

                            <TextInput
                                    style={{backgroundColor:"#fff",fontSize:20}}
                                    value={diaVencimento}
                                    placeholderTextColor='black'
                                    label='Vencimento da Fatura'
                                    onTouchStart={()=>{
                                        vetorcompra()
                                        setModalVencimento(true)}}
                                    editable={false}/>

                          </TouchableHighlight>
                        </View>
                        
                        <Modal
                              animationType={'slide'}
                              transparent={false}
                              visible={modalvencimento}
                             >
                        <ScrollView
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
                                <Divider theme="dark" style={{ padding: 5 }} />
                                   <Text 
                                   style={{fontWeight:"bold", 
                                   fontSize: 20, 
                                   textAlign:"center",
                                   paddingBottom: 10}}>Escolha o dia de Vencimento da Fatura</Text>
                                  
                                        <View style={style.flatlistModal} >
                                                {VetorDiasCompra.map((data)=> {
                                                    return <Button
                                                    style={{margin:5}}
                                                    mode='contained'
                                                    key={data.id}
                                                    color='blue'
                                                    contentStyle={{ height: 70, width: 70}}
                                                   onPress={() => handleDiaVencimento(data.compra)}>{data.compra}</Button>
                                                })}
                                        </View>
                            </View>
                        </ScrollView>
                     </Modal>

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