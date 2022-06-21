import Vue from "vue"
import Router from 'vue-router'
import HomePage from "@/pages/HomePage"

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/home',
            component: HomePage
        },
        {
            path: '/ETH',
            component: () => import('./components/charts/ETH')
        },
        {
            path: '/BCH',
            component: () => import('./components/charts/BCH')
        },
        {
            path: '/BTC',
            component: () => import('./components/charts/BTC')
        },
        {
            path: '/coins/:id',
            component: () => import('@/pages/Coin')
        }
    ]
})