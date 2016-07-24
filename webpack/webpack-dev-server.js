var Express = require('express');
var webpack = require('webpack');
var cors = require('cors');
var logger = require('morgan');
var bodyParser = require('body-parser');
var compression = require('compression');
var path = require('path');
var config = require('../src/config');
var webpackConfig = require('./dev.config');
var compiler = webpack(webpackConfig);
var devMiddlware = require('webpack-dev-middleware');
var hotMiddlware = require('webpack-hot-middleware');

var host = config.host || 'localhost';
var port = process.env.PORT || 3001;
var serverOptions = {
  contentBase: 'http://' + host + ':' + port,
  quiet: true,
  noInfo: true,
  reload: true,
  hot: true,
  inline: true,
  lazy: false,
  historyApiFallback: false,
  watchOptions: {
    aggregateTimeout: 500,
    poll: 1000
  },
  publicPath: webpackConfig.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {colors: true}
};

var app = new Express();

app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(devMiddlware(compiler, serverOptions));
app.use(hotMiddlware(compiler));

app.use(Express.static('static/dist'));

app.use((req, res, next) => {
  if (req.originalUrl && req.originalUrl !== '/' && /favicon\.ico$/.test(req.originalUrl)) {
    var favicon = path.join(compiler.outputPath, 'favicon.ico');
    compiler.outputFileSystem.readFile(favicon, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('Content-Type', 'image/x-icon');
      res.send(result);
      res.end();
    });
  } else if (req.originalUrl && req.originalUrl !== '/' && /\.css$/.test(req.originalUrl)) {
    var css = path.join(compiler.outputPath, req.originalUrl.substr(1));
    console.log(css);
    compiler.outputFileSystem.readFile(css, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('Content-Type', 'text/css');
      res.send(result);
      res.end();
    });
  } else if (req.originalUrl && req.originalUrl !== '/' && /\.svg$/.test(req.originalUrl)) {
    var svg = path.join(compiler.outputPath, req.originalUrl.substr(1));
    compiler.outputFileSystem.readFile(svg, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('Content-Type', 'image/svg+xml');
      res.send(result);
      res.end();
    });
  } else if (req.originalUrl && req.originalUrl !== '/' && /\.ttf$/.test(req.originalUrl)) {
    var ttf = path.join(compiler.outputPath, req.originalUrl.substr(1));
    compiler.outputFileSystem.readFile(ttf, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('Content-Type', 'application/octet-stream');
      res.send(result);
      res.end();
    });
  } else if (req.originalUrl && req.originalUrl !== '/' && (/\.woff$/.test(req.originalUrl) || /\.woff2$/.test(req.originalUrl))) {
    var woff = path.join(compiler.outputPath, req.originalUrl.substr(1));
    compiler.outputFileSystem.readFile(woff, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('Content-Type', 'application/font-woff');
      res.send(result);
      res.end();
    });
  } else if (req.originalUrl && req.originalUrl !== '/' && /\.png$/.test(req.originalUrl)) {
    var png = path.join(compiler.outputPath, req.originalUrl.substr(1));
    compiler.outputFileSystem.readFile(png, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('Content-Type', 'image/png');
      res.send(result);
      res.end();
    });
  }

  if (req.originalUrl && req.originalUrl !== '/' && !/\./.test(req.originalUrl)) {
    var filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('Content-Type', 'text/html');
      res.send(result);
      res.end();
    });
  }
});

app.listen(port, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', port);
  }
});
