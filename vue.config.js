module.exports = {
  transpileDependencies: ['vuetify'],
  chainWebpack: config => {
    config.externals({
      firebase: 'firebase',
      firebaseui: 'firebaseui'
    })
  },
  devServer: {
    port: 3000,
    proxy: {
      '^/api': {
        target: 'http://localhost:8080'
      },
      '^/__/firebase': {
        target: 'http://localhost:5000'
      }
    }
  },
  productionSourceMap: false
}
