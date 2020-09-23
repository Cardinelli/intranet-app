<template>
  <div class="users-wrapper">
    <div class="btn-wrapper m-3">
      <b-button size="sm" variant="outline-info">Create User</b-button>
    </div>
    <b-table hover :items="users"></b-table>
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

    table{
      width: 70%;
    }
  }

</style>
