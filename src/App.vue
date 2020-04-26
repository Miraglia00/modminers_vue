<template>
  <div id="app">
    <Navbar hidden/>
    <router-view v-on:showMessage="showMessage" />
  </div>
</template>
<style>
</style>

<script>
import Navbar from './components/Navbar';
import Authentication from './api/Authentication'

export default {
  components:{
    Navbar
  },
   data() {
    return {
    }
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
