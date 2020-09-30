<template>
  <div class="authentication-modal">
    <b-card bg-variant="light" class="mt-5 p-3">
      <b-form-group
        label-cols-lg="0"
        label="Login"
        label-align="center"
        label-class="font-weight-bold pt-0"
        class="m-1"
      >
        <b-form-group
          label-cols-sm="4"
          label="Username"
          label-align-sm="right"
          label-for="username-email"
        >
          <b-form-input v-model="loginForm.email" id="username-email"></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols-sm="4"
          label="Password"
          label-align-sm="right"
          label-for="password"
        >
          <b-form-input type="password" v-model="loginForm.password" id="password"></b-form-input>
        </b-form-group>
      </b-form-group>
      <b-button @click="actionLogin()" variant="outline-light" size="sm">Login</b-button>
    </b-card>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'
  import * as firebase from 'firebase';

  const {mapActions} = createNamespacedHelpers('global');

  export default {
    name: "Login",
    data() {
      return {
        loader: false,
        loginForm: {
          email: '',
          password: '',
        }
      }
    },
    methods: {
      ...mapActions(['saveLoggedInUser']),
      actionLogin() {
        if (!this.loginForm.email || !this.loginForm.password) {
          console.log('error');
        }
        firebase.auth().signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password)
          .then(
            user => {
              localStorage.setItem('user', user.user.uid)
              this.saveLoggedInUser(user);
              this.$router.push('/');
            }
          ).catch(error => {
          this.$bvToast.toast(error.message, {
            title: error.code,
            autoHideDelay: 5000,
            variant: 'danger',
            appendToast: false
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

  .authentication-modal {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-content: center;
    color: #439093;

    .bg-light {
      background-color: #222F3C !important;
    }
  }

</style>
