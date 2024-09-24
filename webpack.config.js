const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'production', // Cambia a 'production' para el despliegue
    entry: './script.js', // Punto de entrada de tu aplicación
    output: {
        filename: 'bundle.js', // Nombre del archivo de salida
        path: path.resolve(__dirname, 'dist'), // Directorio de salida
    },
    plugins: [
        new Dotenv()
    ],
    module: {
        rules: [
            {
                test: /.css$/, // Para manejar archivos CSS
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};