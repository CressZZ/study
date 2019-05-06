module.exports = {
    "env": {
        "es6": true,
        "commonjs":true,
        "node": true,
        "browser": true,
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "semi": ["error", "always"],
        "no-console": "off",
        // "no-undef":"error",
    }
};