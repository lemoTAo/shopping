const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //去掉map文件上线的时候必须去掉
  productionSourceMap:false,
  lintOnSave:true,
  devServer:{
    proxy:{
      '/api':{
        target:'http://gmall-h5-api.atguigu.cn',
        // pathRewrite: {"^/api" : ""}
      }
    }
  }
  
})
