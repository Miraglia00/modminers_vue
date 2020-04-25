<template>
  <div id="app">
    <Navbar />
    <Toast message="message" />
    <router-view @showMessage="message" />
  </div>
</template>
<style>
</style>

<script>
import Navbar from './components/Navbar';
import Toast from './components/Toast'

export default {
  components:{
    Navbar,
    Toast
  },
   data() {
    return {
        message: {
          title: "Tezst",
          message: "ez egy teszt message",
          variant: "success"
        }
    }
  },
  mounted: function () {
    this.makeToast(this.message);
  },
  methods: {
    showMessage(message) {
      this.message = message;
    },
     makeToast(message) {
        this.$bvToast.toast(message.message, {
            title: message.title,
            variant: message.variant,
            solid: true
        })
      }
  },
  }
</script>
