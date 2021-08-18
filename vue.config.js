module.exports = {
    devServer: {
        proxy : {
            "/" : {
                target : this.setTarget(), // "https://www.baidu.com"
                changeOrigin: true,
                ws : true
            },
        }
    }
};

var setTarget = function (url = 'https://www.baidu.com') {
    return url;
}

module.exports.setTarget = setTarget;