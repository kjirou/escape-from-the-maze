process.env.NODE_ENV = 'production';
process.env.NODE_PATH = [
  // At first, look for the transpiled code
  __dirname + '/../dist',
  //__dirname + '/..'
].join(':');
require('module')._initPaths();
require("babel/polyfill");
// Does not work `require('babel/register');` at installed globally.
// Ref) https://babeljs.io/docs/usage/require/
//require('babel/register')({
//  ignore: false,
//  extensions: ['.es6']
//});
