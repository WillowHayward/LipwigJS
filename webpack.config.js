const config = {
    entry: {
      lipwig: './build/Lipwig.js'
    },
    output: {
      libraryTarget: 'window',
      filename: 'lipwig.js',
      path: __dirname + '/dist'
    }
}

module.exports = config;
