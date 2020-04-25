<template>
  <div id="app">
     <b-alert variant="success" dismissible show v-if="this.message">
      {{this.message}}
    </b-alert>
    <Navbar hidden />
    <router-view @message="showMessage" />
  </div>
</template>
<style>
</style>

<script>
import Navbar from "./components/Navbar";

export default {
  components:{
    Navbar
  },
   data() {
    return {
        message: ''
    }
  },
  methods: {
    showMessage(value) {
      console.log(value)
      this.$bvToast.toast('Átlettél irányítva a főoldalra, most már bejelentkezhetsz. Kellemes időtöltést.', {
          title: value,
          variant: 'success',
          autoHideDelay: 5000,
          appendToast: false
        })
    }
  }
  }
</script>
