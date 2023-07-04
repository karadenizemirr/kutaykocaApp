const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');


module.exports = {
  entry: './index.js', // Giriş noktası
  externals: {
    // node_modules klasörünü dışa aktar
    // webpack, bu modülleri dahil etmeyecek
    'node_modules': 'commonjs2 node_modules'
  },
  plugins: [
    new NodePolyfillPlugin()
  ],
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'), // Çıktı dizini
    filename: 'bundle.js' // Çıktı dosyası adı
  },
};