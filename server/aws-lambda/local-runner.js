#!/usr/bin/env node

global.ESCAPE_FROM_THE_MAZE_AWS_LAMBDA_DEBUG = true;

var awsLambda = require('./index');


var eventMock;
if (0) {
  eventMock = {
    api_mode: 'ADD_GAME_RESULT',
    name: 'Testuser',
    stage: 'simple',
    score: ~~(Math.random() * 50000)
  };
} else {
  eventMock = {
    api_mode: 'GET_RANKING'
  };
}

var contextMock = {
  done: function done(err, response) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(response);
    process.exit(0);
  }
};


awsLambda.handler(eventMock, contextMock);
