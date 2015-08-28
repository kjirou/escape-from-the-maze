import Screen from 'components/Screen';
import conf from 'conf';
import AppDispatcher from 'dispatcher/AppDispatcher';
import AppInput from 'input/AppInput';
import EventManager from 'lib/EventManager';
import SingletonMixin from 'lib/mixins/SingletonMixin';
import GameStore from 'stores/GameStore';
import ScreenStore from 'stores/ScreenStore';


export default class App {

  /*
   * Initialize unique instances in consideration of the order
   */
  static initializeInstances() {
    [
      () => EventManager.getInstance(),
      () => AppDispatcher.getInstance(),
      () => GameStore.getInstance(),
      () => ScreenStore.getInstance(),
      () => AppInput.getInstance()
    ].forEach(task => task());
  }

  static purgeInstances() {
    [
      () => AppInput.clearInstance(),
      () => Screen.clearInstance(),
      () => ScreenStore.clearInstance(),
      () => GameStore.clearInstance(),
      () => AppDispatcher.clearInstance(),
      () => EventManager.clearInstance()
    ].forEach(task => task());
  }

  constructor() {
    this.constructor.initializeInstances();
  }

  run() {
    let screen = Screen.getInstance({ componentMode: conf.componentMode });
    screen.render();
  }
}

Object.assign(App, SingletonMixin);
