import axios from 'axios';
import {
  generateRandomPokemonNumber,
  getPokemonData,
  getPokemonImageUrl,
  MAX_POKEMON_NUMBER,
} from '../src/utils/pokemon_api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('generateRandomPokemonNumber', () => {
  it('should generate a random number between 1 and MAX_POKEMON_NUMBER', () => {
    const randomPokemonNumber = generateRandomPokemonNumber();
    expect(randomPokemonNumber).toBeGreaterThanOrEqual(1);
    expect(randomPokemonNumber).toBeLessThanOrEqual(MAX_POKEMON_NUMBER);
  });
});

describe('getPokemonData', () => {
  it('should return an object with empty name and url if an invalid pokemon number is specified', async () => {
    expect(await getPokemonData(0)).toEqual({name: '', url: ''});
  });

  it('should return an object with name and url when given a valid pokemon number', async () => {
    const mockedAxiosResponse = {data: {forms: [{name: 'bob', url: 'www'}]}};
    mockedAxios.get.mockResolvedValue(mockedAxiosResponse);

    const result = await getPokemonData(1);
    expect(result).toEqual(mockedAxiosResponse.data.forms[0]);
  });
});

describe('getPokemonImageUrl', () => {
  it('should return an empty string if no form url is provided', async () => {
    expect(await getPokemonImageUrl('')).toBe('');
  });

  it('should return a sprite url if a form url is provided', async () => {
    const mockedAxiosResponse = {data: {sprites: {front_default: 'url2'}}};
    mockedAxios.get.mockResolvedValue(mockedAxiosResponse);
    const result = await getPokemonImageUrl('url1');

    expect(result).toEqual(mockedAxiosResponse.data.sprites.front_default);
  });
});
