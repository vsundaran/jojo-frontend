/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import setupText from "./src/config/setupText";

setupText();

AppRegistry.registerComponent(appName, () => App);
