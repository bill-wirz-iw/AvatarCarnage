import React, {useCallback, useState} from 'react';
import {Text, Button, Image, StyleSheet} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera, BarCodeReadEvent} from 'react-native-camera';
import store from '../store';
import Layout from '../components/Layout';
import {getPokemonData, getPokemonImageUrl} from '../utils/pokemon_api';
import {Pokemon} from '../store/dataStructures';

const BattleArena = () => {
  const [challenging, setChallenging] = useState(false);
  const [acceptingChallenge, setAcceptingChallenge] = useState(false);
  const [enemyName, setEnemyName] = useState('');
  const [enemyImageUrl, setEnemyImageUrl] = useState('');

  const profilePokemonIndex = store.useState(
    s => s.profile.champion.pokemonIndex,
  );

  const battle = useCallback(async (enemyPokemonIndex: string) => {
    console.log(`Battling ${enemyPokemonIndex}!`);
    const enemyData = await getPokemonData(parseInt(enemyPokemonIndex, 10));
    const enemyDisplayName =
      enemyData.name.charAt(0).toUpperCase() + enemyData.name.slice(1);
    setEnemyName(enemyDisplayName);
    const imageUrl = await getPokemonImageUrl(enemyData.url);
    setEnemyImageUrl(imageUrl);
    const enemyPokemon: Pokemon = {
      pokemonIndex: enemyPokemonIndex,
      pokemonName: enemyData.name,
      pokemonDisplayName: enemyDisplayName,
      pokemonFormUrl: enemyData.url,
      pokemonImageUrl: imageUrl,
    };

    store.update(s => {
      s.army.push(enemyPokemon);
    });
  }, []);

  const issueChallenge = useCallback(() => {
    setAcceptingChallenge(false);
    setChallenging(true);
  }, []);

  const acceptChallenge = useCallback(() => {
    setChallenging(false);
    setAcceptingChallenge(true);
  }, []);

  const scanQRCode = useCallback(
    (scanEvent: BarCodeReadEvent) => {
      console.log('scanEvent data: ', scanEvent.data);
      setAcceptingChallenge(false);
      battle(scanEvent.data);
    },
    [battle],
  );

  return (
    <Layout>
      <Text>Are you ready to do battle?</Text>
      <Button onPress={acceptChallenge} title="Accept Challenge" />
      <Button onPress={issueChallenge} title="Lay Down the Gauntlet" />
      {challenging && <QRCode value={profilePokemonIndex} />}
      {acceptingChallenge && (
        <QRCodeScanner
          onRead={scanQRCode}
          flashMode={RNCamera.Constants.FlashMode.auto}
          topContent={
            <Text>Scan your opponents QR code in order fight them.</Text>
          }
          bottomContent={<Text>OK. Got it!</Text>}
        />
      )}
      {enemyName && <Text>You defeated {enemyName}!</Text>}
      {enemyImageUrl && (
        <Image style={styles.basicImage} source={{uri: enemyImageUrl}} />
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  basicImage: {
    width: 100,
    height: 100,
  },
});

export default BattleArena;
