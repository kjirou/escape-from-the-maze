import blessed from 'blessed';

import PageComponent from 'components/pages/page';
import Maze from 'lib/maze';
import ScreenManager from 'lib/screen-manager';
import PlayerThing from 'lib/things/player';
import UpstairsThing from 'lib/things/upstairs';


class GamePageComponent extends PageComponent {

  constructor(...args) {
    super(...args);

    let maze = Maze.createByExtent([20, 10]);
    let player = new PlayerThing();
    let upstairs = new UpstairsThing();
    maze.addThing(player, [1, 1]);
    maze.addThing(upstairs, [
      maze.getHeight() - 2,
      maze.getWidth() - 2
    ]);

    this._mazeBox = blessed.box({
      parent: this._$el,
      top: 'top',
      left: 'left',
      width: '100%',
      height: 21,
      tags: true,
      style: {
        fg: 'white',
        bg: 'black'
      },
      content: maze.toContent()
    });

    this._stateBarBox = blessed.box({
      parent: this._$el,
      top: this._mazeBox.height,
      left: 'left',
      width: '100%',
      height: 1,
      tags: true,
      style: {
        fg: 'white',
        bg: 'black'
      },
      content: '99:99:99.9999'
    });

    let {screen} = ScreenManager.getInstance();

    this._$el.key(['up', 'w', 'k'], (ch, key) => {
      maze.walkThing(player, Maze.DIRECTIONS.UP);
      this._mazeBox.setContent(maze.toContent());
      screen.render();
    });

    this._$el.key(['right', 'd', 'l'], (ch, key) => {
      maze.walkThing(player, Maze.DIRECTIONS.RIGHT);
      this._mazeBox.setContent(maze.toContent());
      screen.render();
    });

    this._$el.key(['down', 's', 'j'], (ch, key) => {
      maze.walkThing(player, Maze.DIRECTIONS.DOWN);
      this._mazeBox.setContent(maze.toContent());
      screen.render();
    });

    this._$el.key(['left', 'a', 'h'], (ch, key) => {
      maze.walkThing(player, Maze.DIRECTIONS.LEFT);
      this._mazeBox.setContent(maze.toContent());
      screen.render();
    });
  }
}


export default GamePageComponent;
