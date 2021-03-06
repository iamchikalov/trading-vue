module.exports = {
    chainWebpack: config => {
        config
            .module
            .rule('csv')
            .test(/\.csv$/)
            .use('csv-loader')
            .loader('csv-loader')
            .options({
                dynamicTyping: true,
                header: false,
                skipEmptyLines: true
            })
            .end()
    }
}