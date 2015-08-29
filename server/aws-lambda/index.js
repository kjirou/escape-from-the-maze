// arn:aws:lambda:ap-northeast-1:227307664587:function:serveEscapeFromTheMazeAPI

var async = require('async');
var AWS = require('aws-sdk');
var _ = require('lodash');

var awsConfig = require('./aws-config.json');


var AWS_ENDPOINT = 's3-us-west-1.amazonaws.com';
var BUCKET_NAME = 'escape-from-the-maze';
var GAME_RESULTS_BUCKET_KEY = 'game-results.json';
if (global.ESCAPE_FROM_THE_MAZE_AWS_LAMBDA_DEBUG || process.env.ESCAPE_FROM_THE_MAZE_AWS_LAMBDA_DEBUG) {
  GAME_RESULTS_BUCKET_KEY = 'game-results-for-local-test.json';
}


exports.handler = function(event, context) {

  // Must configure the endpoint.
  // Occured the following error at running AWS Lambda (but, not occured in local).
  // ----
  // PermanentRedirect: The bucket you are attempting to access must be addressed using the specified endpoint.
  // Please send all future requests to this endpoint.
  // ----
  var endpoint = new AWS.Endpoint(AWS_ENDPOINT);
  var s3 = new AWS.S3(_.assign({}, awsConfig, {
    endpoint: endpoint
  }));

  var gameResults;

  async.series([

    function readData(next) {
      var params = {
        Bucket: BUCKET_NAME,
        Key: GAME_RESULTS_BUCKET_KEY
      };
      s3.getObject(params, function(err, data) {
        if (err) {
          return next(err);
        }
        gameResults = JSON.parse(data.Body.toString());
        next();
      });
    },

    function readData(next) {
      console.log('Game Results:', gameResults);
      next();
    }

  ], function(err) {

    if (err) {
      console.error(err);
      return;
    }
    context.done(null, 'Finish');
  });
};

//    console.log('Received event:', JSON.stringify(event, null, 2));
//    //console.log('value1 =', event.key1);
//    //console.log('value2 =', event.key2);
//    //console.log('value3 =', event.key3);
//    //context.succeed(event.key1);  // Echo back the first key value
//    //context.done(null, { message: 'Hello, world: ' + event.foo });
//    context.done(null, { message: 'Received event data is :' + JSON.stringify(event, null, 2) });
//    // context.fail('Something went wrong');


//
// aws-sdk:
//   http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-intro.html
// Config:
//   http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html
// S3 example:
//   http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-examples.html
// S3 APIs:
//   http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html
//
/*
var async = require('async');
var AWS = require('aws-sdk');

var awsConfig = require('./aws-config.json');


var s3 = new AWS.S3(awsConfig);

var uploadRoot = 'nodejs-codes/examples/aws-sdk/s3';

async.series([

  // バケット一覧取得
  function(next) {
    s3.listBuckets(function(err, data) {
      if (err) {
        return next(err);
      }
      console.log(data);
      next();
    });
  },

  // ファイル新規作成 or 上書き
  function(next) {
    var params = {
      Bucket: 'kjirou-sandbox',
      Key: uploadRoot + '/now.txt',
      Body: '!!' + (new Date()).toString() + '!!'
    };
    s3.upload(params, function(err, data) {
      if (err) {
        return next(err);
      }
      console.log(data);
      next();
    });
  },

  // ファイル読み出し
  function(next) {
    var params = {
      Bucket: 'kjirou-sandbox',
      Key: uploadRoot + '/now.txt'
    };
    s3.getObject(params, function(err, data) {
      if (err) {
        return next(err);
      }
      console.log(data);
      console.log(data.Body.toString());
      next();
    });
  }
], function(err) {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Finish');
});
*/
