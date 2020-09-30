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
              <i class="fas fa-paste fa-5x"></i>
              <hr>
              <p class="h2 text-thin">{{topicsCount}}</p>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="panel panel-info panel-colorful">
            <div class="panel-body text-center">
              <p class="text-uppercase mar-btm text-sm">Activities</p>
              <i class="fas fa-chart-line fa-5x"></i>
              <hr>
              <p class="h2 text-thin">{{topicsCount + comments + activeUsers}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="latest-news">
      <b-card bg-variant="dark" text-variant="white" :title="`Latest Topics - ${latestTopic.title}`">
        <b-card-text>
          {{latestTopic.description.substring(1, 200) + ' ' + '........'}}
        </b-card-text>
        <b-card-footer>
          {{latestTopic.created_at}}
          <b-button @click="onViewClick()" class="mr-2 ml-2 float-right" variant="outline-info" size="sm">Read More
          </b-button>
        </b-card-footer>
      </b-card>
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
      ...mapActions(['initializeDashboardData']),
      onViewClick() {
        this.$router.push({
          name: 'topics.view',
          params: {id: this.latestTopic.id, topic: this.latestTopic}
        })
      },
    },
    computed: {
      ...mapState({
        activeUsers: state => state.activeUsers,
        topicsCount: state => state.topicsCount,
        comments: state => state.comments,
        latestTopic: state => state.latestTopic
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

  .bg-dark {
    background-color: #222F3C !important;
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
