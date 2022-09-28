import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export type Auth = {
  isSignedIn: boolean;
  user: FirebaseAuthTypes.User | null;
};

export type Pokemon = {
  pokemonIndex: string;
  pokemonName: string;
  pokemonDisplayName: string;
  pokemonFormUrl: string;
  pokemonImageUrl: string;
};

export type StoreProps = {
  auth: Auth;
  profile: {champion: Pokemon};
  army: Pokemon[];
};
