var _s = require('underscore.string');
var generateMaze = require('generate-maze-by-clustering');


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

Maze.prototype.toText = function toText() {
  return this._cells.map(function(lineCells) {
    return lineCells.join('');
  }).join('\n');
};

Maze.extentToSize = function(extent) {
  return extent * 2 + 1;
};


module.exports = Maze;
