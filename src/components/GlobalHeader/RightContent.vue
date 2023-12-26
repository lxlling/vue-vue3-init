<template>
  <div :class="wrpCls">
    <select-lang :class="prefixCls" />
  </div>
</template>

<script>
import SelectLang from '@/components/SelectLang/index.jsx';

export default {
    name: 'RightContent',
    components: {
        SelectLang,
    },
    props: {
        prefixCls: {
            type: String,
            default: 'ant-pro-global-header-index-action',
        },
        isMobile: {
            type: Boolean,
            default: () => false,
        },
        topMenu: {
            type: Boolean,
            required: true,
        },
        theme: {
            type: String,
            required: true,
        },
        currentUser: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            showMenu: true,
            // currentUser: {},
        };
    },
    computed: {
        wrpCls() {
            return {
                'ant-pro-global-header-index-right': true,
                [`ant-pro-global-header-index-${
                    this.isMobile || !this.topMenu ? 'light' : this.theme
                }`]: true,
            };
        },
    },
    // mounted() {
    //     setTimeout(() => {
    //         this.currentUser = {
    //             name: 'Serati Ma',
    //         }
    //     }, 1500)
    // },
};
</script>

<style lang="less" scoped>
:deep(.ant-pro-global-header-index-action) {
    display: inline-block;
    height: 100%;
    padding: 0 12px;
    cursor: pointer;
    &:hover {
        background: rgba(0, 0, 0, 0.025);
    }
}
</style>
