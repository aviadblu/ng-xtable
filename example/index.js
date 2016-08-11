var express = require('express');
var path = require('path');
var morgan = require('morgan');
var app = express();
app.use(morgan('dev'));

var port = process.env.PORT || 3000;

var uiFolder = path.resolve(__dirname, './public');
var uiIndex = path.resolve(uiFolder, 'index.html');

// server static files
app.use(express.static(uiFolder));

// serve all UI url's
app.get('/*', function (req, res) {
    res.sendFile(uiIndex);
});

app.listen(port);
console.log('API server listening on ' + port);