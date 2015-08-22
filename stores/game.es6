import {ACTIONS, EVENTS} from 'consts';
import Dispatchers from 'dispatchers';
import EventManager from 'lib/event-manager';
import Store from 'stores/store';

import Maze from 'lib/maze';
import PlayerThing from 'lib/things/player';
import UpstairsThing from 'lib/things/upstairs';
import {calculateMillisecondsPerFrame} from 'lib/util';


function createDefaultThings() {
  return {
    player: null,
    upstairs: null
  };
}


export default class GameStore extends Store {

  constructor(...args) {
    super(...args);

    Object.assign(this, {
      _maze: undefined,
      _gameTime: undefined,
      _timeLimit: undefined,
      _hasBeenVictory: undefined,
      _hasBeenDefeat: undefined,
      _things: undefined
    });
    this._reset();

    Object.defineProperty(this, 'maze', { get() { return this._maze; } });
    Object.defineProperty(this, 'gameTime', { get() { return this._gameTime; } });
    Object.defineProperty(this, 'hasBeenVictory', { get() { return this._hasBeenVictory; } });
    Object.defineProperty(this, 'hasBeenDefeat', { get() { return this._hasBeenDefeat; } });

    let dispatchers = Dispatchers.getInstance();
    let {emitter} = EventManager.getInstance();
    this._dispatchToken = dispatchers.register(({action}) => {
      switch (action.type) {
        case ACTIONS.FORWARD_GAME_TIME_BY_FRAME:
          this._gameTime += calculateMillisecondsPerFrame();
          emitter.emit(EVENTS.UPDATE_GAME_TIME);
          break;
        case ACTIONS.PREPARE_GAME:
          this._prepare();
          emitter.emit(EVENTS.UPDATE_MAZE);
          break;
        case ACTIONS.RESET_GAME:
          this._reset();
          emitter.emit(EVENTS.UPDATE_MAZE);
          break;
        case ACTIONS.SAVE_DEFEAT:
          this._hasBeenDefeat = true;
          emitter.emit(EVENTS.UPDATE_MAZE);
          break;
        case ACTIONS.SAVE_VICTORY:
          this._hasBeenVictory = true;
          emitter.emit(EVENTS.UPDATE_MAZE);
          break;
        case ACTIONS.WALK_PLAYER:
          this._maze.walkThing(this._things.player, action.direction);
          emitter.emit(EVENTS.UPDATE_MAZE);
          break;
      }
    });
  }

  _reset() {
    this._maze = null;
    this._timeLimit = 60000;
    this._gameTime = 0;  // int, ms
    this._hasBeenVictory = false;
    this._hasBeenDefeat = false;
    this._things = createDefaultThings();
  }

  _prepare() {
    let maze = Maze.createByExtent([20, 10]);
    let playerThing = new PlayerThing();
    let upstairsThing = new UpstairsThing();
    maze.addThing(playerThing, [1, 1]);
    maze.addThing(upstairsThing, [
      maze.getHeight() - 2,
      maze.getWidth() - 2
    ]);
    this._maze = maze;
    this._things.player = playerThing;
    this._things.upstairs = upstairsThing;
  }

  //
  // Game Lifecycle
  //
  //                1 2 3 4 5
  // -------------------------
  // isStarted      F T T T F
  // didPlayerGet~  F F T F F
  // hasBeen~       F F F T F
  // -------------------------
  //
  // (1) = Did not prepare/start game
  // (2) = Playing the game
  // (3) = Player got a victory/defeat, but flow does not pass in fps-event
  // (4) = Saved a result to _hasBeenVictory/_hasBeenDefeat
  // (5) = Destroyed the game instance
  //
  // Notice:
  // - (3) can handle more than once in the fps-event,
  //     however, it can not be expected at all otherwise!
  //   In other words, it can not be used in the view.
  //

  isStarted() {
    return !!this._maze;
  }

  _doesPlayerArriveGoal() {
    return this.isStarted() && this._maze.areThingsStayingTogether([this._things.player, this._things.upstairs]);
  }

  didPlayerGetVictoryJustNow() {
    return !this._hasBeenVictory && this._doesPlayerArriveGoal();
  }

  _isTimeLimitExceeded() {
    return this.isStarted() && this._gameTime > this._timeLimit;
  }

  didPlayerGetDefeatJustNow() {
    return !this._hasBeenDefeat && this._isTimeLimitExceeded();
  }

  isDecided() {
    return this._hasBeenVictory || this._hasBeenDefeat;
  }

  isPlaying() {
    return this.isStarted() && !this.isDecided();
  }
}
