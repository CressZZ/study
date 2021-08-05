const express = require('express')
const app = express()
const port = 3000

app.get('/check', (req, res) => {
  res.send('Hello World!')
})
app.get('/uikit/preorder/js/preorders-5.1.0.js', (req, res) => {
  res.send('t')
})
app.get('/uikit/preorder/js/preorder-5.1.0.js', (req, res) => {
  res.send('t')
})
app.get('/test/test.js', (req, res) => {
  res.send('te')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})