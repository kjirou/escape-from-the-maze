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
    pageId: screenStore.pageId
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

    let APageComponent = PAGE_COMPONENTS[this.state.pageId];
    let pageProps = {
    };

    return (
      <box {...props} >
        <APageComponent {...pageProps} />
      </box>
    );
  }
}
