import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BootSplash from 'react-native-bootsplash';

import { AppNavigator } from './src/navigation/AppNavigator';
import { persistor, store } from './src/store/store';

const App = () => {
  useEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar barStyle="light-content" backgroundColor="#0AA866" />
          <AppNavigator />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;