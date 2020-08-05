import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { Text, FlatList, View } from 'react-native';
import { config, userID } from './../../components/auth';
import api from './../../services/api';

export default () => {
    
    const dispatch = useDispatch();
    const despesaData = useSelector(state => state.despesaprevista);

     async function requestapi(){
          const token = await config();
          const userId = await userID();
          const response = await api.get(`api/despesas/${userId}`,token)

          dispatch({
              type: 'LIST_DESPESAPREVISTA',
              payload: response.data
          });
        
     }

    useEffect(()=>{
        requestapi();
    },[requestapi])

    return(
        <View>
            <Text>Teste de Despesa Prevista</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={despesaData}
                keyExtractor={despesaData => String(despesaData.ID)}
                renderItem={({ item: despesaMeta }) => (
                    <View>
                        <Text>{despesaMeta.DESCR_DESPESA}</Text>
                        <Text>{despesaMeta.DT_PREVISTO}</Text>
                        <Text>{despesaMeta.VL_PREVISTO}</Text>
                        <Text>{despesaMeta.DESCR_CATEGORIA}</Text>
                    </View>
                )}
            />
         </View>
    )
}