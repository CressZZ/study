# Loader Definitions

# Anatomy of a Loader
Webpack supports a large variety of formats through loaders. Also, it suppports a coupole of JavaScript module formats out of the box. The idea is the same. You always set up a loader, or loaders, and connect those with your directory structure.

Consider the example below where webpack processes JavaScript through Babel:

webpack.config.js
```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, "app"),
                // exclude: path.match(/node_modules/);
                exclude(path){
                    return path.match(/node_modules/);
                },
                use: 'babel-loader'
            }
        ]
    }
}

```

# Loader Evaluation Order
It's good to keep in mind that webpack's loader are always evaluated from right to left and from bottom to top (seperate definitions). The right-to-left rule is easier to remember when you think about as function. You can read definition `use: ['style-loader', 'css-loader']` as `style(css(input))` based on this rule.

To see the rule in action, consider the example below:
```js
{
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
}
```

Based on the right to left rule, the example can be split up while keeping it equivalent:
```js
{
    test: /\.css$/,
    use: 'style-loader',
},
{
    test: /\.css$/,
    use: 'css-loader',
},
```

# Enforcing Order
Event though it would be possible to develop an arbitrary configiuration usiing the rule above, it can be convenient to be able to force specific rule to be applied before of after regular ones. The `enforece` field can come in habndy here. It can be set to either `pre` of `post` to push processing either before of after other loaders.

Linting is good example because the build should fail before it does anything else. Using `enfoce: "post"` is rarer and it would imply you want to perform a check against the build source. Performing analysis against the buit source is one potential example. 

The vasinc sysntax goes as below:

```js
{
    test: /\.js$/,
    enforce: : 'pre',
    use: "eslint-loader",   
}

```

It would be possible to write the same configuration without `enforce` if you chained th declaration with other loaders realted to the `test` careully. Using `enforece` removes the necessity for that and allows you to split loader execution into separate stages that are easier to compose. 

# Passig Parameters to a Loader
There's a query format that allows passing parameters to loaders:

```js
test: /\.js$/,
include: PATHS.app,
use: "babel-loader?presets[]=env",
```

This style of configuration works in entries and source imports too as webpack picks it up. the format comes in handy in certain individual cases, but often you are better off using more readable alternaives.


