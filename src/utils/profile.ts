import store from '../store';
import {
  generateRandomPokemonNumber,
  getPokemonData,
  getPokemonImageUrl,
} from './pokemon_api';

const setProfilePokemonData = (name: string, url: string, imageUrl: string) => {
  store.update(s => {
    s.profile.champion.pokemonIndex = url.split('/').slice(-2, -1)[0];
    s.profile.champion.pokemonName = name;
    s.profile.champion.pokemonDisplayName =
      name.charAt(0).toUpperCase() + name.slice(1);
    s.profile.champion.pokemonFormUrl = url;
    s.profile.champion.pokemonImageUrl = imageUrl;
  });
};

export const setInitialProfile = async () => {
  const pokemon = await getProfilePokemon();
  const pokemonImageUrl = await getPokemonImageUrl(pokemon.url);

  setProfilePokemonData(pokemon.name, pokemon.url, pokemonImageUrl);
};

const getProfilePokemon = async () => {
  return await getPokemonData(generateRandomPokemonNumber());
};
