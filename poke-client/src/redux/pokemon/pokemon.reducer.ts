import { pokemonActions } from "./pokemon.types";

const INITIAL_STATE = {
    allPokemon: [],
    isAllPokemonFetching: false,
    allPokemonError: null,
    isFavPokemonFetching: false,
    favPokemon: [],
    favPokemonError: null,
    search: ''
};

const pokemonReducer = (state = INITIAL_STATE, action: any) => {
    const { type, payload } = action;
    switch (type) {
        case pokemonActions.FETCH_ALL_POKEMON_START:
            return {
                ...state,
                isAllPokemonFetching: true,
            };
        case pokemonActions.FETCH_ALL_POKEMON_SUCCESS:
            return {
                ...state,
                isAllPokemonFetching: false,
                allPokemon: payload,
            };
        case pokemonActions.FETCH_ALL_POKEMON_FAILURE:
            return {
                ...state,
                isAllPokemonFetching: false,
                allPokemonError: payload,
            }
        case pokemonActions.FETCH_FAV_POKEMON_START:
            return {
                ...state,
                isFavPokemonFetching: true,
            };
        case pokemonActions.FETCH_FAV_POKEMON_SUCCESS:
            return {
                ...state,
                isFavPokemonFetching: false,
                favPokemon: payload,
            };
        case pokemonActions.FETCH_FAV_POKEMON_FAILURE:
            return {
                ...state,
                isFavPokemonFetching: false,
                favPokemonError: payload,
            };
        case pokemonActions.SET_SEARCH:
            return {
                ...state,
                search: payload,
            }
        default:
            return state;
    }
}

export default pokemonReducer;