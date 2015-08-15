var _s = require('underscore.string');
var generateMaze = require('generate-maze-by-clustering');

var Cell = require('lib/cell');
var PlayerThing = require('lib/things/player');
var UpstairsThing = require('lib/things/upstairs');
var WallThing = require('lib/things/wall');


/**
 * @param {Array} extent  [width-extent, height-extent]
 */
function Maze(extent) {
  this.extent = extent;
  this._cells = this._createCells(this.extent);
  this._cells[1][1].setThing(new PlayerThing());
  this._cells[this.getHeight() - 2][this.getWidth() - 2].setThing(new UpstairsThing());
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
      return mazeLineText.split('').map(function(chr) {
        var cell = new Cell();
        if (chr === '#') {
          cell.setThing(new WallThing());
        }
        return cell;
      });
    })
  ;
};

Maze.prototype.toContent = function toContent() {
  return this._cells.map(function(rowCells) {
    return rowCells.map(function(cell) {
      return cell.toContent();
    }).join('');
  }).join('\n');
};

Maze.extentToSize = function(extent) {
  return extent * 2 + 1;
};


module.exports = Maze;
