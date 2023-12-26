import { RouteView, EmptyLayout, BasicLayout } from '@/layouts';
import type { Route } from './types';

const routes: Route[] = [
    {
        path: '/',
        component: BasicLayout,
        redirect: '/home',
        meta: {
            title: 'home',
        },
        children: [
            {
                path: '/',
                name: 'Home',
                component: RouteView,
                meta: {
                    title: 'home',
                    icon: 'ellipsis-outlined',
                },
                redirect: '/home',
                children: [
                    {
                        path: '/home',
                        name: 'Home',
                        component: () => import('../views/HomeView.vue'),
                        meta: {
                            title: 'home',
                            icon: 'home-outlined',
                            keepAlive: true,
                        },
                    },
                ],
            },
        ],
    },
];

export default routes;
