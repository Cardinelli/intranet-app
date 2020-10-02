<template>
  <div class="authentication-modal">
    <b-card bg-variant="light" class="mt-5 p-3">
      <form v-on:submit.prevent="actionLogin">
        <b-form-group
          label-cols-lg="0"
          label="Login"
          label-align="center"
          label-class="font-weight-bold pt-0"
          class="m-1"
        >
          <div class="form-inputs">
            <b-form-input autocomplete="email" class="mb-2" placeholder="Email" v-model="loginForm.email"
                          id="username-email"></b-form-input>
            <b-form-input autocomplete="password" class="mt-2 mb-2" placeholder="Password" type="password"
                          v-model="loginForm.password"
                          id="password"></b-form-input>
          </div>
        </b-form-group>
        <div class="text-center">
          <b-button type="submit" variant="outline-light"
                    size="sm"
          >Login
            <b-spinner small v-if="loading" label="Spinning"></b-spinner>
          </b-button>
        </div>
      </form>
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
        loading: false,
        loginForm: {
          email: '',
          password: '',
        }
      }
    },
    methods: {
      ...mapActions(['saveLoggedInUser']),
      actionLogin() {
        this.loading = true;
        if (!this.loginForm.email || !this.loginForm.password) {
          console.log('error');
        }
        firebase.auth().signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password)
          .then(
            user => {
              this.loading = false;
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
