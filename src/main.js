import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource' 
import VueSession from 'vue-session'
import PageHeader from './components/PageHeader.vue'
import Dashboard from './components/Dashboard.vue'
import Login  from './components/Login.vue'
import Profile from './components/Profile.vue'
import EditProfile from './components/EditProfile.vue'
import ChangePassword  from './components/ChangePassword.vue'
//import ForgotPassword  from './components/ForgotPassword.vue'
import Signup from './components/Signup.vue'


/* Defiing Routes */

Vue.use(VueRouter)
Vue.use(VueSession)
Vue.use(VueResource)

const routes = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/login', component: Login },
  { path: '/profile', component: Profile},
  { path: '/editprofile', component: EditProfile },
  { path: '/changepassword', component: ChangePassword },
  { path: '/signup', component: Signup }
  //{ path: '/forgotpassword', component: ForgotPassword },
]
const router = new VueRouter({routes})
Vue.http.options.root = 'https://cors-anywhere.herokuapp.com/http://develop.beellaa.com/api/v1/';


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
