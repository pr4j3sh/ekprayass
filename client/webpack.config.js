const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const dotenv = require("dotenv");

module.exports = (env, argv) => {
  const devMode = argv.mode !== "production";

  const currentPath = path.join(__dirname);
  const basePath = currentPath + "/.env";
  const envPath = basePath + "." + env.ENVIRONMENT;
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;
  const fileEnv = dotenv.config({ path: finalPath }).parsed;

  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return {
    // context: path.resolve(__dirname, 'src'),
    devtool: devMode ? "eval" : "source-map",
    entry: {
      app: ["@babel/polyfill", "./src/index.js"],
    },
    node: {
      fs: "empty",
    },
    module: {
      rules: [
        // {
        //     test: /\.js$/,
        //     enforce: 'pre',
        //     exclude: /node_modules/,
        //     loader: 'eslint-loader',
        //     options: {
        //         cache: true,
        //         failOnWarning: devMode ? false : true, // Always fail in production
        //         failOnError: devMode ? false : true, // Never fail in dev mode
        //     },
        // },
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.html$/,
          use: ["html-loader"],
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },

        {
          test: /\.(png|jpe?g|webp|gif)$/,
          loader: "url-loader",
          options: {
            limit: 5000,
            name: devMode ? "[path].[name].[ext]" : "[name].[hash:20].[ext]",
            outputPath: "images/",
          },
        },
        {
          test: /\.svg$/,
          use: [
            "babel-loader",
            {
              loader: "@svgr/webpack",
              options: {
                babel: false,
              },
            },
            {
              loader: "url-loader",
              options: {
                limit: 5000,
                name: devMode
                  ? "[path].[name].[ext]"
                  : "[name].[hash:20].[ext]",
                outputPath: "images/",
              },
            },
          ],
        },
        {
          test: /\.(eot|ttf|woff|woff2|otf)$/,
          loader: "file-loader",
          options: {
            context: "fonts",
            limit: 5000,
            name: devMode ? "[path].[name].[ext]" : "[name].[hash:20].[ext]",
            outputPath: "fonts/",
          },
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin({
        beforeEmit: true,
      }),
      new webpack.DefinePlugin(envKeys),
      new webpack.DefinePlugin(
        Object.assign(
          {},
          envKeys,
          devMode
            ? undefined
            : {
                VERSION: JSON.stringify("5fa3b9"),
                BROWSER_SUPPORTS_HTML5: true,
                TWO: "1+1",
                "typeof window": JSON.stringify("object"),
                "process.env": {
                  NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                },
              }
        )
      ),
      new HtmlWebPackPlugin(
        Object.assign(
          {},
          {
            template: "./public/index.html",
            inject: true,
            filename: "./index.html",
          },
          devMode
            ? undefined
            : {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
        )
      ),
      new MiniCssExtractPlugin({
        filename: devMode ? "[name].css" : "[name].[hash].css",
        chunkFilename: devMode ? "[name].[id].css" : "[name].[id].[hash].css",
      }),
      new CompressionPlugin({
        test: /\.(html|css|js|gif|svg|ico|woff|ttf|eot)$/,
        exclude: /(node_modules)/,
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
      extensions: ["*", ".js", ".mjs", ".json"],
    },
    output: {
      path: path.resolve(__dirname, "./dist"),
      publicPath: "",
      filename: devMode ? "[name].js" : "[name].[hash].js",
      chunkFilename: devMode ? "[name].[id].js" : "[name].[id].[hash].js",
    },
    optimization: {
      minimize: !devMode,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true, // Must be set to true if using source-maps in production
          terserOptions: {
            ie8: true,
            safari10: true,
            sourceMap: true,
            compress: {
              ecma: 5,
              comparisons: false,
              warnings: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            map: {
              inline: false,
              annotation: true,
            },
          },
        }),
      ],
      splitChunks: {
        chunks: "all",
        minSize: 0,
        maxInitialRequests: 10,
        maxAsyncRequests: 10,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name(module, chunks, cacheGroupKey) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              return `${cacheGroupKey}.${packageName.replace("@", "")}`;
            },
          },
          common: {
            minChunks: 2,
            priority: -10,
          },
        },
      },
      runtimeChunk: "single",
    },
    devServer: {
      historyApiFallback: true,
      contentBase: "./dist",
      hot: true,
      compress: true,
      open: true,
      overlay: true,
      proxy: {
        "/api/**": {
          target: "https://api.tobaccomarshal.org/api",
          secure: true,
          changeOrigin: true,
        },
      },
    },
    stats: {
      children: false,
    },
  };
};
