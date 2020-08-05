import { createStore, combineReducers } from 'redux'

import contaReducer from './reducers/actionReducer';
import cartaoReducer from './reducers/actionCartaoReducer';
import categoriaReducer from './reducers/actionCategoriaReducer';
import visaoReducer from './reducers/actionVisaoReducer';
import IslogedReducer from './reducers/isLogedReducer';
import despesaprevistaReducer from './reducers/actionDespesaPrevistaReducer';

const reducers = combineReducers({
    conta: contaReducer,
    isloged: IslogedReducer,
    cartao: cartaoReducer,
    visao: visaoReducer,
    categoria: categoriaReducer,
    despesaprevista: despesaprevistaReducer,
})

export default createStore(reducers)