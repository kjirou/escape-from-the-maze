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

var START_TIME = (new Date()).getTime();
var API_MODES = [
  'ADD_GAME_RESULT',
  'GET_RANKING'
];
var STAGE_TYPE_IDS = [
  'simple',
  'easy',
  'normal',
  'hard',
  'lunatic'
];

function isWithinMonth(timestamp) {
  var monthTime = 86400 * 30 * 1000;
  return timestamp >= START_TIME - monthTime;
}


exports.handler = function(event, context) {

  //
  // Arrange and validate inputs
  //

  var apiMode = event.api_mode;
  var playerName = event.name;
  var stageTypeId = event.stage;
  var score = ~~(event.score);

  if (API_MODES.indexOf(apiMode) === -1) {
    return context.done(null, apiMode + ' is invalid api_mode');
  }

  if (apiMode === 'ADD_GAME_RESULT') {

    if (!playerName) {
      return context.done(null, 'name is blank');
    }

    if (STAGE_TYPE_IDS.indexOf(stageTypeId) === -1) {
      return context.done(null, stageTypeId + ' is invalid stage');
    }

    if (score < 1) {
      return context.done(null, score + ' is invalid score');
    }
  }


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

    function readGameResults(next) {
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

    function addGameResult(next) {
      if (apiMode !== 'ADD_GAME_RESULT') {
        return next();
      }

      gameResults.push({
        created_at: (new Date()).getTime(),
        name: playerName.slice(0, 16),
        score: score,
        stage: stageTypeId
      });

      var params = {
        Bucket: BUCKET_NAME,
        Key: GAME_RESULTS_BUCKET_KEY,
        Body: JSON.stringify(gameResults)
      };
      s3.upload(params, function(err, data) {
        if (err) {
          return next(err);
        }
        next();
      });
    },

    function filterGameResults(next) {
      gameResults = gameResults.filter(function(v) {
        return isWithinMonth(v.created_at);
      });
      next();
    }

  ], function(err) {

    if (err) {
      console.error(err);
      return;
    }
    context.done(null, JSON.stringify(gameResults));
  });
};
