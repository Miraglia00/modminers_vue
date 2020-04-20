import api from './api';

export default {
    register (payload) {
        return api().post('user/register', payload)
    }
}