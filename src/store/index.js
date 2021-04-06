import Vue from "vue";
import Vuex from "vuex";

import Auth from '../api/Authentication'
import UserFunc from '../api/UserFunctions'
import UserInf from '../api/UserInformation'
import Skills from '../api/Skills'
import AdminFunc from '../api/AdminFunctions'
import PageFunc from '../api/PageFunctions'
import LogFunc from '../api/LogFunctions'

import axios from 'axios';


Vue.use(Vuex)

import cookies from 'vue-cookies'

import Socket from '../socket/sc';

export default new Vuex.Store({
    state: {
        token: cookies.get('token') || null,
        admin: cookies.get('token') ? Auth.verifyT(cookies.get('token')).then((res) => {return res.data.admin}).catch((err) => {return null}) : null,
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
        skills: null,
        notificationCounts: {},
        users: [],
        settings: [],
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
            state.user.id = null
            state.user.username = null
            state.user.skin = null
            state.user.sex = null
            state.user.email = null
            state.user.server = null
            state.admin = null
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
        },
        destroySkills(state) {
            state.skills = null
        },
        setNotificationCounts(state, counts) {
            state.notificationCounts = counts
        },
        setAllUser(state, users) {
            state.users = users
        },
        setSettings(state, sett) {
            state.settings = sett
        },
        destroyAllUser(state) {
            state.users = []
        },
        destroySettings(state) {
            state.settings = []
        }
    },
    actions: {
        LOGIN(context, payload) {

            return new Promise((resolve, reject) => {
                Auth.login(payload)
                .then(async (res) => {
                    const token = res.data.token;
                    const user = res.data.user
                    const temp_res = res
                    cookies.set('token', token)
                    cookies.set('userID', user._id)
                    cookies.set('username', user.username)
                    cookies.set('skin', user.skin)
                    cookies.set('sex', user.sex)
                    cookies.set('email', user.email)
                    cookies.set('server', user.s_rang)
                    context.commit('setToken', token)
                    context.commit('setUserInfo', user)

                    LogFunc.addLog({user_id: user._id, message: "Sikeres bejelentkezés észlelve. IP: " + res.data.ip, variant: "success"})
                    LogFunc.addLog({user_id: "admin", message: "'" + user.username + "'(" + user._id + ") belépett az oldalra erről az IP címről: " + res.data.ip})

                    Auth.verifyT(context.getters.getToken)
                    .then(res => {
                        context.commit('setAdmin', res.data.admin)
                        resolve(temp_res)
                    })
                    .catch(err => {
                        context.commit('setAdmin', false)
                        reject(err.response)
                    })
                })
                .catch(async (err) => {
                    if(JSON.parse(err.config.data).username != "" || JSON.parse(err.config.data).password != "") {
                        console.log(err.response.data)
                        const username = JSON.parse(err.config.data).username
                        const id =  err.response.data._id
                        const ip =  err.response.data.ip

                        LogFunc.addLog({user_id: id, message: "Sikertelen bejelentkezés észlelve. Ok: "+ err.response.data.log_message + " IP: " + ip, 
                                        variant: "danger", 
                                        icon: "login"})
                        LogFunc.addLog({user_id: "admin", 
                                        message: "'" + username + "'(" + id + ") megpróbált belépni de nem sikerült. Ok: "+ err.response.data.log_message + " IP: " + ip, 
                                        variant: "danger", 
                                        icon: "login"})
                        reject(err.response)
                    }else{
                        reject(err.response)
                    }
                   
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
                        context.commit('destroySkills')
                        context.commit('destroyAllUser')
                        context.commit('destroySettings')
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
                        context.commit('destroySkills')
                        context.commit('destroyAllUser')
                        context.commit('destroySettings')
                        reject(err)
                    })
                });
            }
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
                    Socket.setSkin(context.getters.getToken, context.getters.getUsername, payload.sex + "" +payload.skin)
                    .then((res) => {
                        UserFunc.setSkin(context.getters.getUser.id, payload.skin)
                        .then((res) => {
                            context.commit('updateSkin', payload.skin)
                            cookies.set('skin', payload.skin)
                            resolve(res)
                        })
                        .catch((err) => {
                            reject(err)
                        })
                    }).catch(err => console.log(err))
                }
            })
        },
        SET_NOTIFICATION_COUNTS(context, payload) {
            return new Promise((resolve, reject) => {

                let notis = {}
                let regs = 0

                if(context.getters.loggedIn) {

                    AdminFunc.getAllPlayer()
                    .then(res => {
                        regs = res.data.filter(x => x.permissions.verified == 0)
                        regs = regs.length

                        if(payload != null) {regs = payload.pending}

                        notis = {
                            profile: context.getters.getUserSkills.tp,
                            admin: {
                                users: 0,
                                regs: regs,
                                all: regs
                            }
                        }

                        context.commit('setNotificationCounts', notis)
                        resolve(true)
                    })
                    .catch(err => reject(err))
                }
            })
        },
        GET_ALL_PLAYER(context) {
            return new Promise((resolve, reject) => {
                AdminFunc.getAllPlayer()
                .then(res => {
                    if(res.data) {
                        context.commit('setAllUser', res.data)
                        resolve(res.data)
                    }
                })
                .catch(err => {
                    console.log("err" + err)
                })
            })
        },
        GET_SETTINGS(context) {
            return new Promise((resolve, reject) => {
                PageFunc.getSettings()
                .then((res) => {
                    context.commit('setSettings', res.data[0])
                    resolve(res.data[0])
                })
                .catch(err => reject(err))
            })
        },
        UPDATE_SETTINGS(context, settings) {
            return new Promise((resolve, reject) => {
                PageFunc.saveSettings(settings)
                .then((res) => {
                    context.commit('setSettings',settings)
                    resolve(res)
                })
                .catch(err => reject(err))
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
        getUserSkills: state => state.userSkills,
        notificationCount: state => state.notificationCounts,
        allPlayer: state => state.users,
        getSettings: state => state.settings
    }
});