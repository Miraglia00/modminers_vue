import api from './api';

function verifyEmail (payload) {
    return api().post(`user/verifyEmail?username=${payload.username}&email=${payload.email}&key=${payload.key}`)
}

function newPassword (payload) {
    return api().post(`user/verifyEmail?username=${payload.username}&email=${payload.email}&key=${payload.key}`, payload.passwords)
}

function sendPswReset(payload) {
    return api().post('user/sendNewPassword', payload)
}

function checkPswReset(payload) {
    return api().post(`user/newPassword?username=${payload.username}&email=${payload.email}&key=${payload.key}`)
}

function savePswReset(payload) {
    return api().post('user/savePassword', payload)
}

async function getUser(id) {
    return await api().get('user/getdata/' + id, {})
}

async function setLogout(id, value) {
    return await api().patch('user/update/' + id, {logout:value})
}

async function getSkins(sex) {
    return await api().get('skins/' + sex)
}

async function setSkin(id, skinid) {
    return await api().patch('user/update/' + id, {skin: skinid, 'permissions.skin': false})
}

function getServerRang(rang) {
    let rang_s = ""
    switch(rang) {
      case -1: 
        rang_s = false;
        break;
      case 0:
        rang_s = "Játékos";
        break;
      case 1:
        rang_s = "VIP";
        break;
      case 2:
        rang_s = "Moderátor";
        break;
      case 3:
        rang_s = "Admin";
        break;
      case 4:
        rang_s = "Tulajdonos";
        break;
      default:
        rang_s = true
        break;
    }
    return rang_s
}

export default {
    verifyEmail,
    newPassword,
    sendPswReset,
    checkPswReset,
    savePswReset,
    getUser,
    setLogout,
    getSkins,
    setSkin,
    getServerRang
}