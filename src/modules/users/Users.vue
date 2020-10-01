<template>
  <div class="users-wrapper">
<!--    <div class="btn-wrapper mb-3">-->
<!--      <b-button size="sm" variant="outline-info">Create User</b-button>-->
<!--    </div>-->
    <b-card class="mb-4" v-for="user in users" :key="user.id" bg-variant="dark" text-variant="white"
            :title="`${user.name}  ${user.surname}`">
      <b-card-text>
        <span>Age: </span> {{user.age}}
      </b-card-text>
      <span>Credit:</span> {{user.credit + '$'}}
<!--      <b-button class="float-right" size="sm" variant="outline-danger"> Delete</b-button>-->
    </b-card>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapActions} = createNamespacedHelpers('users')

  export default {
    name: "Users",
    data() {
      return {
        usersData: [],
      }
    },
    computed: {
      ...mapState({
        users: state => state.users
      })
    },
    methods: {
      ...mapActions(['getUsersList'])
    },
    beforeMount() {
      this.getUsersList();
    }
  }
</script>

<style lang="scss" scoped>

  .users-wrapper {
    margin-left: 25%;
    margin-top: 5%;
    width: 59%;
  }

  .bg-dark {
    background-color: #222F3C !important;
  }

</style>
