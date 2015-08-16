import _ from 'lodash';
import util from 'util';

import Thing from 'lib/things/thing';


class UpstairsThing extends Thing {

  constructor() {
    super();

    this._symbol = '<';
  }

  toContent() {
    return '{magenta-fg}' + this._symbol + '{/}';
  }
}
_.assign(UpstairsThing, Thing);

UpstairsThing.typeId = 'upstairs';


export default UpstairsThing;
