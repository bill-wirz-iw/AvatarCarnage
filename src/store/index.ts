import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Store} from 'pullstate';
import {storage} from '../storage/mmkvStorage';
import {StoreProps, Pokemon} from './dataStructures';

const store = new Store<StoreProps>({
  auth: {
    isSignedIn: false,
    user: null,
  },
  profile: {
    champion: {
      pokemonIndex: '',
      pokemonName: '',
      pokemonDisplayName: '',
      pokemonFormUrl: '',
      pokemonImageUrl: '',
    },
  },
  army: [],
});

store.createReaction(
  s => s.auth.user,
  (user: FirebaseAuthTypes.User | null) => {
    storage.set('user', JSON.stringify(user));
  },
);

store.createReaction(
  s => s.profile,
  (profile: StoreProps['profile']) => {
    storage.set('profile', JSON.stringify(profile));
  },
);

store.createReaction(
  s => s.army,
  (army: Pokemon[]) => {
    console.log('storing army: ', army);
    storage.set('army', JSON.stringify(army));
  },
);

const populateStore = () => {
  if (storage.getString('profile')) {
    const profile: StoreProps['profile'] = JSON.parse(
      storage.getString('profile') as string,
    );
    store.update(s => {
      s.profile.champion.pokemonIndex = profile.champion.pokemonIndex;
      s.profile.champion.pokemonName = profile.champion.pokemonName;
      s.profile.champion.pokemonDisplayName =
        profile.champion.pokemonDisplayName;
      s.profile.champion.pokemonFormUrl = profile.champion.pokemonFormUrl;
      s.profile.champion.pokemonImageUrl = profile.champion.pokemonImageUrl;
    });
  }
  if (storage.getString('army')) {
    console.log('army', storage.getString('army'));
    const army: Pokemon[] = JSON.parse(storage.getString('army') as string);
    army.map(soldier_str => {
      const soldier: Pokemon = {
        pokemonIndex: soldier_str.pokemonIndex,
        pokemonName: soldier_str.pokemonName,
        pokemonDisplayName: soldier_str.pokemonDisplayName,
        pokemonFormUrl: soldier_str.pokemonFormUrl,
        pokemonImageUrl: soldier_str.pokemonImageUrl,
      };
      store.update(s => {
        s.army.push(soldier);
      });
    });
  } else {
    console.log('what army?');
  }
};
populateStore();

export default store;
