<template>
  <div class="topics-wrapper">
    <b-card-group deck>
      <b-card v-for="topic in topics" :key="topic.title" bg-variant="info" text-variant="white" header="info" class="text-center">
        <b-card-text>{{topic.title}}</b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapActions} = createNamespacedHelpers('topics');

  export default {
    name: "Topics",
    computed: {
      ...mapState({
        topics: state => state.topics
      })
    },
    methods: {
      ...mapActions(['getTopics'])
    },
    beforeMount() {
      this.getTopics();
      console.log(this.topics);
    }
  }
</script>

<style scoped>

  .topics-wrapper {
    width: 59%;
    margin-left: 25%;
    margin-top: 5%;
  }

</style>
