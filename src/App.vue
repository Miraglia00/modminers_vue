<template>
  <div id="app" style="background-color: #b1b1b1">
     <b-alert variant="success" dismissible show v-if="this.message">
      {{this.message}}
    </b-alert>
    <Navbar hidden />
    <router-view @message="showMessage" />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
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
