const path = require('path')

const config = {
  projectName: 'carS',
  date: '2020-9-7',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {
    LOCATION_APIKEY: JSON.stringify('2GOBZ-3ECRI-I6CGO-5YPX5-SDXDK-ZWBSL')
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  alias: {
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/common': path.resolve(__dirname, '..', 'src/common'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/actions': path.resolve(__dirname, '..', 'src/actions'),
    '@/react-query': path.resolve(__dirname, '..', 'src/react-query/src'),
    '@/reducers': path.resolve(__dirname, '..', 'src/reducers'),
    '@/constants': path.resolve(__dirname, '..', 'src/constants'),
    '@/img': path.resolve(__dirname, '..', 'src/img'),
    '@/api': path.resolve(__dirname, '..', 'src/api'),
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: ['taro-ui'],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
