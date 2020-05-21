import api from './api';

function verifyEmail (payload) {
    return api().post(`user/verifyEmail?username=${payload.username}&email=${payload.email}&key=${payload.key}`)
}

function newPassword (payload) {
    return api().post(`user/verifyEmail?username=${payload.username}&email=${payload.email}&key=${payload.key}`, payload.passwords)
}

function sendPswReset(payload) {
    return api().post('user/sendPswReset', payload)
}

export default {
    verifyEmail,
    newPassword,
    sendPswReset
}