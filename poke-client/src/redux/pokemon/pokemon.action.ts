import { AllPokemon, Pokemon, pokemonActions } from "./pokemon.types";

export const fetchAllPokemonStart = () => ({
    type: pokemonActions.FETCH_ALL_POKEMON_START,
});

export const fetchAllPokemonSuccess = (allPokemon: AllPokemon) => ({
    type: pokemonActions.FETCH_ALL_POKEMON_SUCCESS,
    payload: allPokemon
});

export const fetchAllPokemonFailure = (err: Error) => ({
    type: pokemonActions.FETCH_ALL_POKEMON_FAILURE,
    payload: err
});

export const fetchFavPokemonStart = () => ({
    type: pokemonActions.FETCH_FAV_POKEMON_START,
});

export const fetchFavPokemonSuccess = (favPokemon: Pokemon[]) => ({
    type: pokemonActions.FETCH_FAV_POKEMON_SUCCESS,
    payload: favPokemon
});

export const fetchFavPokemonFailure = (err: Error) => ({
    type: pokemonActions.FETCH_FAV_POKEMON_FAILURE,
    payload: err
});

export const setPokemonSearch = (search: string) => ({
    type: pokemonActions.SET_SEARCH,
    payload: search
});