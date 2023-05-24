import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Factors from '../views/Factors.vue'
import ArchiveFactors from '../views/ArchivedFactors.vue'
import Sections from '../views/Sections.vue'
import Users from '../views/Users.vue'
import FileUploading from '../views/FileUploading.vue'
import Login from '../Login.vue'
import Register from '../Register.vue'
import Forgot from '../Forgot.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: Forgot
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    params: true,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: '/file-uploading',
        name: 'Fileuploading',
        component: FileUploading
      },
      {
        path: '/factors',
        name: 'Factors',
        component: Factors
      },
      {
        path: '/archived-factors',
        name: 'ArchivedFactors',
        component: ArchiveFactors
      },
      {
        path: '/sections',
        name: 'Sections',
        component: Sections
      },
      {
        path: '/users',
        name: 'Users',
        component: Users
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
    ]
  },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from) => {
  var userLevel = parseInt(localStorage.getItem('level'));
  if ((localStorage.getItem('validatorToken') === undefined || localStorage.getItem('validatorToken') === '') && to.name !== 'Login') {
    return { name: 'Login' }
  }
  if (userLevel !== 0 && to.name === 'Sections') {
    return { name: from.name }
  }
  if (userLevel !== 0 && to.name === 'Factors') {
    return { name: from.name }
  }
  if (userLevel !== 0 && to.name === 'ArchivedFactors') {
    return { name: from.name }
  }

})

export default router
