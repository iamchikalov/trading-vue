import Vue from "vue"
import Router from 'vue-router'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/home',
            component: Home
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
            component: () => import('./components/charts/BCH')
        }
    ]
})