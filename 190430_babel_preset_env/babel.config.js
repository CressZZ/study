const presets = [
    [
      "@babel/env",
      {
        targets: {
          // edge: "17",
          // firefox: "60",
          // chrome: "79",
          // safari: "11.1",
          node: "13.2.0",
        },
        useBuiltIns: "usage",
        corejs:2,
        // modules: 'cjs'
        // "modules": false
        // "corejs": { "version": 3, "proposals": true}

        
      },
    ],
    
  ];
  const plugins=[
      "@babel/plugin-proposal-class-properties", 
      "@babel/plugin-proposal-private-methods"
    ]
  module.exports = { presets, plugins };