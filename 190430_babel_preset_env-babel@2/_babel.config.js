const presets = [
    [
      "@babel/env",
      {
        targets: {
          // edge: "17",
          // firefox: "60",
          // chrome: "79",
          // safari: "11.1",
          // ie:9,
        },
        useBuiltIns: "usage",
        corejs:3,
        modules: false
        // "modules": false
        // "corejs": { "version": 3, "proposals": true}

        
      },
    ],
    
  ];
  const plugins=[
      // "@babel/plugin-proposal-class-properties", 
      // "@babel/plugin-proposal-private-methods"
    ]
  module.exports = { presets, plugins };