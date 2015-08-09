var assert = require('assert');

var Maze = require('lib/maze');


describe('maze lib', function() {

  it('extentToSize', function() {
    assert(Maze.extentToSize(1), 1 * 2 + 1);
    assert(Maze.extentToSize(5), 5 * 2 + 1);
  });

  it('_createCells', function() {
    var actual = Maze.prototype._createCells([1, 1]);
    assert.deepEqual(actual, [
      ['#', '#', '#'],
      ['#', ' ', '#'],
      ['#', '#', '#']
    ]);
  });

  it('toBlessedContent', function() {
    var maze = new Maze([1, 1]);
    assert(maze.toBlessedContent(), '###\n#{green-fg}@{/}#\n###');
  });
});
