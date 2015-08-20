import conf from 'conf';


let util = {};

util.calculateMillisecondsPerFrame = function calculateMillisecondsPerFrame() {
  return ~~(1000 / conf.fps);
}


export default util;
