import _ from 'lodash';

import SingletonMixin from 'lib/mixins/singleton';


export default class Store {

  constructor() {
    this._dispatchToken = null;
  }

  getDispatchToken() {
    if (!this._dispatchToken) {
      throw new Error('dispatchToken does not exist');
    }
    return this._dispatchToken;
  }
}

_.assign(Store, SingletonMixin);
