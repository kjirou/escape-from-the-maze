process.env.NODE_ENV = 'test';
process.env.NODE_PATH = __dirname + '/..';
require('module')._initPaths();
require('babel/register');

var conf = require('conf');
conf.ignoreScreenOutput = true;
