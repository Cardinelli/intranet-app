<template>
  <div id="app">
    <transition name="slide" mode="out-in">
      <router-view id="router-view"/>
    </transition>
  </div>
</template>

<script>

  export default {
    name: 'App',
  }
</script>

<style>
  html, body, #app {
    height: 100%;
  }

  #app {
    background-color: #EEF5F9 /* #222F3C; Dark: #292b2c */
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
