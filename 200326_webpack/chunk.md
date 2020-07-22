# RIP CommonsChunkPlugin
webpack 4 removes the CommonsChunkPlugin in favor of two new options (`optimization.splitChunks` and `optimization.runtimeChunk). Here is how it works.

## Defaults
By default it now does some optimizations that should work great for most users.

Note: The defaults only affect on-demand chunks, because changing initial chunks would affect the script tags in the HTML. if you can handle this(i.e when gereating the script tags from the entrypoints in stats) you can enable these default optimizations for initial chunks too with `optimization.splitChunks.chunks: "all"`. 

tree shaking.....

There are three general approaches to code splitting available:
1. Entry Points
2. Prevent Duplication
3. Dynamic import

initial chunk