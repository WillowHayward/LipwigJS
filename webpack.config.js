const config = {
    entry: {
      lipwig: './build/Lipwig.js'
    },
    output: {
      filename: '[name].js',
      path: __dirname + '/dist'
    }
}

module.exports = config;