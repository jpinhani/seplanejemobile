import { createStore, combineReducers } from 'redux'

import contaReducer from './reducers/actionReducer';
import cartaoReducer from './reducers/actionCartaoReducer';
import IslogedReducer from './reducers/isLogedReducer';

const reducers = combineReducers({
    conta: contaReducer,
    isloged: IslogedReducer,
    cartao: cartaoReducer
})

export default createStore(reducers)