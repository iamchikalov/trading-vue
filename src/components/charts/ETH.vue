<template>
  <trading-vue
      :data="this.$data"
      :width="this.width"
      :height="this.height"
      :overlays="this.overlays"
  ></trading-vue>
</template>

<script>
import { TradingVue } from "trading-vue-js"
import parseCandle from "@/utils/utils"
//import Densities from "@/components/overlays/Densities"

let candlesArr = []
let density_up = [0]
let density_low = [0]
let density_label_up = ['']
let density_label_low = ['']

const socket1 = new WebSocket(
    (window.location.protocol === 'https:' ? 'wss://' : 'ws://')
    + "213.189.220.102:8000"
    + '/ws/charts/'
);

socket1.onmessage = function(event) {
  const data = JSON.parse(event.data)
  const candle_sticks_lvl = data.candle_sticks_lvl
  const candles = candle_sticks_lvl.ETH['5m'].candle_sticks
  const levels = candle_sticks_lvl.ETH['5m'].levels

  if (!candlesArr.length) {
    candles.forEach((l) => {
      let a = parseCandle(l)
      candlesArr.push([a[0], a[1], a[2], a[3], a[4]])
    });
  } else {
    if (parseInt(candles[candles.length - 1][6]) !== candlesArr[candlesArr.length - 1][0]) {
      let a = parseCandle(candles[candles.length - 1])
      candlesArr.push([a[0], a[1], a[2], a[3], a[4]])
    }
  }
  density_low[0] = levels[0]
  density_up[0] = levels[levels.length - 1]
  density_label_low[0] = String(density_low[0])
  density_label_up[0] = String(density_up[0])
};

export default {
  name: "ETH",
  components: { TradingVue },

  data() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      ohlcv: candlesArr,
      // overlays: [Densities],
      // onchart: [
      //   {
      //     name: "Densities",
      //     type: "Density",
      //     data: [],
      //     settings: {
      //       density_up: density_up,
      //       density_low: density_low,
      //       density_label_up: density_label_up,
      //       density_label_low: density_label_low,
      //       density_color_up: "#00ff15",
      //       density_color_low: "#d70808"
      //     }
      //   },
      //     ],
    };
  },
};
</script>
<style>
</style>
