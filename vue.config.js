const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    devServer: {
        port: 3001,
        proxy: {
            "/api": {
                target: "http://localhost:8080",
                changeOrigin: true,
                pathRewrite: { "^/api": "" },
            },
        },
    },
    transpileDependencies: true,
});