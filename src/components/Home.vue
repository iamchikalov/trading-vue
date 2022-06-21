<template>
  <div id="app">
    <h1>Choose coin!</h1>
    <hr>
    <a href="/ETH">ETH</a>
    <br>
    <br>
    <a href="/BCH">BCH</a>
    <br>
    <br>
    <a href="/BTC">BTC</a>
    <hr>
    <hr>
    <ul>
      <li v-for="coin in coinsArr" :key="coin">
        <router-link :to="`/coins/${coin}`" >{{ coin }}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>

export default {
 props: [ 'coinsArr' ]

}
</script>

//TODO: нужно написать отдельный js файл с сокетом и получением данных, после
этого надо сделать CoinChart, где происходит отрисовка, потом всё готовое
просто прокидываем в Coin.vue