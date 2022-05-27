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

const socket1 = new WebSocket(
    (window.location.protocol === 'https:' ? 'wss://' : 'ws://')
    + "213.189.220.102:8000"
    + '/ws/charts/');
socket1.onmessage = function(event) {
  const data = JSON.parse(event.data)
  const candle_sticks_lvl = data.candle_sticks_lvl
  const candle = candle_sticks_lvl.BTC['5m'].candle_sticks
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
};

export default {
  name: "ETH",
  components: { TradingVue },

  data() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      ohlcv: candlesArr,
      overlays: [ImpLine],
      onchart: [
        {
          name: "ImpLine",
          type: "ImportantLevel",
          data: [],
          settings: {
            color_imp_level: "#00ff17",
            label_imp_level: '1.1025',
            imp_level: 1.1025,
          }
        },
      ],
    };
  },
};
</script>
<style>
</style>
