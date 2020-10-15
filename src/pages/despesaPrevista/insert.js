import React,{useState} from 'react';
import {View,Modal,TouchableHighlight,Text,ScrollView} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import {Button,TextInput,Divider} from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import {AntDesign,Feather} from '@expo/vector-icons'

import style from './style';


export default (props) => {
      const [visibleModal, setVisibleModal] = useState(false);
      const [isDatePickerVisible,setisDatePickerVisible] = useState(false);
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
                <AntDesign name="pluscircle" size={50} color="blue" />
              </TouchableHighlight>
              <View style={style.modal1}> 
             
                    <Modal  
                       animated={"slide"}
                       visible={visibleModal}
                    >
                         <ScrollView>
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
                            
                        }}>Data Prevista</Text>
                        <Divider theme="dark" style={{ padding: 3, marginBottom:5 }} />
                            <TouchableHighlight
                                
                                onPress={()=> setisDatePickerVisible(true)} 
                                >
                          <View style={style.icon}>
                            <View style={{ width: '9%' }}>
                                <AntDesign name="calendar" size={30} color="black" />
                            </View>
                            <View style={{ width: '90%' }}>
                                <TextInput
                                style={style.dateInput}
                                placeholder="Informe a Data Prevista"
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

                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            
                        }}>Valor Previsto</Text>
                        <Divider theme="dark" style={{ padding: 3, marginBottom:5 }} />
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

                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            
                        }}>Categoria</Text>
                        <Divider theme="dark" style={{ padding: 3, marginBottom:5 }} />
                        <View style={style.icon}>
                            <View style={{ width: '8%' }}>
                                <Feather name="flag" size={30} color="black" />
                            </View>
                            <View style={{ width: '90%' }}>
                                <TextInput  style={style.saldo}/>
                            </View>
                        </View>

                            <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            
                        }}>Cartão
                        </Text>
                        <Divider theme="dark" style={{ padding: 3, marginBottom:5 }} />
                        <View style={style.icon}>
                            <View style={{ width: '9%' }}>
                                <Feather name="credit-card" size={28} color="black" />
                            </View>
                            <View style={{ width: '90%' }}>
                                <TextInput  style={style.saldo}/>
                            </View>
                        </View>

                            <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            
                        }}>N. Parcelas</Text>
                        <Divider theme="dark" style={{ padding: 3, marginBottom:5 }} />
                            <View style={style.icon}>
                            <View style={{ width: '9%' }}>
                                <Feather name="server" size={30} color="black" />
                            </View>
                            <View style={{ width: '90%' }}>
                                <TextInput  style={style.saldo}/>
                            </View>
                        </View>
                            <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            
                        }}>Descrição</Text>
                        <Divider theme="dark" style={{ padding: 3, marginBottom:5 }} />
                        <View style={style.icon}>
                            <View style={{ width: '8%' }}>
                                <AntDesign name="copy1" size={30} color="black" />
                            </View>
                            <View style={{ width: '90%' }}>
                                <TextInput  style={style.saldo}/>
                            </View>
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
                                onPress={() => setVisibleModal(false)}>Sair</Button>
                        </View>
                        </View>
                        </ScrollView>
                        
                    </Modal>
                    
              </View>
          </View>
      )
}