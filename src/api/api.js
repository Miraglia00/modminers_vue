import axios from 'axios';
import cookies from 'vue-cookies'

export default () => {
    return axios.create({
        baseURL: 'http://api.modminers.hu/',
        headers: {'Auth': cookies.get('token') || null}
    })
}