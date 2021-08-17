module.exports = {
    devServer: {
        proxy : {
            "/" : {
                target : "https://www.ddyueshu.com",
                changeOrigin: true,
                ws : true
            },
        }
    }
};