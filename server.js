const express = require('express')
const path = require("path");
const app = express()
const port = process.env.PORT || 5000;

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
  index: ['index.html'],
  maxAge: '1m',
  redirect: false
}
app.use(express.static('build', options));
// app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'build', 'index.html')));
app.get('*', (req, res) => res.json({message: 'dsads'}));
app.listen(port, () => {
  console.log(`React app listening at http://localhost:${port}`)
});