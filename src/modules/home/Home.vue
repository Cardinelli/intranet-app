<template>
  <div class="home">
    <b-card-group deck>
      <b-card
        img-src="https://nestify.io/blog/wp-content/uploads/bfi_thumb/website-speed-test-tools-38e7pu3yhb1becaz21vn62.png"
        img-height="300px"
        img-width="250px"
        footer="20/02/2020"
        footer-tag="footer"
        title="Last Topic"
      >
        <b-card-text>This is test card</b-card-text>
        <b-button size="sm" variant="outline-info">Details</b-button>
      </b-card>

      <b-card
        img-src="https://nestify.io/blog/wp-content/uploads/bfi_thumb/website-speed-test-tools-38e7pu3yhb1becaz21vn62.png"
        footer="20/02/2020"
        footer-tag="footer"
        title="TEST"
      >
        <b-card-text>This is test card</b-card-text>
        <b-button size="sm" variant="outline-info">Details</b-button>
      </b-card>

      <b-card
        img-src="https://nestify.io/blog/wp-content/uploads/bfi_thumb/website-speed-test-tools-38e7pu3yhb1becaz21vn62.png"
        footer="20/02/2020"
        footer-tag="footer"
        title="TEST"
      >
        <b-card-text>This is test card</b-card-text>
        <b-button size="sm" variant="outline-info">Details</b-button>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {}
    }
  }
</script>

<style scoped>

  .home {
    width: 59%;
    margin-left: 25%;
    margin-top: 5%;
  }

</style>
