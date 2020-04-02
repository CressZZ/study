setTimeout(()=>{
    import('./a.js').then(a=>{console.log('dynamic')})
},5000)
import './b.js'
// import './b.js'
// import './c.js'
// import 'jquery'

// console.log('vendeor)')
