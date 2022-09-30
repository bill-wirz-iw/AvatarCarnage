import React, {useCallback, useEffect, useState} from 'react';
import {Text, Button, Image, StyleSheet, View} from 'react-native';
import Layout from '../components/Layout';
import analytics from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';
import store from '../store';
import {setInitialProfile} from '../utils/profile';

const CastleScreen = () => {
  const [loading, setLoading] = useState(true);
  const [profilePokemonName, setProfilePokemonName] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');

  const profileData = store.useState(s => s.profile);
  const army = store.useState(s => s.army);
  console.log('castle army: ', army);

  const logout = useCallback(() => {
    auth()
      .signOut()
      .then(() => {
        store.update(s => {
          s.auth.isSignedIn = false;
        });
        console.log('User signed out!');
      });
  }, []);

  const setProfile = useCallback(async () => {
    if (!profileData.champion.pokemonIndex) {
      await setInitialProfile();
    }

    if (profileData.champion.pokemonIndex) {
      setProfilePokemonName(profileData.champion.pokemonDisplayName);
      setProfileImageUrl(profileData.champion.pokemonImageUrl);

      setLoading(false);
    }
  }, [profileData]);

  useEffect(() => {
    setProfile();
  }, [setProfile]);

  if (loading) {
    return (
      <Layout>
        <Text>loading...</Text>
      </Layout>
    );
  }

  return (
    <Layout>
      <>
        <Button
          onPress={() => {
            analytics().logEvent('avatar_carnage_logout', {
              time: new Date().toString(),
              description: 'AvatarCarnage logout',
            });
            logout();
          }}
          title="Logout"
        />
        <Text>Greetings, mighty {profilePokemonName}!</Text>
        <Image style={styles.basicImage} source={{uri: profileImageUrl}} />
        <Text>Behold, thy mighty host:</Text>
        {army.map((pokemonSoldier, index) => {
          return (
            <View key={`name-${index}`}>
              <Text key={`name-${index}`}>
                {pokemonSoldier.pokemonDisplayName}
              </Text>
              <Image
                key={`image-${index}`}
                style={styles.basicImage}
                source={{uri: pokemonSoldier.pokemonImageUrl}}
              />
            </View>
          );
        })}
      </>
    </Layout>
  );
};

const styles = StyleSheet.create({
  basicImage: {
    width: 100,
    height: 100,
  },
});

export default CastleScreen;
