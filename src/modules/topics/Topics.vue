<template>
  <div class="topics-wrapper">
    <div class="create-button mb-3">
      <b-button @click="showModal" variant="outline-info" size="sm">Create Topic</b-button>
    </div>
    <b-card-group deck>
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
            <b-button v-b-toggle.collapse-comment class="mr-2 ml-2"
                      variant="outline-primary"
                      size="sm">
              <i class="far fa-comments"></i>
              <span> - {{topic.title.length}} </span>
            </b-button>
            <b-button @click="onViewClick(topic)" class="mr-2 ml-2" variant="outline-info" size="sm">View</b-button>
          </div>
        </b-card-body>

        <b-collapse id="collapse-comment" class="mt-3">
          <b-card-footer>
            <b-media>
              <template v-slot:aside>
                <b-img blank blank-color="#ccc" width="64" src="" alt="placeholder"></b-img>
              </template>

              <h5 class="mt-0">John Doe</h5>
              <p>
                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc
              </p>
            </b-media>
            <div class="comments-action">
              <div class="row">
                <div class="col-md-6">
                  <b-form-input placeholder="Comment"></b-form-input>
                </div>
                <div class="col-md-6">
                  <b-button size="sm" variant="outline-primary"> Comment</b-button>
                </div>
              </div>
            </div>
          </b-card-footer>
        </b-collapse>
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
      ...mapActions(['getTopics', 'showModal']),
      onViewClick(topic) {
        this.$router.push({
          name: 'topics.view',
          params: {id: topic.title, topic: topic}
        })
      }
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

  .actions {
    float: right;
  }

  .comments-action {
    float: right;
  }

</style>
