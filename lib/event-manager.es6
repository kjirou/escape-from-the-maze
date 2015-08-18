import blessed from 'blessed';
import {EventEmitter} from 'events';
import _ from 'lodash';

import SingletonMixin from 'lib/mixins/singleton';


export default class EventManager {

  constructor() {

    this._emitter = new EventEmitter();

    Object.defineProperty(this, 'emitter', { get() { return this._emitter; } });
  }
}

_.assign(EventManager, SingletonMixin);
