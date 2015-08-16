import blessed from 'blessed';

import Maze from 'lib/maze';
import PlayerThing from 'lib/things/player';
import UpstairsThing from 'lib/things/upstairs';


function createScreen() {
  let screen = blessed.screen();
  screen.title = 'Escape From The Maze';

  let maze = Maze.createByExtent([20, 10]);
  let player = new PlayerThing();
  let upstairs = new UpstairsThing();
  maze.addThing(player, [1, 1]);
  maze.addThing(upstairs, [
    maze.getHeight() - 2,
    maze.getWidth() - 2
  ]);

  let mazeBox = blessed.text({
    top: 'top',
    left: 'left',
    width: maze.getWidth(),
    height: maze.getHeight(),
    content: maze.toContent(),
    tags: true,
    style: {
      fg: 'white',
      //bg: 'magenta'
      bg: 'black'
    }
  });
  screen.append(mazeBox);

  let stateBarBox = blessed.text({
    top: maze.getHeight(),
    left: 'left',
    content: '[kjirou] 99:99.9999',
    tags: true,
    style: {
      fg: 'white',
      bg: 'black'
    }
  });
  screen.append(stateBarBox);

  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });

  screen.key(['up', 'w', 'k'], function(ch, key) {
    maze.walkThing(player, Maze.DIRECTIONS.UP);
    mazeBox.setContent(maze.toContent());
    screen.render();
  });

  screen.key(['right', 'd', 'l'], function(ch, key) {
    maze.walkThing(player, Maze.DIRECTIONS.RIGHT);
    mazeBox.setContent(maze.toContent());
    screen.render();
  });

  screen.key(['down', 's', 'j'], function(ch, key) {
    maze.walkThing(player, Maze.DIRECTIONS.DOWN);
    mazeBox.setContent(maze.toContent());
    screen.render();
  });

  screen.key(['left', 'a', 'h'], function(ch, key) {
    maze.walkThing(player, Maze.DIRECTIONS.LEFT);
    mazeBox.setContent(maze.toContent());
    screen.render();
  });

  return screen;
}


export var run = function run() {
  let screen = createScreen();
  screen.render();
};
