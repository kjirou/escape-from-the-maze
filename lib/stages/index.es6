import _s from 'underscore.string';

import {dictionarize} from 'lib/util';


export class Stage {

  constructor() {
    throw new Error('Should not create a instance');
  }

  static getName() {
    return _s.titleize(_s.humanize(this.typeId));
  }
}
Object.assign(Stage, {
  typeId: '_stage',
  mazeCount: 1,
  timeLimit: 60000,
  picksCount: 0,
  description: '----'
});


export class SimpleStage extends Stage {
}
Object.assign(SimpleStage, {
  typeId: 'simple',
  description: 'Just run, no gimmick'
});

export class EasyStage extends Stage {
}
Object.assign(EasyStage, {
  typeId: 'easy',
  picksCount: 1,
  description: 'Enable gimmicks'
});

export class NormalStage extends Stage {
}
Object.assign(NormalStage, {
  typeId: 'normal',
  mazeCount: 2,
  timeLimit: 90000,
  picksCount: 2,
  description: 'Plural mazes continue'
});

export class HardStage extends Stage {
}
Object.assign(HardStage, {
  typeId: 'hard',
  mazeCount: 3,
  timeLimit: 90000,
  picksCount: 3,
  description: 'More difficult'
});

export class LunaticStage extends Stage {
}
Object.assign(LunaticStage, {
  typeId: 'lunatic',
  mazeCount: 5,
  timeLimit: 90000,
  picksCount: 3,
  description: 'For a person of leisure'
});


export var stageList = [
  SimpleStage,
  EasyStage,
  NormalStage,
  HardStage,
  LunaticStage
];
export var stages = dictionarize(stageList, 'typeId');
