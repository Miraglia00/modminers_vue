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
                <b-col xs="12" md="6" class="pr-0">
                  <router-link to="/login">
                    <b-button class="m-0" squared  block>Belépés</b-button>
                  </router-link>
                </b-col>

                <b-col xs="12" md="6" class="pl-0">
                    <b-button class="m-0" squared :pressed="true" block>Regisztráció</b-button>
                </b-col>
              </b-row>    
            </template>   
                <b-card-text>
                    <b-form-input
                    v-on:keyup.enter="register"
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
                    v-on:keyup.enter="register"
                    v-model="email"
                    :state="emailState"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="Email cím"
                    trim
                    class="mt-3"
                    ></b-form-input>

                    <b-form-invalid-feedback id="input-live-feedback" v-if="this.errormsg">
                        {{this.errormsg.email}}
                        {{this.errormsg.validemail}}
                    </b-form-invalid-feedback>

                    <b-form-input
                    v-on:keyup.enter="register"
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
                    </b-form-invalid-feedback>

                    <b-form-select v-model="selected" :options="options" class="mt-3"></b-form-select>

                    <b-form-textarea
                    v-on:keyup.enter="register"
                    v-model="intro"
                    :state="introState"
                    placeholder="Írj legalább két mondatot magadról..."
                    rows="3"
                    class="mt-3"
                    no-resize
                    ></b-form-textarea>

                    <b-form-invalid-feedback id="input-live-feedback" v-if="this.errormsg">
                        {{this.errormsg.description}}
                    </b-form-invalid-feedback>
                    <div class="mt-3">
                        <b-button @click="register" block class="p-10" squared variant="outline-primary" align-v="center">
                            Regisztráció
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
import LogFunc from '../api/LogFunctions';
import UserFunc from '../api/UserFunctions';
import UserInf from '../api/UserInformation';


import axios from 'axios';

export default {
  inject: ['loadingSpinner', 'navBar'],
  data() {
    return {
        username: '',
        email: '',
        password: '',
        intro: '',
        usernameState: null,
        emailState: null,
        passwordState: null,
        introState: null,
        errormsg: null,
        message: '',
        selected: 0,
        options: [
          { value: 0, text: 'Karaktered neme: Férfi' },
          { value: 1, text: 'Karaktered neme: Nő' }
        ]
    }
  },
  mounted() {
    this.navBar.val = false
  },
  methods: {
    async register() {
    this.loadingSpinner.val = true;
     try {
        const response = await Authentication.register({
          username: this.username,
          email: this.email,
          description: this.intro,
          password: this.password,
          sex: this.selected
        })
        this.loadingSpinner.val = false;
        this.message = response.data.message;
        this.$emit('showMessage', {
          title: this.message,
          message: "A regisztráció véglegesítéséhez megkell erősítened az e-mail címed és adminisztrátoraink elbírálják kérésed. Ezután már be is tudsz jelentekzni a weboldalra. :)",
          variant: "success"
        });

        let ip_response = await axios('https://api.ipify.org?format=json')
        let id = await UserInf.getId(this.username);

        LogFunc.addLog({user_id: "admin", message: "'" + this.username + "'(" + id.data._id + ") beregisztrált a weboldalra. IP: " + ip_response.data.ip})
        this.$router.replace('/login');
         
      }catch(err) {
        this.loadingSpinner.val = false;
        this.errormsg = err.response.data
        this.usernameState = this.errormsg.username ? false : true;
        this.emailState = this.errormsg.email || this.errormsg.validemail ? false : true;
        this.passwordState = this.errormsg.password ? false : true;
        this.introState = this.errormsg.description ? false : true;
      }
    }
  }
}
</script>
