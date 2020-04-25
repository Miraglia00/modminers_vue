<template>
  <div id="app">
    <Navbar />
    <router-view v-on:showMessage="showMessage" />
  </div>
</template>
<style>
</style>

<script>
import Navbar from './components/Navbar';

export default {
  components:{
    Navbar
  },
   data() {
    return {
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
