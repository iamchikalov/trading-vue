<template>
  <div>
    <trading-vue
        :data="this.$data"
        :width="this.width"
        :height="this.height"
        :overlays="this.overlays"
    ></trading-vue>
  </div>
</template>

<script>
import { TradingVue } from "trading-vue-js"
import Density from "@/components/overlays/Density"
import {
  candlesLevelsSocket,
  DensitiesSocket,
  getDensities,
  getCandlesLevels
} from "@/utils/WebSocket"

export default {
  name: "BTC",
  components: { TradingVue },
  props: {
    timeframe: {
      type: String,
      default: '1m'
    },
    coin: {
      type: String,
      default: 'BTC'
    }
  },
  data() {
    return {
      array: [],
      // width: window.innerWidth,
      // height: window.innerHeight,
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
    candlesLevelsSocket.onmessage = (event) => getCandlesLevels(event, this, this.coin)
    DensitiesSocket.onmessage = (event) => getDensities(event, this, this.coin)
  },
};
</script>
<style>
</style>