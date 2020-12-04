import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Layout',
        component: () => import( '../views/layout/Layout.vue' ),
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import('../views/Home.vue'),
            },
            {
                path: '/about',
                name: 'About',
                component: () => import('../views/About.vue')
            }
        ],
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import( '../views/login/Login.vue' ),
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
