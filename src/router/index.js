import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import axios from 'axios'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/wishlist/shared',
    name: 'wl-shared',
    component: () => import(/* webpackChunkName: "wl-shared" */ '../views/SharedWithMeView.vue')
  },
  {
    path: '/wishlist/browse',
    name: 'wl-browse',
    component: () => import(/* webpackChunkName: "wl-browse" */ '../views/BrowseListView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue')
  },
  {
    path: '/passwordreset/:token',
    name: 'passwordreset',
    component: () => import(/* webpackChunkName: "passwordreset" */ '../views/PasswordResetView.vue')
  },
  {
    path: '/wishlist/create',
    name: 'wl-create',
    component: () => import(/* webpackChunkName: "wl-create" */ '../views/CreateWishlistView.vue')
  },
  {
    path: '/wishlist/edit/:id?',
    name: 'wl-edit',
    component: () => import(/* webpackChunkName: "wl-edit" */ '../views/EditWishlistView.vue')
  },
  {
    path: '/wishlist/:id',
    name: 'wl-detail',
    component: () => import(/* webpackChunkName: "wl-detail" */ '../views/WishlistView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/ProfileView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import(/* webpackChungName: "NotFound" */ '../views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from) => {
  const bypass = ['login', 'register', 'NotFound', 'passwordreset']
  if (bypass.indexOf(to.name) !== -1) {
    return
  }
  const isAuthenticated = await checkAuthenticated()
  if (!isAuthenticated) {
    return { name: 'login' }
  }
})

async function checkAuthenticated() {
  const result = await axios.get("/api/prot/validate")
  .then(resp => {
    return resp.status === 200
  })
  .catch(err => {
    return false
  })
  return result
}

export default router
