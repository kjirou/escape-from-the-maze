import path from 'path';


const conf = {
  apiUrl: 'https://94uubrff77.execute-api.us-east-1.amazonaws.com/prod',
  componentMode: 'react-blessed',
  //componentMode: 'blessed',
  fps: 60,
  ignoreScreenOutput: false,
  root: path.join(__dirname, '/..')
};


export default conf;
