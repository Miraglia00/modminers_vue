import api from './api';

async function getUsername(id) {
    const user = await api().get(`user/data/${id}`)
    return user.username
}

async function getId(username) {
    return api().get('user/getid/' + username)
}

export default {
    getUsername,
    getId
}