let postCSSPresetEnv = require('postcss-preset-env');
module.exports = {
    plugins:[
        postCSSPresetEnv({
            browsers:'last 10 version'
        })
    ]
}