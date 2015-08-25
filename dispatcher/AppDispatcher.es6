import {Dispatcher} from 'flux';

import SingletonMixin from 'lib/mixins/singleton';


export default class AppDispatcher extends Dispatcher {
}

Object.assign(AppDispatcher, SingletonMixin);
