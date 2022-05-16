import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/login/index"
import Home from "../components/kefu/home/index"
import AdminList from "../components/kefu/home/adminList/index"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: "/home",
        name: "Home",
        component: Home
    },
    {
        path: '*',
        redirect: "/"
    },
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router
