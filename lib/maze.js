var _s = require('underscore.string');
var generateMaze = require('generate-maze-by-clustering');


var MAP_SYMBOLS = {
  PLAYER: '@',
  SPACE: ' ',
  UPSTAIRS: '<',
  WALL: '#'
};


/**
 * @param {Array} extent  [width-extent, height-extent]
 */
function Maze(extent) {
  this.extent = extent;
  this._cells = this._createCells(this.extent);
  this._cells[1][1] = MAP_SYMBOLS.PLAYER;
  this._cells[this.getHeight() - 2][this.getWidth() - 2] = MAP_SYMBOLS.UPSTAIRS;
}

Maze.prototype.getSize = function getSize() {
  return [
    Maze.extentToSize(this.extent[0]),
    Maze.extentToSize(this.extent[1])
  ];
};

Maze.prototype.getWidth = function getWidth() {
  return this.getSize()[0];
};

Maze.prototype.getHeight = function getHeight() {
  return this.getSize()[1];
};

Maze.prototype._createCells = function _createCells(extent) {
  var mazeText = generateMaze(extent).toText();
  return _s.trim(mazeText)
    .split('\n')
    .map(function(mazeLineText) {
      return mazeLineText.split('');
    })
  ;
};

Maze.prototype.toBlessedContent = function toBlessedContent() {
  return this._cells.map(function(lineCells) {
    return lineCells.map(function(cell) {
      if (cell === MAP_SYMBOLS.PLAYER) {
        cell = '{green-fg}' + cell + '{/}';
      } else if (cell == MAP_SYMBOLS.UPSTAIRS) {
        cell = '{magenta-fg}' + cell + '{/}';
      }
      return cell;
    }).join('');
  }).join('\n');
};

Maze.extentToSize = function(extent) {
  return extent * 2 + 1;
};


module.exports = Maze;
