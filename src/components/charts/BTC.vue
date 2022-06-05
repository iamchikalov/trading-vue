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
import Density from "@/components/overlays/Density"

let candlesArr = []
let density_low = [0]
let density_up = [0]
let density_label_low = ['']
let density_label_up = ['']

const socket1 = new WebSocket(
    (window.location.protocol === 'https:' ? 'wss://' : 'ws://')
    + "213.189.220.102:8000"
    + '/ws/charts/');
socket1.onmessage = function(event) {
  const data = JSON.parse(event.data)
  const candle_sticks_lvl = data.candle_sticks_lvl
  const candle = candle_sticks_lvl.BTC['5m'].candle_sticks
  const levels = candle_sticks_lvl.BTC['5m'].levels

  candle.forEach((l) => {
    const d = l

    const open = parseFloat(d[1])
    const high = parseFloat(d[2])
    const low = parseFloat(d[3])
    const close = parseFloat(d[4])

    if (isNaN(open)) {
      return
    }

    const date = parseInt(d[6])
    candlesArr.push([date, open, high, low, close])
  });

  density_low[0] = levels[0]
  density_up[0] = levels[levels.length - 1]
  density_label_low[0] = String(density_low[0])
  density_label_up[0] = String(density_up[0])
};

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
            density_color: "#00ff17",
            density_label: density_label_up,
            density: density_up,
          }
        },
        {
          name: "DensityLow",
          type: "Density",
          data: [],
          settings: {
            density_color: "#d70808",
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
