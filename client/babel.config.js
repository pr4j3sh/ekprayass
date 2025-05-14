module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
      },
    ],
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties",
    [
      "module-resolver",
      {
        alias: {
          "@src": "./src",
          "@app": "./src/app",
          "@components": "./src/components",
          "@features": "./src/features",
          "@images": "./src/images",
          "@pages": "./src/pages",
          "@styles": "./src/styles",
        },
      },
    ],
  ],
};
