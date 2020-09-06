const config = {
    entry: {
      lipwig: './lib/Lipwig.js'
    },
    output: {
      libraryTarget: 'window',
      filename: 'lipwig.js',
      path: __dirname + '/dist'
    }
}

module.exports = config;
