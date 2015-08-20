import EVENTS from 'consts/events';
import Dispatchers from 'dispatchers';
import EventManager from 'lib/event-manager';
import Store from 'stores/store';

import Maze from 'lib/maze';
import PlayerThing from 'lib/things/player';
import UpstairsThing from 'lib/things/upstairs';


function createDefaultThings() {
  return {
    player: null,
    upstairs: null
  };
}


export default class GameStore extends Store {

  constructor(...args) {
    super(...args);

    this._maze = null;
    this._things = createDefaultThings();

    Object.defineProperty(this, 'maze', { get() { return this._maze; } });

    let dispatchers = Dispatchers.getInstance();
    let {emitter} = EventManager.getInstance();
    let dispatchToken0 = dispatchers.register(({action}) => {
      switch (action.type) {
        case 'prepareGame':
          this.prepareMaze();
          emitter.emit(EVENTS.UPDATE_MAZE);
          break;
        case 'walkPlayer':
          this._maze.walkThing(this._things.player, action.direction);
          emitter.emit(EVENTS.UPDATE_MAZE);
          break;
      }
    });
    this.dispatchTokens.push(dispatchToken0);
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

  clearMaze() {
    this._maze = null;
    this._things = createDefaultThings();
  }

  isStarted() {
    return !!this._maze;
  }

  doesPlayerArriveGoal() {
    return this._maze.isArrivedGoal(this._things.player, this._things.upstairs);
  }
}
