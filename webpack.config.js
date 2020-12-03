const path = require( 'path' );

module.exports = {
    // entry files
    entry: './src/index.ts',

    devtool: "source-map",

    // output bundles (location)
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'bundle.js',
    },

    devServer: {
      publicPath: '/dist/'
    },

    // file resolutions
    resolve: {
        extensions: [ '.ts', '.js' ],
    },

    // loaders
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                  plugins: ['transform-custom-element-classes', 'transform-es2015-classes']
                }
              }
            }
        ]
    }
};