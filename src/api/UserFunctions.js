import api from './api';

function verifyEmail (payload) {
    return api().post(`user/verifyEmail?username=${payload.username}&email=${payload.email}&key=${payload.key}`)
}

export default {
    verifyEmail
}