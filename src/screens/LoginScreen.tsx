import {Button} from '@rneui/themed';
import React, {useCallback, useState} from 'react';
import store from '../store/index';
import Layout from '../components/Layout';
import {Input} from '@rneui/themed';
import analytics from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const login = useCallback(
    (username_input: string, password_input: string) => {
      auth()
        .signInWithEmailAndPassword(
          username_input.trim(),
          password_input.trim(),
        )
        .then(() => {
          console.log('User account signed in!');
          store.update(s => {
            s.auth.isSignedIn = true;
          });
        })
        .catch(error => {
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    },
    [],
  );

  return (
    <Layout>
      <Input
        placeholder="username"
        textContentType="username"
        value={username}
        onChangeText={setUsername}
      />
      <Input
        placeholder="password"
        textContentType="password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <Button
        onPress={() => {
          analytics().logEvent('avatar_carnage_login', {
            time: new Date().toString(),
            description: 'AvatarCarnage login',
          });
          login(username, password);
        }}
        title="Login"
      />
    </Layout>
  );
};

export default LoginScreen;
