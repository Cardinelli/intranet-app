<template>
  <intranet-modal
    :title="'New Topic'"
    :visible="modal.show"
    :size="'lg'"
    @ok.prevent="onSubmit"
    @hidden="hideModal"
    :hide-footer="false"
  >
    <div class="row m-3">
      <div class="col-md-6">
        <b-form-input id="input-none" v-model="model.title" placeholder="Title"></b-form-input>
      </div>
    </div>
    <div class="row m-3">
      <div class="col-md-12">
        <b-form-textarea
          id="textarea"
          v-model="model.description"
          placeholder="Description"
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </div>
    </div>
  </intranet-modal>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'
  import firebase from 'firebase'
  import IntranetModal from "@/core/components/intranet-modal/IntranetModal";

  const {mapState, mapActions} = createNamespacedHelpers('topics')

  export default {
    name: "TopicsFormModal",
    components: {IntranetModal},
    data() {
      return {
        model: {
          title: '',
          description: '',
        },
      }
    },
    computed: {
      ...mapState({
        modal: state => state.modal
      })
    },
    props: {
      title: {
        type: String,
        default: null
      }
    },
    methods: {
      ...mapActions(['getTopics', 'hideModal']),
      Hide() {
        this.hideModal();
      },
      onSubmit() {
        firebase.firestore().collection('topics').add({
          title: this.model.title,
          description: this.model.description,
          created_at: '2020/20/20',
          created_by: 'user1'
        }).then(response => {
          if (response) {
            this.getTopics();
            this.hideModal();
            this.modal = {
              title: '',
              description: '',
            }
          }
        }).catch(error => {
          console.log(error);
        })
      }
    }
  }
</script>

<style scoped>

</style>
