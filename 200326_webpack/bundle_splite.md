# Bundle Splitting

Currently, the production version of the application is a single JavaScript file. If the Application is changed, the client must download vendor dependencies a s well.

It would be better to download only the changed portion. If the vendor dependencies change, then the client should fetch only the vendor dependencies. The same goes for actual application code. Bundle splitting can be achieved using `optimization.splitChunks.cacheGroups`. When running in production mode, webpack 4 can perform a [series of splits out of the box](https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693) but in this case, we'll do something manually. 

