import Vue from 'vue'
import AppAdmin from "./AppAdmin";
import router from "./router"
import "./style/index.css"

import axios from "axios"
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

require('./mock.js')

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
    router,
    render: h => {
        return h(AppAdmin)
    }
}).$mount('#app')
