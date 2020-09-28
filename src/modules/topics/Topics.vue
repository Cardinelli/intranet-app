<template>
  <div class="topics-wrapper">
    <div class="create-button mb-3">
      <b-button @click="showModal" variant="outline-info" size="sm">Create Topic</b-button>
    </div>
    <b-card-group deck>
      <b-card v-for="topic in topics" :key="topic.title"
              bg-variant="dark"
              text-variant="white"
              :header="topic.title" class="text-center"
      >
        <b-card-text>{{topic.description}}</b-card-text>
      </b-card>
    </b-card-group>
    <topics-form-modal/>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'
  import TopicsFormModal from "@/modules/topics/TopicsFormModal";

  const {mapState, mapActions} = createNamespacedHelpers('topics');

  export default {
    name: "Topics",
    components: {TopicsFormModal},
    computed: {
      ...mapState({
        topics: state => state.topics
      })
    },
    methods: {
      ...mapActions(['getTopics', 'showModal'])
    },
    beforeMount() {
      this.getTopics();
    },
    showModal() {
      this.showModal();
    }
  }
</script>

<style scoped>

  .bg-dark {
    background-color: #222F3C !important;
  }

  .topics-wrapper {
    width: 59%;
    margin-left: 25%;
    margin-top: 5%;
  }

</style>
