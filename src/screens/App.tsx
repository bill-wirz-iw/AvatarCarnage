import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import React, {useCallback, useEffect, useState} from 'react';
import RootStack from '../navigators/RootStack';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import store from '../store/index';

const App = () => {
  // Set an initialising state whilst Firebase connects
  const [initialising, setInitialising] = useState(true);

  const onAuthStateChanged = useCallback(
    (user: FirebaseAuthTypes.User | null) => {
      console.log('onAuthStateChanged user: ', user);

      store.update(s => {
        s.auth.user = user;
      });

      if (initialising) {
        setInitialising(false);
      }
    },
    [initialising],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [onAuthStateChanged]);

  if (initialising) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
