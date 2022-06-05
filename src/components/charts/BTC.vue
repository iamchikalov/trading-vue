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
import Density from "@/components/overlays/Density"

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
const socket2 = new WebSocket(
    (window.location.protocol === 'https:' ? 'wss://' : 'ws://')
    + "213.189.220.102:8000"
    + '/ws/densitys/'
)

socket1.onmessage = function (event) {
  const data = JSON.parse(event.data)
  const candle_sticks_lvl = data.candle_sticks_lvl
  const candles = candle_sticks_lvl.BTC['5m'].candle_sticks
  //const levels = candle_sticks_lvl.BTC['5m'].levels

  if (!candlesArr.length) {
    candles.forEach((l) => {
      let a = parseCandle(l)
      candlesArr.push(a)
    });
  } else {
    if (parseInt(candles[candles.length - 1][6]) !== candlesArr[candlesArr.length - 1][0]) {
      let a = parseCandle(candles[candles.length - 1])
      candlesArr.push(a)
    }
  }
};

socket2.onmessage = function (event) {
  const data = JSON.parse(event.data)

  density_up[0] = data.densitys.BTC.ask[0]
  density_low[0] = data.densitys.BTC.bid[0]
  density_label_up[0] = String(density_up[0])
  density_label_low[0] = String(density_low[0])
}

export default {
  name: "BTC",
  components: { TradingVue },

  data() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      ohlcv: candlesArr,
      overlays: [Density],
      onchart: [
        {
          name: "DensityUp",
          type: "Density",
          data: [],
          settings: {
            density_color: "#d70808",
            density_label: density_label_up,
            density: density_up,
          }
        },
        {
          name: "DensityLow",
          type: "Density",
          data: [],
          settings: {
            density_color: "#00ff17",
            density_label: density_label_low,
            density: density_low,
          }
        },
      ],
    };
  },
};
</script>
<style>
</style>
