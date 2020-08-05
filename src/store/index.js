import { createStore, combineReducers } from 'redux'

import contaReducer from './reducers/actionReducer';
import cartaoReducer from './reducers/actionCartaoReducer';
import categoriaReducer from './reducers/actionCategoriaReducer';
import visaoReducer from './reducers/actionVisaoReducer';
import IslogedReducer from './reducers/isLogedReducer';
<<<<<<< HEAD
import receitaprevistaReducer from './reducers/actionreceitaPrevistaReducer';
=======
import despesaprevistaReducer from './reducers/actionDespesaPrevistaReducer';
>>>>>>> 782eeb1bcf6036f419215c66e2991b2844664822

const reducers = combineReducers({
    conta: contaReducer,
    isloged: IslogedReducer,
    cartao: cartaoReducer,
    visao: visaoReducer,
    categoria: categoriaReducer,
<<<<<<< HEAD
    receitaprevista: receitaprevistaReducer,
=======
    despesaprevista: despesaprevistaReducer,
>>>>>>> 782eeb1bcf6036f419215c66e2991b2844664822
})

export default createStore(reducers)