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

It's preferable to go through `use:`

```js
{
    // Conditions
    test: /\.js$/,
    include: PATHS.app,

    // Actions
    use: {
        loader: "babel-loader",
        options: {
            presets: ["env"]
        }
    }
}
```

If you wanted to use more than one loader, you could pass an array to `use` and expand from there:

```js
{
    test: /\.js$/,
    include: PATHS.app, 

    // Actions
    use: [
        {
            lader: "babel-loader",
            options: {
                presets: ["env"],
            }
        },
    ]
}
```

# Branching at use Using a Function
In the book setup, you compose configuration on a higher level. Another option to achieve similar results would be to branch at `use` as webpack's loader definitions accept functions that allow you to branch depending on the environment.

```js
{
    test: /\.css$/,
    use: ({resource, resourceQuery, issuer}) => {
        if(env === 'development') {
            return {
                use: {
                    loader: "css-loader", // css-loader first
                    rules: [
                        "style-loader", // style-loader after
                    ],
                },
            }
        }
    }
}

```

Carefully applied, this techmique allows different means of composition.

# Inline Definitions
Even though configuration level loader definitions are preferable, it's possible to write loader definitions inline:

```js
// Process foo.png through url-loader and other
// possible matches.
import "url-loader!./foo.png";

// Override possible higher level match completely
import "!!url-loader!./bar.png";
```

The problem with this approach is that it couples your source with webpack. 
Nonetheless, it's still an excellent from to know. Since configuration entries go through the same mechanism, the same forms work there as well:

```js
{
    entry: {
        app: "babel-loader!./app",
    }
}
```

# Alternate Ways to Match Files
`test` combined with `include` or `exclude` to constrain the match is the most common approach to match files. These accept the data types as listed below:

- `test` - Match against a RegExp, string, function, an object, or an array of conditions like these.
- `include` - The same.
- `exclude` - The same, except the output is the inverse of `include`.
- `resource: /inline/` - Match against a resource path includeing the query. Exaples: `/path/foo.inline.js`, `/path/bar.png?inline`.
- `issure: /bar.js/` - Match against a resource requested from the match. Example: `path/foo.png` would match if it was requeste from `/path/bar.js`.
- `resourcePath: /inline/` - Match against a resource bsed on its query. Example: `/path/foo.png?inline`.

Boolean base fields can be used to constrain these matchers further:

- `not` - Do not match against a condition (see `test` for accepted values).
- `and` - Match against an array of conditions. All must match.
- `or` - Match against an array while any must match.

# Loading Based on resource Query
`oneOf` field makes it possible to 

```js
module.exports = {
    //...
    module: {
        rules: [
            {
                test: /\.css/,
                oneOf: [
                    {
                        resourceQuery: /inline/, // foo.css?inline
                        use: 'url-loader'
                    },
                    {
                        resourceQuery: /external/, // foo.css?external
                        use: 'file-loader' 
                    }
                ]
            }
        ]
    }
}
```
If you wanted to embed the context information to the filename, the rule could use `resoucePath` over `resouceQuery`.

# Loading Based on Issuer
`issure` can be used to control behavior based on where a resource wa imported In the example below adapted from `css-loader issue 287`, style-loader is applied when webpack captures a CSS file from a JavaScript import:

```js

{
    test: /\.css$/,
    rules: [
        {
            issure: /\.js$/,
            use: "style-loader",
        },
        {
            use: "css-loader"
        }
    ]
}
```

Another approach would be to mix `issuer` and `not`:
```js
{
    test:/\.css$/,
    rules: [
        // CSS imported from other modules is added to the DOM
        {
            issuer : { not: \/.css$/ },
            use: "style-loader"
        },
        // Apply css-loader against CSS imports to return CSS
        {
            use: "css-loader",
        }
    ]
}
```

# Understanding Loader Behavior
Loader hehavior can be understood in greater detail by inspecting them. loaderrunner allows you to run them in isolation without webpack. Webpack uses this package internally an Extending with Loaders chapter covers it in detail.

inspect-loader allows you to inspect what's being passed between loaders. Instead of having to insert console.logs within node_modules, you can attach this loader to your configuration and ispect the flow there.

# Conclusion
Webpack provides multiple ways to setup loaders but sticking with `use`si enough in webpack 4. Be carful with loader ordering, ad it's acommon source of problems.

To recap:
- **Loaders** allow you determine what should happen when webpack's module resolution mechanism encounters a file.
- A loader definition consists of **constions** based on which to match and **action** that shoud be performed when a match happens.
- Wbepack 2 introduced the `use` field. It combines the ideas of old `loader` and `loaders` fields into a single construct.
- Webpack 4 provides multiple ways to match and alter loader behavior. You can, for example, match based on a **resource query** after a loader has been matched and route the loader to specific actions.


