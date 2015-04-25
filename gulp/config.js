var path = require('path');


var root = exports.root = path.resolve(__dirname, '..');

var src       = exports.src       = path.join(root, 'src');
var srcPublic = exports.srcPublic = path.join(src, 'public');
var srcApp    = exports.srcApp    = path.join(src, 'app');
var srcViews  = exports.srcViews  = path.join(srcApp, 'views');

var dest       = exports.dest       = path.join(root, 'dest');
var destBin    = exports.destBin    = path.join(dest, 'bin');
var destPublic = exports.destPublic = path.join(dest, 'public');
var destApp    = exports.destApp    = path.join(dest, 'app');
var destViews  = exports.destViews  = path.join(destApp, 'views');

var seeds = exports.seeds = path.join(src, 'config/mongodb/data/users.json');
