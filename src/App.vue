<template>
  <div id="app">
    <LoadingSpinner :start="loadspin.val" />
    <PageSpinner :start="pagespin.val" />
    <Navbar v-if="navbar.val" />
    <NetworkError v-if="neterror"/>
    <router-view v-if="!neterror" v-on:showMessage="showMessage" />
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
import NetworkError from './views/errors/NetworkError'

import api from './api/api.js';

export default {
  components:{
    Navbar,
    LoadingSpinner,
    PageSpinner,
    NetworkError
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
        val: true
      },
      neterror: false,
      noRed: ["EmailVerification", "newPassword", "SocketTest"]
    }
  },
  provide() {
    return {
      pageSpinner: this.pagespin,
      loadingSpinner: this.loadspin,
      navBar: this.navbar
    };
  },
  mounted() {
    this.$nextTick(function () {
       //this.checkNetwork();
      if(this.neterror != true){
        this.loadDep();

        if(!this.$store.getters.loggedIn) {
          this.navbar.val = false
        }else{
          this.navbar.val = true
          this.$store.dispatch("CHECK_LOGOUT")
        }
      }
    })
  },
  computed: {
    loggedIn: () => this.$store.getters.loggedIn
  },
  methods: {
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
    loadDep(){
      let success = false;
      let errors = "";
      let finished = 0;

      this.pagespin.val = true
      this.pagespin.timeout = false;
      this.pagespin.text = "Adatok lekérdezése..."

      this.$store.dispatch("ISADMIN")
      .then(res => {
        if(res === true) {
          success = true
        }
      })
      .catch(err => {
        this.showMessage({message: "Hiba történt az admin validáció során! Error:" + err.message, title: "Hiba a függőségek betöltése közben!", variant: "danger"})
      })
      this.pagespin.text = "Játékos adatok lekérdezése..."
      this.$store.dispatch("SET_USER_SKILLS")
      .then(res => {
        if(res === true) {
          success = true
        }
      })
      .catch(err => {
        if(err == "timeout") {
          success = false;
          errors += "\n Nem sikerült lekérdezni a játékos adatokat!";
        }else{
          success = false;
          errors += "\n A szerver válasza: error";
        }
      })
      this.pagespin.text = "Skillek betöltése..."
      this.$store.dispatch("GET_SKILLS")
      .then(res => {
        if(res === true) {
          success = true
        }
      })
      .catch(err => {
        success = false;
        errors += err.message;
      })

      if(success === true) {
        this.pagespin.val = false
        this.pagespin.timeout = true;
      }else{
        this.pagespin.val = false
        this.pagespin.timeout = true;
        console.log("Hiba")
      }
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
  height: 100%;;
}
</style>
