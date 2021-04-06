<template>
<b-container>
  <b-row align-v="center" style="min-height:100vh">
    <b-col cols="12" offset="0" md="8" offset-md="2" lg="4" offset-lg="4">
        <b-card-group deck>
            <b-card
                border-variant="dark"
                header-bg-variant="dark"
                header-text-variant="white"
                align="center"
            >
            <template v-slot:header>
             <b-row>
                  <b-col xs="12" md="6" class="pr-md-0">
                      <b-button class="m-0" squared :pressed="true" block>Belépés</b-button>
                  </b-col>

                  <b-col xs="12" md="6" class="pl-md-0">
                    <router-link to="/register">
                      <b-button class="m-xs-auto" squared block>Regisztráció</b-button>
                    </router-link>
                  </b-col>
              </b-row>    
            </template>                
                <b-card-text>
                    <b-form-input
                    v-on:keyup.enter="login"
                    v-model="username"
                    :state="usernameState"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="Felhasználónév"
                    trim
                    ></b-form-input>

                    <b-form-invalid-feedback id="input-live-feedback" v-if="this.errormsg">
                        {{this.errormsg.username}}
                    </b-form-invalid-feedback>

                    <b-form-input
                    v-on:keyup.enter="login"
                    type="password"
                    v-model="password"
                    :state="passwordState"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="Jelszó"
                    trim
                    class="mt-3"
                    ></b-form-input>

                    <b-form-invalid-feedback id="input-live-feedback" v-if="this.errormsg">
                        {{this.errormsg.password}}
                        {{this.errormsg.email_notverified}}
                        {{this.errormsg.user_notverified}}
                    </b-form-invalid-feedback>

                    <div class="mt-3">
                        <b-button @click="login" block class="p-10" squared variant="outline-primary" align-v="center">
                            Belépés
                        </b-button>
                        <hr mb-3>
                        <router-link to="user/newPassword">
                        <b-button block class="p-10" squared variant="outline-primary" align-v="center">
                            Elfelejtett jelszó
                        </b-button>
                        </router-link>
                    </div>

                </b-card-text>
            </b-card>
        </b-card-group>
    </b-col>
  </b-row>
</b-container>
</template>

<script>

import Authentication from '../api/Authentication';

export default {
  inject: ['loadingSpinner', 'navBar'],
  data() {
    return {
        username: '',
        email: '',
        password: '',
        intro: '',
        usernameState: null,
        passwordState: null,
        errormsg: null,
        message: ''
    }
  },
  mounted() {
    this.navBar.val = false;
  },
  methods: {
    async login() {

      this.loadingSpinner.val = true;
      this.$store.dispatch('LOGIN', {
          username: this.username,
          password: this.password
      })
      .then(response => {
        console.log("Sikeres login:" + response)
        this.$emit('showMessage', {
          title: response.data.message,
          message: "Üdvözöllek a weboldalon!",
          variant: "success"
        });
        this.loadingSpinner.val = false;
        this.navBar.val = true;
        this.$router.push('/');
        this.$emit('loadDep');

      })
      .catch(err => {
        this.loadingSpinner.val = false;
        this.errormsg = err.data
        this.usernameState = this.errormsg.username || this.errormsg.password || this.errormsg.user_notverified || this.errormsg.email_notverified ? false : true;
        this.passwordState = this.errormsg.password || this.errormsg.user_notverified || this.errormsg.email_notverified ? false : true;
      })
    }
  }
}
</script>
