<template>
  <div class="topics-wrapper">
    <div class="create-button mb-3">
      <b-button @click="showModal" variant="outline-info" size="sm">Create Topic</b-button>
    </div>
    <b-card-group v-if="topics.length > 0" deck>
      <b-card v-for="topic in topics" :key="topic.title"
              bg-variant="dark"
              text-variant="white"
              img-width="200px"
              img-height="300px"
              :img-src="topic.img"
              :header="topic.title" class="text-center"
      >
        <b-card-body class="pt-0 pb-4">
          <div class="actions">
            <b-button class="mr-2 ml-2"
                      @click="showCommentsModal(topic)"
                      variant="outline-primary"
                      size="sm">
              <i class="far fa-comments"></i>
              <span> - {{topic.comments.length}} </span>
            </b-button>
            <b-button @click="onViewClick(topic)" class="mr-2 ml-2" variant="outline-info" size="sm">View</b-button>
            <b-button v-if="topic.created_by === currentUser" @click="onDeleteClick(topic.id)" class="mr-2 ml-2"
                      variant="outline-danger" size="sm">Delete
            </b-button>
          </div>
        </b-card-body>
      </b-card>
    </b-card-group>
    <b-card v-else bg-variant="dark" text-variant="white">
      <b-card-text><h4 class="text-center"> No Topics </h4></b-card-text>
    </b-card>
    <topics-form-modal/>
    <topics-comments-modal/>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'
  import TopicsFormModal from "@/modules/topics/TopicsFormModal";
  import TopicsCommentsModal from "@/modules/topics/TopicsCommentsModal";
  import firebase from 'firebase'

  const {mapState, mapActions} = createNamespacedHelpers('topics');

  export default {
    name: "Topics",
    components: {TopicsCommentsModal, TopicsFormModal},
    data() {
      return {
        currentUser: ''
      }
    },
    computed: {
      ...mapState({
        topics: state => state.topics
      })
    },
    methods: {
      ...mapActions(['getTopics', 'showModal', 'showCommentsModal']),
      onViewClick(topic) {
        this.$router.push({
          name: 'topics.view',
          params: {id: topic.id}
        })
      },
      onDeleteClick(id) {
        firebase.firestore().collection('topics').where('__name__', '==', id).get()
          .then(response => {
            response.forEach(doc => {
              firebase.firestore().collection('comments').where('topic_id', '==', doc.id).get()
                .then(resp => {
                  resp.forEach(cdoc => {
                    cdoc.ref.delete();
                  })
                }).catch(err => {
                return err;
              })
              doc.ref.delete();
              this.$bvToast.toast('Topic was deleted successfully', {
                title: 'Success',
                autoHideDelay: 5000,
                variant: 'success',
                appendToast: false
              })
            })
            this.topics.forEach(topic => {
              if (topic.id === id) {
                this.topics.splice(this.topics.indexOf(topic), 1);
              }
            })
          })
      }
    },
    beforeMount() {
      this.currentUser = localStorage.getItem('user');
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

  .actions {
    float: right;
  }

  .comments-action {
    float: right;
  }

</style>
