<template>
  <trading-vue
      :data="this.$data"
      :width="this.width"
      :height="this.height"
  ></trading-vue>

</template>
<script>
import { TradingVue } from "trading-vue-js"
import moment from "moment-timezone"
import { EMA } from "technicalindicators"
import csv from "./03.csv"

let data = []

csv.forEach((l) => {
  const d = l

  const open = parseFloat(d[1]);
  const high = parseFloat(d[2]);
  const low = parseFloat(d[3]);
  const close = parseFloat(d[4]);

  if (isNaN(open)) {
    return
  }

  const date = moment.tz(d[0], "YYYYMMDD hhmmss", "EST").toDate()

  data.push([date.getTime(), open, high, low, close])
});

const closeData = []
data.forEach((d) => closeData.push(d[4]))


const ema9Data = new EMA.calculate({ period: 9, values: closeData })
const ema9 = []
data.forEach((d, i) => {
  const emad = i > 9 ? ema9Data[i - 9] : undefined
  ema9.push([d[0], emad])
});

const ema20Data = new EMA.calculate({ period: 20, values: closeData })
const ema20 = []
data.forEach((d, i) => {
  const emad = i > 20 ? ema20Data[i - 20] : undefined;
  ema20.push([d[0], emad]);
});

const ema50Data = new EMA.calculate({ period: 50, values: closeData })
const ema50 = []
data.forEach((d, i) => {
  const emad = i > 50 ? ema50Data[i - 50] : undefined
  ema50.push([d[0], emad])
});

const ema200Data = new EMA.calculate({ period: 200, values: closeData })
const ema200 = []
data.forEach((d, i) => {
  const emad = i > 200 ? ema200Data[i - 200] : undefined
  ema200.push([d[0], emad])
});

// let BOGDAN = JSON.parse(JSON.stringify(data))
// BOGDAN.forEach((point, i) => {
//   BOGDAN[i][1] = 1.1027
// })

export default {
  name: "app",
  components: { TradingVue },

  data() {
    return {
      draw(ctx) {
        let layout = this.$props.layout // Layout object (see API BOOK)
        const data = this.$props.data
        // ctx.lineWidth = 1.5
        // ctx.strokeStyle = 'red'
        for (var p of data) {
          // ctx.fillStyle = 'red'
          // ctx.beginPath()
          let x = layout.t2screen(p[0]) // x - Mapping
          let y = layout.$2screen(p[1]) // y - Mapping
          ctx.lineTo(x, y)
          // ctx.arc(x, y, 1, 0, Math.PI * 2, true) // Trade point
          // ctx.fill()
          // ctx.stroke()
        }
      },
     width: window.innerWidth,
     height: window.innerHeight,
      ohlcv: data,
      onchart: [
        {
          name: "EMA 9",
          type: "EMA",
          data: ema9,
          settings: { color: "white" },
        },
        {
          name: "EMA 20",
          type: "EMA",
          data: ema20,
          settings: { color: "yellow" },
        },
        {
          name: "EMA 50",
          type: "EMA",
          data: ema50,
          settings: { color: "purple" },
        },
        {

          name: "EMA 200",
          type: "EMA",
          data: ema200,
          settings: { color: "orange" },
        },
        // {
        //   name: "Line",
        //   type: "EMA",
        //   data: BOGDAN,
        //   settings: { color: "red" },
        // },
      ],
    };
  },
};
</script>
<style>
</style>
