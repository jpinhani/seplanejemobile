import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import api from '../../services/api'
import { Button, TextInput, Searchbar } from 'react-native-paper';

import styles from './style';

export default function conta() {
    const [conta, setConta] = useState('')
    const [listConta, setListConta] = useState([])

    async function loadConta() {
        const response = await api.get('/api/contas/1')
        setListConta(response.data)
    }

    useEffect(() => {
        loadConta();
    }, []);

    async function enviaConta() {
        const body = {
            idUser: 1,
            descrConta: conta,
            status: "Ativo"
        }

        if (conta) {
            const response = await api.post('/api/contas', body)
            if (response.status === 200) {
                alert('Conta Inserida com Sucesso')
                setConta('')
            }
        } else {
            alert('Informe a Conta')
        }
    }

    return (
        <View style={{ backgroundColor: '#DCDCDC' }}>
            <TouchableOpacity
                style={styles.novaconta}
                onPress={() => { }}
            >
                <Feather name="plus-square" size={50} color="black" />
                <Searchbar
                    style={styles.searchbar}
                    placeholder="Buscar Contas"
                // onChangeText={this._onChangeSearch}
                // value={searchQuery}
                />
            </TouchableOpacity>

            <FlatList style={styles.container}
                data={listConta}
                keyExtractor={listConta => String(listConta.ID)}
                renderItem={({ item: conta }) => (
                    <View style={styles.itens}>
                        <Text style={styles.type}>Conta:</Text>
                        <Text style={styles.value}>{conta.DESCR_CONTA}</Text>
                        <TouchableOpacity
                            style={styles.detailButton}
                            onPress={() => { }}
                        >
                            <Text style={styles.detailButtonText}>Editar</Text>
                            <View style={styles.detailButtonGrid}>
                                <Feather name="edit" size={25} color="blue" />
                                <Feather name="delete" size={25} color="#E02041" />
                            </View>
                        </TouchableOpacity>
                    </View>)}
            />

            <View style={styles.inputs}>
                <TextInput value={conta} label='Informe as Conta' onChangeText={valor => setConta(valor)} />
            </View>
            <View>
                <Button style={styles.button} mode='contained' onPress={enviaConta}>Registrar Conta</Button>
            </View>

        </View >
    )
}