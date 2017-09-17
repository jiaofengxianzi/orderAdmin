import Vue from 'vue'
import Router from 'vue-router'
import NoFound from '@/components/global/NoFound'
import Login from '@/components/login'
import index from '@/components/index'
import common from '@/components/common'
import order from '@/components/order'
import userCenter from '@/components/userCenter'
import notice from '@/components/notice'
import grades from '@/components/grades'
import testStrip from '@/components/testStrip'
import details from '@/components/details'

Vue.use(Router);
const router = new Router({
  mode:'history',
  base:__dirname,

  routes: [
    {path: '*', component: NoFound},
    {
      path: '/',
      name: 'Login',
      component: Login,
      redirect:{path:'login'},

    },
    {
      path : '/common',
      name : 'common',
      meta : {requireAuth : true},
      component : common ,
      redirect:{path:'index'},
      children : [
        {
          path: '/index',
          name: 'index',
          component: index,

        },
        {
          path: '/order',
          name: 'order',
          component: order,

        },
        {
          path: '/userCenter',
          name: 'userCenter',
          redirect:{path:'/userCenter/grades'},
          component: userCenter,
          children : [
            {
              path :'/userCenter/grades',
              name :'grades',
              component : grades
            },
            {
              path :'/userCenter/testStrip',
              name :'testStrip',
              component : testStrip
            }
          ]
        },
        {
          path: '/notice',
          name: 'notice',
          component: notice
        },
        {
          path : '/notice/details',
          name : 'details',
          component : details
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
});
//路由切换检测token
router.beforeEach((to,from,next)=>{

    if(to.matched.some(res => res.meta.requireAuth)){// 判断该路由是否需要登录权限
      if(localStorage.getItem('userToken')){// 通过vuex state获取当前的token是否存在(口令)
        // let info = JSON.parse(localStorage.getItem('userToken'));
        // //检查token有效期
        // let nowTime = Math.round(new Date().getTime() / 1000);
        // let overTime = nowTime - info.responseTime
        next();
      }else{
        next({
          path : './login',
          query : {redirect : to.fullPath}// 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }
    }else{
      next();
    }
});
//路由切换动画效果

export default router
