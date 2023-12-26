<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue';
const prefixCls = process.env.VUE_APP_NAME;
</script>

<template>
    <ConfigProvider :prefix-cls="prefixCls">
        <router-view />
    </ConfigProvider>
</template>

<style scoped></style>
