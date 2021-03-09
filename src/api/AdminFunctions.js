import api from './api';

async function getAllPlayer() {
    const users = await api().get(`user/getall/`)
    return users
}

async function updatePlayer(id, payload) {
    return await api().patch('user/update/' + id, payload)
}

async function deletePlayerData(id) {
    return await api().delete('user/delete/' + id)
}

async function deletePlayerNotifications(id){
    return await api().delete('log/delete/userid/' + id)
}

export default {
    getAllPlayer,
    updatePlayer,
    deletePlayerData,
    deletePlayerNotifications
}