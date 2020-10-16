import axios from 'axios';
// import {} from 'react-native-dotenv';
// import { SP_URL} from 'react-native-dotenv';

const api = axios.create({
<<<<<<< HEAD
    baseURL: 'http://192.168.0.2:8082'
=======
    baseURL:'http://192.168.0.103:8082'
>>>>>>> 86057fb3cf34274b7ad57f9bc751a1182d9e6d25
})

export default api;