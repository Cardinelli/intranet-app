<template>
  <div class="main-nav">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">
        <img
          src="https://www.iconfinder.com/data/icons/logos-and-brands-adobe/512/367_Vuejs-512.png"
          alt=""
          width="50px"
          height="50px"
        >
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>Application</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template v-slot:button-content v-if="currentUser">
              <em>{{currentUser.email}}</em>
            </template>
            <b-dropdown-item @click="signOut()">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div class="sidebar">
      <div :class="this.$route.name === 'home' ? 'sidebar-button-active' : 'sidebar-button'">
        <router-link to="/"><i class="fas fa-tachometer-alt"></i> <span class="ml-2"> Dashboard </span></router-link>
      </div>
      <div :class="this.$route.name === 'users' ? 'sidebar-button-active' : 'sidebar-button'">
        <router-link to="/users"><i class="fas fa-users"></i> <span class="ml-2"> Users </span></router-link>
      </div>
      <div :class="this.$route.name === 'topics' ? 'sidebar-button-active' : 'sidebar-button'">
        <router-link to="/topics"><i class="fas fa-paste"></i> <span class="ml-2"> Topics </span></router-link>
      </div>
      <div :class="this.$route.name === 'settings' ? 'sidebar-button-active' : 'sidebar-button'">
        <router-link to="/"><i class="fas fa-cog"></i> <span class="ml-2"> Settings </span></router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import * as firebase from 'firebase'
  import {createNamespacedHelpers} from 'vuex'

  const {mapState} = createNamespacedHelpers('global');

  export default {
    name: "Navbar",
    computed: {
      ...mapState({
        currentUser: state => state.currentUser,
      })
    },
    methods: {
      signOut() {
        firebase.auth().signOut()
          .then(() => {
            this.$router.push('/login')
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bg-info {
    background-color: #222F3C !important;
  }

  a {
    color: #439093;
    text-decoration: none;
  }

  a:hover {
    color: white;
    text-decoration: none;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    background-color: #222F3C;
    position: fixed !important;
    top: 0;
    height: 100vh;
    padding-top: 15px;
    width: 240px;
    max-width: 100% !important;
    margin-top: 76px;
    outline: 0;

    .sidebar-button {
      padding: 5px 0 5px 8px;
      margin: 5px;
      height: 35px;
      color: #439093;
    }

    .sidebar-button-active {
      padding: 5px 0 5px 8px;
      border-left: 3px solid #EC407A;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      margin: 5px;
      height: 35px;
      color: #439093;
    }

    .sidebar-button:hover {
      border-left: 3px solid #EC407A;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
  }
</style>
