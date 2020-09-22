<template>
  <div>
    <b-button variant="dark" v-b-toggle.sidebar-variant><i class="fas fa-bars"></i></b-button>
    <b-sidebar id="sidebar-variant" title="Doofenshmirtz inc." bg-variant="dark" text-variant="light" shadow>
      <div class="px-0 py-3">
        <b-nav vertical class="w-100">
          <b-nav-item to="/"><i class="fas fa-home"></i> Home </b-nav-item>
          <b-nav-item to="/users"><i class="fas fa-users"></i> Users</b-nav-item>
          <b-nav-item><i class="fas fa-cog"></i> Settings</b-nav-item>
        </b-nav>
      </div>
      <template v-slot:footer="{ hide }">
        <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
          <strong class="mr-auto"> Name Surname </strong>
          <b-button size="sm" @click="hide">Close</b-button>
        </div>
      </template>

    </b-sidebar>
  </div>
</template>

<script>
  export default {
    name: "SideBar",
    computed: {
      user() {
        return this.$store.getters.user
      },
    }
  }
</script>

<style scoped>

  a {
    color: white;
    text-decoration: none;
  }

  a:hover {
    color: #439093;
    text-decoration: none;
  }

</style>
