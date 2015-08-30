process.env.NODE_ENV = 'cli';
process.env.NODE_PATH = __dirname + '/..';
require('module')._initPaths();
// Does not work `require('babel/register');` at installed globally.
// Ref) https://babeljs.io/docs/usage/require/
require('babel/register')({
  ignore: false,
  extensions: ['.es6']
});
