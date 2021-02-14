import axios from 'axios';
import cookies from 'vue-cookies'

import api from './api';

const ax = axios.create({
    baseURL: 'https://graph.facebook.com/v7.0/ModMiners/',
})

function getPosts () {
    return ax.get(`feed?access_token=${process.env.VUE_APP_FB}&fields=message,created_time,attachments,permalink_url&limit=5`)
}

function getSettings () {
    return api().get('page')
}

function saveSettings (payload) {
    return api().patch('page', payload)
}

function downloadGame() {
    return axios.get('http://www.modminers.hu/launcherFiles/ModMiners%Launcher.exe')
}

export default {
    getPosts,
    getSettings,
    saveSettings,
    downloadGame
}
