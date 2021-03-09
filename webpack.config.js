const path = require('path'); // Para trabajar con archivos y rutas de directorios
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js', // El punto de entrada de mi aplicación
    output: { // Esta es la salida de mi bundle
        path: path.resolve(__dirname, 'dist'),
        // resolve lo que hace es darnos la ruta absoluta de el S.O hasta nuestro archivo
        // para no tener conflictos entre Linux, Windows, etc
        filename: 'main.js', 
        // EL NOMBRE DEL ARCHIVO FINAL,
    },
    resolve: {
        extensions: ['.js'] // LOS ARCHIVOS QUE WEBPACK VA A LEER
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
         }
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({ // CONFIGURACIÓN DEL PLUGIN
         inject: true, // INYECTA EL BUNDLE AL TEMPLATE HTML
         template: './public/index.html', // LA RUTA AL TEMPLATE HTML
         filename: './index.html', // NOMBRE FINAL DEL ARCHIVO
      }),
   ],
}