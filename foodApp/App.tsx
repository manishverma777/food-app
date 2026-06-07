import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {AppNavigator} from './src/navigation/AppNavigator';

const App = () => (
  <SafeAreaProvider>
    <StatusBar barStyle="light-content" backgroundColor="#0AA866" />
    <AppNavigator />
  </SafeAreaProvider>
);

export default App;
