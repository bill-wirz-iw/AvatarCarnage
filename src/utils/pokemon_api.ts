import axios from 'axios';

interface GetProfilePokemonResponse {
  name: string;
  url: string;
}

export const MAX_POKEMON_NUMBER = 400;

export const generateRandomPokemonNumber = () => {
  return Math.floor(Math.random() * MAX_POKEMON_NUMBER);
};

export const getPokemonData = async (pokemonNumber: number) => {
  if (pokemonNumber < 1 || pokemonNumber > MAX_POKEMON_NUMBER) {
    return {name: '', url: ''} as GetProfilePokemonResponse;
  }

  interface SinglePokemonMainDataResponse {
    forms: [GetProfilePokemonResponse];
  }

  const pokemonData: SinglePokemonMainDataResponse = (
    await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`)
  ).data;

  return pokemonData.forms[0];
};

export const getPokemonImageUrl = async (formUrl: string) => {
  if (!formUrl) {
    return '';
  }

  interface PokemonFormDataResponse {
    sprites: {
      front_default: string;
    };
  }

  const pokemonFormData: PokemonFormDataResponse = (await axios.get(formUrl))
    .data;

  return pokemonFormData.sprites.front_default;
};
