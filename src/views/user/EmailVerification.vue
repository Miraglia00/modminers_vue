<template>
<b-container>
    <b-row v-if="!message" align-v="center" style="min-height:100vh" class="text-center">
        <b-col cols="12" offset="0" md="8" offset-md="2">
            <b-jumbotron border-variant="success">
                <template v-slot:header><h3 class="success">Sikeresen e-mail aktiválás!</h3></template>

                <template v-slot:lead>
                Köszönjük hogy aktiváltad e-mail címed. Ha adminjaink már elfogadták fiókod akkor be is tudsz jelentkezni, ha még nem akkor türelmedet kérjük.<br />
                Ezt az ablakot már bezárhatod.
                </template>

            </b-jumbotron>
        </b-col>
    </b-row>

    <b-row v-if="message" align-v="center" style="min-height:100vh" class="text-center">
        <b-col cols="12" offset="0" md="8" offset-md="2">
            <b-jumbotron border-variant="danger">
                <template v-slot:header><h3 class="danger">Sikertelen e-mail aktiválás!</h3></template>

                <template v-slot:lead>
                {{message.error}}<br />Ezt az ablakot már bezárhatod.
                </template>

            </b-jumbotron>
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
        message: null
    }
  },
  methods: {
    async verify() {
        if(this.$route.query.username && this.$route.query.email && this.$route.query.key) {
            try {
                const response = await UserFunctions.verifyEmail({
                    username: this.$route.query.username,
                    email: this.$route.query.email,
                    key: this.$route.query.key
                })
                if(response.data.valid === true && response.status === 200) {
                    this.pageSpinner.val = false;
                }else{
                    this.message = {error: response.data.message}
                    this.pageSpinner.val = false;
                }
            } catch (err) {
                this.message = {error: err.response.data.message}
                this.pageSpinner.val = false;
            }     
        }else{
            this.pageSpinner.val = false;
            this.message = {error: "Az email aktiválása nem sikerült. Győzödj meg róla hogy megfelelő linkre kattintottál!"}
        }
    }
  },
  mounted() {
      this.navBar.val = false;
      this.pageSpinner.val = true;
      this.pageSpinner.timeout = false;
      this.pageSpinner.text = 'E-mail aktiválása folyamatban...'
      this.verify();
  }
}
</script>

<style scoped>
    h3.success {
        color: #00bc8c !important;   
    }
    h3.danger {
        color: #E74C3C !important;   
    }
</style>