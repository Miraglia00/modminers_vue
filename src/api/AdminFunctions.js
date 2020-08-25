import api from './api';

async function getAllPlayer() {
    const users = await api().get(`user/getall/`)
    return users
}

async function updatePlayer(id, payload) {
    return await api().patch('user/update/' + id, payload)
}

export default {
    getAllPlayer,
    updatePlayer
}