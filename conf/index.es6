import path from 'path';


const conf = {
  // TODO: Receivable by command option
  componentMode: 'react-blessed',
  //componentMode: 'blessed',
  fps: 60,
  ignoreScreenOutput: false,
  root: path.join(__dirname, '/..')
};


export default conf;
