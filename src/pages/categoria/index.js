import React, { useState, useEffect } from 'react';

// import { DrawerActions } from '@react-navigation/native';
// import LoadingData from './../../components/loadingData';

import { useDispatch, useSelector } from 'react-redux';
import { DrawerActions } from '@react-navigation/native';

import { AntDesign, Feather, Entypo } from '@expo/vector-icons';
import { View, FlatList, Text } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import Options from './resume';

// import moment from 'moment';

import { config, userID } from './../../components/auth';
import LoadingData from '../../components/loadingData';

import SearchFilter from '../../components/searchList/';

import InsertCartao from './../cartao/insert';
// import UpdateCartao from './update';

import api from '../../services/api';

// import { Button, Searchbar, Provider, Portal, Dialog, Divider } from 'react-native-paper';

import style from './style';


export default (props) => {

    const categoriaStore = useSelector(state => state.categoria);

    const [loadingData, setLoadingData] = useState(false);
    const [CategoriaData, setCategoriaData] = useState(false);
    const [search, setSearch] = useState('');
    const [optionsModal, setOptionsModal] = useState(false);
    const [dataSelectd, setDataSelected] = useState('')
    const [old, setold] = useState([]);


    const dispatch = useDispatch();

    async function loadCategoria() {
        setLoadingData(true)
        const token = await config();
        const userId = await userID();
        const response = await api.get(`/api/categorias/${userId}`, token)

        const novosDados = response.data.map((data) => {
            return { ...data, title: data.DESCR_CATEGORIA, key: data.ID }
        })

        const nivel3 = novosDados.filter((DATA) => DATA.NIVEL === 3)
        const nivel4 = novosDados.filter((DATA) => DATA.NIVEL === 4)
        const nivel5 = novosDados.filter((DATA) => DATA.NIVEL === 5)
        const nivel6 = novosDados.filter((DATA) => DATA.NIVEL === 6)

        const gera5 = nivel5.reduce((novo, n6, i) => {
            if (nivel6.filter((data) => n6.ID === data.IDPAI).length > 0)
                novo[i].children = nivel6.filter((data) => n6.ID === data.IDPAI)
            return novo
        }, nivel5)

        const gera4 = nivel4.reduce((novo, n5, i) => {
            if (gera5.filter((data) => n5.ID === data.IDPAI).length > 0)
                novo[i].children = gera5.filter((data) => n5.ID === data.IDPAI)
            return novo
        }, nivel4)

        const nivel = nivel3.reduce((novo, n4, i) => {
            if (gera4.filter((data) => n4.ID === data.IDPAI).length > 0)
                novo[i].children = gera4.filter((data) => n4.ID === data.IDPAI)
            return novo
        }, nivel3)

        const nivelMaxDespesa = [{
            DESCR_CATEGORIA: 'DESPESA',
            NIVEL: 2,
            TIPO: 1,
            TIPODESCR: 'DESPESA',
            ENTRADA: 1,
            ENTRADADESCR: 'Categoria de Consolidação',
            AGREGACAO: "+",
            DEPENDENCIA: 1,
            ID: 2,
            IDPAI: 1,
            STATUS: "Ativo",
            children: nivel.filter(filtro => filtro.TIPO === 1)
        }]

        const nivelMaxReceita = [{
            DESCR_CATEGORIA: 'RECEITA',
            NIVEL: 2,
            TIPO: 2,
            TIPODESCR: 'RECEITA',
            ENTRADA: 1,
            ENTRADADESCR: 'Categoria de Consolidação',
            AGREGACAO: "+",
            DEPENDENCIA: 1,
            ID: 3,
            IDPAI: 1,
            STATUS: "Ativo",
            children: nivel.filter(filtro => filtro.TIPO === 2)
        }]

        setold([...novosDados, ...nivelMaxDespesa, ...nivelMaxReceita])
        setCategoriaData([...nivelMaxDespesa, ...nivelMaxReceita])
        dispatch({
            type: 'LIST_CATEGORIA',
            payload: nivel
        })
        setLoadingData(false)

    }

    useEffect(() => {
        loadCategoria();
    }, []);


    function verifyNivelDown(categoriaPai, categoriaIDPai) {
        setLoadingData(true)

        let itensPai = old.filter((filtro) => filtro.ID === categoriaIDPai).map((data) => { return { ...data, Selected: 1 } })
        let itens = old.filter((filtro) => filtro.ID === categoriaPai).map((data) => { return { ...data, Selected: 1 } })
        let itensFilho = old.filter((dados) => dados.IDPAI === categoriaPai)

        setCategoriaData([...itensPai, ...itens, ...itensFilho])
        setLoadingData(false)
    }


    async function verifyNivelUp(categoriaIDPai) {
        setLoadingData(true)

        let itensPai = old.filter((filtro) => filtro.ID === categoriaIDPai).map((data) => { return { ...data, Selected: 1 } })
        let itensFilho = old.filter((dados) => dados.IDPAI === categoriaIDPai)

        setCategoriaData([...itensPai, ...itensFilho])
        setLoadingData(false)
    }

    const back = valor => {
        if (valor) {
            setOptionsModal(false)
        }
    }


    return (
        <View style={{ backgroundColor: 'ADD8E6', height: '100%', paddingBottom: 5 }}>
            <View style={style.novoCartao}>
                <View>
                    <AntDesign name="menufold" onPress={() => { props.navigation.dispatch(DrawerActions.toggleDrawer()); }}
                        size={50} color="black" />
                </View>
                <View style={{ paddingLeft: 20 }}>
                    <InsertCartao />
                </View>
            </View>

            <LoadingData data={loadingData} />

            <FlatList
                data={SearchFilter(CategoriaData, ['DESCR_CATEGORIA'], search)}
                keyExtractor={CategoriaData => String(CategoriaData.ID)}
                renderItem={({ item: categoria }) => (
                    <View>
                        {categoria.ENTRADA === 1 ?
                            <View style={style.container}>
                                <View style={{ flexDirection: 'column-reverse' }} >
                                    <Button
                                        color='black'
                                        font mode='text'
                                        onPress={() => {
                                            setOptionsModal(true)
                                            setDataSelected(categoria)
                                        }}
                                    >{categoria.DESCR_CATEGORIA}</Button>
                                    <Text style={{ paddingLeft: 8, fontSize: 10 }}>{categoria.TIPO === 1 ? 'Despesa' : 'Receita'}</Text>
                                </View>
                                {categoria.Selected !== 1 ?

                                    <AntDesign
                                        onPress={() => verifyNivelDown(categoria.ID, categoria.IDPAI)}
                                        name="down"
                                        size={30}
                                        color="blue" />


                                    :
                                    <AntDesign
                                        onPress={() => verifyNivelUp(categoria.IDPAI)}
                                        name="up"
                                        size={30}
                                        color="red" />
                                }
                            </View> :
                            <View style={style.containerfilho}>
                                <View style={{ flexDirection: 'column-reverse' }} >
                                    <Button style={style.containerfilhobutton} color='black' mode='text'>{categoria.DESCR_CATEGORIA} </Button>
                                    <Text style={{ paddingLeft: 8, fontSize: 10 }}> {categoria.TIPO === 1 ? 'Despesa' : 'Receita'}</Text>
                                </View>
                            </View>

                        }
                        <Divider style={categoria.ENTRADA === 1 ? { padding: 1, backgroundColor: 'lightskyblue', marginHorizontal: 25 } : {}} />
                    </View>
                )
                }


            />
            <Options
                back={back.bind(this)}
                visible={optionsModal}
                data={dataSelectd} />

        </View >

    )
}