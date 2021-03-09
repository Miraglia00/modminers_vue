<template>
<b-container fluid="xs" class="my-3">
<b-row class="mx-0 mx-md-5">
  <b-col xs="12" lg="10" offset-lg="1">
    <b-card bg-variant="secondary" text-variant="white" class="py-0">
      <template v-slot:header class="text-center"><h4 class="m-0 text-center">Összes felhasználó:</h4></template>
      <b-card-text class="px-3 py-0">

        <!-- MD -->
        <b-row>     
          <b-table-simple responsive class="p-0 d-xs-table">
            <b-thead head-variant="dark">
              <b-tr>
                <b-th class="d-none d-md-block">id</b-th>
                <b-th>Felhasználónév</b-th>
                <b-th class="text-center">Bemutatkozás</b-th>
                <b-th class="text-center">Státusz</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="player in orderedPlayers" :key="player._id">

                <!-- ID -->
                <b-td class="d-none d-md-block"><b-icon-eye v-b-tooltip.hover :title="player._id" class="icon"></b-icon-eye></b-td>

                <!-- USERNAME -->
                <b-td>{{player.username}}</b-td>

                 <b-td class="text-center"><b-icon-eye style="cursor:pointer" class="icon" v-b-modal.modal-desc @click="selected = player"></b-icon-eye></b-td>

                <b-td class="text-center bg-success" v-if="player.status == 1">
                  <b-icon-check-all class="icon"></b-icon-check-all>
                </b-td>
                  <b-td class="text-center bg-light" v-else-if="player.status == 0">
                  <b-icon-question class="icon"></b-icon-question>
                </b-td>
                <b-td class="text-center bg-danger" v-if="player.status == -1">
                  <b-icon-x class="icon"></b-icon-x>
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
         </b-row>
      </b-card-text>
       <template v-slot:footer>
        <div class="d-flex justify-content-between align-items-center">
            <b>Összes játékos: {{getCount}}</b> | <b class="text-success">Elfogadott: {{getAccepted}}</b> | <b class="text-light">Kérdéses: {{getPending}}</b> | <b class="text-danger">Elutasított: {{getRejected}}</b> |
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
     
      <b-container v-if="selected.status == 0">
        <b-row class="mb-2">
          <b-col xs="12" lg="6" class="p-0 pr-2">
            <b-button class="w-100 p-10" squared variant="outline-success" align-v="center" @click="updatePlayer(1)">
            Elfogad
            </b-button>
          </b-col>
          <b-col xs="12" lg="6" class="p-0 pl-2">
            <b-button class="w-100 p-10" squared variant="outline-danger" align-v="center" @click="updatePlayer(-1)">
            Elutasít
            </b-button>
          </b-col>
        </b-row>
      </b-container>
      <b-button v-else class="w-100 p-10" squared variant="outline-danger" align-v="center" @click="hide()">
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
    props: ['deletedUser'],
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
      async getPlayers(){
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
      async updatePlayer(stat) {      
          if(this.selected.def == 0) {
            AdminFunc.updatePlayer(this.selected._id, {'permissions.verified': stat})
            .then(res => {
              this.$emit('showMessage', {
                title: "Sikeres mentés!",
                message: "A felhasználó fiókja sikeresen felül lett írva.",
                variant: "success"
              })
              this.getPlayers();
              this.$refs['modal-desc'].hide();
              this.$store.dispatch("SET_NOTIFICATION_COUNTS")
            })
            .catch(err => {
              this.$emit('showMessage', {
                title: "Sikertelen mentés!",
                message: err.data.message || "Váratlan hiba a mentés során. Próbáld újra késöbb!",
                variant: "danger"
              })
            })
          }
      },
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
    },
    watch: {
      deletedUser()  {
        this.getPlayers()
        this.$store.dispatch("SET_NOTIFICATION_COUNTS")
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