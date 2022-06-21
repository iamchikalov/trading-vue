<template>
  <div>
    <trading-vue
        :data="this.$data"
        :width="this.width"
        :height="this.height"
        :overlays="this.overlays"
    ></trading-vue>
    <Home
        :coinsArr="array"
    />
  </div>
</template>

<script>
import { TradingVue } from "trading-vue-js"
import Density from "@/components/overlays/Density"
import Home from "@/components/Home"
import {
  candlesLevelsSocket,
  DensitiesSocket,
  getDensities,
  getCandlesLevels
} from "@/utils/WebSocket"

let coin = 'BTC'

export default {
  name: "BTC",
  components: { TradingVue, Home },

  data() {
    console.log(coin)
    return {
      array: [],
      width: window.innerWidth,
      height: window.innerHeight,
      ohlcv: [],
      overlays: [Density],
      onchart: [
        {
          name: "Levels and densities",
          type: "Lines",
          data: [],
          settings:[
            {
              y: [],
              color: "#d70808",
              label: [],
              dotted: false
            },
            {
              y: [],
              color: "#00ff15",
              label: [],
              dotted: false
            },
          ],
        },
      ],
    };
  },
  created() {
    candlesLevelsSocket.onmessage = (event) => getCandlesLevels(event, this, coin)
    DensitiesSocket.onmessage = (event) => getDensities(event, this, coin)
  },
};
</script>
<style>
</style>