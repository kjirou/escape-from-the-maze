import _ from 'lodash';
import assert from 'power-assert';

import {
  Stage,
  stageList,
  stages
} from 'lib/stages';


describe(__filename, function() {

  context('Stage', function() {

    it('getName', function() {
      const FooBarStage = Object.assign({}, Stage, {
        typeId: 'foo_bar'
      });
      assert.strictEqual(FooBarStage.getName(), 'Foo Bar');
    });
  });

  context('stageList, stages', function() {

    it('should be', function() {
      assert(stageList.length > 0);
      assert.strictEqual(stageList.length, Object.keys(stages).length);

      let descriptions = stageList.map(v => v.description);
      assert.strictEqual(descriptions.length, _.unique(descriptions).length);
    });
  });
});
