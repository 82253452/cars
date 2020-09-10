'use strict'
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  context: path.resolve(__dirname, './'),
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      '@/constants': resolve('src/constants'),
      '@/utils': resolve('src/utils'),
      '@/actions': resolve('src/utils/actions'),
      '@/reducers': resolve('src/reducers'),
      '@/react-query': resolve('src/react-query/src'),
      '@/api': resolve('src/api'),
    }
  },
}
