// Webpack config
const HTMLWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    
    module: {
        rules: [         
            {
                test: /.html$/,
                use: [{
                    loader: "html-loader",
                    options: { minimize: true }
                }]
            }
        ]
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            filename: './index.html'
        })
    ]
}