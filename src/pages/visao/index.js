import React, { useState, useEffect } from 'react';

import { DrawerActions } from '@react-navigation/native';
import LoadingData from './../../components/loadingData';

import { useDispatch, useSelector } from 'react-redux';

import { AntDesign, Feather, Entypo } from '@expo/vector-icons';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import moment from 'moment';

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
    const [listVisao, setlistVisao] = useState([]);
    const [visible, setVisible] = useState(false)

    const dispatch = useDispatch();
    const visaoStore = useSelector(state => state.visao)

    async function loadVisao() {
        setLoadingData(true)
        const token = await config();
        const userId = await userID();
        const response = await api.get(`/api/visions/${userId}`, token)

        dispatch({
            type: 'LIST_VISAO',
            payload: response.data
        })

        setLoadingData(false)
    }

    async function deleteVisao(visao) {
        const token = await config();
        const response = await api.delete(`/api/visions/${visao.ID}`, token)

        setVisible(false)

        if (response.status === 200)
            return loadVisao()

        alert('Foram Encontrados problemas ao tentar excluir a visão, as ações não serão salvas')
    }

    useEffect(() => {
        loadVisao();
    }, []);

    return (
        <View style={{ backgroundColor: 'ADD8E6', height: '100%' }}>
            <View style={style.novoVisao}>
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
               showsVerticalScrollIndicator={false}
                data={SearchFilter(visaoStore, ['VISAO'], search)}
                keyExtractor={visaoStore => String(visaoStore.ID)}
                renderItem={({ item: visao }) => (
                    <View style={style.flatContainer}>
                        <View style={{ width: '80%' }}>
                            <View style={style.flatRows}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <AntDesign name="eyeo"
                                        size={30} color="black" />
                                    <Text style={style.flatContainerTopics}>Visão:</Text>
                                </View>
                                <Text style={style.flatContainerItens}>{visao.VISAO}</Text>
                            </View>
                            <Divider theme="dark" style={{ padding: 3 }} />
                            <View style={style.flatRows2}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Entypo name="calendar"
                                        size={30} color="grey" />
                                    <Text style={style.flatContainerTopics}>Inicio:</Text>
                                </View>
                                <Text style={style.flatContainerItens}>{moment(visao.DT_INICIO).format("DD/MM/YYYY")}</Text>
                            </View>
                            <Divider theme="dark" style={{ padding: 3, marginTop: 8 }} />
                            <View style={style.flatRows2}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Entypo name="calendar"
                                        size={30} color="grey" />
                                    <Text style={style.flatContainerTopics}>Fim:</Text>
                                </View>
                                <Text style={style.flatContainerItens}>{moment(visao.DT_FIM).format("DD/MM/YYYY")}</Text>
                            </View>
                        </View>

                        <View style={style.gridButtons}>
                            <UpdateCartao data={visao} />
                            <TouchableOpacity
                                onPress={() => {
                                    setlistVisao(visao)
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
                                Deseja Excluir a visao? {listVisao.VISAO}
                            </Text>
                        </View>
                        <Dialog.Actions style={{ height: 80, justifyContent: 'space-around', flexDirection: 'row' }}>

                            <Button onPress={() => setVisible(false)}>Cancelar</Button>
                            <Button onPress={() => deleteVisao(listVisao)}>Excluir</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </Provider>
        </View>
    )
}