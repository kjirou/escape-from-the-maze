import {Dispatcher} from 'flux';

import SingletonMixin from 'lib/mixins/SingletonMixin';


export default class AppDispatcher extends Dispatcher {
}

Object.assign(AppDispatcher, SingletonMixin);
