var assert = require('assert');
var _ = require('lodash');

var PlayerThing = require('lib/things/player');
var Thing = require('lib/things/thing');
var Maze = require('lib/maze');


describe('lib/maze', function() {

  it('extentToSize', function() {
    assert(Maze.extentToSize(1), 1 * 2 + 1);
    assert(Maze.extentToSize(5), 5 * 2 + 1);
  });

  it('getSize, getWidth, getHeight', function() {
    var maze = new Maze([3, 2]);
    assert.strictEqual(maze.getSize()[0], 7);
    assert.strictEqual(maze.getSize()[1], 5);
    assert.strictEqual(maze.getWidth(), 7);
    assert.strictEqual(maze.getHeight(), 5);
  });

  it('_createCells', function() {
    var cells = Maze.prototype._createCells([1, 1]);
    var actual = cells.map(function(rowCells) {
      return rowCells.map(function(cell) {
        return cell.toContent();
      }).join('');
    }).join('\n');
    assert.deepEqual(actual, '' +
      '###\n' +
      '# #\n' +
      '###'
    );
  });

  it('getCell, getCellOrError', function() {
    var maze = new Maze([1, 2]);
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
    var maze = new Maze([1, 3], { withPlayer: true });
    var player = maze.getStartCell().getThingOrError();
    assert.strictEqual(maze.validateThingMovement(player, [1, 1], [2, 1]), true);
    assert.strictEqual(maze.validateThingMovement(player, [1, 1], [3, 1]), true);
    assert.strictEqual(maze.validateThingMovement(new Thing(), [1, 1], [3, 1]), false, 'The thing is not placed on the cell');
    assert.strictEqual(maze.validateThingMovement(player, [2, 1], [3, 1]), false, 'The player does not exist on the cell');
    assert.strictEqual(maze.validateThingMovement(player, [1, 1], [99, 1]), false);
    assert.strictEqual(maze.validateThingMovement(player, [1, 1], [2, 99]), false);
    assert.strictEqual(maze.validateThingMovement(player, [1, 1], [2, 0]), false, 'The destination is not passable');
  });

  it('moveThing', function() {
    var maze, player;

    maze = new Maze([1, 3]);
    player = new PlayerThing();
    maze.getCell([1, 1]).setThing(player);
    maze.moveThing(player, [1, 1], [2, 1]);
    assert.strictEqual(maze.getCell([1, 1]).getThing(), null);
    assert.strictEqual(maze.getCell([2, 1]).getThing(), player);
    maze.moveThing(player, [2, 1], [3, 1]);
    assert.strictEqual(maze.getCell([1, 1]).getThing(), null);
    assert.strictEqual(maze.getCell([2, 1]).getThing(), null);
    assert.strictEqual(maze.getCell([3, 1]).getThing(), player);

    maze = new Maze([1, 3]);
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

  it('toContent', function() {
    var maze = new Maze([1, 2], { withPlayer: true, withGoal: true });
    assert.strictEqual(maze.toContent(),
      '###\n' +
      '#{green-fg}@{/}#\n' +
      '# #\n' +
      '#{magenta-fg}<{/}#\n' +
      '###'
    );
  });
});
