<template>
  <intranet-modal
    :title="'Comments'"
    :visible="modal.show"
    :size="'lg'"
    @hidden="Hide"
    :hide-footer="true"
    :scrollable="true"
  >
    <b-card v-if="topic.comments && topic.comments.length > 0">
      <b-media v-for="comment in topic.comments" :key="comment.id">
        <template v-slot:aside>
          <b-img
            src="https://www.iconfinder.com/data/icons/web-mobile-2-1/64/user_avatar_admin_web_mobile_business_office-512.png"
            width="45px"
            height="45px"
            alt="placeholder"></b-img>
        </template>

        <div class="actions mb-2">
          <b-button v-if="comment.created_by === currentUser" @click="removeComment(comment.id)"
                    class="ml-1 mr-1 float-right" size="sm" variant="outline-danger"><i class="fas fa-trash-alt"></i>
          </b-button>
          <b-button v-if="comment.created_by === currentUser" @click="updateComment(comment)"
                    class="ml-1 mr-1 float-right" size="sm"
                    variant="outline-info"><i class="fas fa-pencil-alt"></i>
          </b-button>
        </div>
        <div class="details">
          <h6 class="mt-0">{{comment.display_name}}</h6>
          <b-form-textarea :id="`comment-update-${comment.id}`" rows="2" no-resize class="update-textarea mb-2" disabled
                           v-model="comment.comment"/>
        </div>
      </b-media>
    </b-card>
    <b-card v-else>
      <h6 class="text-center"> Be the first one who will comment </h6>
    </b-card>

    <b-card-footer>
      <div class="row">
        <div class="col-md-10">
          <b-form-textarea v-model="commentModel.comment" no-resize placeholder="Comment"></b-form-textarea>
        </div>
        <div class="col-md-2">
          <b-button type="submit" :disabled="!commentModel.comment" @click="writeComment" class="mt-3" size="sm"
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
        currentUser: '',
        commentModel: {
          comment: '',
        }
      }
    },
    computed: {
      ...mapState({
        modal: state => state.commentModal,
        topics: state => state.topics,
        topic: state => state.topic
      }),
    },
    beforeMount() {
      this.currentUser = localStorage.getItem('user');
    },
    methods: {
      ...mapActions(['hideCommentsModal', 'getTopics', 'getTopic']),
      Hide() {
        this.hideCommentsModal();
        this.commentModel.comment = '';
      },
      writeComment() {
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let newComment = {
          comment: this.commentModel.comment,
          created_at: time,
          created_by: firebase.auth().currentUser.uid,
          topic_id: this.topic.id
        }
        firebase.firestore().collection('comments').add(newComment).then(response => {
          if (response) {
            this.$bvToast.toast('Comment was created successfully', {
              title: 'Success',
              autoHideDelay: 5000,
              variant: 'success',
              appendToast: false
            })
            newComment = {...newComment, id: response.id}
            this.topics = this.topics.map(t => {
              if (t.id === this.topic.id) {
                t.comments.push(newComment);
              }
            })
            this.topic.comments.push(newComment);
            this.commentModel = {
              comment: '',
            }
          }
        }).catch(error => {
          console.log(error);
        })
      },
      updateComment(comment) {
        let textArea = document.getElementById(`comment-update-${comment.id}`);
        textArea.disabled = false;
        textArea.style.overflowY = 'scroll'
        textArea.addEventListener("keyup", (ev => {
          if (ev.keyCode === 13) {
            ev.preventDefault();
            textArea.disabled = true;
            firebase.firestore().collection('comments').doc(comment.id).update({
              comment: comment.comment
            }).then(response => {
              textArea.style.overflowY = 'hidden'
              this.$bvToast.toast('Comment was updated successfully', {
                title: 'Success',
                autoHideDelay: 5000,
                variant: 'success',
                appendToast: false
              })
              return response
            }).catch(error => {
              console.log(error);
            })
          }
        }))

      },
      removeComment(id) {
        firebase.firestore().collection('comments').where('__name__', '==', id).get()
          .then(response => {
            response.forEach(doc => {
              doc.ref.delete()
              this.$bvToast.toast('Comment was deleted successfully', {
                title: 'Success',
                autoHideDelay: 5000,
                variant: 'success',
                appendToast: false
              })
            })
            this.topic.comments = this.topic.comments.filter(comment => comment.id !== id);
          })
      }
    }
  }
</script>

<style lang="scss" scoped>

  .update-textarea {
    overflow: hidden;
  }

  .form-control:disabled, .form-control[readonly] {
    background-color: transparent !important;
    border: none;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #222F3C;
  }

</style>
