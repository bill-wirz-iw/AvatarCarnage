import {Button} from '@rneui/themed';
import React, {useCallback, useState} from 'react';
import store from '../store/index';
import Layout from '../components/Layout';
import {Input} from '@rneui/themed';
import auth from '@react-native-firebase/auth';

const RegisterScreen = () => {
  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');

  const register = useCallback(
    (username_input: string, password_input: string) => {
      auth()
        .createUserWithEmailAndPassword(username_input, password_input)
        .then(() => {
          console.log('User account created & signed in!');
          store.update(s => {
            s.auth.isSignedIn = true;
          });
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

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
        onChangeText={onChangeUsername}
      />
      <Input
        placeholder="password"
        textContentType="password"
        secureTextEntry={true}
        value={password}
        onChangeText={onChangePassword}
      />
      <Button
        onPress={() => {
          if (username && password) {
            register(username, password);
          }
        }}
        title="Create Account"
      />
    </Layout>
  );
};

export default RegisterScreen;
