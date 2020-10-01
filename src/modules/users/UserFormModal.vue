<template>
  <intranet-modal
    :title="'Create User'"
    :visible="modal.show"
    :size="'lg'"
    @ok.prevent="onSubmit"
    @hidden="hideModal"
    :hide-footer="false"
  >
    <div class="row m-3">
      <div class="col-md-6">
        <b-form-input
          id="input-none"
          v-model="model.email"
          placeholder="Email"
          class="form-control"
          type="email"
        >
        </b-form-input>
      </div>
      <div class="col-md-6">
        <b-form-input
          id="input-none"
          v-model="model.password"
          type="password"
          placeholder="Password"
        >
        </b-form-input>
      </div>
    </div>

  </intranet-modal>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'
  import firebase from 'firebase'

  import IntranetModal from "@/core/components/intranet-modal/IntranetModal";

  const {mapState, mapActions} = createNamespacedHelpers('users')

  export default {
    name: "UserFormModal",
    components: {IntranetModal},
    computed: {
      ...mapState({
        modal: state => state.modal,
        model: state => state.modal.model
      })
    },
    methods: {
      ...mapActions(['hideModal', 'showModal']),
      onSubmit() {
        firebase.auth().createUserWithEmailAndPassword(this.model.email, this.model.password)
          .then(response => {
            this.$bvToast.toast('User was updated successfully', {
              title: 'Success',
              autoHideDelay: 5000,
              variant: 'success',
              appendToast: false
            })
            this.hideModal();
            return response
          })
          .catch(error => {
            this.$bvToast.toast(error, {
              title: 'Someting went wrong',
              autoHideDelay: 5000,
              variant: 'danger',
              appendToast: false
            })
          })
      }
    }
  }
</script>

<style scoped>

</style>
