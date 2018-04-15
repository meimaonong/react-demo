var path = require('path')
var webpack = require('webpack')

var glob = require('glob')

var HtmlWebpackPlugin = require('html-webpack-plugin')

var WebpackNotifierPlugin = require('webpack-notifier')

var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

var ip = require('ip')

const isProd = process.env.NODE_ENV === 'production' ? true : false

// 插件列表
let pluginsList = [
  new WebpackNotifierPlugin()
]

//入口文件列表
let newEntries = glob.sync('./src/view/page/*/main.js')

let entryArr = {}

newEntries.forEach(function (f) {
  //得到apps/question/index这样的文件名
  let tArr = f.split('/')
  let name = tArr[tArr.length - 2]
  console.log(name,f)
  entryArr[name] = f
});


// dll加载
let viewUrl = ''

// 系统页
//let chunksArr = ['common', 'main']
let chunksArr = []
let entryKeys = Object.keys(entryArr)

if (isProd) {
  pluginsList.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  )
} else {

}

if (isProd) {

  entryKeys.map(function (key) {

    chunksArr = ['common/build', key]

    // 首页处理
    viewUrl = './' + key + '/index.html'

    pluginsList.push(
      new HtmlWebpackPlugin({
        title: '',
        filename: viewUrl,
        template: './src/tpl/tpl.html',
        hash: false,
        chunks: chunksArr
      })
    )

    return key
  })
} else {

  entryKeys.map(function (key) {

    chunksArr = ['common/build', key]

    // 首页处理
    if (key == 'index') {
      viewUrl = 'index.html'
    } else {
      viewUrl = key + '/index.html'
    }

    pluginsList.push(
      new HtmlWebpackPlugin({
        title: '',
        filename: viewUrl,
        template: './src/tpl/tpl.html',
        hash: false,
        chunks: chunksArr
      })
    )

    return key
  })
}

var pathUrl, publicPathUrl
if (isProd) {
  pathUrl = './dist'
  publicPathUrl = '/dist/'
} else {
  pathUrl = './'
  publicPathUrl = '/'
}

module.exports = {
  entry: entryArr,
  mode: isProd ? 'production' : 'development',
  output: {
    path: path.resolve(__dirname, pathUrl),
    publicPath: publicPathUrl,
    filename: '[name]/build.js?[hash:8]',
    chunkFilename: '[name].js?[hash:8]'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: "initial",
          minChunks: 2,
          name: 'common/build',
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'import-glob'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'static/[path][name].[ext]?[hash:8]'
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
        options: {
          name: 'static/[path]/[name].[ext]?[hash:8]'
        }
      }
    ]
  },
  plugins: pluginsList,
  resolve: {
    alias: {
    },
    extensions: ['.js', '.jsx', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    port: 8787,
    host: ip.address(),
    proxy: {
      
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}


if (isProd) {
  module.exports.devtool = '#source-map'
  module.exports.optimization = Object.assign((module.exports.optimization || {}), {
    minimize: true
  })
}
