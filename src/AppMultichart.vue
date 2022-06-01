<template>
  <div>
    <div v-for="(trade, val) in charts" :key="val">
      <trading-vue
          :data="trade"
          :overlays="overlays"
      ></trading-vue>
    </div>
  </div>
</template>

<script>
import Data from './Data'
import { TradingVue } from "trading-vue-js"
import ImpLine from "@/components/overlays/ImpLine"

export default {
  name: "Multi",
  components: {TradingVue},
  data() {
    return {
      charts: Data,
      overlays: [ImpLine],
      colors: {
        colorBack: "#fff",
        colorGrid: "#eee",
        colorText: "#333"
      },
    };
  },
}
</script>
<style>
</style>
