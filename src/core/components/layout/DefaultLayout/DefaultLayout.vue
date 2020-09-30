<template>
  <div id="default-layout">
    <Navbar/>
    <transition name="slide" mode="out-in">
      <router-view/>
    </transition>
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
