import api from './api';

async function getUsername(id) {
    const user = await api().get(`user/data/${id}`)
    return user.username
}

export default {
    getUsername
}