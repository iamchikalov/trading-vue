import Vue from "vue"
import Router from 'vue-router'
import HomePage from "@/pages/HomePage"

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: HomePage
        },
        {
            path: '/coins/:id',
            component: () => import('@/pages/Coin')
        }
    ]
})