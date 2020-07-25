import api from './api';

function register (payload) {
    return api().post('user/register', payload)
}

async function login(payload) {
    return await api().post('user/login', payload)
}

async function verifyT(token) {
    return await api().post('auth/verifyToken', {token: token})
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

async function logout() {
    return true
}

export default {
    register,
    login,
    wakeUp,
    logout,
    verifyT
}