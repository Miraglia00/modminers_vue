<template>
<b-container>
  <b-row v-if="!message.error && isValid" align-v="center" style="min-height:100vh" class="text-center">
        <b-col cols="12" offset="0" md="8" offset-md="2">
            <b-jumbotron border-variant="success">
                <template v-slot:header><h3 class="success">Sikeresen e-mail aktiválás!</h3></template>

                <template v-slot:lead v-if="!message.error">
                Köszönjük hogy aktiváltad e-mail címed. Ha adminjaink már elfogadták fiókod akkor be is tudsz jelentkezni, ha még nem akkor türelmedet kérjük.<br />
                Ezt az ablakot már bezárhatod.
                </template>
                <template v-slot:lead v-else>
                  {{message.error}}
                </template>

            </b-jumbotron>
        </b-col>
    </b-row>

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
                  Elfelejtetted a jelszavad? Ha igen, használd a felhasználóneved
                  és az e-mail címed egy jelszó készítéséhez.
                  <hr>
                    <b-form-input
                    v-on:keyup.enter="sendPswReset"
                    v-model="username"
                    :state="usernameState"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="Felhasználónév"
                    trim
                    ></b-form-input>

                    <b-form-invalid-feedback id="input-live-feedback" v-if="this.errormsg">
                        {{this.errormsg.psw1}}
                    </b-form-invalid-feedback>

                    <b-form-input
                    v-on:keyup.enter="sendPswReset"
                    v-model="email"
                    :state="emailState"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="E-mail cím"
                    trim
                    class="mt-3"
                    ></b-form-input>

                    <b-form-invalid-feedback id="input-live-feedback" v-if="this.errormsg">
                        {{this.errormsg.psw2}}
                    </b-form-invalid-feedback>

                    <div class="mt-3">
                        <b-button @click="sendPswReset" block class="p-10" squared variant="outline-primary" align-v="center">
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

import UserFunctions from '../../api/UserFunctions';

export default {
  inject: ['loadingSpinner', 'navBar'],
  data() {
    return {
        username: '',
        email: '',
        usernameState: null,
        emailState: null,
        errormsg: null,
        message: {
          error: null
        },
        isValid: false
    }
  },
  mounted() {
    this.navBar.val = false;
  },
  methods: {
    async sendPswReset() {
        this.loadingSpinner.val = true;
        try {
          const send = UserFunctions.sendPswReset(
            {
              username: this.username,
              email: this.email
            }
          );
        } catch (err) {
          this.loadingSpinner.val = false;
          this.message.error = err.response.data
        }
    },
    async newpassword() {
     this.loadingSpinner.val = true;
     try {
        const response = await UserFunctions.newpassword({
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
