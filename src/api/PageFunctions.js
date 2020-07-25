import axios from 'axios';
import cookies from 'vue-cookies'

const ax = axios.create({
    baseURL: 'https://graph.facebook.com/v7.0/ModMiners/',
})

function getPosts () {
    return ax.get(`feed?access_token=${process.env.VUE_APP_FB}&fields=message,created_time,attachments,permalink_url&limit=5`)
}

export default {
    getPosts
}
