<template>
<b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand href="#" class="mr-5">ModMiners</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item><router-link to="/" exact>Főoldal</router-link></b-nav-item>
        <b-nav-item><router-link to="/rules" exact>Szabályzat</router-link></b-nav-item>
        <b-nav-item><router-link to="/help" exact>Segédletek</router-link></b-nav-item>
        <b-nav-item><router-link to="/faq" exact>GYIK</router-link></b-nav-item>
        <b-nav-item v-if="this.$store.getters.isAdmin">
          <router-link to="/adminpanel" exact>Adminpanel</router-link>
          <span class="small admin-noti"><b-badge v-if="countNotifications.admin && countNotifications.admin.all > 0" variant="danger">{{countNotifications.admin.all}}</b-badge></span>
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" v-if="loggedIn">
        <b-navbar-nav class="d-block d-lg-none mt-3">
          <b-button @click="(current != 'Profile') ? $router.push('/profile') : ''" squared variant="secondary outline-info text-white" class="w-50">Profil <span class="small" v-if="countNotifications.profile > 0"><b-badge variant="danger">{{countNotifications.profile}}</b-badge></span></b-button>
          <b-button @click="(current != 'Logout') ? $router.push('/logout') : ''" squared variant="secondary outline-info text-white" class="w-50">Kilépés</b-button>
        </b-navbar-nav>
        <b-dropdown variant="primary" class="text-center d-none d-lg-block" v-if="loggedIn" offset="50" right> 
            <template v-slot:button-content>
              {{username}} <span class="small noti" v-if="countNotifications.profile > 0"><b-badge variant="danger">{{countNotifications.profile}}</b-badge></span>
            </template>
            <b-dropdown-item class="drop" @click="(current != 'Profile') ? $router.push('/profile') : ''">Profil 
              <span class="small" v-if="countNotifications.profile > 0"><b-badge variant="danger">{{countNotifications.profile}}</b-badge></span>
            </b-dropdown-item>
            <b-dropdown-item class="drop"  @click="(current != 'Logout') ? $router.push('/logout') : ''">Kilépés</b-dropdown-item>
        </b-dropdown>
        
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import AdminFunc from '../api/AdminFunctions';
export default {
  data() {
    return {
    }
  },
  mounted() {
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    },
    username() {
      return this.$store.getters.getUsername
    },
    countNotifications() {
      const count = this.$store.getters.notificationCount
      return count
    },
    current() {
      return this.$router.history.current.name
    }
  }

}
</script>

<style scoped>

.bg-primary .navbar-nav .active>.nav-link {
    border-bottom: 1px solid white
}

.btn {
  border-color: rgb(55, 55, 55);
}

.router-link-active {
  color: white !important;
}

a {
    color: rgba(255,255,255,0.6);
    text-decoration: none;
    background-color: transparent;
}

a:hover {
  color: white
}

.drop {
  color:white;
  font-size: 16px;
  text-align: center;
}

.navbar {
  font-size: 16px;
}
</style>