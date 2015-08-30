import _s from 'underscore.string';

import {createCounter, dictionarize} from 'lib/util';

let counter = createCounter();


export const Stage = {
  typeId: '_stage',
  sortOrder: 0,
  mazeCount: 1,
  timeLimit: 60000,
  bonusTimeThingCount: 5,
  penaltyTimeThingCount: 3,
  picksThingCount: 1,
  picksCount: 0,
  description: '----',
  getName() {
    return _s.titleize(_s.humanize(this.typeId));
  }
};


const SimpleStage = Object.assign({}, Stage, {
  typeId: 'simple',
  sortOrder: counter(),
  bonusTimeThingCount: 0,
  penaltyTimeThingCount: 0,
  picksThingCount: 0,
  description: 'Just run, no gimmick'
});

const EasyStage = Object.assign({}, Stage, {
  typeId: 'easy',
  sortOrder: counter(),
  picksCount: 1,
  timeLimit: 45000,
  description: 'Enable gimmicks'
});

const NormalStage = Object.assign({}, Stage, {
  typeId: 'normal',
  sortOrder: counter(),
  mazeCount: 2,
  timeLimit: 45000,
  picksCount: 1,
  description: 'Plural mazes continue'
});

const HardStage = Object.assign({}, Stage, {
  typeId: 'hard',
  sortOrder: counter(),
  mazeCount: 3,
  timeLimit: 45000,
  picksCount: 1,
  description: 'More difficult'
});

const LunaticStage = Object.assign({}, Stage, {
  typeId: 'lunatic',
  sortOrder: counter(),
  mazeCount: 5,
  timeLimit: 60000,
  picksCount: 2,
  description: 'For a person of leisure'
});


export const stageList = [
  SimpleStage,
  EasyStage,
  NormalStage,
  HardStage,
  LunaticStage
];
export const stages = dictionarize(stageList, 'typeId');
