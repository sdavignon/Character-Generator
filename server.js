var path = require('path');
var webpack = require('webpack');
var express = require('express');
var fs = require('fs');
var config = require('./webpack.config');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static('public'));

app.get('/api/assets/', function (req, res) {
  const svgPath = 'public/svg/';
  const svgFolders = fs.readdirSync(svgPath).filter(name => (
    fs.statSync(path.join(svgPath, name)).isDirectory()
  ));
  const data = svgFolders.map(name => ({
    id: name,
    files: fs.readdirSync(path.join(svgPath, name))
  }));
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(data));
});

app.listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});
