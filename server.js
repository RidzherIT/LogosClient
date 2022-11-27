const express = require('express')
const path = require("path");
const app = express()
const port = process.env.PORT || 3000;

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
  index: ['index.html'],
  redirect: false
}
app.use(express.static('build', options));
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'build', 'index.html')));
app.listen(port, () => {
  console.log(`React app listening at http://localhost:${port}`)
});