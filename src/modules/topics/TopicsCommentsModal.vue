<template>
  <intranet-modal
    :title="'Comments'"
    :visible="modal.show"
    :size="'lg'"
    @hidden="Hide"
    :hide-footer="true"
    :scrollable="true"
  >
    <b-card v-if="comments.length > 0">
      <b-media v-for="comment in comments" :key="comment.id">
        <template v-slot:aside>
          <b-img
            src="https://www.iconfinder.com/data/icons/web-mobile-2-1/64/user_avatar_admin_web_mobile_business_office-512.png"
            width="45px"
            height="45px"
            alt="placeholder"></b-img>
        </template>

        <h6 class="mt-0">{{comment.created_by}}</h6>
        <p>
          {{comment.comment}}
        </p>
      </b-media>
    </b-card>
    <b-card v-else>
      <h6 class="text-center"> Be the first one who will comment </h6>
    </b-card>

    <b-card-footer>
      <div class="row">
        <div class="col-md-10">
          <b-form-textarea v-model="commentModel.comment" placeholder="Comment"></b-form-textarea>
        </div>
        <div class="col-md-2">
          <b-button :disabled="commentModel.comment ? false : true" @click="writeComment" class="mt-3" size="sm"
                    variant="outline-primary"> Comment
          </b-button>
        </div>
      </div>
    </b-card-footer>
  </intranet-modal>
</template>

<script>
  import IntranetModal from "@/core/components/intranet-modal/IntranetModal";
  import firebase from 'firebase'
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapActions} = createNamespacedHelpers('topics')
  export default {
    name: "TopicsCommentsModal",
    components: {IntranetModal},
    data() {
      return {
        commentModel: {
          comment: '',
        }
      }
    },
    computed: {
      ...mapState({
        modal: state => state.commentModal,
        comments: state => state.commentModal.comments,
        topicId: state => state.commentModal.topicId
      })
    },
    methods: {
      ...mapActions(['hideCommentsModal', 'getComments']),
      Hide() {
        this.hideCommentsModal();
        this.commentModel.comment = '';
      },
      writeComment() {
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        firebase.firestore().collection('comments').add({
          comment: this.commentModel.comment,
          created_at: time,
          created_by: firebase.auth().currentUser.uid,
          topic_id: this.topicId
        }).then(response => {
          if (response) {
            this.getComments();
            this.commentModel = {
              comment: '',
            }
          }
        }).catch(error => {
          console.log(error);
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
