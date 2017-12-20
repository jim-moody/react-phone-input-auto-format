const path = require("path");
const BUILD_DIR = path.resolve(__dirname, "lib");
const APP_DIR = path.resolve(__dirname, "src");
module.exports = {
  entry: APP_DIR + "/index.js",
  output: {
    filename: "index.js",
    path: BUILD_DIR,
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: APP_DIR,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env", "react"],
            plugins: ["transform-class-properties"]
          }
        }
      }
    ]
  },
  externals: {
    react: "commonjs react"
  }
};
