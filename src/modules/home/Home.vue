<template>
  <div class="home">
    <div class="container bootstrap snippets bootdey">
      <div class="row">
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="panel panel-dark panel-colorful">
            <div class="panel-body text-center">
              <p class="text-uppercase mar-btm text-sm">Active Users</p>
              <i class="fa fa-users fa-5x"></i>
              <hr>
              <p class="h2 text-thin"> {{activeUsers}} </p>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="panel panel-danger panel-colorful">
            <div class="panel-body text-center">
              <p class="text-uppercase mar-btm text-sm">Comments</p>
              <i class="fa fa-comment fa-5x"></i>
              <hr>
              <p class="h2 text-thin">{{comments}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="panel panel-primary panel-colorful">
            <div class="panel-body text-center">
              <p class="text-uppercase mar-btm text-sm">New Topics</p>
              <i class="fa fa-shopping-cart fa-5x"></i>
              <hr>
              <p class="h2 text-thin">{{topics}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="panel panel-info panel-colorful">
            <div class="panel-body text-center">
              <p class="text-uppercase mar-btm text-sm">Earning</p>
              <i class="fa fa-dollar fa-5x"></i>
              <hr>
              <p class="h2 text-thin">7,428</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapActions} = createNamespacedHelpers('dashboard');


  export default {
    name: "Home",
    data() {
      return {}
    },
    methods: {
      ...mapActions(['initializeDashboardData'])
    },
    computed: {
      ...mapState({
        activeUsers: state => state.activeUsers,
        topics: state => state.topics,
        comments: state => state.comments
      })
    },
    beforeMount() {
      this.initializeDashboardData();
    }
  }
</script>

<style scoped>

  .home {
    width: 59%;
    margin-left: 25%;
    margin-top: 5%;
  }

  .panel {
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.05);
    border-radius: 0;
    border: 0;
    margin-bottom: 24px;
  }

  .panel-dark.panel-colorful {
    background-color: #3b4146;
    border-color: #3b4146;
    color: #fff;
  }

  .panel-danger.panel-colorful {
    background-color: #f76c51;
    border-color: #f76c51;
    color: #fff;
  }

  .panel-primary.panel-colorful {
    background-color: #5fa2dd;
    border-color: #5fa2dd;
    color: #fff;
  }

  .panel-info.panel-colorful {
    background-color: #4ebcda;
    border-color: #4ebcda;
    color: #fff;
  }

  .panel-body {
    padding: 25px 20px;
  }

  .panel hr {
    border-color: rgba(0, 0, 0, 0.1);
  }

  .mar-btm {
    margin-bottom: 15px;
  }

  h2, .h2 {
    font-size: 28px;
  }

  .small, small {
    font-size: 85%;
  }

  .text-sm {
    font-size: .9em;
  }

  .text-thin {
    font-weight: 300;
  }

  .text-semibold {
    font-weight: 600;
  }

</style>
