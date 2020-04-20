<template>
<div>
  <h1>Regisztráció</h1>

  <input type="text" v-model="username" name="username" placeholder="felhasználónév" /><br />
  <input type="email" v-model="email" name="email" placeholder="email" /><br />
  <input type="password" v-model="password" name="password" placeholder="jelszó" /><br />
  <textarea name="indtroduction" v-model="intro" cols="30" rows="3" placeholder="Rövid bemutatkozás"></textarea><br />

  <button @click="register">Regisztráció</button>
</div>
</template>

<script>

import Authentication from '../api/Authentication';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      intro: ''
    }
  },
  methods: {
    async register() {
      try {
        const response = await Authentication.register({
          username: this.username,
          email: this.email,
          description: this.intro,
          password: this.password
        })
         console.log(response.data)
      }catch(err) {
        console.log(err.response.data)
      }
    }
  }
}
</script>
