import React, { useState, useEffect } from 'react';

import { DrawerActions } from '@react-navigation/native';
import LoadingData from './../../components/loadingData';

import { useDispatch, useSelector } from 'react-redux';

import { AntDesign, Feather } from '@expo/vector-icons';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import { config, userID } from './../../components/auth';

import SearchFilter from '../../components/searchList/';

import InsertCartao from './insert';
import UpdateCartao from './update';

import api from '../../services/api';

import { Button, Searchbar, Provider, Portal, Dialog, Divider } from 'react-native-paper';

import style from './style';

export default (props) => {

    const [search, setSearch] = useState('');
    const [loadingData, setLoadingData] = useState(false);
    const [listCartao, setListCartao] = useState([]);
    const [visible, setVisible] = useState(false)

    const dispatch = useDispatch();
    const cartaoStore = useSelector(state => state.cartao)

    async function loadCartao() {
        setLoadingData(true)
        const token = await config();
        const userId = await userID();
        const response = await api.get(`/api/cartoes/${userId}`, token)

        dispatch({
            type: 'LIST_CARTAO',
            payload: response.data
        })

        setLoadingData(false)
    }

    async function deleteCartao(cartao) {
        const token = await config();
        const response = await api.delete(`/api/cartoes/${cartao.ID}`, token)

        setVisible(false)

        if (response.status === 200)
            return loadCartao()

        alert('Foram Encontrados problemas ao tentar excluir o cartão de créditp, as ações não serão salvas')
    }

    useEffect(() => {
        loadCartao();
    }, []);

    return (
        <View style={{ backgroundColor: 'ADD8E6', height: '100%' }}>
            <View style={style.novoCartao}>
                <View>
                    <AntDesign name="menufold" onPress={() => { props.navigation.dispatch(DrawerActions.toggleDrawer()); }}
                        size={50} color="black" />
                </View>
                <View style={{ paddingLeft: 20 }}>
                    <InsertCartao />
                </View>
            </View>
            <View style={style.searchbar}>
                <Searchbar
                    style={{ backgroundColor: '#FFFAFA' }}
                    placeholder="Buscar Contas"
                    value={search}
                    onChangeText={filtro => setSearch(filtro)}
                />
            </View>
            <LoadingData data={loadingData} />
            <FlatList style={style.container}
                data={SearchFilter(cartaoStore, ['CARTAO'], search)}
                keyExtractor={cartaoStore => String(cartaoStore.ID)}
                renderItem={({ item: cartao }) => (
                    <View style={style.flatContainer}>
                        <View style={{ width: '80%' }}>
                            <View style={style.flatRows}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Feather name="credit-card"
                                        size={30} color="black" />
                                    <Text style={style.flatContainerTopics}>Cartão:</Text>
                                </View>
                                <Text style={style.flatContainerItens}>{cartao.CARTAO}</Text>
                            </View>
                            <Divider theme="dark" style={{ padding: 3 }} />
                            <View style={style.flatRows2}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <AntDesign name="pushpino"
                                        size={30} color="grey" />
                                    <Text style={style.flatContainerTopics}>Melhor Dia de Compra:</Text>
                                </View>
                                <Text style={style.flatContainerItens}>{cartao.DIA_COMPRA}</Text>
                            </View>
                            <Divider theme="dark" style={{ padding: 3, marginTop: 8 }} />
                            <View style={style.flatRows2}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <AntDesign name="pushpin"
                                        size={30} color="grey" />
                                    <Text style={style.flatContainerTopics}>Vencimento da Fatura:</Text>
                                </View>
                                <Text style={style.flatContainerItens}>{cartao.DT_VENCIMENTO}</Text>
                            </View>
                        </View>

                        <View style={style.gridButtons}>
                            <UpdateCartao data={cartao} />
                            <TouchableOpacity
                                onPress={() => {
                                    setListCartao(cartao)
                                    setVisible(true)
                                }}
                            >
                                <Feather name="delete" size={35} color="#E02041" />
                            </TouchableOpacity>
                        </View>

                    </View>)}
            />
            <Provider>
                <Portal>
                    <Dialog
                        visible={visible}
                        onDismiss={() => setVisible(false)}>
                        <View >
                            <Text>
                                Deseja Excluir o Cartão {listCartao.CARTAO}
                            </Text>
                        </View>
                        <Dialog.Actions style={{ height: 80, justifyContent: 'space-around', flexDirection: 'row' }}>

                            <Button onPress={() => setVisible(false)}>Cancelar</Button>
                            <Button onPress={() => deleteCartao(listCartao)}>Excluir</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </Provider>
        </View>
    )
}