'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _powerAssert = require('power-assert');

var _powerAssert2 = _interopRequireDefault(_powerAssert);

var _conf = require('conf');

var _conf2 = _interopRequireDefault(_conf);

var _libApis = require('lib/apis');

var _testSupportHelpers = require('test/support/helpers');

describe((0, _testSupportHelpers.heading)(__filename), function () {

  it('_restructGameResultRowsForRanking', function () {
    var rows = undefined,
        rankingData = undefined;

    rows = [{ created_at: 10000, stage: 'simple', name: 'Foo', score: 2 }, { created_at: 10000, stage: 'simple', name: 'Foo', score: 4 }, { created_at: 10000, stage: 'easy', name: 'Foo', score: 1 }, { created_at: 10000, stage: 'simple', name: 'Foo', score: 3 }, { created_at: 10000, stage: 'easy', name: 'Foo', score: 1 }, { created_at: 10000, stage: 'hard', name: 'Foo', score: 1 }, { created_at: 10000, stage: 'simple', name: 'Foo', score: 1 }, { created_at: 10000, stage: 'simple', name: 'Foo', score: 1 }, { created_at: 10000, stage: 'simple', name: 'Foo', score: 1 }, { created_at: 10000, stage: 'simple', name: 'Foo', score: 1 }, { created_at: 9999, stage: 'simple', name: 'Foo', score: 1 }, { created_at: 10000, stage: 'simple', name: 'Foo', score: 1 }, { created_at: 10000, stage: 'simple', name: 'Foo', score: 1 }, { created_at: 10000, stage: 'simple', name: 'Foo', score: 1 }, { created_at: 10000, stage: 'simple', name: 'Foo', score: 1 }, { created_at: 10000, stage: 'simple', name: 'Foo', score: 1 }];
    rankingData = (0, _libApis._restructGameResultRowsForRanking)(rows);
    _powerAssert2['default'].deepEqual(Object.keys(rankingData).sort(), ['easy', 'hard', 'simple']);
    _powerAssert2['default'].strictEqual(rankingData.simple.all.length, 13);
    _powerAssert2['default'].strictEqual(rankingData.easy.all.length, 2);
    _powerAssert2['default'].strictEqual(rankingData.hard.all.length, 1);
    _powerAssert2['default'].deepEqual(rankingData.simple.all.slice(0, 10).map(function (v) {
      return v.score;
    }), [4, 3, 2, 1, 1, 1, 1, 1, 1, 1]);
    _powerAssert2['default'].strictEqual(rankingData.simple.all[3].created_at, 9999, 'Be applied secondary-sort by created_at');

    // validate time windows
    var nowTime = new Date().getTime();
    rows = [{ created_at: nowTime, stage: 'simple', name: 'Foo', score: 1 }, { created_at: nowTime - 86400000 * 0.5, stage: 'simple', name: 'Foo', score: 1 }, { created_at: nowTime - 86400000 * 3, stage: 'simple', name: 'Foo', score: 1 }, { created_at: nowTime - 86400000 * 10, stage: 'simple', name: 'Foo', score: 1 }, { created_at: nowTime - 86400000 * 20, stage: 'simple', name: 'Foo', score: 1 }, { created_at: nowTime - 86400000 * 29, stage: 'simple', name: 'Foo', score: 1 }, { created_at: nowTime - 86400000 * 31, stage: 'simple', name: 'Foo', score: 1 }];
    rankingData = (0, _libApis._restructGameResultRowsForRanking)(rows);
    _powerAssert2['default'].strictEqual(rankingData.simple.all.length, 7);
    _powerAssert2['default'].strictEqual(rankingData.simple.last30Days.length, 6);
    _powerAssert2['default'].strictEqual(rankingData.simple.last7Days.length, 3);
    _powerAssert2['default'].strictEqual(rankingData.simple.last1Day.length, 2);
  });

  it('_formatRankingDataToText', function () {
    var nowTime = new Date().getTime();
    var rows = [{ created_at: nowTime, stage: 'lunatic', name: 'Mr. Number One', score: 99999 }, { created_at: nowTime, stage: 'lunatic', name: 'hutarime', score: 67676 }, { created_at: nowTime - 86400000 * 2, stage: 'lunatic', name: 'sann', score: 67675 }, { created_at: nowTime - 86400000 * 2, stage: 'hard', name: 'sann', score: 999999 }];
    var rankingData = (0, _libApis._restructGameResultRowsForRanking)(rows);
    var text = (0, _libApis._formatRankingDataToText)(rankingData);
    (0, _powerAssert2['default'])(/1\. Mr\. /.test(text));
    (0, _powerAssert2['default'])(/2\. hutarime /.test(text));
    (0, _powerAssert2['default'])(/3\. sann /.test(text));
    (0, _powerAssert2['default'])(/1\. sann /.test(text));
  });

  it('requestRanking', function (done) {
    (0, _libApis.requestRanking)(done);
  });
});