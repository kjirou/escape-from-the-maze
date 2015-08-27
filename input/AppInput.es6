import Rx from 'rx';

import {onKeypress, onKeypressError} from 'input/subscriptions/keypress';
import {onTimer, onTimerError} from 'input/subscriptions/timer';
import ScreenManager from 'lib/ScreenManager';
import SingletonMixin from 'lib/mixins/SingletonMixin';
import {calculateMillisecondsPerFrame} from 'lib/util';


export default class AppInput {

  constructor() {
    let {screen} = ScreenManager.getInstance();

    let pauser = new Rx.Subject();

    let timerSource = Rx.Observable
      .timer(0, calculateMillisecondsPerFrame())
      .timeInterval()
      .map((data) => {
        pauser.onNext(true);
        return data;
      })
    ;

    let wrappedHandler;
    let keypressSource = Rx.Observable
      .fromEventPattern(
        (handler) => {
          wrappedHandler = function(chr, key) {
            if (!key) {
              key = {
                name: chr,
                ctrl: false
              };
            }
            handler(key);
          };
          screen.addListener('keypress', wrappedHandler);
        },
        () => {
          screen.removeListener('keypress', wrappedHandler);
        }
      )
      .pausable(pauser)
      .filter(function() {
        var isStopped = pauser.isStopped;
        pauser.onNext(false);
        return !isStopped;
      })
    ;

    this._timerSubscription = timerSource.subscribe(
      onTimer,
      onTimerError
    );
    this._keypressSubscription = keypressSource.subscribe(
      onKeypress,
      onKeypressError
    );
  }

  _destructor() {
    this._timerSubscription.dispose();
    this._keypressSubscription.dispose();
  }
}

Object.assign(AppInput, SingletonMixin);

AppInput._destructInstance = function _destructInstance() {
  if (this._instance) {
    this._instance._destructor();
  }
};
