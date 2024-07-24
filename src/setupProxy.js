const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://8.130.52.22:5001",
            changeOrigin: true,
            pathRewrite: {
                "/api": "",
            },
        })
    );
};
