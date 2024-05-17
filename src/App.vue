<template>
  <img alt="Vue logo" src="./assets/logo.png">

  <t-button style="position: absolute; left: 8px; top: 8px;" @click="handleExit">
    退出
  </t-button>

  <h1>{{ initStatus }}</h1>
  <h2>{{ msg }}</h2>
  <t-button @click="handleReInit">
    test, sub status: {{ sub !== null ? 'ready' : 'unready' }}
  </t-button>



</template>

<script>
import ROSLIB from 'roslib';


export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      initStatus: 'not init',
      sub: null,
      msg: 'no msg',
    }
  },
  methods: {
    handleExit() {
      window.electronAPI.exitProgram();
    },

    handleSubscriberMessage(msg) {
      console.log("handleSubscriberMessage: ", msg)
      this.msg = msg;
    },

    initSubscriber() {
      this.$ros.getTopicType('/xf_iat_result', (type) => {
        this.initStatus = type;

        console.log("getTopicType: ", type);

        // Create a listener when it is not initialized or a new topic is entered
        if (this.sub === null) {

          this.sub = new ROSLIB.Topic({
            ros: this.$ros,
            name: '/xf_iat_result',
            messageType: type
          })

          this.sub.subscribe(this.handleSubscriberMessage)
        }

      })
    },

    handleReInit() {
      if (this.initStatus === 'init fail, please chk rosbridge!') {

        try {
          this.initSubscriber();
          console.log("initSubscriber", true)
        } catch {
          this.initStatus = 'init fail, please chk rosbridge!'
          console.log("initSubscriber", false)
        }

      }
    }
  },
  created() {
    console.log("api", window.electronAPI)
    try {
      this.initSubscriber();
      console.log("initSubscriber", true)
    } catch {
      this.initStatus = 'init fail, please chk rosbridge!'
      console.log("initSubscriber", false)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
