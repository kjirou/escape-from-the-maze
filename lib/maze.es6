import generateMaze from 'generate-maze-by-clustering';
import _ from 'lodash';
import keymirror from 'keymirror';
import _s from 'underscore.string';

import Cell from 'lib/cell';
import ThingIndexer from 'lib/thing-indexer';
import WallThing from 'lib/things/wall';


const DIRECTIONS = keymirror({
  UP: null,
  RIGHT: null,
  DOWN: null,
  LEFT: null
});

function createCells(size) {
  return _.range(size[1]).map(function() {
    return _.range(size[0]).map(function() {
      return new Cell();
    });
  });
}

function extentToSize(extent) {
  return extent * 2 + 1;
}

function getRelativePosByDirection(direction) {
  return {
    UP: [-1, 0],
    RIGHT: [0, 1],
    DOWN: [1, 0],
    LEFT: [0, -1]
  }[DIRECTIONS[direction]];
}

function composeCoordinates(startPos, relativePos) {
  return [
    startPos[0] + relativePos[0],
    startPos[1] + relativePos[1]
  ];
}


class Maze {

  constructor() {
    this._thingIndexer = new ThingIndexer();
    this._cells = null;
  }

  /**
   * @param {Array} extent  [extentWidth, extentHeight]
   */
  static createByExtent(extent) {
    let maze = new this();
    maze.includeMapText(generateMaze(extent).toText());
    return maze;
  }

  includeMapText(mapText) {
    let mapAsCharacters = _s.trim(mapText)
      .split('\n')
      .map(function(row) {
        return row.split('');
      })
    ;
    let width = mapAsCharacters[0].length;
    let height = mapAsCharacters.length;

    this._cells = createCells([width, height]);

    let that = this;
    return _.range(height)
      .map(function(rowIndex) {
        return _.range(width)
          .map(function(columnIndex) {
            let chr = mapAsCharacters[rowIndex][columnIndex];
            if (chr === '#') {
              that.addThing(new WallThing(), [rowIndex, columnIndex]);
            }
          })
        ;
      })
    ;
  }

  getWidth() {
    return this._cells[0].length;
  }

  getHeight() {
    return this._cells.length;
  }

  getSize() {
    return [this.getWidth(), this.getHeight()];
  }

  /**
   * @param {Array<number>} cellIndex  e.g. [rowIndex, columnIndex]
   * @return {Cell|null}
   */
  getCell(pos) {
    let rowIndex = pos[0];
    let columnIndex = pos[1];
    let row = this._cells[rowIndex];
    if (row === undefined) { return null; }
    return row[columnIndex] || null;
  }

  getCellOrError(pos) {
    let cell = this.getCell(pos);
    if (cell) {
      return cell;
    } else {
      throw new Error('Can not get the cell by [' + pos.toString() + ']');
    }
  }

  addThing(thing, pos) {
    if (this._thingIndexer.has(thing.uuid)) {
      throw new Error('The thing is existing');
    }
    let cell = this.getCellOrError(pos);
    cell.setThing(thing);
    this._thingIndexer.update(thing.uuid, pos);
  }

  removeThing(thing, pos) {
    if (!this._thingIndexer.has(thing.uuid)) {
      throw new Error('Can not find the thing by uuid=' + thing.uuid);
    }
    let cell = this.getCellOrError(pos);
    cell.removeThing(thing);
    this._thingIndexer.remove(thing.uuid);
  }

  /*
   * @return {boolean}
   */
  validateThingMovement(thing, fromPos, toPos) {
    let fromCell = this.getCell(fromPos);
    let toCell = this.getCell(toPos);
    return !!(fromCell && toCell && fromCell.hasThing(thing) && toCell.isPassable());
  }

  moveThing(thing, fromPos, toPos) {
    if (!this.validateThingMovement(thing, fromPos, toPos)) {
      throw new Error('Invalid thing movement');
    }
    this.removeThing(thing, fromPos);
    this.addThing(thing, toPos);
  }

  /*
   * Walk a thing only one step in the direction
   *
   * @param {Thing}
   * @param {string}  DIRECTIONS
   * @return {boolean}  Success or failure
   */
  walkThing(thing, direction) {
    let fromPos = this._thingIndexer.get(thing.uuid);
    let relativePos = getRelativePosByDirection(direction);
    let toPos = composeCoordinates(fromPos, relativePos);
    if (!this.validateThingMovement(thing, fromPos, toPos)) {
      return false;
    }
    this.moveThing(thing, fromPos, toPos);
    return true;
  }

  isArrivedGoal(playerThing, goalThing) {
    let playerPos = this._thingIndexer.get(playerThing.uuid);
    let goalPos = this._thingIndexer.get(goalThing.uuid);
    return _.isEqual(playerPos, goalPos);
  }

  toContent() {
    return this._cells.map(function(rowCells) {
      return rowCells.map(function(cell) {
        return cell.toContent();
      }).join('');
    }).join('\n');
  }
}


_.assign(Maze, {
  DIRECTIONS: DIRECTIONS,
  createCells: createCells,
  extentToSize: extentToSize
});


export default Maze;
