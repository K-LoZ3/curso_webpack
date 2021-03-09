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
      - path sera la ruta donde estara el resultante. La buscamos con path.resolve(--dirname, 'dist'), ya que de esta manera aseguramos que sea la ruta exacta del proyecto.
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