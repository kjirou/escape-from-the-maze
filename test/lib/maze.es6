import assert from 'power-assert';

import Maze from 'lib/maze';
import Thing from 'lib/things/thing';
import PlayerThing from 'lib/things/player';
import UpstairsThing from 'lib/things/upstairs';


describe('lib/maze', function() {

  it('extentToSize', function() {
    assert.strictEqual(Maze.extentToSize(1), 1 * 2 + 1);
    assert.strictEqual(Maze.extentToSize(5), 5 * 2 + 1);
  });

  it('createCells', function() {
    let cells = Maze.createCells([3, 3]);
    let actual = cells.map(function(rowCells) {
      return rowCells.map(function(cell) {
        return cell.toContent();
      }).join('');
    }).join('\n');
    assert.deepEqual(actual, '' +
      '   \n' +
      '   \n' +
      '   '
    );
  });

  it('getWidth, getHeight, getSize', function() {
    let maze = Maze.createByExtent([3, 2]);
    assert.strictEqual(maze.getWidth(), 7);
    assert.strictEqual(maze.getHeight(), 5);
    assert.strictEqual(maze.getSize()[0], 7);
    assert.strictEqual(maze.getSize()[1], 5);
  });

  it('getCell, getCellOrError', function() {
    let maze = Maze.createByExtent([1, 2]);
    assert.strictEqual(maze.getCell([0, 0]), maze._cells[0][0]);
    assert.strictEqual(maze.getCell([0, 1]), maze._cells[0][1]);

    assert.strictEqual(maze.getCell([99, 0]), null);
    assert.strictEqual(maze.getCell([0, 99]), null);

    assert.strictEqual(maze.getCellOrError([0, 0]), maze._cells[0][0]);
    assert.throws(function() {
      maze.getCellOrError([99, 0]);
    }, /Can not/);
  });

  it('validateThingMovement', function() {
    let maze = Maze.createByExtent([1, 3]);
    let player = new PlayerThing();
    maze.getCell([1, 1]).setThing(player);
    assert.strictEqual(maze.validateThingMovement(player, [1, 1], [2, 1]), true);
    assert.strictEqual(maze.validateThingMovement(player, [1, 1], [3, 1]), true);
    assert.strictEqual(maze.validateThingMovement(new Thing(), [1, 1], [3, 1]), false, 'The thing is not placed on the cell');
    assert.strictEqual(maze.validateThingMovement(player, [2, 1], [3, 1]), false, 'The player does not exist on the cell');
    assert.strictEqual(maze.validateThingMovement(player, [1, 1], [99, 1]), false);
    assert.strictEqual(maze.validateThingMovement(player, [1, 1], [2, 99]), false);
    assert.strictEqual(maze.validateThingMovement(player, [1, 1], [2, 0]), false, 'The destination is not passable');
  });

  it('moveThing', function() {
    let maze, player;

    maze = Maze.createByExtent([1, 3]);
    player = new PlayerThing();
    maze.addThing(player, [1, 1]);
    maze.moveThing(player, [1, 1], [2, 1]);
    assert.strictEqual(maze.getCell([1, 1]).getThing(), null);
    assert.strictEqual(maze.getCell([2, 1]).getThing(), player);
    maze.moveThing(player, [2, 1], [3, 1]);
    assert.strictEqual(maze.getCell([1, 1]).getThing(), null);
    assert.strictEqual(maze.getCell([2, 1]).getThing(), null);
    assert.strictEqual(maze.getCell([3, 1]).getThing(), player);

    maze = Maze.createByExtent([1, 3]);
    player = new PlayerThing();
    maze.getCell([1, 1]).setThing(player);
    assert.throws(function() {
      maze.moveThing(player, [2, 1], [3, 1]);
    });
    assert.throws(function() {
      maze.moveThing(player, [1, 1], [99, 1]);
    });
    assert.throws(function() {
      maze.moveThing(player, [1, 1], [0, 1]);
    });
  });

  it('walkThing', function() {
    let maze, player, upstairs;
    maze = new Maze();
    maze.includeMapText([
      '#####',
      '#   #',
      '#   #',
      '#####'
    ].join('\n'));
    player = new PlayerThing();
    upstairs = new UpstairsThing();
    maze.addThing(player, [1, 1]);
    maze.addThing(upstairs, [maze.getHeight() - 2, maze.getWidth() - 2]);
    maze.walkThing(player, Maze.DIRECTIONS.RIGHT);
    maze.walkThing(player, Maze.DIRECTIONS.DOWN);
    maze.walkThing(player, Maze.DIRECTIONS.RIGHT);
    assert.deepEqual(maze.getCell([2, 3]).getThings(), [upstairs, player]);

    maze.walkThing(player, Maze.DIRECTIONS.RIGHT);
    maze.walkThing(player, Maze.DIRECTIONS.DOWN);
    assert.deepEqual(maze.getCell([2, 3]).getThings(), [upstairs, player], 'Can not move to impassable cell');

    maze.walkThing(player, Maze.DIRECTIONS.LEFT);
    assert.strictEqual(maze.getCell([2, 2]).getThing(), player);

    maze.walkThing(player, Maze.DIRECTIONS.UP);
    assert.strictEqual(maze.getCell([1, 2]).getThing(), player);
  });

  it('areThingsOn, areThingsStayingTogether', function() {
    let maze = new Maze();
    maze.includeMapText([
      '#####',
      '#   #',
      '#   #',
      '#####'
    ].join('\n'));
    let things = Array.from({ length: 3 }).map(() => new Thing());
    maze.addThing(things[0], [1, 1]);
    maze.addThing(things[1], [1, 1]);
    maze.addThing(things[2], [1, 2]);
    assert.strictEqual(maze.areThingsOn([1, 1], [things[0], things[1]]), true);
    assert.strictEqual(maze.areThingsOn([1, 1], [things[0], things[2]]), false);
    assert.strictEqual(maze.areThingsStayingTogether([things[0], things[1]]), true);
    assert.strictEqual(maze.areThingsStayingTogether([things[0], things[2]]), false);
  });

  it('toContent', function() {
    let maze = Maze.createByExtent([1, 2]);
    maze.getCell([1, 1]).setThing(new PlayerThing());
    maze.getCell([
      maze.getHeight() - 2,
      maze.getWidth() - 2
    ]).setThing(new UpstairsThing());
    assert.strictEqual(maze.toContent(),
      '###\n' +
      '#{green-fg}@{/}#\n' +
      '# #\n' +
      '#{magenta-fg}<{/}#\n' +
      '###'
    );
  });
});
