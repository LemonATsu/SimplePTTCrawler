const express = require('express'),
      app     = express(),
      port    = process.env.PORT || 3000,
      mongodb = require('mongodb'),
      engines    = require('consolidate'),
      mongoose = require('mongoose');

app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.set('views', __dirname + '/template');

mongoose.connect('mongodb://localhost/test_node');
module.exports = app;


require('./model/Content');

require('./model/Article');
require('./route')(app);
require('./crawler');


app.listen(port);

