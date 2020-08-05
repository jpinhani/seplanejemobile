import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { Text, FlatList, View } from 'react-native';
import { config, userID } from './../../components/auth';
import api from './../../services/api';

export default () => {

    const dispatch = useDispatch();
    const receitaData = useSelector(state => state.receitaprevista);
    
    async function requestapi(){
        const token = await config();
        const userId = await userID();
        const response = await api.get(`api/receitas/${userId}`,token)

        dispatch({
          type:'LIST_RECEITAPREVISTA',
          payload: response.data
        });
             
    }                  

    useEffect(()=>{
       requestapi(); 

    },[requestapi])

    return(
       <View>
        <Text>Teste de Receita Prevista</Text>
        <FlatList
            showsVerticalScrollIndicator={false}
            data={receitaData}
            keyExtractor={receitaData => String(receitaData.ID)}
            renderItem={({item:receitaMeta})=>(
                 <View>
                    <Text>{receitaMeta.DESCR_RECEITA}</Text>  
                 </View>

            )}
        />
      </View>      

    )
}