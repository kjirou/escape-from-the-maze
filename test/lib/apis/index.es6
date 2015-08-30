import assert from 'power-assert';

import conf from 'conf';
import {
  _formatRankingDataToText,
  _restructGameResultRowsForRanking
} from 'lib/apis';
import {heading} from 'test/support/helpers';


describe(heading(__filename), function() {

  it('_restructGameResultRowsForRanking', function() {
    let rows, rankingData;

    rows = [
      { created_at: 10000, stage: 'simple', name: 'Foo', score: 2 },
      { created_at: 10000, stage: 'simple', name: 'Foo', score: 4 },
      { created_at: 10000, stage: 'easy', name: 'Foo', score: 1 },
      { created_at: 10000, stage: 'simple', name: 'Foo', score: 3 },
      { created_at: 10000, stage: 'easy', name: 'Foo', score: 1 },
      { created_at: 10000, stage: 'hard', name: 'Foo', score: 1 },
      { created_at: 10000, stage: 'simple', name: 'Foo', score: 1 },
      { created_at: 10000, stage: 'simple', name: 'Foo', score: 1 },
      { created_at: 10000, stage: 'simple', name: 'Foo', score: 1 },
      { created_at: 10000, stage: 'simple', name: 'Foo', score: 1 },
      { created_at: 9999, stage: 'simple', name: 'Foo', score: 1 },
      { created_at: 10000, stage: 'simple', name: 'Foo', score: 1 },
      { created_at: 10000, stage: 'simple', name: 'Foo', score: 1 },
      { created_at: 10000, stage: 'simple', name: 'Foo', score: 1 },
      { created_at: 10000, stage: 'simple', name: 'Foo', score: 1 },
      { created_at: 10000, stage: 'simple', name: 'Foo', score: 1 },
    ];
    rankingData = _restructGameResultRowsForRanking(rows);
    assert.deepEqual(Object.keys(rankingData).sort(), [
      'easy',
      'hard',
      'simple',
    ]);
    assert.strictEqual(rankingData.simple.all.length, 13);
    assert.strictEqual(rankingData.easy.all.length, 2);
    assert.strictEqual(rankingData.hard.all.length, 1);
    assert.deepEqual(rankingData.simple.all.slice(0, 10).map((v) => v.score), [4, 3, 2, 1, 1, 1, 1, 1, 1, 1]);
    assert.strictEqual(rankingData.simple.all[3].created_at, 9999, 'Be applied secondary-sort by created_at');

    // validate time windows
    let nowTime = (new Date()).getTime();
    rows = [
      { created_at: nowTime, stage: 'simple', name: 'Foo', score: 1 },
      { created_at: nowTime - 86400000 * 0.5, stage: 'simple', name: 'Foo', score: 1 },
      { created_at: nowTime - 86400000 * 3, stage: 'simple', name: 'Foo', score: 1 },
      { created_at: nowTime - 86400000 * 10, stage: 'simple', name: 'Foo', score: 1 },
      { created_at: nowTime - 86400000 * 20, stage: 'simple', name: 'Foo', score: 1 },
      { created_at: nowTime - 86400000 * 29, stage: 'simple', name: 'Foo', score: 1 },
      { created_at: nowTime - 86400000 * 31, stage: 'simple', name: 'Foo', score: 1 },
    ];
    rankingData = _restructGameResultRowsForRanking(rows);
    assert.strictEqual(rankingData.simple.all.length, 7);
    assert.strictEqual(rankingData.simple.last30Days.length, 6);
    assert.strictEqual(rankingData.simple.last7Days.length, 3);
    assert.strictEqual(rankingData.simple.last1Day.length, 2);
  });

  it('_formatRankingDataToText', function() {
    let nowTime = (new Date()).getTime();
    let rows = [
      { created_at: nowTime, stage: 'lunatic', name: 'Mr. Number One', score: 99999 },
      { created_at: nowTime, stage: 'lunatic', name: 'hutarime', score: 67676 },
      { created_at: nowTime - 86400000 * 2, stage: 'lunatic', name: 'sann', score: 67675 },
      { created_at: nowTime - 86400000 * 2, stage: 'hard', name: 'sann', score: 999999 },
    ];
    let rankingData = _restructGameResultRowsForRanking(rows);
    let text = _formatRankingDataToText(rankingData);
    assert(/1\. Mr\. /.test(text));
    assert(/2\. hutarime /.test(text));
    assert(/3\. sann /.test(text));
    assert(/1\. sann /.test(text));
  });
});
