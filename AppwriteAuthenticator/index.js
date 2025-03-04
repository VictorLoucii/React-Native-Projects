/**
 * @format
 */

import {AppRegistry} from 'react-native';    //never comment this line
import {name as appName} from './app.json';  //never comment this line
// import App from './App';   //this is inside the root folder
// import test1 from './test1';  //this is inside the root folder
// import RollingDice from './src/RollingDice';   //this is inside the folder 'src' in the root folder
// import BgChanger from './BgChanger';

// import Curr from './Currency/Curr'; //this is inside the folder 'Currency' in the root folder
// import TTT from './TicTacToe/TTT'; //this is inside the folder 'TicTacToe' in the root folder
// import PlayerApp from './src/playerAppProject/PlayerApp'; 
// import TrackPlayer from 'react-native-track-player';
// import {playBackService} from './src/services/musicPlayerServices'
// import ScreenProject from './src/navigationProject/ScreenProject'
import App from './src/navigationProject2/App'


AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(appName, () => ScreenProject);
// AppRegistry.registerComponent(appName, () => test1);
// AppRegistry.registerComponent(appName, () => RollingDice);

// AppRegistry.registerComponent(appName, () => BgChanger);
// AppRegistry.registerComponent(appName, () => Curr);
// AppRegistry.registerComponent(appName, () => TicTacToe);
// AppRegistry.registerComponent(appName, () => PlayerApp);
// TrackPlayer.registerPlaybackService(() => playBackService); //you can also write: TrackPlayer.registerPlaybackService(() => require('./service'));





// ./ single ./ is for root folder
//to make a new file for e.g called 'newfile.tsx' comment the previous file and then write these statements(keep in mind to keep the first letter of the file name in uppercase):
//import Newfile from './Newfile';
//AppRegistry.registerComponent(appName, () => Newfile);

//notes:
// React Native follows relative imports, meaning it looks for the file based on the path you provide.
// ./Dice → Looks for Dice.tsx in the same folder as index.js. here we have created file 'Dice' inside the root directory i.e where index.js exists.
// ./src/Dice → Looks for Dice.tsx inside the src folder. here we have created file 'Dice' inside a folder named 'src'


