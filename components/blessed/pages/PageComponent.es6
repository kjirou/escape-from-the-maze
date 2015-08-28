import blessed from 'blessed';

import Component from '../Component';


export default class PageComponent extends Component {

  constructor(...args) {
    super(...args);

    this.$el = blessed.box({
      parent: this.$parent,
      top: 'top',
      left: 'left',
      width: '100%',
      height: '100%',
      tags: true,
      style: {
        fg: 'white',
        bg: 'black'
      }
    });
  }
}
