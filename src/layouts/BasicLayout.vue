<template>
    <a-layout class="basic-layout">
        <a-layout-sider
            v-model:collapsed="collapsed"
            class="sider-wrapper"
            theme="dark"
            :width="260"
        >
            <div class="sider">
                <header class="header">
                    <img class="logo" src="@/assets/logo.svg" />
                    <span v-if="!collapsed" class="title">
                        {{ $t('title') }}
                    </span>
                </header>
                <main class="main">
                    <side-menu
                        :collapsed="collapsed"
                        :menus="menus"
                        :i18n-render="i18nRender"
                    />
                </main>

                <footer class="footer" />
            </div>
        </a-layout-sider>

        <a-layout-content class="right-content">
            <a-layout class="right-content-layout">
                <!-- <a-layout-header></a-layout-header> -->
                <a-layout-header class="header">
                    <div class="left">
                        <span
                            class="button collapse-button"
                            @click="collapsed = !collapsed"
                        >
                            <MenuFoldOutlined />
                        </span>
                    </div>
                    <div>
                        <right-content
                            :is-mobile="false"
                            :top-menu="false"
                            :current-user="{ name: username }"
                            theme="light"
                        />
                    </div>
                </a-layout-header>
                <a-layout-content class="content">
                    <router-view />
                </a-layout-content>
                <a-layout-footer>
                    <!-- <GlobalFooter /> -->
                </a-layout-footer>
            </a-layout>
        </a-layout-content>
    </a-layout>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import SideMenu from '@/components/SideMenu/index.vue';
import RightContent from '@/components/GlobalHeader/RightContent.vue';
import { MenuFoldOutlined } from '@ant-design/icons-vue';
import { i18nRender } from '@/locales';
import routes from '@/router/routes';
import type { Route } from '@/router/types';
import { useAppStore } from '@/store/app';

export default defineComponent({
    components: {
        SideMenu,
        RightContent,
        MenuFoldOutlined,
    },
    setup() {
        const app = useAppStore();
        // const $route = useRoute();

        const menus = computed(() => {
            return (
                routes.find((route: Route) => route.path === '/')?.children ??
                []
            );
        });

        const collapsed = ref<boolean>(false);

        const username = app.userInfo?.name;

        return {
            menus,
            collapsed,
            i18nRender,
            username,
            // $route,
        };
    },
});
</script>

<style lang="less" scoped>
.basic-layout {
    width: 100%;
    // height: 100%;
    .sider-wrapper {
        z-index: 999;

        .sider {
            display: flex;
            flex-direction: column;
            height: 100%;

            .header {
                display: flex;
                align-items: center;
                height: 64px;
                padding: 0 20px;
                .logo {
                    width: 36px;
                    height: 32px;
                }
                .title {
                    flex-shrink: 0;
                    margin-left: 10px;
                    color: #fff;
                    font-size: 20px;
                    font-weight: bold;
                }
            }
            .main {
                flex-grow: 1;
            }
            .footer {
                height: 64px;
            }
        }
    }

    .right-content {
        // height: 100%;
        // display: block;
        // min-height: 100vh;
        // height: 100vh;
        // transform: translate(0);
        .right-content-layout {
            min-height: 100vh;
        }

        .header {
            position: sticky;
            top: 0;
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0;
            background: #fff;
            box-shadow: 0 2px 8px #f0f1f2;
            z-index: 998;
            transition: all 0.3s;
            .left {
                display: flex;
                align-items: center;
                height: 100%;
                .collapse-button {
                    font-size: 20px;
                    cursor: pointer;
                }
                .button {
                    height: 100%;
                    padding: 0 20px;
                    &:hover {
                        background: rgba(0, 0, 0, 0.025);
                    }
                }
            }
        }

        .content {
            // margin-top: 64px;
            // padding: 24px;
            min-height: 0;
        }
    }
}
</style>
