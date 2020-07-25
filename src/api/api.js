import axios from 'axios';
import cookies from 'vue-cookies'

export default () => {
    return axios.create({
        baseURL: 'http://localhost:3000/',
        headers: {'Auth': cookies.get('token') || null}
    })
}