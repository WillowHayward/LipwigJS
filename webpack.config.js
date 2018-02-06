const config = {
    entry: {
      lipwig: './build/Lipwig.js'
    },
    output: {
      libraryTarget: 'window',
      filename: '[name].js',
      path: __dirname + '/dist'
    }
}

module.exports = config;