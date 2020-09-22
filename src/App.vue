<template>
  <div id="app">
    <side-bar id="side-bar" v-if="$route.path !== '/login'"/>
    <transition name="slide" mode="out-in">
      <router-view id="router-view"/>
    </transition>
  </div>
</template>

<script>

  import SideBar from "@/core/components/layout/SideBar";

  export default {
    name: 'App',
    components: {SideBar},
  }
</script>

<style>
  html, body, #app {
    height: 100%;
  }

  #app {
    display: flex;
    flex-direction: row;
    align-content: center;
    background-color: #439093;
  }

  #side-bar {
    width: 21%;
  }

  #router-view {
    margin: 0 auto;
    margin-top: 50px;
    padding: 30px;
    width: 100%;
    height: 35%;
  }

  .slide-enter-active {
    animation: slide-in 200ms ease-out forwards;
  }
  .slide-leave-active {
    animation: slide-out 200ms ease-out forwards;
  }
  @keyframes slide-in {
    from {
      transform: translateY(-30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes slide-out {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-30px);
      opacity: 0;
    }
  }

</style>
