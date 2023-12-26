import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import routes from './routes'

export default (base: string) => {
    return createRouter({
        history: createWebHistory(base),
        routes: routes as RouteRecordRaw[],
    })
}
