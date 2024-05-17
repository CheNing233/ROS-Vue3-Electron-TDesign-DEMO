const { defineConfig } = require('@vue/cli-service')
const path = require('path');

console.log("build dir", __dirname)
console.log("build dir", path.join(__dirname, "src", "preload.js"))

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "com.xChenNing.top",
        productName: "rosdisplay",
        linux: {
          target: "AppImage",
          category: "Science"
        },
        extraResources: [
          "./src/preload.js"
        ]
      }
    }
  },
})

