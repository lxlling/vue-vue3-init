import { VNode } from 'vue';
import { RouteRecordRaw } from 'vue-router';

// export type Route = RouteRecordRaw & {
//     hidden?: boolean
//     meta?: {
//         title?: string
//         icon?: VNode | string
//     }
// }

export type Route = {
    path: RouteRecordRaw['path'];
    end?: RouteRecordRaw['end'];
    sensitive?: RouteRecordRaw['sensitive'];
    strict?: RouteRecordRaw['strict'];
    name?: RouteRecordRaw['name'];
    component?: RouteRecordRaw['component'];
    meta?: RouteRecordRaw['meta'] & {
        title?: string;
        icon?: VNode | string;
    };
    components?: RouteRecordRaw['components'];
    children?: Route[];
    redirect?: RouteRecordRaw['redirect'];
    props?: RouteRecordRaw['props'];
    alias?: RouteRecordRaw['alias'];
    beforeEnter?: RouteRecordRaw['beforeEnter'];
    hidden?: boolean;
    hideChildrenInMenu?: boolean;
};
// export interface Route extends RouteRecordRaw  {
//     hidden?: boolean
//     meta?: {
//         title?: string
//         icon?: VNode | string
//     }
//     children?: Route[]
// }
