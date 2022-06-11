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
let density_up = []
let density_low = []
let density_label_up = []
let density_label_low = []

const socket1 = new WebSocket(
    (window.location.protocol === 'https:' ? 'wss://' : 'ws://')
    + "213.189.220.102:8000"
    + '/ws/charts/'
);
const socket2 = new WebSocket(
    (window.location.protocol === 'https:' ? 'wss://' : 'ws://')
    + "213.189.220.102:8000"
    + '/ws/densitys/'
);

function DataCandlesLevels(event, vm) {
  const data = JSON.parse(event.data)
  const candles = data.candle_sticks_lvl.ETH['5m'].candle_sticks
  const levels = JSON.parse(JSON.stringify(data.candle_sticks_lvl.ETH['5m'].levels))

  if (!candlesArr.length) {
    candles.forEach((l) => {
      let a = parseCandle(l)
      candlesArr.push(a)
    })
  } else {
    if (parseInt(candles[candles.length - 1][6]) !== candlesArr[candlesArr.length - 1][0]) {
      let a = parseCandle(candles[candles.length - 1])
      candlesArr.push(a)
    } else {
      candlesArr[candlesArr.length - 1][1] = parseFloat(candles[candles.length - 1][1])
      candlesArr[candlesArr.length - 1][2] = parseFloat(candles[candles.length - 1][2])
      candlesArr[candlesArr.length - 1][3] = parseFloat(candles[candles.length - 1][3])
      candlesArr[candlesArr.length - 1][4] = parseFloat(candles[candles.length - 1][4])
    }
  }
  vm.ohlcv = candlesArr

  const levels_settings = levels.map((level) => ({
    y: [level],
    color: '#0bf5f5',
    label: [String(level)],
    dotted: true
  }))

  vm.onchart[0].settings = [vm.onchart[0].settings[0], vm.onchart[0].settings[1], ...levels_settings]
}

function DataDensities(event, vm) {
  const data = JSON.parse(event.data)

  density_up[0] = data.densitys.ETH.ask[0]
  density_low[0] = data.densitys.ETH.bid[0]
  density_label_up[0] = String(density_up[0])
  density_label_low[0] = String(density_low[0])

  vm.onchart[0].settings[0].y = density_up
  vm.onchart[0].settings[1].y = density_low
  vm.onchart[0].settings[0].label = density_label_up
  vm.onchart[0].settings[1].label = density_label_low
}

export default {
  name: "ETH",
  components: { TradingVue },

  data() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      ohlcv: candlesArr,
      overlays: [Density],
      onchart: [
        {
          name: "Levels and densities",
          type: "Lines",
          data: [],
          settings: [
            {
              y: density_up,
              color: "#d70808",
              label: density_label_up,
              dotted: false
            },
            {
              y: density_low,
              color: "#00ff15",
              label: density_label_low,
              dotted: false
            },
          ],
        },
      ],
    };
  },
  created() {
    socket1.onmessage = (event) => DataCandlesLevels(event, this)
    socket2.onmessage = (event) => DataDensities(event, this)
  },
};
</script>
<style>
</style>
