import api from './api';

function register (payload) {
    return api().post('user/register', payload)
}

function login(payload) {
    return api().post('user/login', payload)
}

function wakeUp() {
    const res = api().get('wakeup', {})
    .then(response => { 
        return true;
    })
    .catch(error => {
        if(error.message === "Network Error") {
            return false
        }
    });
}

export default {
    register,
    login,
    wakeUp
}