const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: true,

  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("pages", resolve("src/pages"))
      .set("static", resolve("src/static"))
      .set("components", resolve("src/components"))
      .set("common", resolve("src/pages/common"))
      .set("styles", resolve("src/assets/styles"));
  },

  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "src/assets/styles/variables.less")]
    }
  }
};
