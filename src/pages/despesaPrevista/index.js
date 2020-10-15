import React,{useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { Text, FlatList, View,TouchableOpacity } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import SearchFilter from './../../components/searchList';
import {Divider,Searchbar} from 'react-native-paper';
import { Feather,AntDesign,Entypo } from '@expo/vector-icons';
import { config, userID } from './../../components/auth';
import InsertDespesa from './insert';
import moment from 'moment';
import api from './../../services/api';

import  style from './style.js';

export default (props) => {
    
    const dispatch = useDispatch();
    const despesaData = useSelector(state => state.despesaprevista);
    const [search, setSearch] = useState('');

     async function requestapi(){
          const token = await config();
          const userId = await userID();
          const response = await api.get(`api/despesas/${userId}`,token)

          dispatch({
              type: 'LIST_DESPESAPREVISTA',
              payload: response.data
          });
        
     }

     function formataDinheiro(n) {
        return "R$ " + n.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
    }

    useEffect(()=>{
        requestapi();
    },[requestapi])

    return(
        <View style={style.container}>
            <View style={style.novoDespesa}>
                <View>
                    <AntDesign name="menufold" onPress={() => { props.navigation.dispatch(DrawerActions.toggleDrawer()); }}
                        size={50} color="black" />
                </View>
                <View style={{ paddingLeft: 20 }}>
                    <InsertDespesa/>
                    {/* <AntDesign name="pluscircle" size={50} color="blue" /> */}
                </View>
            </View>
            <View style={style.searchbar}>
               <Searchbar
                    style={{ backgroundColor: '#FFFAFA' }}
                    placeholder="Buscar Despesas Previstas"
                    value={search}
                    onChangeText={filtro => setSearch(filtro)}
                />
            </View> 
            <FlatList
                showsVerticalScrollIndicator={false}
                data={SearchFilter(despesaData,['DESCR_DESPESA','DESCR_CATEGORIA'],search) }
                keyExtractor={despesaData => String(despesaData.ID)}
                renderItem={({ item: despesaMeta }) => (
                    <View style={style.flatlistcontainer}> 
                      <View style={style.flatlistdescription}>
                          <View style={style.containerdescription}>
                             <AntDesign name='profile' size={35}/>
                             <Text  style={style.type}>Descrição:</Text>
                          </View>   
                        <Text  style={style.detail}>{despesaMeta.DESCR_DESPESA}</Text>
                        <Divider style={{padding: 1.5}}/>
                      </View>
                      
                    <View style={style.flatlistitenscontainer}>  
                            <View style={style.flatlistitens}>
                                <View style={style.containerdescription}>
                                    <AntDesign name='switcher' size={35}/>
                                    <Text  style={style.type}>Categoria:</Text>
                                </View>
                                <Text  style={style.detail}>{despesaMeta.DESCR_CATEGORIA}</Text>
                                <Divider style={{padding: 1.5}}/>
                                <View style={style.containerdescription}>
                                    <Feather name='credit-card' size={35}/>
                                    <Text  style={style.type}>Cartão:</Text>
                                </View>
                                <Text  style={style.detail}>{despesaMeta.CARTAO ?
                                                            despesaMeta.CARTAO :
                                                            "A VISTA"}</Text>
                                <Divider style={{padding: 1.5}}/>
                                <View style={style.datandvalue}>
                                    <View style={style.datandvaluedetail}>
                                            <View style={style.containerdescription}>
                                                    <Feather name='calendar' size={35}/>
                                                    <Text  style={style.type}>Data Prevista:</Text>
                                            </View>
                                            <Text  style={style.detail}>{moment(despesaMeta.DT_PREVISTO).format("DD-MM-YYYY")}</Text>
                                    </View>

                                    <View style={style.datandvaluedetail}>
                                             <View style={style.containerdescription}>
                                                    <Entypo name='credit' size={35}/>
                                                    <Text  style={style.type}>Previsto:</Text>
                                             </View>
                                            <Text  style={style.detail}>{formataDinheiro(despesaMeta.VL_PREVISTO2)}</Text>
                                    </View>
                                </View>
                            </View>
                   
                            <View style={style.flatlisticons}>

                                <Feather style={style.iconelist} name="edit" size={35} color="blue" />
                                
                                <TouchableOpacity
                                     onPress={()=> alert("Teste Fabiano")}>
                                    <Feather style={style.iconelist} name="delete" size={35} color="#E02041" />
                                </TouchableOpacity>
                            </View>
                   </View>
                  </View>
                )}
            />
         </View>
    )
}