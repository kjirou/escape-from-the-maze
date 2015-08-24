import assert from 'power-assert';

import MazeModel from 'models/MazeModel';
import ThingModel from 'models/things/ThingModel';
import PlayerThingModel from 'models/things/PlayerThingModel';
import UpstairsThingModel from 'models/things/UpstairsThingModel';


describe(__filename, function() {

  it('extentToSize', function() {
    assert.strictEqual(MazeModel.extentToSize(1), 1 * 2 + 1);
    assert.strictEqual(MazeModel.extentToSize(5), 5 * 2 + 1);
  });

  it('createCells', function() {
    let cells = MazeModel.createCells([3, 3]);
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
    let maze = MazeModel.createByExtent([3, 2]);
    assert.strictEqual(maze.getWidth(), 7);
    assert.strictEqual(maze.getHeight(), 5);
    assert.strictEqual(maze.getSize()[0], 7);
    assert.strictEqual(maze.getSize()[1], 5);
  });

  it('getCell, getCellOrError', function() {
    let maze = MazeModel.createByExtent([1, 2]);
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
    let maze = MazeModel.createByExtent([1, 3]);
    let player = new PlayerThingModel();
    maze.getCell([1, 1]).setThing(player);
    assert.strictEqual(maze.validateThingMovement(player, [1, 1], [2, 1]), true);
    assert.strictEqual(maze.validateThingMovement(player, [1, 1], [3, 1]), true);
    assert.strictEqual(maze.validateThingMovement(new ThingModel(), [1, 1], [3, 1]), false, 'The thing is not placed on the cell');
    assert.strictEqual(maze.validateThingMovement(player, [2, 1], [3, 1]), false, 'The player does not exist on the cell');
    assert.strictEqual(maze.validateThingMovement(player, [1, 1], [99, 1]), false);
    assert.strictEqual(maze.validateThingMovement(player, [1, 1], [2, 99]), false);
    assert.strictEqual(maze.validateThingMovement(player, [1, 1], [2, 0]), false, 'The destination is not passable');
  });

  it('moveThing', function() {
    let maze, player;

    maze = MazeModel.createByExtent([1, 3]);
    player = new PlayerThingModel();
    maze.addThing(player, [1, 1]);
    maze.moveThing(player, [1, 1], [2, 1]);
    assert.strictEqual(maze.getCell([1, 1]).getThing(), null);
    assert.strictEqual(maze.getCell([2, 1]).getThing(), player);
    maze.moveThing(player, [2, 1], [3, 1]);
    assert.strictEqual(maze.getCell([1, 1]).getThing(), null);
    assert.strictEqual(maze.getCell([2, 1]).getThing(), null);
    assert.strictEqual(maze.getCell([3, 1]).getThing(), player);

    maze = MazeModel.createByExtent([1, 3]);
    player = new PlayerThingModel();
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
    maze = new MazeModel();
    maze.includeMapText([
      '#####',
      '#   #',
      '#   #',
      '#####'
    ].join('\n'));
    player = new PlayerThingModel();
    upstairs = new UpstairsThingModel();
    maze.addThing(player, [1, 1]);
    maze.addThing(upstairs, [maze.getHeight() - 2, maze.getWidth() - 2]);
    maze.walkThing(player, MazeModel.DIRECTIONS.RIGHT);
    maze.walkThing(player, MazeModel.DIRECTIONS.DOWN);
    maze.walkThing(player, MazeModel.DIRECTIONS.RIGHT);
    assert.deepEqual(maze.getCell([2, 3]).getThings(), [upstairs, player]);

    maze.walkThing(player, MazeModel.DIRECTIONS.RIGHT);
    maze.walkThing(player, MazeModel.DIRECTIONS.DOWN);
    assert.deepEqual(maze.getCell([2, 3]).getThings(), [upstairs, player], 'Can not move to impassable cell');

    maze.walkThing(player, MazeModel.DIRECTIONS.LEFT);
    assert.strictEqual(maze.getCell([2, 2]).getThing(), player);

    maze.walkThing(player, MazeModel.DIRECTIONS.UP);
    assert.strictEqual(maze.getCell([1, 2]).getThing(), player);
  });

  it('areThingsOn, areThingsStayingTogether', function() {
    let maze = new MazeModel();
    maze.includeMapText([
      '#####',
      '#   #',
      '#   #',
      '#####'
    ].join('\n'));
    let things = Array.from({ length: 3 }).map(() => new ThingModel());
    maze.addThing(things[0], [1, 1]);
    maze.addThing(things[1], [1, 1]);
    maze.addThing(things[2], [1, 2]);
    assert.strictEqual(maze.areThingsOn([1, 1], [things[0], things[1]]), true);
    assert.strictEqual(maze.areThingsOn([1, 1], [things[0], things[2]]), false);
    assert.strictEqual(maze.areThingsStayingTogether([things[0], things[1]]), true);
    assert.strictEqual(maze.areThingsStayingTogether([things[0], things[2]]), false);
  });

  it('getBlankPosList', function() {
    let maze = new MazeModel();
    maze.includeMapText([
      '#####',
      '#   #',
      '#   #',
      '#####'
    ].join('\n'));
    assert.deepEqual(maze.getBlankPosList(), [
      [1, 1],
      [1, 2],
      [1, 3],
      [2, 1],
      [2, 2],
      [2, 3]
    ]);
    maze.addThing(new ThingModel(), [1, 2]);
    maze.addThing(new ThingModel(), [2, 3]);
    assert.deepEqual(maze.getBlankPosList(), [
      [1, 1],
      [1, 3],
      [2, 1],
      [2, 2]
    ]);
  });

  it('toContent', function() {
    let maze = MazeModel.createByExtent([1, 2]);
    maze.getCell([1, 1]).setThing(new PlayerThingModel());
    maze.getCell([
      maze.getHeight() - 2,
      maze.getWidth() - 2
    ]).setThing(new UpstairsThingModel());
    assert.strictEqual(maze.toContent(),
      '###\n' +
      '#{green-fg}@{/}#\n' +
      '# #\n' +
      '#{magenta-fg}<{/}#\n' +
      '###'
    );
  });
});
