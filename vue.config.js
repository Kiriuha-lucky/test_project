const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
  ? 'https://kiriuha-lucky.github.io/test_project/docs/'
  : '/',
  outputDir: 'docs',
})
