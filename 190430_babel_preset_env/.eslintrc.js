module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "commonjs":true,
        "node": true,
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        // "Promise": "off",
        "var2": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2017,
        "sourceType": "module"
    },
    "parser":"babel-eslint",
    "rules": {
        // "semi": ["error", "always"],
        // "no-console": "error",
        "no-undef":"error",
        // "no-global-assign": "error"
    }
};