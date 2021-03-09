# js-portfolio
## Curso de webpack
#### Configurando webpack
1. Instalamos webpack y webpack-cli con npm como dependecia de desarrolador.
   ~~~
   npm i webpack webpack-cli -D
   ~~~
2. Creamos el archivo de configuracion para webpack (webpack.config.js). Este archivo es donde se controla toda la configuración de webpack, de modo que podamos darle un comportamiento personalizado de acuerdo a nuestras necesidades. Este archivo debe estar en la raíz de nuestro proyecto al nivel del package.json. El archivo tiene que realizar una exportación de un objeto JavaScript que contendrá la configuración de webpack.
   - El objeto primeramente debe tener el punto de entrada de la app (apartir de que elemento/archivo se va conectando todo). Entry es el elemento y se le pasa la ruta del archivo principal.
      ~~~
      entry: './src/index.js'
      ~~~
   -  El segundo elemento es el output que sera la salida o el resultado de configurar el proyecto. Este recive un objeto con varias configuraciones.
      - path. Resolve o Join path. Cuando trabajamos en entorno de Node, habrán ocasiones que deberamos describir, mediante una dirección absoluta, el directorio de trabajo. En Node, tenemos una libreía nativa pathpara resolver este caso. sera la ruta donde estara el resultante. La buscamos con path.resolve(--dirname, 'dist'), ya que de esta manera aseguramos que sea la ruta exacta del proyecto.
      - filename sera el nombre del archivo que resulte de la configuracion.
   - El tercer elemento es resolve que recive un objeto de configuracion como el anterior.
      - Lo primero es extensions que recive un arreglo con las extenciones de los archivos que maneja el proyecto.
3. Ejecutamos el comando para que construya el "main.js".
   ~~~
   npx webpack --mode production --config webpack.config.js
   ~~~
4. Creamos un script en el package.json para ejecutar webpack si escribir todo lo anterior.
   ~~~
   "build": "webpack --mode production"
   ~~~
#### Babel Loader para JavaScript
Con babel transpilamos el codigo para que las nuevas funcionalidades de js que estan el el proyecto sean traducidas a js que todo navegador pueda ejecutar sin problemas.
1. Instalamos babel como dependencias de desarrollador y otras dependencias que nos ayudaran con esto. (Algunas la usaremos en clases posteriores).
   ~~~
   npm install -D babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime
   ~~~
   - babel-loader nos permite usar babel con webpack.
   - @babel/core es babel en general.
   - @babel/preset-env trae y permite usar las ultimas características de JavaScript.
   - @babel/plugin-transform-runtime te permite trabajar con todo el tema de asincronismo como ser async y await.
2. Creamos el archivo de configuración de babel ".babelrc".
   ~~~
   {
      "presets": [
         "@babel/preset-env"
      ],
      "plugins": [
         "@babel/plugin-transform-runtime"
      ]
   }
   ~~~
   De momenton solo tendra esto que es la configuracion necesaria para que transpile js.
3. Para poder uzarlo añadimos la configuracion el webpack para que sepa que tipo de archivos usaran la configuracion de babel y cuales no.
   ~~~
   module: {
      rules: [
         {
            test: /\.js$/, // Test declara que extensión de archivos aplicara el loader.
            exclude: /node_modules/, // Exclude permite omitir archivos o carpetas especificas
            use: {
               loader: "babel-loader", // Use es un arreglo u objeto donde dices que loader aplicar
            },
         }
      ]
   }
   ~~~
   - module es otro elemneto del webpack. En este añadiremos las reglas que usara para las diferentes configuraciones que tendra el proyecto. Babel, eslint...
#### HTML en Webpack
Para poder trabajar con html en webpack debemos intalar un paquete como dependencia de desarrollo que se encargara de de entenderlo y procesarlo para el proyecto.
   ~~~
   npm i html-webpack-plugin -D
   ~~~
1. Luego de instalado en el archivo de webpack.confing inportamos este paquete/plugin para usarlos.
   ~~~
   const HtmlWebpackPlugin = require('html-webpack-plugin');
   ~~~
2. Seguido de modules añadimos un elemento de plugins, este recive un arreglo con los pligins.
   - Intanciamos el plugin como un objeto y como valores de configuracion del plugin le pasamos un objeto con los elementos necesarios. (Inject: true) para que haga la incercion de los elementos. (template: './public/index.html') el template es donde esta el html que se usa para esto. (filename: './index.html') es el nombre que tendra el erchivo resultante del template.
      ~~~
      plugins: [
         new HtmlWebpackPlugin({ // CONFIGURACIÓN DEL PLUGIN
               inject: true, // INYECTA EL BUNDLE AL TEMPLATE HTML
               template: './public/index.html', // LA RUTA AL TEMPLATE HTML
               filename: './index.html', // NOMBRE FINAL DEL ARCHIVO
         }),
      ],
      ~~~
3. Si el template tenia enlazado el .js dentro del html, debemos borrar esta linea ya que webpack se encarga de enlazar el js con el html.
4. Creamos un nuevo script dentro del package.json para ejecutar webpack en modo development tambien por si lo queremos usar.
   ~~~
   "dev": "webpack --mode development"
   ~~~
#### Loaders para CSS y preprocesadores de CSS
1. Para empezar necesitamos el plugin para el manejo css como dependencia de desarrollador.
   ~~~
   npm i mini-css-extract-plugin css-loader -D
   ~~~
   - css-loader ⇒ Loader para reconocer CSS
   - mini-css-extract-plugin ⇒ Extrae el CSS en archivos
2. Creamos la nueva regla en el webpack config para que sea manejado el css.
   ~~~
   {
      test: /\.css$/i,
      use: [
         MiniCssExtractPlugin.loader,
         "css-loader",
      ]
   }
   ~~~
3. incluimos el plugin para esta configuracion despues de importarlo dentro de webpack.
   ~~~
   const MiniCssExtractPlugin = require('mini-css-extract-plugin')
   // ...
   new MiniCssExtractPlugin()
   ~~~
4. Eliminamos el enlace que se hace de css en el html ya que webpack  lo enlazara por nosotro. Adicional a esto importamos el css directamente en el index.js ya que es la entrada del proyecto.
   ~~~
   import './styles/main.css';
   ~~~
###### Preprosesadores css
Para esto instalamos el preprocesador que queremos. Como solo queremos el preprocesador dentro de webpack solo instalamos el loader para stylus o node-sass sass-loader para sass.
   ~~~
   // Para stylus
   npm i stylus stylus-loader -D
   // Para sass
   npm i -D node-sass sass-loader
   ~~~
1. Cambiamos un poco la regla del webpack.
   ~~~
   // Para stylus
   test: /\.css|styl$/i,
   use: [
      MiniCssExtractPlugin.loader,
      "css-loader",
      "stylus-loader",
   ]
   // Para sass
   test: /\.(s*)css$/,
   use: [
      { loader: MiniCssExtractPlugin.loader },
      'css-loader',
      'sass-loader',
   ]
   ~~~
   - Para comprobar creamos un segundo archivo con la extencion a usar y añadimos css para ver si no procesa, importamos el archivo dentro del index.js para que este este conectado a la raiz del proyecto..
#### Copia de archivos con Webpack
Abrán veces que necesitmeos resolver o unir directorios de trabajos. Donde, con una simple declaración, podriamos caer en un sencillo copy & paste sin entender sus efectos (que pudiesen ser similares).
Cuando deseen estructurar un directorio de trabajo a partir de una dirección absoluta, sin importar el SO, se utiliza path.resolve([...paths]) por ello, si queremos utilizar nuestro directorio de trabajo como una referencia, utilizamos __dirname y de ahí, resolverá el conjunto de paths que le anexemos.
   ~~~
   /*
   En nuestro ejemplo, resolverá nuestro path en /user/path/to/workdirectory/ + src + assets/images
   quedando algo similar a /users/path/to/js-portfolio/src/assets/images
   */
   path.resolve(__dirname, 'src', 'assets/images');
   ~~~
   Se tendrá que ser cuidadoso en el proceso de construcción porque cada forma de escribir el path, generará en un path diferente.
   ~~~
   path.resolve('/foo/bar', './baz');
   // Returns: '/foo/bar/baz'

   path.resolve('/foo/bar', '/tmp/file/');
   // Returns: '/tmp/file'

   path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
   // If the current working directory is /home/myself/node,
   // this returns '/home/myself/node/wwwroot/static_files/gif/image.gif'
   ~~~
1. Instalamos copy-webpack-plugin.
   ~~~
   npm i copy-webpack-plugin -D
   ~~~
2. Agregamos la config en webpack.
   ~~~
   const CopyPlugin = require('copy-webpack-plugin');
   // ...
   new CopyPlugin({
      patterns: [
         {
            from: path.resolve(__dirname, "src", "assets/images"),
            to: "assets/images",
         }
      ],
    }),
   ~~~
   - From ⇒ que recurso (archivo o directorio) deseamos copiar al directorio final.
   - To ⇒ en que ruta dentro de la carpeta final terminara los recursos.
3. Cambiamos las rutas en el html ya que el llamado es diferente.
   ~~~
   // Ruta anterior
   "../src/assets/images/instagram.png"
   // Nueva Ruta
   "assets/images/instagram.png"
   ~~~