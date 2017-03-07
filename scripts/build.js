const del = require('del');
const webpack = require('webpack');
const ncp = require('ncp')
const mkdirp = require('mkdirp');
const ENV = require('./../config/environment')
const webpackConfig = require('./../config/webpack.config')

del([
    `${ENV.ROOT_PATH}/dist`,
    `${ENV.ROOT_PATH}/tmp`,
]).then(() => {
    mkdirp(`${ENV.ROOT_PATH}/dist/`, ()=>{
        mkdirp(`${ENV.ROOT_PATH}/tmp/`, ()=>{
            ncp(`${ENV.ROOT_PATH}/manifest.json`, `${ENV.ROOT_PATH}/dist/manifest.json`, (err)=>{
                if (err){ return console.log(err); }
                webpack(webpackConfig, (err, stats)=>{
                    console.log(stats.toString({
                        chunks: false, colors: true
                    }));
                })
            });
        })
    })
});
