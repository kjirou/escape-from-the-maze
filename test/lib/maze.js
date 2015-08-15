var assert = require('assert');
var _ = require('lodash');

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

  it('toContent', function() {
    var maze = new Maze([1, 2]);
    assert.strictEqual(maze.toContent(),
      '###\n' +
      '#{green-fg}@{/}#\n' +
      '# #\n' +
      '#{magenta-fg}<{/}#\n' +
      '###'
    );
  });
});
