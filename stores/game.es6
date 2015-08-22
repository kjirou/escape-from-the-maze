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

    let dispatchers = Dispatchers.getInstance();
    let {emitter} = EventManager.getInstance();
    let dispatchToken0 = dispatchers.register(({action}) => {
      switch (action.type) {
        case ACTIONS.RESET_GAME:
          this._reset();
          emitter.emit(EVENTS.UPDATE_MAZE);
          break;
        case ACTIONS.FORWARD_GAME_TIME_BY_FRAME:
          this._gameTime += calculateMillisecondsPerFrame();
          emitter.emit(EVENTS.UPDATE_GAME_TIME);
          break;
        case ACTIONS.PREPARE_GAME:
          this.prepareMaze();
          emitter.emit(EVENTS.UPDATE_MAZE);
          break;
        case ACTIONS.WALK_PLAYER:
          this._maze.walkThing(this._things.player, action.direction);
          emitter.emit(EVENTS.UPDATE_MAZE);
          break;
      }
    });
    this.dispatchTokens.push(dispatchToken0);
  }

  _reset() {
    this._maze = null;
    this._timeLimit = 60000;
    this._gameTime = 0;  // int, ms
    this._hasBeenVictory = false;
    this._hasBeenDefeat = false;
    this._things = createDefaultThings();
  }

  prepareMaze() {
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

  isStarted() {
    return !!this._maze;
  }

  doesPlayerArriveGoal() {
    return this._maze.areThingsStayingTogether([this._things.player, this._things.upstairs]);
  }

  hasPlayerBeenVictory() {
    return this._hasBeenVictory || this.doesPlayerArriveGoal();
  }

  _isTimeLimitExceeded() {
    return this._gameTime > this._timeLimit;
  }

  hasPlayerBeenDefeat() {
    return this._hasBeenDefeat || this._isTimeLimitExceeded();
  }

  isDecided() {
    return this.hasPlayerBeenVictory() || this.hasPlayerBeenDefeat();
  }

  isPlaying() {
    return this.isStarted() && !this.isDecided();
  }

  //isFinished() {
  //  return this.hasPlayerBeenVictory() || this.hasPlayerBeenDefeat();
  //}

  //hadPlayerBeenArriveGoal() {
  //  return this._maze.isArrivedGoal || this.doesPlayerArriveGoal();
  //}

  //didPlayerLose() {
  //  return !this.hadPlayerBeenArriveGoal() && this._isTimeLimitExceeded();
  //}
}
