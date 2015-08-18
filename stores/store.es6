import _ from 'lodash';

import SingletonMixin from 'lib/mixins/singleton';


export default class Store {

  constructor() {
    this.dispatchTokens = [];
  }
}

_.assign(Store, SingletonMixin);
