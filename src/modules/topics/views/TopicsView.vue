<template>
  <div class="topics-view">
    <div class="go-back mb-3">
      <b-button @click="goBack" variant="outline-info" size="sm"><i class="fas fa-arrow-left"></i> Back</b-button>
    </div>
    <b-jumbotron bg-variant="info" text-variant="white" border-variant="dark">
      <template v-slot:header>
        {{topic.title}}
      </template>

      <template v-slot:lead>
        <img class="mt-2 mb-5" width="100%" height="300px" :src="topic.img" alt="">
        {{topic.description}}
      </template>

      <hr class="my-4">

      <p>
        created at - <span> {{topic.created_at}} </span>
      </p>
    </b-jumbotron>
  </div>
</template>

<script>
  export default {
    name: "TopicsView",
    data() {
      return {
        topic: {}
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      }
    },
    beforeMount() {
      this.topic = this.$route.params.topic;
    }
  }
</script>

<style lang="scss" scoped>

  .topics-view {
    width: 59%;
    margin-left: 25%;
    margin-top: 1.5%;

    .bg-info {
      background-color: #222F3C !important;
    }
  }
</style>
