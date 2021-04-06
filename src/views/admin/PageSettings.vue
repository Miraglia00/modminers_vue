<template>
<b-container fluid="xs" class="my-3">
<b-row class="mx-0 mx-md-5">
  <b-col xs="12" lg="6" offset-lg="3">
    <b-card bg-variant="secondary" text-variant="white" class="py-0">
      <template v-slot:header class="text-center"><h4 class="m-0 text-center">Oldal beállítások</h4></template>
      <b-card-text class="px-3 py-0">
        <b-row class="mt-2">
          <b-col xs="12" class="d-flex justify-content-between align-items-center mb-2">
            <span>Játék gomb:</span>
            <b-form-checkbox v-if="settings != null" v-model="settings.game" switch size="lg" class="mb-2"></b-form-checkbox>
          </b-col>
        </b-row>

        <b-row class="mt-2">
          <b-col xs="12" class="d-flex justify-content-between align-items-center mb-2">
            <span>Logok:</span>
            <div class="">
              <b-button class="p-10 w-100" squared variant="outline-danger" align-v="center" @click="deleteLogs()">
                <b>Logok törlése!</b>
              </b-button>

              <b-button class="p-10 w-100" squared variant="outline-danger" align-v="center" @click="deleteAdminLogs()">
                <b>Admin logok törlése!</b>
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-card-text>
      <template v-slot:footer>
        <div class="d-flex justify-content-end align-items-center">
            <b-button w-25 class="p-10" squared variant="outline-primary" align-v="center" @click="saveSettings()">
                <b>Mentés!</b>
            </b-button>
        </div>
      </template>
    </b-card>
  </b-col>
</b-row>
</b-container>
</template>

<script>

import PageFunc from '../../api/PageFunctions.js'

export default {
  data() {
    return {
      game_btn: null,
      settings: null  
    }
  },
  mounted() {
    this.$nextTick(async function () {
      if(this.$store.getters.loggedIn){
          PageFunc.getSettings()
          .then((res) => this.settings = res.data[0])
      }
    })
  },
  methods: {
    saveSettings() {
      if(this.settings != null) {
        this.$store.dispatch('UPDATE_SETTINGS', this.settings)
        .then(res => {
          if(res.status === 200) {
            this.$emit('showMessage', {
              title: "Sikeres mentés!",
              message: "Az oldal beállításai sikeresen elmentve!",
              variant: "success"
            })
          } 
        })
      }
    },
    deleteLogs(){
      this.$bvModal.msgBoxConfirm('Biztos vagy benne hogy szeretnéd törölni az ÖSSZES FELHASZNÁLÓ logot?' + 
              'A folyamat nem vonható vissza!', {
            title: 'Biztos vagy benne?',
            size: 'md',
            buttonSize: 'md',
            okVariant: 'danger',
            okTitle: 'Igen, törlés!',
            cancelTitle: 'Nem, meggondoltam magam!',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
      })
      .then(value => {

      })
      .catch(err => {
        
      })
    },
    deleteAdminLogs(){},
  }
}
</script>

<style>

</style>