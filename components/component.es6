import EventManager from 'lib/EventManager';
import ScreenManager from 'lib/ScreenManager';


export default class Component {

  constructor($parent = null) {
    this._$parent = $parent;
    this._$el = null;
    this.emitter = EventManager.getInstance().emitter;
    this.screen = ScreenManager.getInstance().screen;

    Object.defineProperty(this, '$el', { get() { return this._$el; } });
  }
}
