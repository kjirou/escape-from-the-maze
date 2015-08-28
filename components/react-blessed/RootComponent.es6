import _ from 'lodash';
import React, {Component} from 'react';

import GamePageComponent from './pages/GamePageComponent';
import WelcomePageComponent from './pages/WelcomePageComponent';
import {EVENTS} from 'consts';
import EventManager from 'lib/EventManager';
import GameStore from 'stores/GameStore';
import ScreenStore from 'stores/ScreenStore';


const PAGE_COMPONENTS = {
  game: GamePageComponent,
  welcome: WelcomePageComponent
};

function getStateFromStores() {
  let screenStore = ScreenStore.getInstance();
  let gameStore = GameStore.getInstance();
  return {
    hasBeenDefeat: gameStore.hasBeenDefeat,
    hasBeenVictory: gameStore.hasBeenVictory,
    gameTime: gameStore.gameTime,
    isAssumedPicksMode: gameStore.isAssumedPicksMode,
    mazeContent: gameStore.isStarted() ? gameStore.maze.toContent() : '',
    mazeCount: gameStore.getMazeCount(),
    pageId: screenStore.pageId,
    picksCount: gameStore.picksCount,
    score: gameStore.gameResult ? gameStore.gameResult.calculateScore() : 0,
    runningMazeCount: gameStore.runningMazeCount,
    timeLimit: gameStore.timeLimit
  };
}

function getInitialState() {
  return getStateFromStores();
}


export default class RootComponent extends Component {

  constructor(props) {
    super(props);

    this.state = getInitialState();

    let {emitter} = EventManager.getInstance();
    emitter.on(EVENTS.CHANGE_PAGE, () => {
      this.setState(getStateFromStores());
    });
    emitter.on(EVENTS.UPDATE_MAZE, () => {
      this.setState(getStateFromStores());
    })
    emitter.on(EVENTS.UPDATE_GAME_STATUS, () => {
      this.setState(getStateFromStores());
    });
  }

  render() {
    let props = {
      top: 'top',
      left: 'left',
      width: 41,
      height: 22,
      style: {
        fg: 'white',
        bg: 'blue'
      }
    };

    let ActivePageComponent = PAGE_COMPONENTS[this.state.pageId];
    let pageProps = {};
    Object.assign(pageProps, this.state);

    return (
      <box {...props} >
        <ActivePageComponent {...pageProps} />
      </box>
    );
  }
}
