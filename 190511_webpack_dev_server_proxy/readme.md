http://www.pierre-beitz.eu/2017/01/24/Dealing-with-CORS-in-a-Development-Environment-Using-a-Reverse-Proxy.html

# Test

## Case 1 
```js
// webpack.config.js
proxy: {'/devApi':
      {
        target: 'http://opdev.lineagem.plaync.com',
        // target: 'http://local.opdev.lineagem.plaync.com:31882',
        pathRewrite:{'^/devApi' : ''},
        changeOrigin: true,
      }
    }
```

- `GET`: success
- `POST`: Invalid CORS request 


## Case 2
```js
// webpack.config.js
proxy: {'/devApi':
      {
        target: 'http://opdev.lineagem.plaync.com',
        // target: 'http://local.opdev.lineagem.plaync.com:31882',
        pathRewrite:{'^/devApi' : ''},
        // changeOrigin: true,
      }
    }
```

- `GET`: 404 Not Found
- `POST`: 404 Not Found

## Case 3
```js
// webpack.config.js
proxy: {'/devApi':
      {
        // target: 'http://opdev.lineagem.plaync.com',
        target: 'http://local.opdev.lineagem.plaync.com:31882',
        pathRewrite:{'^/devApi' : ''},
        changeOrigin: true,
      }
    }
```

- `GET`: success
- `POST`: Invalid CORS request

## Case 4
```js
// webpack.config.js
proxy: {'/devApi':
      {
        // target: 'http://opdev.lineagem.plaync.com',
        target: 'http://local.opdev.lineagem.plaync.com:31882',
        pathRewrite:{'^/devApi' : ''},
        // changeOrigin: true,
      }
    }
```

- `GET`: success
- `POST`: success
