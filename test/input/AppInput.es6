import assert from 'power-assert';
import sinon from 'sinon';

import App from 'app';
import AppInput from 'input/AppInput';
import {heading} from 'test/support/helpers';


describe(heading(__filename), function() {

  beforeEach(function() {
    App.purgeInstances();
  });

  it('should create instance', function() {
    var input = new AppInput();
    assert(input instanceof AppInput);
  });

  it('should destruct all observable sequences at clearInstance', function() {
    var input = AppInput.getInstance();
    var spies = [];
    spies.push(sinon.spy(input._timerSubscription, 'dispose'));
    spies.push(sinon.spy(input._keypressSubscription, 'dispose'));
    AppInput.clearInstance();
    assert.strictEqual(spies[0].callCount, 1);
    assert.strictEqual(spies[1].callCount, 1);
  });
});
