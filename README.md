# README

## Goal

In this fifth exercise, we're going to add support to our webpack.config.js file for sass and for images. In the last exercise we added support for HTML files, allowing HTML files to be processed during bundling. We used someting called a loader to accomplish that, and then used a plugin called webpack-html-plugin to insert our processed HTML into our build.

## Picking up from Exercise 3

As in exercises 1-3, we've initialized our project and installed webpack, webpack-cli, and webpack-dev-server. 

We have the same minimal html.index file and the same 'src' directory in which we've placed our index.js file and a second file called hello.js. index.js imports hello.js and calls it from within a console.log statement. hello.js returns a greeting, e.g. "Hello, Julian". 

## Install the plugin and loader

Next, install html-webpack-plugin and html-loader.

```
npm install --save-dev html-webpack-plugin html-loader
```

## Create the config file

Now create a webpack.config.js file in the project root directory. This file will contain information about how various files should be processed and bundled.

A config file can run to hundreds of lines of code. For example, the webpack config that powers Create React App has almost 700 lines of code.

You can read more about configuring webpack in the [documentation](https://webpack.js.org/concepts/configuration).

Our config file will be much simpler.

```js
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
```

modules.rules is an array of rule objects that specify how webpack should process various files. In this case, it's telling webpack to use the html-loader loader to process html files. Plugins allow us to further extend webpack's capabilities. Here, whenever we build our project, the html-webpack-plugin will create a new HTML file in the dist directory. The new file will import all of our scripts (and down the road, all of our other assets as well). 

What that means is that, when we want to switch back and forth between viewing the development and the production versions of our project, we no longer have to worry about editing our index.html file to change the file path to our bundled script. The dist directory will now contain its own index.html file. We can now open dist/index.html in our broswer and be assured that we're seeing the most recent production build.

In addition, we can entirely remove the script tag from our index.html file. html-webpack-plugin will insert the script for us.

