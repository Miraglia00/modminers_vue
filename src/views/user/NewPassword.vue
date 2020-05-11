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
                      Új jelszó                      
                    </h4>
                </template>
                <b-card-text>
                    <b-form-input
                    v-on:keyup.enter="newpassword"
                    v-model="psw_1"
                    :state="psw_1State"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="Jelszó 1"
                    trim
                    ></b-form-input>

                    <b-form-invalid-feedback id="input-live-feedback" v-if="this.errormsg">
                        {{this.errormsg.psw1}}
                    </b-form-invalid-feedback>

                    <b-form-input
                    v-on:keyup.enter="newpassword"
                    v-model="psw_2"
                    :state="psw_2State"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="Jelszó 2"
                    trim
                    class="mt-3"
                    ></b-form-input>

                    <b-form-invalid-feedback id="input-live-feedback" v-if="this.errormsg">
                        {{this.errormsg.psw2}}
                    </b-form-invalid-feedback>

                    <div class="mt-3">
                        <b-button @click="newpassword" block class="p-10" squared variant="outline-primary" align-v="center">
                            Új jelszó!
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
        psw_1: '',
        psw_2: '',
        psw_1State: null,
        psw_2State: null,
        errormsg: null
    }
  },
  methods: {
    async newpassword() {
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
