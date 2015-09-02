'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.createCounter = createCounter;
exports.calculateMillisecondsPerFrame = calculateMillisecondsPerFrame;
exports.dictionarize = dictionarize;
exports.createHelpText = createHelpText;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _conf = require('conf');

var _conf2 = _interopRequireDefault(_conf);

function createCounter() {
  var start = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

  start -= 1;
  return function () {
    return start += 1;
  };
}

function calculateMillisecondsPerFrame() {
  return ~ ~(1000 / _conf2['default'].fps);
}

/*
 * Convert from list<object> to dict by property-name
 *
 * @param {string} propertyName
 * @return {Object}
 */

function dictionarize(list, propertyName) {
  var dict = {};
  list.forEach(function (v) {
    return dict[v[propertyName]] = v;
  });
  return dict;
}

function createHelpText() {
  var playerSymbol = _chalk2['default'].magenta.bgBlack('@');
  var wallSymbol = _chalk2['default'].white.bgBlack('#');
  var pickaxeSymbol = _chalk2['default'].yellow.bgBlack('T');
  var bonusTime5Symbol = _chalk2['default'].green.bgBlack('5');
  var penaltyTime3Symbol = _chalk2['default'].red.bgBlack('3');

  var lines = ['# Escape From The Maze - Help', '', '## Operation of player', '- You can move the player(' + playerSymbol + ') by [w][a][s][d], [h][j][k][l] or [arrow keys].', '- If you move after you press the [space], you can break the wall(' + wallSymbol + ') to consume one pickaxe.', '', '## Victory or defat, and score', '- It is a victory if escape the maze within the time limit.', '- The number of maze is different for each stage.', '- If you win, the remaining milliseconds will be the score.', '', '## Treasures', '- "' + pickaxeSymbol + '" You get a extra pickaxe.', '- "' + bonusTime5Symbol + '" Time limit is increased 5 seconds.', '- "' + penaltyTime3Symbol + '" Time limit is reduced 3 seconds.', '', '## Others', '- You can look ranking by `escape-from-the-maze --ranking`.'];
  return lines.join('\n');
}