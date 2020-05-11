<template>
  <div id="app">
    <LoadingSpinner :start="loadspin.val" />
    <PageSpinner :start="pagespin.val" />
    <Navbar v-if="navbar.val" />
    <router-view v-on:showMessage="showMessage" />
  </div>
</template>
<style>
</style>

<script>
import Navbar from './components/Navbar';
import Authentication from './api/Authentication'
import LoadingSpinner from './components/LoadingSpinner';
import PageSpinner from './components/PageSpinner';

export default {
  components:{
    Navbar,
    LoadingSpinner,
    PageSpinner
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
      }
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
    await Authentication.wakeUp();
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
