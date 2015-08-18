import {EventEmitter} from 'events';


export default class Component {

  constructor($parent = null) {
    this._$parent = $parent;
    this._$el = null;
    this._emitter = new EventEmitter();

    Object.defineProperty(this, '$el', { get() { return this._$el; } });
  }
}
