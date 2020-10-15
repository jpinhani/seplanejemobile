import React, {useState} from 'react';
import {View, Modal,TouchableHighlight, Text } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import {AntDesign, Feather} from '@expo/vector-icons';
import {Button, TextInput} from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import moment from 'moment';
import style from './style';

export default () =>{
    const [visiblemodal, setVisibleModal] = useState(false)
    const [isDatePickerVisible, setisDatePickerVisible] = useState(false)
    const [date, setDate] = useState(moment().format("DD-MM-YYYY"));
    const [saldo, setSaldo] = useState('0');

      
    const hideDatePicker = () => {
        setisDatePickerVisible(false)
    };

    const handleConfirm = (date) => {
        setisDatePickerVisible(false)
        setDate(moment(date).format("DD-MM-YYYY"));
    };




    return(
       <View>
           <TouchableHighlight
            onPress={() => setVisibleModal(true)}
            >
            <AntDesign name = 'pluscircle' size = {50} color = 'blue'/>



           </TouchableHighlight>
           <View style = {style.modal1}>
             <Modal
                animated = {'slide'}
                visible={visiblemodal}  
             >
                 <View style = {style.modal}>
                       <View>
                        <Text style={{
                            fontSize: 48,
                            fontWeight: 'bold',
                            color: 'red'
                        }}>Se<Text style={{
                            fontSize: 28,
                            color: '#ffff',
                        }}>Planeje</Text></Text>
                        </View>
                        <Text>Data Prevista</Text>
                        <TouchableHighlight
                                
                                onPress={()=> setisDatePickerVisible(true)} 
                                >
                          <View style={style.icon}>
                            <View style={{ width: '8%' }}>
                                <AntDesign name="calendar" size={30} color="black" />
                            </View>
                            <View style={{ width: '90%' }}>
                                <TextInput
                                style={style.deteInput}
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
                                // display='calendar'
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                        <Text>Valor Previsto</Text>
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
                                    onChangeText={text => {
                                        setSaldo(text)
                                    }}
                                />
                            </View>
                        </View>
                        <Text>Categoria</Text>
                        <TextInput/>
                        <Text>N. Parcelas</Text>
                        <TextInput/>
                        <Text>Descrição</Text>
                        <TextInput/>
                        <Button 
                        onPress ={() => setVisibleModal(false)}>Teste Sair</Button>
                      </View> 
             </Modal>
           </View>
       </View>
    )
}