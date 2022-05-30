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
import ImpLine from "@/components/overlays/ImpLine"

let candlesArr = []
let ImpLineLower = [0]
let ImpLineUpper = [0]
let LowerLabel = ['']
let UpperLabel = ['']

const socket1 = new WebSocket(
    (window.location.protocol === 'https:' ? 'wss://' : 'ws://')
    + "213.189.220.102:8000"
    + '/ws/charts/');
socket1.onmessage = function(event) {
  console.log('BCH')
  const data = JSON.parse(event.data)
  const candle_sticks_lvl = data.candle_sticks_lvl
  const candles = candle_sticks_lvl.BCH['5m'].candle_sticks
  const levels = candle_sticks_lvl.BCH['5m'].levels

  candles.forEach((l) => {
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

  ImpLineLower[0] = levels[0]
  ImpLineUpper[0] = levels[levels.length - 1]
  LowerLabel[0] = String(ImpLineLower[0])
  UpperLabel[0] = String(ImpLineUpper[0])
};

export default {
  name: "BCH",
  components: { TradingVue },

  data() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      ohlcv: candlesArr,
      overlays: [ImpLine],
      onchart: [
        {
          name: "ImpLineUpper",
          type: "ImportantLevel",
          data: [],
          settings: {
            color_imp_level: "#00ff17",
            label_imp_level: UpperLabel,
            imp_level: ImpLineUpper,
          }
        },
        {
          name: "ImpLineLower",
          type: "ImportantLevel",
          data: [],
          settings: {
            color_imp_level: "#d70808",
            label_imp_level: LowerLabel,
            imp_level: ImpLineLower,
          }
        },
      ],
    };
  },
};
</script>
<style>
</style>
