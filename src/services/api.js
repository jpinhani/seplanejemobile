import axios from 'axios';
import { processColor } from 'react-native';

const api = axios.create({
    baseURL: 'http://192.168.0.102:8082'
    //baseURL: process.env.SP_URL

})

export default api;