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
                    <h4 class="mb-0">
                      Belépés                      
                    </h4>
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
                        {{this.errormsg.password}}<br /><br />
                        {{this.errormsg.email_notverified}}
                        {{this.errormsg.user_notverified}}
                    </b-form-invalid-feedback>

                    <div class="mt-3">
                        <b-button @click="login" block class="p-10" squared variant="outline-primary" align-v="center">
                            Belépés
                        </b-button>
                        <hr mb-3>
                        <b-button @click="newPassword" block class="p-10" squared variant="outline-primary" align-v="center">
                            Elfelejtett jelszó
                        </b-button>
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
  inject: ['mySpinner'],
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
  methods: {
    async login() {
     this.mySpinner.val = true;
     try {
        const response = await Authentication.login({
          username: this.username,
          password: this.password
        })
        this.mySpinner.val = false;
        this.message = response.data.message;
        this.$emit('showMessage', {
          title: this.message,
          message: "Üdvözöllek a weboldalon!",
          variant: "success"
        });
        this.$router.replace('/');
      }catch(err) {
        this.mySpinner.val = false;
        this.errormsg = err.response.data
        this.usernameState = this.errormsg.username || this.errormsg.notverified ? false : true;
        this.passwordState = this.errormsg.password || this.errormsg.notverified ? false : true;
      }
    }
  }
}
</script>
