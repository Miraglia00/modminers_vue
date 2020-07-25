<template>
<b-container>
  <b-row v-if="this.success || this.boxmsg" align-v="center" style="min-height:100vh" class="text-center">
      <b-col cols="12" offset="0" md="8" offset-md="2">
          <b-jumbotron border-variant="success" v-if="this.success">
              <template v-slot:header><h3 class="success">Sikeresen jelszó váltás!</h3></template>

              <template v-slot:lead>
              Köszönjük hogy aktiváltad e-mail címed. Ha adminjaink már elfogadták fiókod akkor be is tudsz jelentkezni, ha még nem akkor türelmedet kérjük.<br />
              Ezt az ablakot már bezárhatod.
              </template>

          </b-jumbotron>

          <b-jumbotron border-variant="danger" v-else>
                <template v-slot:header><h3 class="success">Sikertelen jelszó váltás.</h3></template>

                <template v-slot:lead>
                    {{boxmsg.message}}<br />Kattints újra az e-mailben kiküldött linkre!
                </template>

            </b-jumbotron>
      </b-col>
  </b-row>

  <b-row align-v="center" style="min-height:100vh" v-else-if="!linkValid">
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
                        {{this.errormsg.username}}
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
                        {{this.errormsg.email}}
                        {{this.errormsg.validemail}}
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

    <b-row align-v="center" style="min-height:100vh" v-else-if="isValid">
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
                  Add meg az új jelszavad az alábbi mezőkbe!
                  <hr>
                    <b-form-input
                    v-on:keyup.enter="savePswReset"
                    v-model="psw1"
                    :state="passwordState"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="Jelszó 1"
                    trim
                    ></b-form-input>

                    <b-form-invalid-feedback id="input-live-feedback" v-if="this.errormsg">
                        {{this.errormsg.password}}
                    </b-form-invalid-feedback>

                    <b-form-input
                    v-on:keyup.enter="savePswReset"
                    v-model="psw2"
                    :state="passwordState"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="Jelszó 2"
                    trim
                    class="mt-3"
                    ></b-form-input>

                    <b-form-invalid-feedback id="input-live-feedback" v-if="this.errormsg">
                        {{this.errormsg.password}}
                    </b-form-invalid-feedback>

                    <div class="mt-3">
                        <b-button @click="savePswReset" block class="p-10" squared variant="outline-primary" align-v="center">
                            Mentés!
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
  inject: ['loadingSpinner', 'navBar', 'pageSpinner'],
  data() {
    return {
        username: '',
        email: '',
        usernameState: null,
        emailState: null,
        errormsg: null,
        boxmsg: null,
        message: {
          error: null
        },
        linkValid: false,
        isValid: false,
        success: false,
        psw1: '',
        psw2: '',
        passwordState: null
    }
  },
  mounted() {
    this.navBar.val = false;
    this.linkValid = (Object.keys(this.$route.query).length == 0 ? false : true);

    if(this.linkValid) {
        this.checkPswReset()
      }
  },
  methods: {
    async sendPswReset() {
     this.loadingSpinner.val = true;
     try {
        const response = await UserFunctions.sendPswReset({
          username: this.username,
          email: this.email,
          template: "newPassword",
          h_key: "true"
        })
        this.loadingSpinner.val = false;
        this.message = response.data.message;
        this.$emit('showMessage', {
          title: this.message,
          message: "A jelszó váltáshoz elküldtük az e-mailt. Pár percen belül meg is fog érkezni.",
          variant: "success"
        });
        this.$router.replace('/');
      }catch(err) {
        this.loadingSpinner.val = false;
        this.errormsg = err.response.data
        this.usernameState = this.errormsg.username || this.errormsg.notverified ? false : true;
        this.emailState = this.errormsg.email || this.errormsg.notverified ? false : true;
      }
    },
    async checkPswReset() {
     try {
        const response = await UserFunctions.checkPswReset({
          username: this.$route.query.username,
          email: this.$route.query.email,
          key: this.$route.query.key
        })
        this.isValid = true;
        this.pageSpinner.val = false;
      }catch(err) {
        this.pageSpinner.val = false;
        this.boxmsg = err.response.data
      }
    },
    async savePswReset(){
      if(this.psw1 != this.psw2) {
        this.errormsg.password = "A két jelszó nem egyezik.";
        this.passwordState = false;
      }else{
        try{
        const response = await UserFunctions.savePswReset({
          password: this.psw1,
          key: this.$route.query.key
        })
        this.success = true;
        this.pageSpinner.val = false;
      }catch(err) {
        this.pageSpinner.val = false;
        this.errormsg = err.response.data
        this.passwordState = false;
      }
      }
    }
  }
}
</script>
