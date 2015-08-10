var assert = require('assert');

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
    var actual = Maze.prototype._createCells([1, 1]);
    assert.deepEqual(actual, [
      ['#', '#', '#'],
      ['#', ' ', '#'],
      ['#', '#', '#']
    ]);
  });

  it('toBlessedContent', function() {
    var maze = new Maze([1, 2]);
    assert.strictEqual(maze.toBlessedContent(),
      '###\n' +
      '#{green-fg}@{/}#\n' +
      '# #\n' +
      '#{magenta-fg}<{/}#\n' +
      '###'
    );
  });
});
