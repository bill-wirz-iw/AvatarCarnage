import React from 'react';
import Layout from '../components/Layout';
import {Alert} from 'react-native';
import {Button} from '@rneui/themed';
import {storage} from '../storage/mmkvStorage';

const DebugScreen = () => {
  return (
    <Layout>
      <Button
        title="Reset Local Storage"
        onPress={() => {
          storage.clearAll();
          Alert.alert('Restart the app now.');
        }}
      />
    </Layout>
  );
};

export default DebugScreen;
