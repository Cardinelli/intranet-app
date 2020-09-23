<template>
  <div class="users-wrapper">
    <b-table hover :items="users"></b-table>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapActions} = createNamespacedHelpers('users')

  export default {
    name: "Users",
    data() {
      return {}
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
  }

</style>
