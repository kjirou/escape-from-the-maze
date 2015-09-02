'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _storesStore = require('stores/Store');

var _storesStore2 = _interopRequireDefault(_storesStore);

var _testSupportHelpers = require('test/support/helpers');

describe((0, _testSupportHelpers.heading)(__filename), function () {

  it('should be defined', function () {
    _powerAssert2['default'].strictEqual(typeof _storesStore2['default'], 'function');
  });

  it('should be inherited', function () {
    var SubStore = (function (_Store) {
      _inherits(SubStore, _Store);

      function SubStore() {
        _classCallCheck(this, SubStore);

        _get(Object.getPrototypeOf(SubStore.prototype), 'constructor', this).apply(this, arguments);
      }

      return SubStore;
    })(_storesStore2['default']);

    var store = SubStore.getInstance();
    var store2 = SubStore.getInstance();
    _powerAssert2['default'].strictEqual(store, store2, 'Can use inherited static props');
  });
});