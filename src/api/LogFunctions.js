import api from './api'

function addLog(payload) {
    return api().post('log', payload)
}

function getUserLog(id) {
    return api().get('log/' + id)
}

function getAdminLog() {
    return api().get('log/admin')
}

export default {
    addLog,
    getUserLog,
    getAdminLog
}