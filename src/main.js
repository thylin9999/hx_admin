import Vue from 'vue'
import store from "./vux/store"
import AppAdmin from "./App";
import router from "./router"
import "./mock"
import "./style/index.css"

import axios from "axios"
import VueAxios from "vue-axios";


Vue.use(VueAxios, axios)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

window.vm =  new Vue({
    router,
    store,
    render: h => {
        return h(AppAdmin)
    }
}).$mount('#app')
