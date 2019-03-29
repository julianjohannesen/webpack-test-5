# README

## Goal

In this fifth exercise, we're going to add support to our project for processing sass, css, and images. 

In the last exercise we added support for HTML files, allowing HTML files to be processed during bundling. We used a loader called html-loader to do that, and then used a plugin called webpack-html-plugin to insert a holder HTML file into our build directory.

## Picking up from Exercise 4

We've initialized our project and installed webpack, webpack-cli, and webpack-dev-server. We've also installed html-loader and webpack-html-plugin.

We have the same minimal html.index file and the same 'src' directory in which we've placed our index.js file and a second file called hello.js. index.js imports hello.js and calls it from within a console.log statement. hello.js returns a greeting, e.g. "Hello, Julian". 

## Install loaders and plugins

In order to process css, we'll need to add two new loaders and a plugin. css-loader will interpret and resolve @import rules and url() attributes in css. style-loader will add css to the DOM by injecting a style tag. Adding css via a style tag is fine in developement, but in production we want to be able to load CSS and JS assets in parallel. To do taht, we'll use mini-css-extract-plugin. mini-css-extract-plugin will extract CSS files from our production build bundle and insert them into our HTML using link tags. 

```
npm install --save-dev style-loader css-loader mini-css-extract-plugin
```

## Edit the webpack.config.js file

Next, we need to edit our webpack.config.js file in the project root directory. 

We'll add one new rules to module.rules and add our plugin code.

```js
const HTMLWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    
    module: {
        rules: [         
            {
                test: /.html$/,
                use: [{
                    loader: "html-loader",
                    options: { minimize: true }
                }]
            },
            // New rule
            {
                test: /.css$/,
                use: [{
                    loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'
                }]
            }
        ]
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            filename: './index.html'
        }),
        // New plugin
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        })
    ]
}
```


