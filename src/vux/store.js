import Vue from "vue"
import Vuex from "vuex"

import state from "./state"
import actions from "./action"
import mutations from "./mutatiosn"

Vue.use(Vuex)

const store = new Vuex.Store({
    state,
    actions,
    mutations
})

export default store
