<template>
    <a-menu
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        theme="dark"
        :multiple="false"
    >
        <template v-for="menu of filteredMenus" :key="menu.name">
            <a-menu-item
                v-if="!menu.children || menu?.hideChildrenInMenu"
                :key="menu.name"
                :title="menu.meta?.title ?? ''"
                @click="handleMenuClick(menu)"
            >
                <Icon :type="(menu.meta?.icon as string|VNode)" class="icon" />
                <!-- <component v-if="typeof menu.meta?.icon==='string'" :is="menu.meta?.icon"></component>
                <component else :is="menu.meta?.icon"></component> -->
                <span v-if="!collapsed" class="text">
                    {{ menu.meta?.title ?? '' }}
                </span>
            </a-menu-item>
            <a-sub-menu v-else-if="!menu.hidden" :key="menu?.name">
                <template #title>
                    <Icon
                        :type="(menu.meta?.icon as string|VNode)"
                        class="icon"
                    />
                    <span class="text">
                        {{ menu.meta?.title ?? '' }}
                    </span>
                </template>
                <template v-for="item of menu.children" :key="item.name">
                    <a-menu-item
                        v-if="!item.hidden"
                        :key="item.name"
                        class="text"
                        @click="handleSubMenuClick(menu, item)"
                    >
                        {{ item.meta?.title ?? '' }}
                    </a-menu-item>
                </template>
            </a-sub-menu>
        </template>
    </a-menu>
</template>

<script lang="ts">
export default {
    name: 'SideMenu',
};
</script>

<script lang="ts" setup>
import {
    defineComponent,
    PropType,
    computed,
    VNode,
    watchEffect,
    toRef,
    ref,
} from 'vue';
import { useRouter, useRoute, RouteRecordName } from 'vue-router';
import type { Route } from '@/router/types';
import Icon from '@/components/Icon';

const props = defineProps({
    collapsed: {
        type: Boolean,
        required: false,
        default: false,
    },
    menus: {
        type: Array as PropType<Route[]>,
        required: true,
    },
    i18nRender: {
        type: Function,
        required: false,
        default: (text: string) => text,
    },
});

const router = useRouter();
const route = useRoute();

let selectedKeys = ref<RouteRecordName[]>([]);

const filteredMenus = computed(() => {
    return props.menus.filter(
        (menu: Route) =>
            !menu.meta || !('hide' in menu.meta) || menu.meta.hide === false,
    );
});

watchEffect(() => {
    selectedKeys.value = [route.name ?? ''];
});

const handleMenuClick = (menu: Route) => {
    router.push(menu.path);
};

const handleSubMenuClick = (menu: Route, item: Route) => {
    if (item.path.startsWith('/')) {
        router.push(item.path);
    } else {
        router.push(menu.path + '/' + item.path);
    }
};
</script>

<style lang="less" scoped>
.icon {
    margin-right: 10px !important;
}
.text {
    margin-left: 0 !important;
}
</style>
