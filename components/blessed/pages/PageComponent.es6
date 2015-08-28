import blessed from 'blessed';

import Component from '../Component';
import ScreenStore from 'stores/ScreenStore';


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

  toggleActivation() {
    let screenStore = ScreenStore.getInstance();
    if (screenStore.pageId === this.constructor.pageId) {
      this.$el.show();
      //this.$el.focus();
    } else {
      this.$el.hide();
    }
  }
}

Object.assign(PageComponent, {
  pageId: '_page'
});
