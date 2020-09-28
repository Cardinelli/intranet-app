<template>
  <b-modal ref="modal"
           modal-class="intranet-modal"
           :visible="visible"
           :size="size"
           :title="title"
           :hide-footer="hideFooter"
           no-enforce-focus
           :scrollable="scrollable"
           @show="onModalShow"
           @shown="$emit('shown')"
           @hide="beforeHide"
           @hidden="onHidden">

    <template v-slot:modal-footer>
      <div class="w-100">
        <p class="float-left">Modal Footer Content</p>
        <b-button
          variant="outline-success"
          size="sm"
          class="float-right mr-1 ml-1"
          @click="onFormSubmit"
        >
          Submit
        </b-button>
      </div>
    </template>

    <b-form>
      <slot></slot>
      <slot v-for="(_, name) in $slots" :name="name" :slot="name"/>
      <button style="display:none"></button>
    </b-form>

  </b-modal>
</template>

<script>
  export default {
    name: "IntranetModal",
    props: {
      title: {
        type: String,
        default: null
      },
      size: {
        type: String,
        default: null
      },
      visible: {
        type: Boolean,
        default: false
      },
      hideFooter: {
        type: Boolean,
        default: true
      },
      scrollable: {
        type: Boolean,
        default: false
      },
    },
    methods: {
      onModalShow() {
        this.$emit('show', '');
      },
      beforeHide($event) {
        this.$emit('hide', $event);
      },
      onFormSubmit($event) {
        this.$emit('ok', $event)
      },
      onHidden() {
        this.$emit('hidden');
      },
      hide() {
        this.$refs.modal.hide();
      }
    }
  }
</script>

<style scoped>

</style>
