const presets = [
    [
      "@babel/env",
      {
        targets: {
        //   edge: "17",
        //   firefox: "60",
          // chrome: "67",
        //   safari: "11.1",
        },
        useBuiltIns: "entry",
        corejs:3
      },
    ],
  ];
  const plugins=[
      "@babel/plugin-proposal-class-properties", 
      "@babel/plugin-proposal-private-methods"
    ]
  module.exports = { presets, plugins };