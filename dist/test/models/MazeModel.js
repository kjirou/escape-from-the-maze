'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _modelsMazeModel = require('models/MazeModel');

var _modelsMazeModel2 = _interopRequireDefault(_modelsMazeModel);

var _modelsThingsThingModel = require('models/things/ThingModel');

var _modelsThingsThingModel2 = _interopRequireDefault(_modelsThingsThingModel);

var _modelsThingsPlayerThingModel = require('models/things/PlayerThingModel');

var _modelsThingsPlayerThingModel2 = _interopRequireDefault(_modelsThingsPlayerThingModel);

var _modelsThingsUpstairsThingModel = require('models/things/UpstairsThingModel');

var _modelsThingsUpstairsThingModel2 = _interopRequireDefault(_modelsThingsUpstairsThingModel);

var _testSupportHelpers = require('test/support/helpers');

describe((0, _testSupportHelpers.heading)(__filename), function () {

  it('extentToSize', function () {
    _powerAssert2['default'].strictEqual(_modelsMazeModel2['default'].extentToSize(1), 1 * 2 + 1);
    _powerAssert2['default'].strictEqual(_modelsMazeModel2['default'].extentToSize(5), 5 * 2 + 1);
  });

  it('createCells', function () {
    var cells = _modelsMazeModel2['default'].createCells([3, 3]);
    var actual = cells.map(function (rowCells) {
      return rowCells.map(function (cell) {
        return cell.toContent();
      }).join('');
    }).join('\n');
    _powerAssert2['default'].deepEqual(actual, '' + '   \n' + '   \n' + '   ');
  });

  it('getWidth, getHeight, getSize', function () {
    var maze = _modelsMazeModel2['default'].createByExtent([3, 2]);
    _powerAssert2['default'].strictEqual(maze.getWidth(), 7);
    _powerAssert2['default'].strictEqual(maze.getHeight(), 5);
    _powerAssert2['default'].strictEqual(maze.getSize()[0], 7);
    _powerAssert2['default'].strictEqual(maze.getSize()[1], 5);
  });

  it('getCell, getCellOrError', function () {
    var maze = _modelsMazeModel2['default'].createByExtent([1, 2]);
    _powerAssert2['default'].strictEqual(maze.getCell([0, 0]), maze._cells[0][0]);
    _powerAssert2['default'].strictEqual(maze.getCell([0, 1]), maze._cells[0][1]);

    _powerAssert2['default'].strictEqual(maze.getCell([99, 0]), null);
    _powerAssert2['default'].strictEqual(maze.getCell([0, 99]), null);

    _powerAssert2['default'].strictEqual(maze.getCellOrError([0, 0]), maze._cells[0][0]);
    _powerAssert2['default'].throws(function () {
      maze.getCellOrError([99, 0]);
    }, /Can not/);
  });

  it('validateThingMovement', function () {
    var maze = _modelsMazeModel2['default'].createByExtent([1, 3]);
    var player = new _modelsThingsPlayerThingModel2['default']();
    maze.getCell([1, 1]).setThing(player);
    _powerAssert2['default'].strictEqual(maze.validateThingMovement(player, [1, 1], [2, 1]), true);
    _powerAssert2['default'].strictEqual(maze.validateThingMovement(player, [1, 1], [3, 1]), true);
    _powerAssert2['default'].strictEqual(maze.validateThingMovement(new _modelsThingsThingModel2['default'](), [1, 1], [3, 1]), false, 'The thing is not placed on the cell');
    _powerAssert2['default'].strictEqual(maze.validateThingMovement(player, [2, 1], [3, 1]), false, 'The player does not exist on the cell');
    _powerAssert2['default'].strictEqual(maze.validateThingMovement(player, [1, 1], [99, 1]), false);
    _powerAssert2['default'].strictEqual(maze.validateThingMovement(player, [1, 1], [2, 99]), false);
    _powerAssert2['default'].strictEqual(maze.validateThingMovement(player, [1, 1], [2, 0]), false, 'The destination is not passable');
  });

  it('moveThing', function () {
    var maze = undefined,
        player = undefined;

    maze = _modelsMazeModel2['default'].createByExtent([1, 3]);
    player = new _modelsThingsPlayerThingModel2['default']();
    maze.addThing(player, [1, 1]);
    maze.moveThing(player, [1, 1], [2, 1]);
    _powerAssert2['default'].strictEqual(maze.getCell([1, 1]).getThing(), null);
    _powerAssert2['default'].strictEqual(maze.getCell([2, 1]).getThing(), player);
    maze.moveThing(player, [2, 1], [3, 1]);
    _powerAssert2['default'].strictEqual(maze.getCell([1, 1]).getThing(), null);
    _powerAssert2['default'].strictEqual(maze.getCell([2, 1]).getThing(), null);
    _powerAssert2['default'].strictEqual(maze.getCell([3, 1]).getThing(), player);

    maze = _modelsMazeModel2['default'].createByExtent([1, 3]);
    player = new _modelsThingsPlayerThingModel2['default']();
    maze.getCell([1, 1]).setThing(player);
    _powerAssert2['default'].throws(function () {
      maze.moveThing(player, [2, 1], [3, 1]);
    });
    _powerAssert2['default'].throws(function () {
      maze.moveThing(player, [1, 1], [99, 1]);
    });
    _powerAssert2['default'].throws(function () {
      maze.moveThing(player, [1, 1], [0, 1]);
    });
  });

  it('walkThing', function () {
    var maze = undefined,
        player = undefined,
        upstairs = undefined;
    maze = new _modelsMazeModel2['default']();
    maze.includeMapText(['#####', '#   #', '#   #', '#####'].join('\n'));
    player = new _modelsThingsPlayerThingModel2['default']();
    upstairs = new _modelsThingsUpstairsThingModel2['default']();
    maze.addThing(player, [1, 1]);
    maze.addThing(upstairs, [maze.getHeight() - 2, maze.getWidth() - 2]);
    maze.walkThing(player, _modelsMazeModel2['default'].DIRECTIONS.RIGHT);
    maze.walkThing(player, _modelsMazeModel2['default'].DIRECTIONS.DOWN);
    maze.walkThing(player, _modelsMazeModel2['default'].DIRECTIONS.RIGHT);
    _powerAssert2['default'].deepEqual(maze.getCell([2, 3]).getThings(), [upstairs, player]);

    maze.walkThing(player, _modelsMazeModel2['default'].DIRECTIONS.RIGHT);
    maze.walkThing(player, _modelsMazeModel2['default'].DIRECTIONS.DOWN);
    _powerAssert2['default'].deepEqual(maze.getCell([2, 3]).getThings(), [upstairs, player], 'Can not move to impassable cell');

    maze.walkThing(player, _modelsMazeModel2['default'].DIRECTIONS.LEFT);
    _powerAssert2['default'].strictEqual(maze.getCell([2, 2]).getThing(), player);

    maze.walkThing(player, _modelsMazeModel2['default'].DIRECTIONS.UP);
    _powerAssert2['default'].strictEqual(maze.getCell([1, 2]).getThing(), player);
  });

  it('areThingsOn, areThingsStayingTogether', function () {
    var maze = new _modelsMazeModel2['default']();
    maze.includeMapText(['#####', '#   #', '#   #', '#####'].join('\n'));
    var things = Array.from({ length: 3 }).map(function () {
      return new _modelsThingsThingModel2['default']();
    });
    maze.addThing(things[0], [1, 1]);
    maze.addThing(things[1], [1, 1]);
    maze.addThing(things[2], [1, 2]);
    _powerAssert2['default'].strictEqual(maze.areThingsOn([1, 1], [things[0], things[1]]), true);
    _powerAssert2['default'].strictEqual(maze.areThingsOn([1, 1], [things[0], things[2]]), false);
    _powerAssert2['default'].strictEqual(maze.areThingsStayingTogether([things[0], things[1]]), true);
    _powerAssert2['default'].strictEqual(maze.areThingsStayingTogether([things[0], things[2]]), false);
  });

  it('getBlankPosList', function () {
    var maze = new _modelsMazeModel2['default']();
    maze.includeMapText(['#####', '#   #', '#   #', '#####'].join('\n'));
    _powerAssert2['default'].deepEqual(maze.getBlankPosList(), [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3]]);
    maze.addThing(new _modelsThingsThingModel2['default'](), [1, 2]);
    maze.addThing(new _modelsThingsThingModel2['default'](), [2, 3]);
    _powerAssert2['default'].deepEqual(maze.getBlankPosList(), [[1, 1], [1, 3], [2, 1], [2, 2]]);
  });

  it('toContent', function () {
    var maze = _modelsMazeModel2['default'].createByExtent([1, 2]);
    maze.getCell([1, 1]).setThing(new _modelsThingsPlayerThingModel2['default']());
    maze.getCell([maze.getHeight() - 2, maze.getWidth() - 2]).setThing(new _modelsThingsUpstairsThingModel2['default']());
    _powerAssert2['default'].strictEqual(maze.toContent(), '###\n' + '#{magenta-fg}@{/}#\n' + '# #\n' + '#{magenta-fg}<{/}#\n' + '###');
  });
});