import assert from 'power-assert';
import sinon from 'sinon';

import App from 'app';
import Inputs from 'inputs';
import {heading} from 'test/support/helpers';


describe(heading(__filename), function() {

  beforeEach(function() {
    App.purgeInstances();
  });

  it('should create instance', function() {
    var inputs = new Inputs();
    assert(inputs instanceof Inputs);
  });

  it('should destruct all observable sequences at clearInstance', function() {
    var inputs = Inputs.getInstance();
    var spies = [];
    spies.push(sinon.spy(inputs._timerSubscription, 'dispose'));
    spies.push(sinon.spy(inputs._keypressSubscription, 'dispose'));
    Inputs.clearInstance();
    assert.strictEqual(spies[0].callCount, 1);
    assert.strictEqual(spies[1].callCount, 1);
  });
});
