import {EventEmitter} from 'events';

import SingletonMixin from 'lib/mixins/singleton';


export default class EventManager {

  constructor() {

    this._emitter = new EventEmitter();

    Object.defineProperty(this, 'emitter', { get() { return this._emitter; } });
  }
}

Object.assign(EventManager, SingletonMixin);
