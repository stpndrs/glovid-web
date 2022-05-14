const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, 'dist/js'),
        library: 'glovid',
    },
}
