import api from './api';

export default {
    createkey (payload) {
        return api().post('auth/create', payload)
    }
}