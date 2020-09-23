<template>
  <div id="default-layout">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
  import Navbar from "@/core/components/layout/DefaultLayout/Navbar";
  export default {
    name: "DefaultLayout",
    components: {Navbar}
  }
</script>

<style scoped>

</style>
