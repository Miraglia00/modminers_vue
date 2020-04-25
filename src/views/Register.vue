<template>
<b-container>
  <b-row align-v="center" style="min-height:100vh">
    <b-col cols="12" offset="0" md="6" offset-md="3">
        <b-card-group deck>
            <b-card
                border-variant="dark"
                header="Regisztráció"
                header-bg-variant="dark"
                header-text-variant="white"
                align="center"
            >
                <template v-slot:header>
                    <h4 class="mb-0">
                        <b-row align-v="center">
                            <b-col cols="10">
                                 <p class="m-0" style="text-align: left !important">Regisztráció</p>
                            </b-col>
                            <b-col cols="2">
                                <b-icon font-scale="2" icon="plus"></b-icon>
                            </b-col>
                        </b-row>                         
                    </h4>
                </template>
                <b-card-text>
                    <b-form-input
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

                    <b-form-textarea
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

export default {
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
        message: ''
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
        this.message = response.data.message;
        this.$emit('message', this.message);
        this.$router.replace('/');
         
      }catch(err) {
        this.errormsg = err.response.data
        this.usernameState = this.errormsg.username ? false : true;
        this.emailState = this.errormsg.email || this.errormsg.validemail ? false : true;
        this.passwordState = this.errormsg.password ? false : true;
        this.introState = this.errormsg.description ? false : true;
        console.log(this.errormsg)
      }
    }
  }
}
</script>
