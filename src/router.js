import {createRouter, createWebHistory} from 'vue-router'

// import Home from '../components/Home.vue'
// import Login from '../components/Login.vue'
// import Register from '../components/Register.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // {
        //     path: '/',
        //     name: 'home',
        //     component: () => import('../components/Home.vue'),
        // },
        // {
        //     path: '/login',
        //     name: 'login',
        //     component: () => import('../components/Login.vue'),
        // },
        // {
        //     path: '/register',
        //     name: 'register',
        //     component: () => import('../components/Register.vue'
        //     ),
        // },
        // { 
        //     path: '/:pathMatch(.*)*',
        //     name: 'NotFound', 
        //     component: NotFound 
        // },
    ]
});
export {router};