<template>
  <div class="topics-view">
    <div class="go-back mb-3">
      <b-button @click="goBack" variant="outline-info" size="sm"><i class="fas fa-arrow-left"></i> Back</b-button>
    </div>

    <b-card bg-variant="dark" text-variant="white" :title="topic.title">
      <b-card-img class="mb-3" height="350px" :src="topic.img"/>
      <b-card-text>
        {{topic.description}}
      </b-card-text>
      <b-card-footer>
        {{topic.created_at}}
        <b-button class="mr-2 ml-2 float-right"
                  @click="showCommentsModal(topic.id)"
                  variant="outline-primary"
                  size="sm">
          <i class="far fa-comments"></i>
          <span> - {{topic.commentCount}} </span>
        </b-button>
      </b-card-footer>
    </b-card>
    <topics-comments-modal/>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'
  import TopicsCommentsModal from "@/modules/topics/TopicsCommentsModal";

  const {mapState, mapActions} = createNamespacedHelpers('topics');


  export default {
    name: "TopicsView",
    components: {TopicsCommentsModal},
    data() {
      return {
        topic: {}
      }
    },
    computed: {
      ...mapState({
        topics: state => state.topics
      })
    },
    methods: {
      ...mapActions(['getTopics', 'showModal', 'showCommentsModal']),
      goBack() {
        this.$router.go(-1);
      }
    },
    beforeMount() {
      this.topic = this.$route.params.topic;
      this.getTopics();
    }
  }
</script>

<style lang="scss" scoped>

  .topics-view {
    width: 59%;
    margin-left: 25%;
    margin-top: 1.5%;

    .bg-dark {
      background-color: #222F3C !important;
    }
  }
</style>
