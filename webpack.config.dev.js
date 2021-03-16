const path = require('path'); // Para trabajar con archivos y rutas de directorios
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
   entry: './src/index.js', // El punto de entrada de mi aplicación
   output: { // Esta es la salida de mi bundle
      path: path.resolve(__dirname, 'dist'),
      // resolve lo que hace es darnos la ruta absoluta de el S.O hasta nuestro archivo
      // para no tener conflictos entre Linux, Windows, etc
      filename: '[name][contenthash].js', 
      // EL NOMBRE DEL ARCHIVO FINAL,
      assetModuleFilename: 'assets/images/[hash][ext][query]',
      // Para mover las imagenes a la carpeta asstes.
   },
   mode: 'development',
   resolve: {
      extensions: ['.js'], // LOS ARCHIVOS QUE WEBPACK VA A LEER
      alias: {
         '@utils': path.resolve(__dirname, 'src/utils/'),
         '@templates': path.resolve(__dirname, 'src/templates/'),
         '@styles': path.resolve(__dirname, 'src/styles/'),
         '@images': path.resolve(__dirname, 'src/assets/images/'),
       },
   },
   module: {
      rules: [
         {
            // Test declara que extensión de archivos aplicara el loader
            // LEE LOS ARCHIVOS CON EXTENSION .JS O .MJS,
            test: /\.m?js$/,
            // Exclude permite omitir archivos o carpetas especificas
            exclude: /node_modules/,
            // Use es un arreglo u objeto donde dices que loader aplicaras
            use: {
               loader: "babel-loader",
            },
         },
         {
            test: /\.css|.styl$/i,
            use: [
               MiniCssExtractPlugin.loader,
               "css-loader",
               "stylus-loader",
            ]
         },
         {
            test: /\.png/,
            type: 'asset/resource',
         },
         {
            test: /\.(woff|woff2)$/,
            use: {
               loader: 'url-loader',
               options: {
                  limit: 10000, // O LE PASAMOS UN BOOLEANOS TRUE O FALSE
                  // Habilita o deshabilita la transformación de archivos en base64.
                  mimetype: 'aplication/font-woff',
                  // Especifica el tipo MIME con el que se alineará el archivo. 
                  // Los MIME Types (Multipurpose Internet Mail Extensions)
                  // son la manera standard de mandar contenido a través de la red.
                  name: "[name][contenthash].[ext]",
                  // EL NOMBRE INICIAL DEL ARCHIVO + SU EXTENSIÓN
                  // PUEDES AGREGARLE [name]hola.[ext] y el output del archivo seria 
                  // ubuntu-regularhola.woff
                  outputPath: './assets/fonts/', 
                  // EL DIRECTORIO DE SALIDA (SIN COMPLICACIONES)
                  publicPath: '../assets/fonts/',
                  // EL DIRECTORIO PUBLICO (SIN COMPLICACIONES)
                  esModule: false 
                  // AVISAR EXPLICITAMENTE SI ES UN MODULO
               }
            }
         },
      ],
   },
   plugins: [
      new HtmlWebpackPlugin({ // CONFIGURACIÓN DEL PLUGIN
         inject: true, // INYECTA EL BUNDLE AL TEMPLATE HTML
         template: './public/index.html', // LA RUTA AL TEMPLATE HTML
         filename: './index.html', // NOMBRE FINAL DEL ARCHIVO
      }),
      new MiniCssExtractPlugin({
         filename: 'assets/[name].[contenthash].css',
      }),
      new CopyPlugin({
         patterns: [
            {
               from: path.resolve(__dirname, "src", "assets/images"),
               to: "assets/images",
            },
         ],
      }),
      new Dotenv(),
      new BundleAnalyzerPlugin(),
   ],
   devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      historyApiFallback: true,
      port: 3005,
   }
}