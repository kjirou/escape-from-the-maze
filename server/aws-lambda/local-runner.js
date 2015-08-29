#!/usr/bin/env node

var awsLambda = require('./index');


var eventMock = {
};

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
