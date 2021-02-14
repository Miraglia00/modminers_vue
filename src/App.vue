<template>
  <div id="app">
    <LoadingSpinner :start="loadspin.val" />
    <PageSpinner :start="pagespin.val" />
    <Navbar v-if="navbar.val" />
    <NetworkError v-if="neterror"/>
    <router-view v-if="!neterror" v-on:showMessage="showMessage" v-on:loadDep="loadDep"/>
    <fab
      :position="fab.position"
      :bg-color="fab.bgColor"
      :actions="fabActions"
      :icon-size="fab.iconSize"
      @openLog="openLog"
      @game="game"
    ></fab>
    <Log />
  </div>
</template>
<style>
</style>

<script>
import Navbar from './components/Navbar';
import Authentication from './api/Authentication'
import UserFunc from './api/UserFunctions'
import LoadingSpinner from './components/LoadingSpinner';
import PageSpinner from './components/PageSpinner';
import NetworkError from './views/errors/NetworkError';
import Log from './components/Log';

import api from './api/api.js';
import PageFunc from './api/PageFunctions.js'
import LogFunc from './api/LogFunctions'

export default {
  components:{
    Navbar,
    LoadingSpinner,
    PageSpinner,
    NetworkError,
    Log
  },
   data() {
    return {
      loadspin: {
        val: false
      },
      pagespin: {
        val: true,
        text: 'Az olal betöltése...',
        timeout: true
      },
      navbar: {
        val: false
      },
      neterror: false,
      noRed: ["EmailVerification", "newPassword", "SocketTest"],
      settings: null,
      fab: {
        bgColor: '#416790',
        position: 'bottom-right',
        iconSize: 'small',
      },
      logs: {
        val: []
      }
    }
  },
  provide() {
    return {
      pageSpinner: this.pagespin,
      loadingSpinner: this.loadspin,
      navBar: this.navbar,
      userLogs: this.logs
    };
  },
  mounted() {
    this.$nextTick(async function () {
       //this.checkNetwork();
      if(this.neterror == true){
          this.navbar.val = false
      }else{
        if(this.$store.getters.loggedIn){
           this.navbar.val = true;
           await this.loadDep()
           PageFunc.getSettings()
           .then((res) => this.settings = res.data[0])
        }
      }
    })
  },
  computed: {
    loggedIn: () => this.$store.getters.loggedIn,
    fabActions() {
      if(this.$store.getters.getSettings.game == true){
        return [
          { name: 'game', icon: 'sports_esports' },
          { name: 'openLog', icon: 'code' }
        ]
      }else{
        return [
          { name: 'openLog', icon: 'code' }
        ]
      }
    }
  },
  methods: {
    game(){
      PageFunc.downloadGame()
      .then(res => this.showMessage({
        title: "Játék letöltése elkezdve!",
        message: "A telepítést értelem szerűen végezd el, ha gondod akadt használd az oldalon található segédletet.",
        variant: "info"
      }))
      .catch(err => {
        this.showMessage({
          title: "Játék letöltése sikertelen!",
          message: err.message,
          variant: "danger"
        })
      })
    },
    async openLog(){
        this.$root.$emit('bv::show::modal', 'log-modal', '#btnShow')
        let count = 0
        let admin_logs = ""
        const logs = await LogFunc.getUserLog(this.$store.getters.getUser.id)

        count += logs.data.length

        if(this.$store.getters.isAdmin) {
          admin_logs = await LogFunc.getAdminLog()
          count += admin_logs.data.length
        }

        if(count != this.logs.val.lenght) {
          this.logs.val = []
          admin_logs.data.forEach(e => {
            this.logs.val.push(e)
          });
          logs.data.forEach(e => {
            this.logs.val.push(e)
          })
        }

        if(this.logs.val === []) {
          return false
        }else return this.logs.val
        
    },
    showMessage(message) {
      this.$bvToast.toast(message.message, {
        title: message.title,
        variant: message.variant,
        solid: true
      })
    },
    checkNetwork() {
      this.pagespin.val = true;
      this.pagespin.timeout = false;
      this.navbar.val = false;
      this.$nextTick(async function () {
        const res = await api().get('wakeup', {})
        .then(() => {
            this.pagespin.timeout = true;
        })
        .catch(error => {
            if(error.message === "Network Error") {
              this.neterror = true;
              this.navbar.val = false;
              this.pagespin.val = false;
              this.pagespin.timeout = true;
            }
        });
      });
    },
    async loadDep(){

      if(this.$store.getters.loggedIn == false) return false

      this.pagespin.text = "Adatok lekérdezése..."

      this.pagespin.text = "Játékos adatok lekérdezése..."
      this.$store.dispatch("SET_USER_SKILLS")
      .catch(err => {
        this.showMessage({message: "Hiba történt a felhasználó adatainak betöltése során! Error: " + err, title: "Hiba a függőségek betöltése közben!", variant: "danger"})
      })

      this.pagespin.text = "Adatok betöltése..."
      this.$store.dispatch("GET_SKILLS")
      .catch(err => {
        this.showMessage({message: "Hiba történt a skillek betöltése során! Error:" + err.message, title: "Hiba a függőségek betöltése közben!", variant: "danger"})
      })
      if(this.$store.getters.isAdmin){
        this.$store.dispatch('GET_ALL_PLAYER')
      }
      //TODO: STORE EVERYTHING IN JWT AND ASSIGN FROM IT TO STORE
      //TODO: GET PAGE SETTINGS AND ADD TO STORE
      
    },
    redirect() {
      if(!this.$store.getters.loggedIn) {
        this.$router.replace("/login")
      }
    }
  },
  }
</script>
<style >
body {
  height: 100%;
}

.noti {
  position: relative;
  left: 28px;
  top:-15px
}

.admin-noti {
  position: relative;
  left: 3px;
  top:-15px
}
</style>
