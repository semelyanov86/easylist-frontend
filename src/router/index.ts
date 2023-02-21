// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/Login.vue";
import security from "@/services/Security";
import {inject} from "vue";
import {VueCookies} from "vue-cookies";

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !security.isAuthenticated()) next({ name: 'Login' })
  else next()
})

export default router
