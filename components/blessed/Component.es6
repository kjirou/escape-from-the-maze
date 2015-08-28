import EventManager from 'lib/EventManager';


export default class Component {

  /*
   * @param {blessed.screen} screen
   * @param {blessed.screen|blessed.element} $parent
   */
  constructor({ screen, $parent }) {
    this.screen = screen;
    this.emitter = EventManager.getInstance().emitter;
    this.$parent = $parent;
    this.$el = null;
  }

  prepareRendering() {
    throw new Error('Not implemented');
  }

  render() {
    this.prepareRendering();
    this.screen.render();
  }
}
