import axios from 'axios';
// import {} from 'react-native-dotenv';
// import { SP_URL} from 'react-native-dotenv';

const api = axios.create({
    baseURL: 'http://192.168.0.103:8082'
})

export default api;