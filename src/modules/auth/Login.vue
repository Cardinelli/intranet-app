<template>
  <div class="authentication-modal">
    <b-card bg-variant="light" class="mt-5 p-3">
      <b-form-group
        label-cols-lg="0"
        label="Login"
        label-align="center"
        label-class="font-weight-bold pt-0"
        class="m-1"
      >
        <b-form-group
          label-cols-sm="4"
          label="Username"
          label-align-sm="right"
          label-for="username-email"
        >
          <b-form-input id="username-email"></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols-sm="4"
          label="Password"
          label-align-sm="right"
          label-for="password"
        >
          <b-form-input id="password"></b-form-input>
        </b-form-group>
      </b-form-group>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: "Login"
  }
</script>

<style scoped>

  .authentication-modal {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-content: center;
  }

</style>
