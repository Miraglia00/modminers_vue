<template>
<b-container fluid="xs" class="my-3">
<b-row class="mx-3 mx-md-5">
  <b-col xs="12" lg="6">
    <b-card bg-variant="secondary" text-variant="white" class="fixed" style="height:100%">
      <template v-slot:header><h4 class="m-0">Weboldal adatok:</h4></template>
      <b-card-text>
        <b-row style="height:100%">
          <b-col xs="12" lg="4" class="text-center" align-v="center">
            <b-avatar square src="https://scontent-vie1-1.xx.fbcdn.net/v/t1.0-9/1623582_297015173797668_6933094821388875050_n.jpg?_nc_cat=110&_nc_sid=85a577&_nc_ohc=mUgRSPb-9pMAX88XiX4&_nc_ht=scontent-vie1-1.xx&oh=84b0d9de45b4bae168b190ef39a77520&oe=5F239888" size="10rem"></b-avatar><br />
            Skin: #{{this.$store.getters.getUser.sex + "" + this.$store.getters.getUser.skin}}<br />
            Nem: {{(this.$store.getters.getUser.sex === 1)? "Nő" : "Férfi"}}
         </b-col>
          <b-col xs="12" lg="8">
            <b-list-group horizontal="md" class="mt-1 w-100 text-center">
              <b-list-group-item class="w-100">Felhasználónév: {{this.$store.getters.getUsername}}</b-list-group-item>
              <b-list-group-item class="w-100">WebAdmin: {{this.$store.getters.isAdmin ? "Igen" : "Nem"}}</b-list-group-item>
           </b-list-group>
           <b-list-group horizontal="md" class="mt-1 w-100 text-center">
              <b-list-group-item class="w-100">Email: {{this.$store.getters.getUser.email}}</b-list-group-item>
           </b-list-group>
            <b-list-group horizontal="md" class="mt-1 w-100 text-center">
              <b-list-group-item class="w-100" v-if="getServerRang != true && getServerRang != false">Szerver rang: {{getServerRang}}</b-list-group-item>
              <b-list-group-item class="w-100" v-else>Szerver rang: <span class="text-danger">{{getServerRang ? "Hiba!" : "Bannolt játékos!"}}</span></b-list-group-item>
              <b-list-group-item class="w-100">-</b-list-group-item>
           </b-list-group>
           <b-button block class="p-10 mt-1 w-50 text-center" squared variant="outline-primary" align-v="center" v-b-modal.skin-modal>
              Kinézet váltás
            </b-button>
         </b-col>
         </b-row>
      </b-card-text>
    </b-card>
  </b-col>

  <b-col xs="12" lg="6" class="mt-5 mt-lg-0">
    <b-card bg-variant="secondary" text-variant="white" class="fixed" style="height:100%">
      <template v-slot:header>
        <div align-v="center" class="d-flex align-items-center justify-content-between">
          <h4 class="m-0">Játékos adatok:</h4> <b-icon @click="getuserdata" class="click" icon="arrow-clockwise" animation="" font-scale="2"></b-icon>
        </div>
      </template>
      <b-card-text v-if="userData == null" class="text-danger text-center" style="font-size: 20px;">Hiba!</b-card-text>
      <b-card-text v-if="userData != null">
        <!-- HEALTH -->
        <b-row align-v="center" class="text-center">
          <b-col sm="2" lg="1">
            <b-icon-heart class="icon"></b-icon-heart>
          </b-col>
          <b-col sm="10" lg="11">
            <b-progress :max="100" show-progress variant="danger" height="1.1rem" style="border: 1px solid #333333">
              <b-progress-bar :value="userData.health" :label="`${userData.health}/100`"></b-progress-bar>
            </b-progress>
          </b-col>
        </b-row>

        <!-- ENERGY -->
        <b-row align-v="center" class="text-center mt-2">
          <b-col sm="2" lg="1">
            <b-icon-lightning class="icon"></b-icon-lightning>
          </b-col>
          <b-col sm="10" lg="11">
            <b-progress :max="100" show-progress variant="warning" height="1.1rem" style="border: 1px solid #333333">
              <b-progress-bar :value="userData.energy" :label="`${userData.energy}/100`"></b-progress-bar>
            </b-progress>
          </b-col>
        </b-row>

        <!-- WATER -->
        <b-row align-v="center" class="text-center mt-2">
          <b-col sm="2" lg="1">
            <b-icon-droplet class="icon"></b-icon-droplet>
          </b-col>
          <b-col sm="10" lg="11">
          <b-progress :max="20" show-progress variant="info" height="1.1rem" style="border: 1px solid #333333">
            <b-progress-bar :value="userData.drink" :label="`${userData.drink}/20`"></b-progress-bar>
          </b-progress>
          </b-col>
        </b-row>
        <!-- HOME / VILLAGE -->
        <b-row>
          <b-col cols="12">
          <b-list-group horizontal="md" class="mt-3 w-100 text-center">
            <b-list-group-item class="w-100">Otthon: {{((userData.home === "false") ? "Nincs!" : "/home")}}</b-list-group-item>
            <b-list-group-item class="w-100">Falu: {{((userData.village === "false") ? "Nincs!" : userData.village)}}</b-list-group-item>
          </b-list-group>
          </b-col>
        </b-row>
        <!-- PLAYEDTIME / DEATHS -->
        <b-row>
          <b-col cols="12">
          <b-list-group horizontal="md" class="mt-1 w-100 text-center">
            <b-list-group-item class="w-100">Játszott idő: {{getPlayedTime}}</b-list-group-item>
            <b-list-group-item class="w-100">Halálok száma: {{userData.deaths}}</b-list-group-item>
          </b-list-group>
          </b-col>
        </b-row>
        <!-- P_KILLS / M_KILLS -->
        <b-row>
          <b-col cols="12">
          <b-list-group horizontal="md" class="mt-1 w-100 text-center">
            <b-list-group-item class="w-100">Megölt játékosok: {{userData.killed_players}}</b-list-group-item>
            <b-list-group-item class="w-100">Megölt szörnyek: {{userData.killed_monsters}}</b-list-group-item>
          </b-list-group>
          </b-col>
        </b-row>
      </b-card-text>
    </b-card>
  </b-col>
</b-row>

<b-row class="mx-3 mx-md-5 mt-5">
  <b-col cols="12">
    <b-card bg-variant="secondary" text-variant="white">
      <template class="text-center" v-slot:header>
        <div align-v="center" class="d-flex align-items-center justify-content-between">
          <b-col col class="d-none d-md-block">
            <h3 class="m-0">Skill pontok kiosztása:</h3>
          </b-col>
          <b-col col class="text-center" v-if="userData != null">
            <h4>{{userData.xp}} / 1000</h4>
            <b-progress variant="warning" :value="userData.xp" max="1000" class="mb-3" style="border: 1px solid #333333; height:1.2rem"></b-progress>
            <h5>TP pontjaid: <b-badge variant="warning">{{userData.tp}}</b-badge></h5>
          </b-col>
        </div>
      </template>
      <b-card-text v-if="userData == null" class="text-danger text-center" style="font-size: 20px;">Hiba!</b-card-text>
      <b-card-text v-for="skill in AvalaibleSkills" :key="skill.r_name">
      <b-row v-if="userData[skill.req] === 'true' || skill.req == 'no'">
        <b-col lg="8" offset-lg="2" cols="12" offset="0">
          <b-list-group horizontal="md" class="mt-1 w-100">
            <b-list-group-item class="w-100 pb-4">
              <b-row>
                <b-col cols="12" class="d-flex align-items-center justify-content-between">
                  {{skill.d_name}} <b-icon-question-circle class="icon"></b-icon-question-circle>
                </b-col>
              </b-row>
              <hr>
              <b-row>
              <b-col cols="2" lg="4" class="d-lg-flex align-items-center justify-content-center d-none">
                <b-img style="max-width:150px" left src="https://scontent-vie1-1.xx.fbcdn.net/v/t1.0-9/1623582_297015173797668_6933094821388875050_n.jpg?_nc_cat=110&_nc_sid=85a577&_nc_ohc=mUgRSPb-9pMAX88XiX4&_nc_ht=scontent-vie1-1.xx&oh=84b0d9de45b4bae168b190ef39a77520&oe=5F239888" alt="Left image"></b-img>
              </b-col>
              <b-col lg="8">
                <b-row>
                  <b-col cols="12">{{skill.desc}}<br />
                  <div class="text-right mt-5 size-5">
                    TP: {{(userData[skill.r_name]) === 'true' ? skill.price : userData.tp}} / {{skill.price}}
                  </div>
                  <b-progress :max="skill.price" variant="warning" height="1.2rem" style="border: 1px solid #333333" class="text-center d-flex">
                    <b-progress-bar :value="userData[skill.r_name] === 'true' ? skill.price : userData.tp"></b-progress-bar>
                  </b-progress>
                  <b-row>
                    <b-col cols="12 d-flex justify-content-end mt-3">
                      <b-button w-25 class="p-10" squared :variant="userData[skill.r_name] === 'true' ? 'outline-success' : 'outline-primary'" align-v="center" :disabled="skill.price > userData.tp || userData[skill.r_name] === 'true'">
                         <span v-if="userData[skill.r_name] != 'true'" @click="learn(skill)">Tanulás!</span> <b-icon-check-all v-else class="icon"></b-icon-check-all>
                      </b-button>
                    </b-col>
                  </b-row>
                  </b-col>
                </b-row>
              </b-col>
              </b-row>
              </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
      </b-card-text>
    </b-card>
  </b-col>
</b-row>

<!-- SKIN MODAL -->

<div>
  <b-modal ref="skin-modal" id="skin-modal" scrollable centered title="Kinézet változtatása" size="xl">
    <vue-scroll :ops="ops">
      <div class="d-flex flex-row flex-nowrap mb-3">
        <div v-for="skin in skins" :key="skin._id" class="skinbox text-center d-flex flex-wrap justify-content-center" :style="selected == skin.id ? 'background-color: #416790' : 'background-color: transparent'" @click="selected=skin.id">
          <b-img center src="../../assets/skin_teljes.png" class="skin"></b-img>
          <div>SkinID: {{skin.sex +""+skin.id}}</div>
        </div>
      </div>
    </vue-scroll>
    <template v-slot:modal-footer="{close}" class="mt-5">
      <b-button w-25 class="p-10" squared variant="outline-primary" align-v="center" :disabled="selectedAnother || skinchange == false" @click="saveSkin(selected)">
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

import Socket from '../../socket/sc';
import Func from '../../api/UserFunctions';
import skin from '../../plugins/skin';

export default {
  inject: ['loadingSpinner'],
    data() {
        return {
          skinchange: null,
          skins: null,
          selected: this.$store.getters.getUser.skin,
          ops:{
           vuescroll: {
            mode: 'native',
            sizeStrategy: 'percent',
            detectResize: true,
            wheelDirectionReverse: true
          },
          scrollPanel: {
            initialScrollY: false,
            initialScrollX: false,
            scrollingX: true,
            scrollingY: false,
            speed: 250,
            easing: "easeInOutCubic",
            verticalNativeBarPos: 'left'
          },
          rail: {},
          bar: {
            keepShow: false,
            background: '#416790'
            }
          },
          window: {
            width: 0,
            height: 0
          },
          userData: null,
          skills: this.$store.getters.getSkills,
          avalaible_skills: this.AvalaibleSkills
        }
    },
    methods: {
      getuserdata() {
        this.loadingSpinner.val = true;
        this.getSkills()
        Socket.getPlayerData(this.$store.getters.getToken, this.$store.getters.getUsername)
        .then((res) => {
          this.loadingSpinner.val = false;
          this.userData = JSON.parse(res)
          return this.userData
        })
        .catch((err) => {
          if(err == false){
            this.$emit('showMessage', {
            title: "Adat lekérési hiba!",
            message: "Mivel még nem játszottál a szerveren így nem sikerült lekérni az adatokat. Ha te már játszottál és ez a hiba fennáll vedd fel a kapcsolatot a vezetőséggel.",
            variant: "danger"
            });
          }else if(err == "timeout"){
            this.$emit('showMessage', {
            title: "Adat lekérési hiba!",
            message: "Nem sikerült kapcsolatot létesíteni a kiszolgáló szerverrel. Kérlek frissítsd az oldalt, és ha a hiba fennáll, vedd fel a kapcsolatot a vezetőséggel.",
            variant: "danger"
            });
          }
          this.loadingSpinner.val = false;
          return false
        })
      },
      getSkills() {
        this.$store.dispatch("GET_SKILLS")
        .then(res => {
          this.skills = res
          return res
        })
        .catch(err => {
          return err
        })
      },
      learn(skill) {
        this.loadingSpinner.val = true;
        if(skill.price > this.userData.tp || this.userData[skill.r_name] == "true"){
          return false
        }
        this.$store.dispatch("SET_USER_SKILLS", {tp: (this.$store.getters.getUserSkills.tp - skill.price)})
        this.userData.tp = this.userData.tp - skill.price
        this.userData[skill.r_name] = "true"
        this.loadingSpinner.val = false;
        Socket.learnSkill(this.$store.getters.getToken, this.$store.getters.getUsername, skill.r_name)
        .then(res => {
          this.$store.dispatch("SET_USER_SKILLS", {tp: (this.$store.getters.getUserSkills.tp - skill.price)})
          this.$emit('showMessage', {
            title: "Sikeres skill tanulás!",
            message: "A szerverrel való szinkronizálás körülbelül 1-3 mp-et vesz igénybe, így kérlek légy türelemmel.",
            variant: "success"
            });
        })
        .catch(err =>console.log(err))
      },
      handleResize() {
            this.window.width = window.innerWidth;
            this.window.height = window.innerHeight;

            if(this.window.width > 1000) {
              this.ops.vuescroll.mode = "native"
              this.$refs['skin-modal'].hide()
            }
            else{
              this.ops.vuescroll.mode = "native"
              this.$refs['skin-modal'].hide()
            }
        },
      getSkins() {
        let skinCounts = skin.read("http://www.modminers.hu/skins/all_skins/counts.txt")
        console.log(skinCounts)

        /*Func.getSkins(this.$store.getters.getUser.sex)
        .then(res => {
          this.skins = (res.data.sort((a,b) => a.id-b.id))
        })
        .catch(err => console.log(err))*/
        
      },
      getSkinchange() {
        Func.getUser(this.$store.getters.getUser.id)
        .then(res => this.skinchange = res.data.permissions.skin)
        .catch(err => {console.log(err); this.skinchange = false})
      },
      saveSkin(skin) {
        this.$store.dispatch("SET_SKIN", {skin:skin, sex: this.$store.getters.getUser.sex})
        .then(res =>{
          this.$emit('showMessage', {
            title: "Sikeres skin váltás!",
            message: "Minden játékos egyszer válthat skint, mivel ez alapján lehet csak megismerni játékban, ha mégis szeretnél, vedd fel a kapcsolatot a vezetőséggel.",
            variant: "success"
          });
          this.$refs['skin-modal'].hide()
        })
        .catch(err => console.log(err))
      }
    },
    created() {
      this.$nextTick(async function () {
        this.getuserdata()
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
        this.getSkins();
        this.getSkinchange();
      })
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    mounted: function () {
      this.$nextTick(function () {
        this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
          if(modalId == "skin-modal") {
            this.selected = this.$store.getters.getUser.skin
          }
        })
      })
    },
    computed: {
      AvalaibleSkills() {
        let a_skills = []
        const store_skills = this.$store.getters.getSkills
        const user = this.userData

        if(user){
          for(let i=0; i<store_skills.length; i++){
            if(store_skills[i].r_name in user)
              a_skills.push(store_skills[i]);
          }
          return a_skills

        }else{ return null }
      },
      getPlayedTime() {
          let minutes = this.userData.time
          let hour = 0
          if(minutes < 60) {
            hour = 0
          }else{
            hour = Math.floor(minutes / 60)
            minutes = minutes - (hour * 60)
          }
          return hour + "ó " + minutes + "p"
      },
      getServerRang() {
        let rang = parseInt(this.$store.getters.getUser.server)
        let rang_s = ""
        switch(rang) {
          case -1: 
            rang_s = false;
            break;
          case 0:
            rang_s = "Játékos";
            break;
          case 1:
            rang_s = "VIP";
            break;
          case 2:
            rang_s = "Moderátor";
            break;
          case 3:
            rang_s = "Admin";
            break;
          case 4:
            rang_s = "Tulajdonos";
            break;
          default:
            rang_s = true
            break;
        }
        return rang_s
      },
      selectedAnother() {
        return (this.selected != this.$store.getters.getUser.skin) ? false : true;
      }
    }
}
</script>

<style scoped>
.icon {
  font-size: 1.2em;
}

.click:hover {
  cursor: pointer
}

.btn.disabled, .btn:disabled {
    opacity: 1;
    cursor: not-allowed;
    pointer-events: all !important;
}

.skin {
  margin: 0px !important;
}

@media only screen and (max-width: 576px) {
  .skin {
    height:75%;
    text-align:center;
    margin: auto !important;
  }
}

div.skinbox {
  border: 2px solid transparent;
}

div .skinbox:hover {
  border: 2px solid #416790;
  background-color: #416790;
}

</style>

