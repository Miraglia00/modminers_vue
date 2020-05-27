import api from './api';

function register (payload) {
    return api().post('user/register', payload)
}

function login(payload) {
    return api().post('user/login', payload)
}

async function wakeUp() {
    const res = await api().get('wakeup', {})
    .then(() => { 
        return 1;
    })
    .catch(error => {
        if(error.message === "Network Error") {
            console.log("networkerr");
        }
    });
}

export default {
    register,
    login,
    wakeUp
}