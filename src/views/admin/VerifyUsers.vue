<template>
<b-container fluid="xs" class="my-3">
<b-row class="mx-0 mx-md-5">
  <b-col xs="12" lg="10" offset-lg="1">
    <b-card bg-variant="secondary" text-variant="white" class="py-0">
      <template v-slot:header class="text-center"><h4 class="m-0 text-center">Összes felhasználó:</h4></template>
      <b-card-text class="px-3 py-0">

        <!-- MD -->
        <b-row>     
          <b-table-simple responsive class="p-0 d-none d-md-table">
            <b-thead head-variant="dark">
              <b-tr>
                <b-th>id</b-th>
                <b-th>Felhasználónév</b-th>
                <b-th class="text-center">#</b-th>
                <b-th class="text-center">Státusz</b-th>
                <b-th class="text-center">Def</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="player in orderedPlayers" :key="player._id">
                <b-td class="d-none d-md-block"><b-icon-eye v-b-tooltip.hover :title="player._id" class="icon"></b-icon-eye></b-td>
                <b-td>{{player.username}}</b-td>

                 <b-td class="text-center"><b-icon-eye style="cursor:pointer" class="icon" v-b-modal.modal-desc @click="selected = player"></b-icon-eye></b-td>

                <b-td class="text-center">
                    <b-form-radio button button-variant="outline-success" v-model="player.status" name="some-radios" value=1 class="mr-2"><b-icon-check class="icon"></b-icon-check></b-form-radio>
                    <b-form-radio button button-variant="outline-light" v-model="player.status" name="some-radios" value=0 class="mr-2"><b-icon-question class="icon"></b-icon-question></b-form-radio>
                    <b-form-radio button button-variant="outline-danger" v-model="player.status" name="some-radios" value=-1><b-icon-x class="icon"></b-icon-x></b-form-radio>
                </b-td>

                <b-td class="text-center">
                  <b-icon-check v-if="player.def == 1" class="icon"></b-icon-check>
                  <b-icon-question v-if="player.def == 0" class="icon"></b-icon-question>
                  <b-icon-x v-if="player.def == -1" class="icon"></b-icon-x>
                </b-td>

              </b-tr>
            </b-tbody>
          </b-table-simple>
         </b-row>
      </b-card-text>
       <template v-slot:footer>
        <div class="d-flex justify-content-between align-items-center">
            <b>Összes játékos: {{getCount}}</b> | <b class="text-success">Elfogadott: {{getAccepted}}</b> | <b class="text-light">Kérdéses: {{getPending}}</b> | <b class="text-danger">Elutasított: {{getRejected}}</b>
            <b-button w-25 class="p-10" squared variant="outline-primary" align-v="center" @click="updateAllPlayer()">
                <b>Mentés!</b>
            </b-button>
        </div>
      </template>
    </b-card>
  </b-col>
</b-row>

<b-modal id="modal-desc" centered :title="selected.username + ' bemutatkozása'">
    <p class="my-2">{{selected.desc}}</p>

    <hr class="mb-2" />

    <p class="m-0 p-0 text-center">Regisztráció dátuma: {{selected.reg_date}}</p>

    <template v-slot:modal-footer="{ hide }">
      <b-button class="w-100 p-10 mb-2 mb-md-0" squared variant="outline-danger" align-v="center" @click="hide()">
         Bezár
      </b-button>
    </template>
</b-modal>

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
          visible: true,
          states: [],
          selected: {},
          saved: 0
      }
    },
    mounted(){
      this.$nextTick(async function () {
        await this.fillStates();
      })
    },
    methods: {
      getPlayers(){
        this.$store.dispatch('GET_ALL_PLAYER')
        .then(res => {
          this.fillStates()
        })
      },
      getRang(rang) {
        return UserFunc.getServerRang(rang)
      },
      fillStates() {
        this.states = []
          this.allPlayer.forEach(element => {
              this.states.push({_id: element._id, username: element.username, desc: element.description, status: element.permissions.verified, reg_date: element.reg_date, def:element.permissions.verified})
          })
      },
      async updatePlayer() {
        this.states.forEach( async (e)=> {
          if(e.def != e.status) {
            AdminFunc.updatePlayer(e._id, {'permissions.verified': e.status})
            .then(res => {
              this.saved++
            })
            .catch(err => {
              this.$emit('showMessage', {
                title: "Sikertelen mentés!",
                message: err.data.message || "Váratlan hiba a mentés során. Próbáld újra késöbb!",
                variant: "danger"
              })
            })
          }
        })
      },
      //TODO: Make asynchronous update
      async updateAllPlayer() {
        if(this.$store.getters.isAdmin) {
          this.updatePlayer()
          .then(res => {
            this.$emit('showMessage', {
              title: "Sikeres mentés!",
              message: "A folyamat a háttérben zajlik, a végeredményt a táblázatban láthatod!",
              variant: "success"
            })
            this.$store.dispatch("SET_NOTIFICATION_COUNTS")
            this.getPlayers()
          })
        }
      }
    },
    computed: {
        allPlayer() {
          return this.$store.getters.allPlayer
        },
        getCount(){
            return this.allPlayer.length;
        },
        getAccepted() {
            return this.allPlayer.filter(x => x.permissions.verified === 1).length
        },
        getPending() {
            return this.allPlayer.filter(x => x.permissions.verified === 0).length
        },
        getRejected() {
            return this.allPlayer.filter(x => x.permissions.verified === -1).length
        },
        getDisable() {
            if(Object.keys(this.edit) != 0) {
                return (this.edit.permissions.server === -1 || this.form.banned) ? true : false;
            }
            return false
        },
        orderedPlayers() {
            return _.orderBy(this.states, 'reg_date', 'desc')
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
  .selected {
    color:white;
    cursor: not-allowed !important;
    outline: none !important;
    box-shadow: none !important;
  }
</style>