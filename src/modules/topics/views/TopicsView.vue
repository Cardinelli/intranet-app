<template>
  <div class="topics-view">
    <div class="go-back mb-3">
      <b-button class="ml-1 mr-1" @click="goBack" variant="outline-info" size="sm"><i class="fas fa-arrow-left"></i>
        Back
      </b-button>
    </div>

    <b-card bg-variant="dark" text-variant="white" :title="topic.title">
      <b-card-img class="mb-3" height="350px" :src="topic.img"/>
      <b-card-text>
        {{topic.description}}
      </b-card-text>
      <b-card-footer>
        {{topic.created_at}}
        <b-button v-if="topic.created_by === currentUser"
                  class="ml-1 mr-1 float-right"
                  @click="updateTopic(topic)"
                  variant="outline-info" size="sm">
          <i class="fas fa-pencil-alt"></i>
          Edit
        </b-button>
        <b-button class="mr-2 ml-2 float-right"
                  @click="showCommentsModal(topic)"
                  variant="outline-primary"
                  size="sm">
          <i class="far fa-comments"></i>
          <span> - {{topic.comments.length}} </span>
        </b-button>
      </b-card-footer>
    </b-card>
    <topics-form-modal/>
    <topics-comments-modal/>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'
  import TopicsCommentsModal from "@/modules/topics/TopicsCommentsModal";
  import TopicsFormModal from "@/modules/topics/TopicsFormModal";

  const {mapState, mapActions} = createNamespacedHelpers('topics');


  export default {
    name: "TopicsView",
    components: {TopicsFormModal, TopicsCommentsModal},
    data() {
      return {
        currentUser: ''
      }
    },
    computed: {
      ...mapState({
        topic: state => state.topic
      })
    },
    methods: {
      ...mapActions(['getTopic', 'showModal', 'showCommentsModal']),
      goBack() {
        this.$router.go(-1);
      },
      updateTopic(topic) {
        this.showModal(topic)
      }
    },
    beforeMount() {
      this.currentUser = localStorage.getItem('user');
      this.getTopic(this.$route.params.id);
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
