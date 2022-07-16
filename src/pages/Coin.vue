<template>
  <div class="coin-page">
    <CoinChart v-for="tf in timeframes" :key="tf" :timeframe="tf" />
  </div>
</template>

<script>
import CoinChart from "../components/charts/CoinChart.vue";

export default {
  name: "Coin",
  components: { CoinChart },
  data() {
    return {
      timeframes: ["1m", "5m", "1h", "1d"],
    };
  },
};
</script>

<style>
.coin-page {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
}
</style>
