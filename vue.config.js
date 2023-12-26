const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
    publicPath: process.env.VUE_APP_PUBLIC_PATH,
    outputDir: 'dist' + process.env.VUE_APP_PUBLIC_PATH,
    transpileDependencies: true,
    lintOnSave: false,

    devServer: {
        // CORS测试，mac下80端口：https://github.com/vuejs/vue-cli/issues/6894
        // sudo node_modules/.bin/vue-cli-service serve
        // port: 80,
        port: 8080,
        // host: 'dev.haier.net',
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        // issue to https://github.com/vueComponent/ant-design-vue/issues/6551
        client: {
            overlay: false,
        },
        proxy: {
            '/login': {
                target: 'http://x-dev.haier.net',
                changeOrigin: true,
            },
            '^/open': {
                target: 'http://x-dev.haier.net',
                changeOrigin: true,
            },
            '^/api/v2/users': {
                target: 'http://x-dev.haier.net',
                changeOrigin: true,
            },
        },
    },
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    javascriptEnabled: true,
                    modifyVars: {
                        'ant-prefix': process.env.VUE_APP_NAME,
                        'primary-color': '#3471FF',
                        'border-radius-base': '4px',
                        'error-color': '#FF4A47',
                    },
                },
            },
        },
    },
    chainWebpack: (config) => {
        // config.plugins.delete('fork-ts-checker');
        // config.externals({ '@deep/request': 'var window.$bridge.request' });
        // config.module.rule('images').type('asset/inline').set('generator', {});
    },
    configureWebpack: (config) => {
        // config.output.library = `${name}-[name]`;
        // const pkgName = process.env.VUE_APP_PUBLIC_PATH.replace(/\//g, '');
        // config.output.library = `${pkgName}-[name]`;
        // config.output.libraryTarget = 'umd';
    },
});
