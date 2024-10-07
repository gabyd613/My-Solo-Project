import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  // where you first want webpack to look to start bundling
  entry: "./client/src/index.js",
  mode: "development",
  // where you want the bundled file to be stored
  output: {
    // where file should be stored
    path: path.resolve(__dirname, "dist"),
    // name of file to be created
    filename: "bundle.js",
    // tells browser where to find static assets (images, stylesheets, etc )
    publicPath: "/",
  },
  // serves bundled files during development
  devServer: {
    static: {
      // specifies where static files come from
      directory: path.join(__dirname, "client/public"), 
    },
    // compresses files for quicker load time
    compress: true,
    // port where dev will run
    port: 8080,
  },
  module: {
    // rules for how different file types should be processed
    rules: [
      {
        // any file ending in .js should be processed using following configs:
        test: /\.js$/,
        // ignore files in this directory/folder (saves time from extra processing)
        exclude: /node_modules/,
        use: {
          // says to use babel-loader to process .js files
          loader: "babel-loader",
          options: {
            presets: [
              ['@babel/preset-env'], 
              ['@babel/preset-react']
          ]
          }
        },
      },

      {
        test: /\.(png|jpe?g|gif)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader'
        }
      },
      {
        // any file ending in .css should be processed using following configs:
        test: /\.css$/,
        exclude: /node_modules/,
        // says to use style-loader and css-loader for .css files ,
        // allows you to bundle css files and inject into the DOM
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'client/public/index.html'),
    }),
  ],
  // allows me to omit .js or .jsx or .css when importing files
  resolve: {
    extensions: [".js", ".jsx", ".scss"],
  },
};

export default config;