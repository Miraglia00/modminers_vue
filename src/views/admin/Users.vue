<template>
<b-container fluid="xs" class="my-3">
<b-row class="mx-0 mx-md-5">
  <b-col xs="12" lg="10" offset-lg="1">
    <b-card bg-variant="secondary" text-variant="white" class="py-0">
      <template v-slot:header class="text-center"><h4 class="m-0 text-center">Összes felhasználó:</h4></template>
      <b-card-text class="px-3 py-0">
      <!-- MOBILE -->
        <b-row class="d-block mb-3 d-md-none" v-for="player in orderedPlayers" :key="player._id">
          <b-button
            v-b-toggle="'user-' + player._id"
            class="w-100 bg-primary mb-1"
            >
            {{player.username}}
          </b-button>
          <b-collapse :id="'user-' + player._id">
            <b-card class="bg-dark">
            <div class="text-center">{{player._id}}</div>
            <hr class="bg-light">
              <b-row class="text-center">
                <b-col cols="6" class="d-flex justify-content-center align-items-center">Szerver:</b-col>
                <b-col cols="6">{{getRang(player.permissions.server)}}</b-col>
              </b-row>

              <b-row class="text-center">
                <b-col cols="6" class="">WebAdmin:</b-col>
                <b-col cols="6" :class="(player.permissions.admin) ? 'bg-success d-flex justify-content-center align-items-center': 'bg-danger d-flex justify-content-center align-items-center'">
                  <b-icon-check-all class="icon" v-if="player.permissions.admin === true"></b-icon-check-all>
                  <b-icon-x class="icon" v-if="player.permissions.admin === false"></b-icon-x></b-col>
              </b-row>

              <hr class="bg-light">

              <b-row class="text-center">
                <b-col cols="12">{{player.email.email}}</b-col>
              </b-row>

              <hr class="bg-light">

              <b-row class="text-center">
                <b-col cols="6" class="">E-mail:</b-col>
                <b-col cols="6" :class="(player.email.verified) ? 'bg-success d-flex justify-content-center align-items-center': 'bg-danger d-flex justify-content-center align-items-center'">
                  <b-icon-check-all class="icon" v-if="player.email.verified === true"></b-icon-check-all>
                  <b-icon-x class="icon" v-if="player.email.verified === false"></b-icon-x></b-col>
              </b-row>

              <b-row class="text-center">
                <b-col cols="6" class="">Fiók:</b-col>
                <b-col cols="6" :class="getVerifiedClass(player.permissions.verified) + ' d-flex justify-content-center align-items-center'">
                  <b-icon-check-all class="icon" v-if="player.permissions.verified === 1"></b-icon-check-all>
                  <b-icon-question class="icon" v-if="player.permissions.verified === 0"></b-icon-question>
                  <b-icon-x class="icon" v-if="player.permissions.verified === -1"></b-icon-x>
                </b-col>
              </b-row>

              <hr class="bg-light">

              <b-button @click="editPlayer(player)" v-b-modal.edit-modal block class="p-10 mt-3" squared variant="outline-primary" align-v="center">
                Szerkesztés!
              </b-button>
            </b-card>
          </b-collapse>
        </b-row>
         <hr class="bg-light mb-1 d-block d-md-none" />
        <b-row class="text-center justify-content-center align-items-center d-row d-md-none">
          <b> Összesen: {{getCount}}</b>
        </b-row>

        <!-- MD -->
        <b-row>     
          <b-table-simple responsive class="p-0 d-none d-md-table">
            <b-thead head-variant="dark">
              <b-tr>
                <b-th class="d-none d-md-table-cell">id</b-th>
                <b-th>Felhasználónév</b-th>
                <b-th class="d-none d-md-table-cell">SzerverR</b-th>
                <b-th class="text-center">WebAdmin</b-th>
                <b-th class="text-center">E-mail</b-th>
                <b-th class="text-center">Fiók</b-th>
                <b-th class="text-center">#</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="player in orderedPlayers" :key="player._id">
                <b-td class="d-none d-md-block"><b-icon-eye v-b-tooltip.hover :title="player._id" class="icon"></b-icon-eye></b-td>
                <b-td>{{player.username}}</b-td>
                <b-td class="d-none d-md-block">{{getRang(player.permissions.server)}}</b-td>
                <!-- ADMIN -->
                <b-td class="text-center" :variant="(player.permissions.admin) ? 'success': 'danger' ">
                  <b-icon-check-all class="icon" v-if="player.permissions.admin === true"></b-icon-check-all>
                  <b-icon-x class="icon" v-if="player.permissions.admin === false"></b-icon-x>
                </b-td>

                <!-- EMAIL -->
                <b-td class="text-center" :variant="(player.email.verified) ? 'success': 'danger' ">
                  <b-icon-check-all class="icon" v-if="player.email.verified === true"></b-icon-check-all>
                  <b-icon-x class="icon" v-if="player.email.verified === false"></b-icon-x>
                </b-td>

                <!-- ACC -->
                <b-td class="text-center" :variant="getVerifiedVariant(player.permissions.verified)">
                  <b-icon-check-all class="icon" v-if="player.permissions.verified === 1"></b-icon-check-all>
                  <b-icon-question class="icon" v-if="player.permissions.verified === 0"></b-icon-question>
                  <b-icon-x class="icon" v-if="player.permissions.verified === -1"></b-icon-x>
                </b-td>

                <b-td class="text-center"><b-icon-pencil-square class="icon edit" v-b-modal.edit-modal @click="editPlayer(player)"></b-icon-pencil-square></b-td>
              </b-tr>
            </b-tbody>
            <b-tfoot>
              <b-tr>
                <b-td colspan="7" variant="secondary" class="text-right pb-0 mb-0">
                  <b>Összes játékos: {{getCount}}</b>
                </b-td>
              </b-tr>
            </b-tfoot>
          </b-table-simple>
         </b-row>
      </b-card-text>
    </b-card>
  </b-col>
</b-row>

<!-- EDIT MODAL -->
<div>
  <b-modal ref="edit-modal" id="edit-modal" scrollable centered title="Játékos szerkesztése" size="lg">
    <b-row>
      <b-col xs="12" md="6">
        <b-input-group size="md">
          <b-input-group-prepend is-text>
            <b-icon icon="person-fill" class="size-1"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            v-model="form.username"
            :state="form.states.username"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Felhasználónév"
            trim
            :disabled="getDisable"
          ></b-form-input>
        </b-input-group>

        <b-form-invalid-feedback id="input-live-feedback" v-if="this.form.errors">
            {{this.form.errors.username}}
        </b-form-invalid-feedback>
      </b-col>
      <b-col xs="12" md="6">
        <b-input-group size="md">
          <b-input-group-prepend is-text>
            <b-icon icon="at" class="size-1"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            v-model="form.email"
            :state="form.states.email"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="E-mail"
            trim
            :disabled="getDisable"
          ></b-form-input>
        </b-input-group>

        <b-form-invalid-feedback id="input-live-feedback" v-if="this.form.errors">
            {{this.form.errors.email}}
        </b-form-invalid-feedback>
      </b-col>
    </b-row>

    <hr />

    <b-row>
      <b-col xs="12" md="6" class="d-flex justify-content-between align-items-center">
        <span>Fiók megerősítés:</span>
        <b-form-checkbox :disabled="getDisable" v-model="form.acc_ver" switch size="lg" class="mb-2"></b-form-checkbox>
      </b-col>
      <b-col xs="12" md="6" class="d-flex justify-content-between align-items-center">
        <span>E-mail megerősítés:</span> 
        <span class="d-flex justify-content-between align-items-center">
          <b-icon-eye v-b-tooltip.hover :title="form.email_code" class="icon mr-3"></b-icon-eye>
          <b-form-checkbox :disabled="getDisable" v-model="form.email_ver" switch size="lg" class="mb-2"></b-form-checkbox>         
        </span>
      </b-col>
    </b-row>

    <b-row class="mt-2">
      <b-col xs="12" md="6" class="d-flex justify-content-between align-items-center">
        <span>Admin (Web):</span>
        <b-form-checkbox :disabled="getDisable" v-model="form.admin" switch size="lg" class="mb-2"></b-form-checkbox>
      </b-col>
      <b-col xs="12" md="6" class="d-flex justify-content-between align-items-center">
        <span>Szerver rang:</span> 
        <b-form-select :disabled="getDisable" v-model="form.server" :options="form.server_options" class="w-50"></b-form-select>
      </b-col>
    </b-row>

    <b-row class="mt-2">
      <b-col xs="12" md="6" class="d-flex justify-content-between align-items-center">
        <span>Nem:</span>
        <b-form-select :disabled="getDisable" class="w-50" v-model="form.sex" :options="form.sex_options"></b-form-select>
      </b-col>
      <b-col xs="12" md="6" class="d-flex justify-content-between align-items-center">
        <span>SkinID:</span> 
        <b-form-input
            v-model="form.skin"
            :state="form.states.skin"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="SkinID"
            trim
            class="w-50"
            :disabled="getDisable"
          ></b-form-input>
      </b-col>
      <b-col xs="12" md="6" offset-md="6" v-if="this.form.errors" class="text-center">
        <small class="text-danger">{{this.form.errors.skin}}</small>
      </b-col>
    </b-row>

    <b-row class="mt-2">
      <b-col xs="12" md="6" class="d-flex justify-content-between align-items-center">
        <span>Skin váltás:</span>
        <b-form-checkbox :disabled="getDisable" v-model="form.skin_change" switch size="lg" class="mb-2"></b-form-checkbox>
      </b-col>
      <b-col xs="12" md="6" class="d-flex justify-content-between align-items-center">
        <span>Kijelentkeztetés:</span> 
        <b-form-checkbox :disabled="getDisable" v-model="form.logout" switch size="lg" class="mb-2"></b-form-checkbox>
      </b-col>
    </b-row>

    <hr />

    <b-row class="mt-2">
      <b-col xs="12" md="6" class="d-flex justify-content-between align-items-center mb-2">
        <span>Bannolva:</span>
        <b-form-checkbox v-model="form.banned" switch size="lg" class="mb-2"></b-form-checkbox>
      </b-col>
      <b-col xs="12" md="3">
        <b-button class="w-100 p-10 mb-2 mb-md-0" squared variant="outline-primary" align-v="center">
         Új jelszó!
        </b-button>
      </b-col>
      <b-col xs="12" md="3">
        <b-button class="w-100 p-10" squared variant="outline-danger" align-v="center">
          Törlés!
        </b-button>
      </b-col>
    </b-row>
    {{edit}}

    <template v-slot:modal-footer="{close}" class="mt-5">
      <b-button w-25 class="p-10" squared variant="outline-primary" align-v="center" @click="updatePlayer()">
         Mentés!
      </b-button>
       <b-button w-25 class="p-10" squared variant="outline-danger" align-v="center" @click="close()">
         Bezárás
      </b-button>   
    </template>
  </b-modal>
</div>

</b-container>
</template>

<script>

import AdminFunc from '../../api/AdminFunctions';
import UserFunc from '../../api/UserFunctions';
import _ from 'lodash';

export default {
    inject: ['loadingSpinner'],
    data() {
      return {
        allPlayer: [],
        visible: true,
        edit: {},
        form: {
          errors: {},
          username: "",
          email: "",
          email_ver: null,
          email_code: "",
          acc_ver: null,
          admin: null,
          server: null,
          server_options: [
            { value: 0, text: "Játékos" },
            { value: 1, text: "VIP" },
            { value: 2, text: "Moderátor" },
            { value: 3, text: "Admin" },
            { value: 4, text: "Tulajdonos" }
          ],
          skin: null,
          sex: null,
          sex_options: [
            { value: 0, text: 'Karakter neme: Férfi' },
            { value: 1, text: 'Karakter neme: Nő' }
          ],
          skin_change: null,
          logout: null,
          banned: null,
          states: {
            username: null,
            email: null,
            skin: null,
          }
        }
      }
    },
    mounted(){
      this.loadingSpinner.val = true;
      this.getPlayers()
      
    },
    methods: {
      getPlayers() {
        AdminFunc.getAllPlayer()
        .then(res => {
          if(res.data) {
            this.allPlayer = res.data
          }
          this.loadingSpinner.val = false;
        })
        .catch(err => {
          console.log(err)
          this.loadingSpinner.val = false;
        })

      },
      getRang(rang) {
        return UserFunc.getServerRang(rang)
      },
      editPlayer(player) {
        this.edit = player
        this.form.username = player.username,
        this.form.email = player.email.email,
        this.form.email_ver = player.email.verified,
        this.form.email_code = player.email.ver_code,
        this.form.acc_ver = player.permissions.verified,
        this.form.admin = player.permissions.admin,
        this.form.server = player.permissions.server,
        this.form.skin = player.skin,
        this.form.sex = player.sex,
        this.form.skin_change = player.permissions.skin,
        this.form.logout = player.logout
        this.form.banned = player.permissions.server == -1 ? true : false
      },
      updatePlayer() {
        if(this.$store.getters.isAdmin) {
          if(!Number.isInteger(parseInt(this.form.skin)) || (100 < parseInt(this.form.skin) < 0)) {
            this.form.states.skin = false
            this.form.errors.skin = "A mező csak számot tartalmazhat 0-99-ig."
            return;
          }

          if(this.edit.permissions.server == -1 && this.form.banned == false) {

             AdminFunc.updatePlayer(this.edit._id, {'permissions.server': 0, logout: false})
            .then(res => {
              this.$emit('showMessage', {
                title: "Sikeres mentés!",
                message: "A bannolás visszavonva!",
                variant: "success"
              });
              this.$refs['edit-modal'].hide()
            })
            .catch(err => {
              this.$emit('showMessage', {
                title: "Sikertelen mentés!",
                message: err.data.message + " | " + err.data.error,
                variant: "danger"
              });
            })
            return this.getPlayers();
          }

          this.form.logout = this.form.banned == true ? true : this.form.logout;
          this.form.server = this.form.banned == true ? -1 : this.form.server;
          
          const payload = {
            username: this.form.username,
            'email.email': this.form.email,
            'email.verified': this.form.email_ver,
            'permissions.verified': this.form.acc_ver,
            'permissions.admin': this.form.admin,
            'permissions.server': this.form.server,
            'permissions.skin': this.form.skin_change,
            skin: this.form.skin,
            sex: this.form.sex,
            logout: this.form.logout
          }

          AdminFunc.updatePlayer(this.edit._id, payload)
          .then(res => {
            this.$emit('showMessage', {
              title: "Sikeres mentés!",
              message: "A mentett játékos adatai felülírva. Ellenőrízd hogy az adatok nem-e lettek hibásan elmentve, ha igen jelezd a vezetőség felé.",
              variant: "success"
            });
            this.$refs['edit-modal'].hide()
          })
          .catch(err => {
            this.$emit('showMessage', {
              title: "Sikertelen mentés!",
              message: err.data.message + " | " + err.data.error,
              variant: "danger"
            });
          })

          return this.getPlayers();

        }
      },
      getVerifiedClass(status){
        switch(status) {
          case -1:
            status = "bg-danger";
            break;
          case 0:
            status = "bg-light";
            break;
          case 1:
            status = "bg-success";
            break;
        }

        return status
      },
      getVerifiedVariant(status){
        switch(status) {
          case -1:
            status = "danger";
            break;
          case 0:
            status = "light";
            break;
          case 1:
            status = "success";
            break;
        }

        return status
      }
    },
    computed: {
      getCount(){
        return this.allPlayer.length;
      },
      getDisable() {
        if(Object.keys(this.edit) != 0) {
          return (this.edit.permissions.server === -1 || this.form.banned) ? true : false;
        }
        return false
      },
      orderedPlayers() {
        return _.orderBy(this.allPlayer, 'permissions.server', 'desc')
      }
    }
  }
</script>

<style scoped>
  .icon {
    font-size: 1.3em;
  }
  .edit:hover {
    cursor: pointer;
    color: #416790;
  }
</style>