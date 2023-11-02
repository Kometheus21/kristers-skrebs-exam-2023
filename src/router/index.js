import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/',
            component: Songs,
        },
        {
            path: '/albums',
            component: Albums,
        },    
        {
            path: '/about',
            component: About,
        },
    ]
})

import Login from '@/views/Login.vue'
import Songs from '@/views/Songs.vue'
import Albums from '@/views/Albums.vue'
import About from '@/views/About.vue'

router.beforeEach((to, from, next) => {
    const auth = useAuthStore();
    const isAuthenticated = auth.authenticated;
  
    if (to.path !== '/login' && !isAuthenticated) {
      next('/login');
    } else if (to.path === '/login' && isAuthenticated) {
      next('/');
    } else {
      next();
    }
  });

export default router;