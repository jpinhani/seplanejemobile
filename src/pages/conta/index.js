import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { config, userID } from './../../components/auth'
import api from '../../services/api'

import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { Searchbar, Dialog, Button, Portal, Provider, Divider } from 'react-native-paper';
import { DrawerActions } from '@react-navigation/native';
import { Feather, AntDesign } from '@expo/vector-icons';

import LoadingData from './../../components/loadingData';
import InsertConta from './insert';
import UpdateConta from './update';

import SearchFilter from '../../components/searchList/'

import styles from './style';

export default (props) => {
    const [listConta, setListConta] = useState([]);
    const [search, setSearch] = useState('');
    const [visible, setVisible] = useState(false);
    const [loadingData, setLoadingData] = useState(false);

    const dispatch = useDispatch();
    const contaStore = useSelector(state => state.conta)

    async function loadConta() {
        setLoadingData(true)
        const token = await config();
        const userId = await userID();
        const response = await api.get(`/api/contas/${userId}`, token)

        dispatch({
            type: 'LIST_CONTA',
            payload: response.data
        })
        setLoadingData(false)
    }

    async function deleteConta(conta) {
        const token = await config();
        const response = await api.delete(`/api/contas/${conta.ID}`, token)
        if (response.status === 200) {
            loadConta()
            setVisible(false)
        }
    }


    useEffect(() => {
        loadConta();
    }, []);


    function formataDinheiro(n) {
        return "R$ " + n.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
    }

    return (
        <View style={{ backgroundColor: 'ADD8E6', height: '100%' }}>
            <View style={styles.novaconta}>
                <View>
                    <AntDesign name="menufold" onPress={() => { props.navigation.dispatch(DrawerActions.toggleDrawer()); }}
                        size={50} color="black" />
                </View>
                <View style={{ paddingLeft: 20 }}>
                    <InsertConta />
                </View>
            </View>
            <View style={styles.searchbar}>
                <Searchbar
                    style={{ backgroundColor: '#FFFAFA' }}
                    placeholder="Buscar Contas"
                    value={search}
                    onChangeText={filtro => setSearch(filtro)}
                />
            </View>
            <LoadingData data={loadingData} />
            <FlatList style={styles.container}
                data={SearchFilter(contaStore, ['DESCR_CONTA'], search)}
                keyExtractor={contaStore => String(contaStore.ID)}
                renderItem={({ item: conta }) => (
                    <View style={styles.itens}>
                        <View style={{ width: '80%' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Feather name="check-square"
                                    size={30} color="black" />
                                <Text style={styles.type}>Conta:</Text>
                            </View>
                            <Text style={styles.value}>{conta.DESCR_CONTA}</Text>
                            <Divider style={{ padding: 3 }} />
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Feather name="calendar"
                                        size={30} color="black" />
                                    <Text style={styles.type}>Data Inicio:</Text>
                                </View>
                                <Text style={styles.value}>{moment(conta.DTSALDO).format("DD/MM/YYYY")}</Text>
                            </View>
                            <Divider style={{ padding: 3 }} />
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Feather name="dollar-sign"
                                        size={30} color="black" />
                                    <Text style={styles.type}>Saldo Inicial:</Text>
                                </View>
                                <Text style={styles.value}>{formataDinheiro(conta.SALDO)}</Text>
                            </View>
                            <Divider style={{ padding: 3 }} />
                        </View>
                        <View style={styles.detailButtonGrid}>

                            <UpdateConta data={conta} />

                            <TouchableOpacity
                                onPress={() => {
                                    setListConta(conta)
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
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', marginTop: 20 }}>
                                Deseja Excluir a conta {listConta.DESCR_CONTA} </Text>
                        </View>
                        <Dialog.Actions style={{ height: 80, justifyContent: 'space-around', flexDirection: 'row' }}>

                            <Button onPress={() => setVisible(false)}>Cancelar</Button>
                            <Button onPress={() => deleteConta(listConta)}>Excluir</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </Provider>
        </View>
    )
}