'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _underscoreString = require('underscore.string');

var _underscoreString2 = _interopRequireDefault(_underscoreString);

var _libUtil = require('lib/util');

var counter = (0, _libUtil.createCounter)();

var Stage = {
  typeId: '_stage',
  sortOrder: 0,
  mazeCount: 1,
  timeLimit: 60000,
  bonusTimeThingCount: 5,
  penaltyTimeThingCount: 3,
  picksThingCount: 1,
  picksCount: 0,
  description: '----',
  getName: function getName() {
    return _underscoreString2['default'].titleize(_underscoreString2['default'].humanize(this.typeId));
  }
};

exports.Stage = Stage;
var SimpleStage = Object.assign({}, Stage, {
  typeId: 'simple',
  sortOrder: counter(),
  bonusTimeThingCount: 0,
  penaltyTimeThingCount: 0,
  picksThingCount: 0,
  description: 'Just run, no gimmick'
});

var EasyStage = Object.assign({}, Stage, {
  typeId: 'easy',
  sortOrder: counter(),
  picksCount: 1,
  timeLimit: 45000,
  description: 'Enable gimmicks'
});

var NormalStage = Object.assign({}, Stage, {
  typeId: 'normal',
  sortOrder: counter(),
  mazeCount: 2,
  timeLimit: 45000,
  picksCount: 1,
  description: 'Plural mazes continue'
});

var HardStage = Object.assign({}, Stage, {
  typeId: 'hard',
  sortOrder: counter(),
  mazeCount: 3,
  timeLimit: 45000,
  picksCount: 1,
  description: 'More difficult'
});

var LunaticStage = Object.assign({}, Stage, {
  typeId: 'lunatic',
  sortOrder: counter(),
  mazeCount: 5,
  timeLimit: 60000,
  picksCount: 2,
  description: 'For a person of leisure'
});

var stageList = [SimpleStage, EasyStage, NormalStage, HardStage, LunaticStage];
exports.stageList = stageList;
var stages = (0, _libUtil.dictionarize)(stageList, 'typeId');
exports.stages = stages;