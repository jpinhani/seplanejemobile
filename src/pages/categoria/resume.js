
import React, { useState, useEffect } from 'react';

import { TextInput, Button, Divider } from 'react-native-paper';
import { View, Modal, TouchableHighlight, Text, Picker } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';

import LoadingData from '../../components/loadingData';

import style from './style';


export default (props) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [loadingData, setLoadingData] = useState(false);


    function handlemodalVisible() {
        setModalVisible(false)
        props.back("OK")
    }

    return (
        <View>
            <View style={style.modal1}>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={props.visible}
                >
                    <View style={style.modal}>
                        <View>

                            <Text style={{
                                fontSize: 48,
                                fontWeight: 'bold',
                                color: 'red'
                            }}>Se
                               <Text style={{
                                    fontSize: 28,
                                    color: 'white',
                                }}>Planeje
                                </Text>
                            </Text>
                        </View>

                        <View>
                            <Text style={style.Topico}>{'Nome:'}</Text>
                            <Divider style={{ padding: 3, backgroundColor: 'lightcyan' }} />
                            <Text style={style.Item}>{props.data.DESCR_CATEGORIA}</Text>
                        </View>

                        <View>
                            <Text style={style.Topico}>{'Classificação:'}</Text>
                            <Divider style={{ padding: 3, backgroundColor: 'lightcyan' }} />
                            <Text style={style.Item}>{props.data.TIPO === 1 ? 'DESPESA' : 'RECEITA'}</Text>
                        </View>

                        <View>
                            <Text style={style.Topico}>{'Tipo:'}</Text>
                            <Divider style={{ padding: 3, backgroundColor: 'lightcyan' }} />
                            <Text style={style.Item}>{props.data.ENTRADA === 1 ? 'CATEGORIA DE CONSOLIDAÇÃO' : 'CATEGORIA DE INPUT'}</Text>
                        </View>

                        <View>
                            <Text style={style.Topico}>{'Nivel:'}</Text>
                            <Divider style={{ padding: 3, backgroundColor: 'lightcyan' }} />
                            <Text style={style.Item}>{props.data.NIVEL}</Text>
                        </View>

                        <LoadingData data={loadingData} />

                        <View style={style.buttonsOptions}>
                            <TouchableHighlight
                            // onPress={() => {
                            //     setModalVisible(true)
                            // }}
                            >
                                <AntDesign name="pluscircle" size={50} color="black" />
                            </TouchableHighlight>
                            <TouchableHighlight
                            // onPress={() => {
                            //     setModalVisible(true)
                            // }}
                            >
                                <AntDesign name="edit" size={50} color="blue" />
                            </TouchableHighlight>
                            <TouchableHighlight
                            // onPress={() => {
                            //     setModalVisible(true)
                            // }}
                            >
                                <AntDesign name="delete" size={50} color="red" />
                            </TouchableHighlight>
                        </View>
                        <Button
                            style={{ marginTop: 50 }}
                            contentStyle={{ height: 60 }}
                            mode='outlined'
                            color='blue'
                            onPress={() => handlemodalVisible()}>Sair</Button>
                    </View>
                </Modal>
            </View>
        </View>
    )
}