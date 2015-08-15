var blessed = require('blessed');

var Maze = require('lib/maze');
var PlayerThing = require('lib/things/player');
var UpstairsThing = require('lib/things/upstairs');


var createScreen = function createScreen() {
  var screen = blessed.screen();
  screen.title = 'Escape From The Maze';

  var maze = Maze.createByExtent([20, 10]);
  var player = new PlayerThing();
  var upstairs = new UpstairsThing();
  maze.addThing(player, [1, 1]);
  maze.addThing(upstairs, [
    maze.getHeight() - 2,
    maze.getWidth() - 2
  ]);

  var mazeBox = blessed.text({
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

  var stateBarBox = blessed.text({
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
};



//
//// Create a box perfectly centered horizontally and vertically.
//var box = blessed.box({
//  top: 'center',
//  left: 'center',
//  width: '50%',
//  height: '50%',
//  content: 'Hello {bold}world{/bold}!',
//  tags: true,
//  border: {
//    type: 'line'
//  },
//  style: {
//    fg: 'white',
//    bg: 'magenta',
//    border: {
//      fg: '#f0f0f0'
//    },
//    hover: {
//      bg: 'green'
//    }
//  }
//});
//
//// Append our box to the screen.
//screen.append(box);
//
////// Add a png icon to the box
////var icon = blessed.image({
////  parent: box,
////  top: 0,
////  left: 0,
////  type: 'overlay',
////  width: 'shrink',
////  height: 'shrink',
////  file: __dirname + '/my-program-icon.png',
////  search: false
////});
//
//// If our box is clicked, change the content.
//box.on('click', function(data) {
//  box.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');
//  screen.render();
//});
//
//// If box is focused, handle `enter`/`return` and give us some more content.
//box.key('enter', function(ch, key) {
//  box.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
//  box.setLine(1, 'bar');
//  box.insertLine(1, 'foo');
//  screen.render();
//});
//
//// Focus our element.
//box.focus();
//
//// Render the screen.
//screen.render();


exports.run = function() {
  var screen = createScreen();
  screen.render();
};
