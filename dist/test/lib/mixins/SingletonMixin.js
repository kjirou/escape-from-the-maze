'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _libMixinsSingletonMixin = require('lib/mixins/SingletonMixin');

var _libMixinsSingletonMixin2 = _interopRequireDefault(_libMixinsSingletonMixin);

var _testSupportHelpers = require('test/support/helpers');

describe((0, _testSupportHelpers.heading)(__filename), function () {

  it('should be defined', function () {
    _powerAssert2['default'].strictEqual(typeof _libMixinsSingletonMixin2['default'], 'object');
  });

  it('getInstance, clearInstance', function () {
    var Foo = function Foo(x, y) {
      _classCallCheck(this, Foo);

      this.data = {
        x: x,
        y: y
      };
    };

    _lodash2['default'].assign(Foo, _libMixinsSingletonMixin2['default']);

    var foo = Foo.getInstance(1, 2);
    _powerAssert2['default'].deepEqual(foo.data, { x: 1, y: 2 });
    var foo2 = Foo.getInstance();
    (0, _powerAssert2['default'])(foo === foo2);

    Foo.clearInstance();
    var foo3 = Foo.getInstance(2, 3);
    (0, _powerAssert2['default'])(foo !== foo3);
    _powerAssert2['default'].deepEqual(foo3.data, { x: 2, y: 3 });
  });
});