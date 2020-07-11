
import * as React from 'react';
import { connect } from 'react-redux'
import DatePicker from 'react-native-datepicker';
import { TextInput, Button, Divider } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import { View, Modal, TouchableHighlight, Text } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { config, userID } from './../../components/auth'
import api from '../../services/api';
import { listConta } from '../../store/actions/actionConta';
import moment from 'moment';
import LoadingData from './../../components/loadingData';

import style from './style';

class MyComponent extends React.Component {
    state = {
        modalVisible: false,
        conta: '',
        date: moment().format("DD-MM-YYYY"),
        saldo: '0',
        loadingData: false
    };


    async handleSubmit() {
        this.setState({ ...this.state, loadingData: true });
        const idUser = await userID();
        const token = await config();
        const dtsaldo = moment(this.state.date, "DD-MM-YYYY").format("YYYY-MM-DD")

        const body = {
            idUser: idUser,
            descrConta: this.state.conta,
            data: dtsaldo,
            saldo: (this.state.saldo).replace('R$ ', '').replace('.', '').replace('.', '').replace('.', '').replace(',', '.'),
            status: "Ativo"
        }

        if (body.descrConta) {
            const response = await api.post('/api/contas', body, token)

            if (response.status === 200) {
                alert('Conta Inserida com Sucesso')
                const response = await api.get(`/api/contas/${idUser}`, token)
                this.props.listConta(response.data)
                this.setState({ ...this.state, modalVisible: false, conta: '' })
            }
        } else {
            alert('Informe a Conta')
        }
        this.setState({ ...this.state, loadingData: false });
    }

    render() {
        const { modalVisible } = this.state;
        return (
            <View>
                <TouchableHighlight
                    onPress={() => {
                        this.setState({ ...this.state, modalVisible: true });
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
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                marginTop: 15
                            }}>Nova Conta</Text>
                            <Divider theme="dark" style={{ padding: 5 }} />
                            <LoadingData data={this.state.loadingData} />
                            <View style={style.icon}>
                                <View style={{ width: '8%' }}>
                                    <Feather name="check-square" size={30} color="black" />
                                </View>
                                <View style={{ width: '90%' }}>
                                    <TextInput
                                        style={style.contaInput}
                                        value={this.state.conta}
                                        placeholderTextColor='black'
                                        label='Informe a Conta'
                                        onChangeText={valor => this.setState({ ...this.state, conta: valor })} />
                                </View>
                            </View>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                marginTop: 15
                            }}>Data Inicial</Text>
                            <Divider theme="dark" style={{ padding: 5 }} />
                            <DatePicker
                                style={style.datainsert}
                                date={this.state.date}
                                mode="date"
                                placeholder="Data Inicio"
                                format="DD-MM-YYYY"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 10,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        backgroundColor: '#fff',
                                        marginTop: 20,
                                        marginLeft: 36,
                                        height: 60,

                                    },
                                    dateText: {
                                        fontSize: 20,
                                        paddingLeft: 15,
                                        width: '100%',
                                        textAlign: 'left'
                                    }
                                }}
                                onDateChange={(date) => { this.setState({ date: date }) }}
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
                                        value={this.state.saldo}
                                        onChangeText={text => {
                                            this.setState({
                                                saldo: text
                                            })
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
                                    onPress={() => this.handleSubmit()}>Inserir</Button>
                                <Button
                                    style={style.bcancelar}
                                    icon='logout'
                                    mode='outlined'
                                    color='blue'
                                    contentStyle={{ height: 50 }}
                                    onPress={() => this.setState({ ...this.state, modalVisible: false })}>Sair</Button>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View >
        );
    }
}


const mapStateToProps = (state) => {
    return {
        conta: state.conta
    }
}

const mapDispatchToProps = { listConta }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyComponent)