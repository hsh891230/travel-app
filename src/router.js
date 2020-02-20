import Vue from 'vue';
import VueRouter from 'vue-router';
import { getUID } from './api/auth';

Vue.use(VueRouter);
//

const router = new VueRouter({
  base: '/',
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/',
      meta: {
        auth: true
      },
      beforeEnter: (to, from, next) => {
        if (to.path === '/') {
          getUID().then(uid => {
            if (uid) {
              next({
                name: 'main',
                params: {
                  uid
                }
              });
            } else {
              next({ name: 'login' });
            }
          });
        } else {
          next();
        }
      }
    },
    {
      name: 'main',
      path: '/travelers/:uid',
      component: () => import('./views/TravelList'),
      props: true
    },
    {
      name: 'travels',
      path: '/travelers/:uid/travels',
      component: () => import('./views/TravelList'),
      props: true
    },
    {
      name: 'travel',
      path: '/travelers/:uid/travels/:id',
      component: () => import('./views/TravelDetail'),
      props: true
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('./components/AppLogin')
    },
    {
      name: 'page404',
      path: '*',
      component: () => import('@/components/Page404')
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   getUID().then(uid => {
//     if (to.matched.some(record => record.meta.auth) && !uid) {
//       next({
//         name: 'login'
//       })
//     } else {
//       next()
//     }
//   })
// })

export default router;
