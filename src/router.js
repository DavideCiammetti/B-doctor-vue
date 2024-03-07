import {createRouter, createWebHistory} from 'vue-router';
import HomePage from './pages/HomePage.vue';
import AdvancedSearchPage from './pages/AdvancedSearchPage.vue';
import SearchNotFound from '../src/components/advancedSearchComponents/SearchNotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
        },
        {
            path: '/ricerca-avanzata',
            name: 'AdvancedSearch',
            component: AdvancedSearchPage,
        },
        { 
            path: '/notFound',
            name: 'NotFound', 
            component: SearchNotFound,
        },
    ]
});
export {router};