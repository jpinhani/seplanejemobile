import { createStore, combineReducers } from 'redux'

import contaReducer from './reducers/actionReducer'
import IslogedReducer from './reducers/isLogedReducer';

const reducers = combineReducers({
    conta: contaReducer,
    isloged: IslogedReducer
})

export default createStore(reducers)