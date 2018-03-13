import Vue from 'vue'
import Router from 'vue-router'

const login = () =>
import('pages/login/login')

const dashboard = () =>
import('pages/dashboard/dashboard')

const particles = () =>
import('pages/particles/particles')

const watermark = () =>
import('pages/watermark/watermark')

const content = () =>
import('pages/vcontent/vcontent')



Vue.use(Router)

let routes = [
  {
      path: '/'
      , redirect: '/login'
  },
  {
      path: '/login',
      component: login
  },
  {
      path: '/content',
      component: content,
      children: [
        {
            path: '/dashboard',
            component: dashboard
        },
        {
            path: '/particles',
            component: particles
        },
        {
            path: '/watermark',
            component: watermark
        }
      ]
  }
]

routes.forEach((item) => {
  if (item.path == '/content') {
      item.children.forEach((route) => {
          route.meta = {}
          route.meta.requireAuth = true
      })
  }
})

let router = new Router({
  routes
})

// router.beforeEach((to, from, next) => {
//     if (to.meta.requireAuth) {
//         if (window.localStorage.getItem('user_id') !== null) {
//             next()
//         } else {
//             next({
//                 path: '/login',
//                 query: { redirect: to.fullPath }
//             })
//         }
//     } else {
//         next()
//     }
// })

// router.beforeEach( (to, from, next) => {
//     if(to.matched.some( record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限 // 还有另一种实现方式 if (to.meta.requireAuth) {
//         if(window.localStorage.getItem('token') !== null){
//             if(to.fullPath != ''){
//                 next()
//             } else {
//                 next({
//                     path: '/basic'
//                 })
//             }
//         } else {
//             next({
//                 path: '/login', // 如果没有登录则跳转到登录页面
//                 query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由页面
//             })
//         }
//     } else {
//         next()
//     }
// })
export default router