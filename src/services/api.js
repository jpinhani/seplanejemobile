import axios from 'axios';
// import {} from 'react-native-dotenv';
// import { SP_URL} from 'react-native-dotenv';

const api = axios.create({
<<<<<<< HEAD
    baseURL: 'http://192.168.0.102:8082'
    //baseURL: process.env.SP_URL

=======
    baseURL: 'http://192.168.0.11:8082'
>>>>>>> 782eeb1bcf6036f419215c66e2991b2844664822
})

export default api;