var _s = require('underscore.string');
var generateMaze = require('generate-maze-by-clustering');


var MAP_SYMBOLS = {
  PLAYER: '@',
  SPACE: ' ',
  WALL: '#'
};


/**
 * @param {Array} extent  [width-extent, height-extent]
 */
function Maze(extent) {
  this.extent = extent
  this.size = [
    Maze.extentToSize(this.extent[0]),
    Maze.extentToSize(this.extent[1])
  ];
  this._cells = this._createCells(this.extent);
  this._cells[1][1] = MAP_SYMBOLS.PLAYER;
}

Maze.prototype._createCells = function _createCells(extent) {
  var mazeText = generateMaze(extent).toText();
  return _s.trim(mazeText)
    .split('\n')
    .map(function(mazeLineText) {
      return mazeLineText.split('');
    })
  ;
};

Maze.prototype.toBlessedContent = function toText() {
  return this._cells.map(function(lineCells) {
    return lineCells.map(function(cell) {
      if (cell === MAP_SYMBOLS.PLAYER) {
        cell = '{green-fg}' + cell + '{/}';
      }
      return cell;
    }).join('');
  }).join('\n');
};

Maze.extentToSize = function(extent) {
  return extent * 2 + 1;
};


module.exports = Maze;
