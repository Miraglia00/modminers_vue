import Vue from "vue";
import Vuex from "vuex";

import Auth from '../api/Authentication'
import UserFunc from '../api/UserFunctions'
import Skills from '../api/Skills'

Vue.use(Vuex)

import cookies from 'vue-cookies'

import Socket from '../socket/sc';

export default new Vuex.Store({
    state: {
        token: cookies.get('token') || null,
        admin: null,
        user: {
            id: cookies.get('userID') || null,
            username: cookies.get('username') || null,
            skin: cookies.get('skin') || null,
            sex: cookies.get('sex') || null,
            logout: false,
            email: cookies.get('email') || null,
            server: cookies.get('server') || null
        },
        userSkills:{
            tp: 0
        },
        skills: null
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        setUserInfo(state, user) {
            state.user.id = user._id
            state.user.username = user.username
            state.user.skin = user.skin
            state.user.sex = user.sex
            state.user.email = user.email
            state.user.server = user.s_rang
        },
        destroyToken(state) {
            state.token = null
        },
        destroyUserInfo(state) {
            state.user.id = null,
            state.user.username = null
        },
        setAdmin(state,admin) {
            state.admin = admin;
        },
        setSkills(state, skills) {
            state.skills = skills
        },
        setLogout(state, logout) {
            state.user.logout = logout
        },
        setUserSkills(state, payload) {
            state.userSkills = payload
        },
        updateSkin(state, skin) {
            state.user.skin = skin
        },
        destroyUserSkills(state) {
            state.userSkills.tp = null
        }
    },
    actions: {
        LOGIN(context, payload) {
            return new Promise((resolve, reject) => {
                Auth.login(payload)
                .then(res => {
                    const token = res.data.token;
                    const user = res.data.user
                    cookies.set('token', token)
                    cookies.set('userID', user._id)
                    cookies.set('username', user.username)
                    cookies.set('skin', user.skin)
                    cookies.set('sex', user.sex)
                    cookies.set('email', user.email)
                    cookies.set('server', user.s_rang)
                    context.commit('setToken', token)
                    context.commit('setUserInfo', user)
                    resolve(res)
                })
                .catch(err => {
                    reject(err.response.data)
                })
            });
        },
        LOGOUT(context) {
            if(context.getters.loggedIn) {
                return new Promise((resolve, reject) => {
                    Auth.logout()
                    .then(res => {
                        cookies.remove('token')
                        cookies.remove('userID')
                        cookies.remove('username')
                        cookies.remove('skin')
                        cookies.remove('sex')
                        cookies.remove('email')
                        cookies.remove('server')
                        context.commit('destroyToken')
                        context.commit('destroyUserInfo')
                        context.commit('destroyUserSkills')
                        resolve(res)
                    })
                    .catch(err => {
                        cookies.remove('token')
                        cookies.remove('userID')
                        cookies.remove('username')
                        cookies.remove('skin')
                        cookies.remove('sex')
                        cookies.remove('email')
                        cookies.remove('server')
                        context.commit('destroyToken')
                        context.commit('destroyUserSkills')
                        context.commit('destroyUserInfo')
                        reject(err.response.data)
                    })
                });
            }
        },
        ISADMIN(context) {
            return new Promise((resolve, reject) => {
                Auth.verifyT(context.getters.getToken)
                .then(res => {
                    context.commit('setAdmin', res.data.admin)
                    resolve(true)
                })
                .catch(err => {
                    context.commit('setAdmin', false)
                    reject(err.message)
                })
            });
        },
        CHECK_LOGOUT(context) {
            if(context.getters.getUser.id == null) return false
            return new Promise((resolve, reject) => {
                UserFunc.getUser(context.getters.getUser.id)
                .then(res => {
                    context.commit('setLogout', res.data.logout)

                    resolve(res.data.logout)

                    UserFunc.setLogout(context.getters.getUser.id, false)
                })
                .catch(err => {
                    context.commit('setLogout', true)
                    UserFunc.setLogout(context.getters.getUser.id, true)
                   reject(err)
                })
            });
        },
        GET_SKILLS(context) {
            return new Promise((resolve, reject) => {
                Skills.getSkills()
                .then(res => {
                    context.commit('setSkills', res.data)
                    resolve(true)
                })
                .catch(err => {
                    reject(err)
                })
            })
        },
        SET_USER_SKILLS(context, payload = null) {
            return new Promise((resolve,reject) =>{
                if(payload == null){
                    Socket.getPlayerData(context.getters.getToken, context.getters.getUsername)
                    .then((res) => {
                        res = JSON.parse(res)
                        context.commit('setUserSkills', {tp: res.tp})
                        resolve(true)
                    })
                    .catch((err) => {
                        context.commit('setUserSkills', {tp: 0})
                        reject(err)
                    })
                }else{
                    context.commit('setUserSkills', payload)
                }
            })
        },
        SET_SKIN(context, payload) {
            return new Promise((resolve,reject) =>{
                if(payload != null){
                   UserFunc.setSkin(context.getters.getUser.id, payload.skin)
                    .then((res) => {
                        context.commit('updateSkin', payload.skin)
                        cookies.set('skin', payload.skin)
                        resolve(res)
                    })
                    .catch((err) => {
                        reject(err)
                    })
                }
            })
        }
    },
    modules: {},
    getters: {
        getUsername: state => state.user.username,
        loggedIn: state => state.token != null,
        getToken: state => state.token,
        getUser: state => state.user,
        isAdmin: state => state.admin,
        getSkills: state => state.skills,
        getLogout: state => state.user.logout,
        getUserSkills: state => state.userSkills
    }
});