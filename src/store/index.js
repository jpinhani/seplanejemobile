import { createStore, combineReducers } from 'redux'

import contaReducer from './reducers/actionReducer';
import cartaoReducer from './reducers/actionCartaoReducer';
import categoriaReducer from './reducers/actionCategoriaReducer';
import visaoReducer from './reducers/actionVisaoReducer';
import IslogedReducer from './reducers/isLogedReducer';
import receitaprevistaReducer from './reducers/actionreceitaPrevistaReducer';

const reducers = combineReducers({
    conta: contaReducer,
    isloged: IslogedReducer,
    cartao: cartaoReducer,
    visao: visaoReducer,
    categoria: categoriaReducer,
    receitaprevista: receitaprevistaReducer,
})

export default createStore(reducers)