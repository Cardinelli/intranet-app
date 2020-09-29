<template>
  <intranet-modal
    :title="'Comments'"
    :visible="modal.show"
    :size="'lg'"
    @ok.prevent="onSubmit"
    @hidden="hideCommentsModal"
    :hide-footer="true"
    :scrollable="true"
  >
    <b-card>
      <b-media>
        <template v-slot:aside>
          <b-img src="https://www.iconfinder.com/data/icons/web-mobile-2-1/64/user_avatar_admin_web_mobile_business_office-512.png" blank blank-color="#ccc" width="64" alt="placeholder"></b-img>
        </template>

        <h5 class="mt-0">Media Title</h5>
        <p>
          Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
          Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc
          ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
        </p>
        <p>
          Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </p>

        <b-media>
          <template v-slot:aside>
            <b-img blank blank-color="#ccc" width="64" alt="placeholder"></b-img>
          </template>

          <h5 class="mt-0">Nested Media</h5>
          <p class="mb-0">
            Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in
            faucibus.
          </p>
        </b-media>
      </b-media>
    </b-card>

    <b-card-footer>
      <div class="row">
        <div class="col-md-10">
          <b-form-textarea placeholder="Comment"></b-form-textarea>
        </div>
        <div class="col-md-2">
          <b-button class="mt-3" size="sm" variant="outline-primary"> Comment</b-button>
        </div>
      </div>
    </b-card-footer>
  </intranet-modal>
</template>

<script>
  import IntranetModal from "@/core/components/intranet-modal/IntranetModal";
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapActions} = createNamespacedHelpers('topics')
  export default {
    name: "TopicsCommentsModal",
    components: {IntranetModal},
    computed: {
      ...mapState({
        modal: state => state.commentModal
      })
    },
    methods: {
      ...mapActions(['hideCommentsModal']),
      Hide() {
        this.hideCommentsModal();
      },
      onSubmit() {
        console.log(11111);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
