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
#### Loaders de imágenes
Con la configuracion que trae webpack agregaremos la configuracion para manejar las imagenes como una variable con imports, de esta manera sera mejor la forma en la que trabajaremos con ellas en el proyecto. Este loader nos permite importar de forma dinámica en nuestros archivos JavaScript imágenes, el loader le genera un hash unico para cada imagen. Algo parecido sucede con ReactJS al importar imágenes
1. Creamos una nueva regla en webpack config. De momento solo con los archivos .png
   ~~~
   {
      test: /\.png/,
      type: 'asset/resource'
   }
   ~~~
2. Importamos en el archivo que se esta usando las imagenes necesarias "template.js"
   ~~~
   import github from '../assets/images/github.png';
   import twitter from '../assets/images/twitter.png';
   import instagram from '../assets/images/instagram.png';
   // ...
   <a href="https://instagram.com/gndx">
      <img src="${instagram}" />
   </a>
   ~~~
3. Para que las imagenes queden en la carpeta assets debemos en webpack decirle donde deben quedar en las configuraciones del output.
   ~~~
   assetModuleFilename: 'assets/images/[hash][ext][query]',
   ~~~
#### Loaders de fuentes
Para manipular las fuentes y que ademas estan esten en el proyecto sin necesidad de usar un cdn, debemos descargar la fuente en .woff y .woff2.
1. Ya con la fuente descargada, en el css, ponemos la configuracion de la fuente. Tanto el nombre que tendra, como el formato y tamaño de la fuente.
   ~~~
   @font-face {
      font-family: 'Ubuntu';
      src: url('../assets/fonts/ubuntu-regular.woff2') format('woff2'),
         url('../assets/fonts/ubuntu-regular.woff') format('woff');
      font-weight: 400;
      font-style: normal;
   }
   ~~~
   - Eliminamos el import del cdn de la fuente ya que la configuracion necesaria es esta.
2. Instalamos url-loades y file-loader como dependencias de desarrollo.
3. Creamos las reglas en webpack para copiar los archivos de las fuentes a dist y ademas leer estos archivos y usarlos en el proyecto.
   ~~~
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
            name: "[name].[ext]",
            // EL NOMBRE INICIAL DEL ARCHIVO + SU EXTENSIÓN
            // PUEDES AGREGARLE [name]hola.[ext] y el output del archivo seria 
            // ubuntu-regularhola.woff
            outputPath: './assets/fonts/', 
            // EL DIRECTORIO DE SALIDA (SIN COMPLICACIONES)
            publicPath: './assets/fonts/',
            // EL DIRECTORIO PUBLICO (SIN COMPLICACIONES)
            esModule: false 
            // AVISAR EXPLICITAMENTE SI ES UN MODULO
         }
      }
   }
   ~~~
#### Optimización: hashes, compresión y minificación de archivos
1. Instalamos dependencias de desarrollador necezarias.
   ~~~
   npm install css-minimizer-webpack-plugin terser-webpack-plugin -D
   ~~~
2. Importamos estos dentro de webpack config.
   ~~~
   const CssMinimizerPlugin = requiere('css-minimizer-webpack-plugin');
   const TerserPlugin = require('terser-webpack-plugin');
   ~~~
3. Añadimos como una opcion en la parte de optimization justo despues de plugin.
   optimization: {
      minimize: true,
      minimizer: [
         new CssMinimizerPlugin(),
         new TerserPlugin(),
      ],
   },
   ~~~
#### Identificar las verciones que se trabajan mediante hash
1. Cada build del proyecto se identifica con un hash.
   ~~~
   path: path.resolve(__dirname, 'dist'),
   filename: '[name][contenthash].js',
   // ...
   mimetype: 'application/font-woff',
   name: '[name][contenthash].[ext]',
   // ...
   new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css',
   }),
   ~~~
#### Webpack Alias
Alias ⇒ nos permiten otorgar nombres paths específicos evitando los paths largos. Para crear un alias debes agregar la siguiente configuración a webpack.
   ~~~
   module.exports = {
      ...
      resolve: {
         ...
      alias: {
         '@nombreDeAlias': path.resolve(__dirname, 'src/<directorio>'),
      },
      }
   }
   ~~~
Puedes usarlo en los imports de la siguiente manera.
   ~~~
   import modulo from "@ejemplo/archivo.js";
   ~~~
#### Variables de entorno
Las variables de entorno son variables externas a nuestra aplicación que residen en el sistema operativo o en el contenedor de la aplicación que se está ejecutando. Una variable de entorno es simplemente un nombre asignado a un valor como una variable es cualquier lenguaje de programación.
1. Instalamos el paquete necesario.
   ~~~
   npm install dotenv-webpack -D
   ~~~
2. Añadimos la configuracion necesaria dentro de un archivo .env y un archivo .env.example.
   - En el primere estara la variable de entorno con su valor. En la clase esta es la API.
   ~~~
   API=https://randomuser.me/api/
   ~~~
   - El segundo solo estaria la variable sin el valor ya que este si se publicaria pero es solo informativo (para saber que variables hay).
   ~~~
   API=
   ~~~
3. Importamos el paquete en webpack config y creamos la configuracion en este.
   ~~~
   const Dotenv = require('dotenv-webpack');
   // ...
   plugins: [
      // ...
		new Dotenv(),
   ],
   ~~~
4. Para utilizar esta variable, nos dirigimos al archivo donde la necesitamos y con process.env llamamos la variable que creamos.
   ~~~
   // En esta clase la variable es la direccion de la API y se necesita en utils/getData.js.
   const API = process.env.API;
   ~~~
#### Webpack en modo desarrollo
Hay unas configuraciones de webpack que no son necesarias cuando se ejecuta webpack en  modo desarrollo, ejemplo de esto es la parte de optimizacion.
1. Creamos un archivo "webpack.config.dev.js", este tendra todas las configuraciones del anterior menos la de optimization.
2. Incluimos el modo de desarrollo dentro de este archivo.
   ~~~
   // ...
   mode: 'development',
   resolve: {
      extensions: ['.js'],
   // ...
   ~~~
3. Modificamos el script "dev" del package.json para que ejecute el modo dev con estas configuraciones.
   ~~~
   "dev": "webpack --config webpack.config.dev.js"
   ~~~
#### Webpack en modo producción
Dentro del modo produccion queremos incluir la limpieza del proyecto (eliminar los documentos duplicados, los archivos que se movieron, dejando solo la ultima modificacion). Solo en produccion porque no es necesario en modo desarrollo y ademas en desarrollo podemos comparar un archivo con otro.
1. Instalamos el paquete para esto como dependencia de desarrollo.
   ~~~
   npm install clean-webpack-plugin -D
   ~~~
2. Importamos el plugin en el webpack config y lo instanciamos en el apartado de plugins.
   ~~~
   const { CleanWebpackPlugin } = require('clean-webpack-plugin');
   // ...
   new Dotenv(),
   new CleanWebpackPlugin(),
   // ...
   ~~~
3. Modificamos el package.json para validar que siempre en modo produccion ejecute webpack.config.js.
   ~~~
   "build": "webpack --mode production --config webpack.config.js"
   ~~~
#### Webpack watch
Esta es la funcionalidad que webpack tiene para permanecer escuchando cambios en el proyecto. El modo watch hace que nuestro proyecto se compile de forma automática, es decir que está atento a cambios. Cada vez que haya un cambio hara un build automático. Otra manera es mandar la opción mediante parámetros de consola en package.json.
   ~~~
   {
      "scripts": {
         "dev:watch": "webpack --config webpack.config.dev.js --watch"
      }
   }
   ~~~
Vale la pena recordar que si aplicamos en modo producción se tomara más tiempo porque se optimizaran los recursos, por ello en modo desarrollo se salta ese paso y es más rápido la compilación.
1. Para habilitarlo debemos agregar lo siguiente en la configuración de webpack.
   ~~~
   module.exports = {
      // ...
      mode: 'development',
      watch: true,
   }
   ~~~
#### Deploy a Netlify
Para poder desplegar nuestra app desde un repositorio de github.
1. Creamos la cuenta de netlyfy y conectamos con github.
2. Creamos un archivo nettlify.toml para la configuracion de netlify.
   ~~~
   [build]
      publish = "dist"
      command = "npm run build"
   ~~~
3. creamos un archivo "create-env.js" para poder usar las variables de entorno dentro de netlify ya que el archivo .env no se envia al repositorio.
   ~~~
   const fs = require('fs');

   fs.writeFileSync('./.env', ~`API=${process.env.API}\n`);
   ~~~
4. Enviamos los cambios al repositorio.
5. Le damos a crear nuevo sitio en netlify y en este colocamos la configuracion que pusimos en el .toml. y desplegamos el sitio.
6. Cuando el sitio esta desplegado mandara un error de encuentra las variables de entorno. Nos vamos a site settings buscamos la seccion environment y en editar variables creamos una nueva llamada API y le damos el valor de la variable de entorno.
7. En el script del package.json modificamos el script para que ejecute este create-env.js.
   ~~~
   "build": "node ./scripts/create-env.js && webpack --config webpack.config.js",
   ~~~