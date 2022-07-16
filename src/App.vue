<template>
  <div id="app">
    <hr>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {

  },
  created () {
    this.candlesLevelsSocket = new WebSocket(
        (window.location.protocol === 'https:' ? 'wss://' : 'ws://')
        + "213.189.220.102:8000"
        + '/ws/charts/'
    );
    this.densitiesSocket = new WebSocket(
        (window.location.protocol === 'https:' ? 'wss://' : 'ws://')
        + "213.189.220.102:8000"
        + '/ws/densitys/'
    );

    this.candlesLevelsSocket.onmessage = (event) => {
      this.$store.dispatch('handleCandelsSocket', event)
    }
    
    this.densitiesSocket.onmessage = (event) => {
      this.$store.dispatch('handleDensitiesSocket', event)
    } 

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>