import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Header from './components/Header';
import Main from './components/Main';
import Chart from "./components/Chart";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.component('app-header', Header);

const router = new VueRouter({
    routes: [
    // dynamic segments start with a colon
        { path: '/', component: Main },
        { path: '/chart/:coin', component: Chart, props: true }
    ],
    mode: 'history'
})

Vue.prototype.$coinList = [
    {name: 'Bitcoin (BTC)', query: 'bitcoin'},
    {name: 'Ethereum (ETH)', query: 'ethereum'},
    {name: 'Binance Coin (BNB)', query: 'binance-coin'},
    {name: 'Cardano (ADA)', query: 'cardano'},
    {name: 'Terra (LUNA)', query: 'terra-luna'},
]

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
