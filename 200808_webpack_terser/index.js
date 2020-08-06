const { minify } = require("terser");

(async function(){
    var code = {
        "file1_compiled.js": 'console.log(3+7);\n//# sourceMappingURL=out.js.map',
        // "file2.js": "console.log(add(1 + 2, 3 + 4));"
    };
    var options = { 
        // toplevel: true,
        sourceMap: {
            content: '{"version":3,"sources":["file2.js"],"names":["console","log"],"mappings":"AAAAA,QAAQC,IAAQ,EAAO","sourceRoot":"http://example.com/src"}',
            url: "out.js.map"
        }
    };
    var result = await minify(code, options);
    console.log(result);
    // console.log(result.code);
    // console.log(result.map);  // source map
})();