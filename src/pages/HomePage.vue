<template>
  <Home
      :coinsArr="array"
  />
</template>
<script>
import {
  candlesLevelsSocket,
  getCandlesLevels
} from "@/utils/WebSocket"
import Home from "@/components/Home"

let coin = 'LTC'

export default {
  components: { Home },
  data() {
    return {
      array: []
    }
  },
  created() {
    candlesLevelsSocket.onmessage = (event) => getCandlesLevels(event, this, coin)
  },
}
</script>