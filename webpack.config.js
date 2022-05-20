const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, 'dist/js'),
        library: 'glovid',
    },
    plugins: [new Dotenv()],
}
