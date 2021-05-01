module.exports = function (api) {
    api.cache(true);
    return {
      //exclude: [/\bcore-js\b/, /\bwebpack\/buildin\b/,/\bnode_modules/],
      include: /(node_modules)/,
      test: /\.(tsx?)|(js)$|(jsx)$/,
  
      presets: [
        ["@babel/react"],
        ["@babel/preset-typescript"],
        [
          "@babel/preset-env",
          {
            corejs: { version: 3 },
            useBuiltIns: "usage",
            targets: {
              esmodules: true,
              browsers: [
                "last 5 versions",
                "ie >= 9",
                " safari >= 7",
                "ios_saf >= 9",
              ],
            },
            loose: true,
          },
        ],
        [
          "babel-preset-expo",
          {
            corejs: { version: 3 },
            targets: {
              esmodules: true,
              browsers: [
                "last 5 versions",
                "ie >= 9",
                "safari >= 7",
                "ios_saf >= 9",
              ],
            },
          },
        ],
      ],
      plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-computed-properties",
        [
          "module-resolver",
          {
            alias: {
              "@Components": "./components",
              "@Containers": "./containers",
              "@Hooks": "./hooks",
              "@Controllers": "./controllers",
              "@Assets": "./assets",
              "@Helpers": "./helpers",
              "@Actions": "./actions",
              "@Services": "./services",
              "@Utils": "./utils",
            },
          },
        ],
      ],
    };
  };
  