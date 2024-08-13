const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    devServer: {
        // port: 80,
        port: 3000,
        proxy: {
            "/api": {
                target: "http://localhost:8080",
                // target: "http://43.201.50.222:8080",
                changeOrigin: true,
                pathRewrite: { "^/api": "" },
            },
        },
    },
    transpileDependencies: true,
});