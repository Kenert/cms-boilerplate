const webpackBaseConfig = {
    stats: {
        colors: true,
        hash: false,
        version: false,
        timings: false,
        assets: true,
        chunks: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errors: false,
        errorDetails: false,
        warnings: false,
        publicPath: false
    }
};

const webpackDevConfig = {
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: ['eslint-loader']
            }
        ]
    }
};

const webpackProdConfig = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                    'eslint-loader'
                ]
            }
        ]
    }
};

exports.webpackBaseConfig = webpackBaseConfig;
exports.webpackDevConfig = webpackDevConfig;
exports.webpackProdConfig = webpackProdConfig;
