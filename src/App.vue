<template>
  <div id="app">
    <LoadingSpinner :start="loadspin.val" />
    <PageSpinner :start="pagespin.val" />
    <Navbar :v-if="navbar.val" />
    <NetworkError v-if="nerror" />
    <router-view v-else v-on:showMessage="showMessage" />
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
      nerror: false
    }
  },
  provide() {
    return {
      pageSpinner: this.pagespin,
      loadingSpinner: this.loadspin,
      navBar: this.navbar
    };
  },
  mounted: async () => {
    const wake = await Authentication.wakeUp();
    if(wake == false) {
      console.log("hiba")
      this.nerror = true;
    }
  },
  methods: {
    showMessage(message) {
      this.$bvToast.toast(message.message, {
        title: message.title,
        variant: message.variant,
        solid: true
      })
    }
  },
  }
</script>
