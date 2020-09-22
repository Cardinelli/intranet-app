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
      <b-button @click="actionLogin()" variant="outline-success" size="sm">Login</b-button>
    </b-card>
  </div>
</template>

<script>
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
    computed: {
      user() {
        return this.$store.getters.user
      },
      loading() {
        return this.$store.getters.loading
      }
    },
    watch: {
      user(value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/');
        }
      },
      loading(value) {
        if (value !== null && value !== false) {
          this.loader = true;
        }
      }
    },
    methods: {
      actionLogin() {
        if (!this.loginForm.email || !this.loginForm.password) {
          console.log('error');
        }
        this.$store.dispatch('actionLogin', this.loginForm);
      }
    }
  }
</script>

<style scoped>

  .authentication-modal {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-content: center;
  }

</style>
