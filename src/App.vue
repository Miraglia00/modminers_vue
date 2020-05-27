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
      neterror: false
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
    this.checkNetwork();
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
    }
  },
  }
</script>
