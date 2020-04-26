import api from './api';

function register (payload) {
    return api().post('user/register', payload)
}

function login(payload) {
    return api().post('user/login', payload)
}

function wakeUp() {
    return api().get('wakeup', {});
}

export default {
    register,
    login,
    wakeUp
}