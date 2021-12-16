export const pokemonActions = {
    FETCH_ALL_POKEMON_START : 'FETCH_ALL_POKEMON_START',
    FETCH_ALL_POKEMON_SUCCESS : 'FETCH_ALL_POKEMON_SUCCESS',
    FETCH_ALL_POKEMON_FAILURE : 'FETCH_ALL_POKEMON_FAILURE',
    ADD_FAV_POKEMON_START : 'ADD_FAV_POKEMON_START',
    ADD_FAV_POKEMON_SUCCESS : 'ADD_FAV_POKEMON_SUCCESS',
    ADD_FAV_POKEMON_FAILURE : 'ADD_FAV_POKEMON_FAILURE',
    FETCH_FAV_POKEMON_START : 'FETCH_FAV_POKEMON_START',
    FETCH_FAV_POKEMON_SUCCESS : 'FETCH_FAV_POKEMON_SUCCESS',
    FETCH_FAV_POKEMON_FAILURE : 'FETCH_FAV_POKEMON_FAILURE',
    SET_SEARCH : 'SET_SEARCH',
}

export interface AllPokemon {
    count: number,
    results: Pokemon[]
};

export interface Pokemon {
    name: string,
    url: string,
}

export interface PokemonDirectoryState {
    pokemon: Pokemon[]
}

export interface PokemonState {
    isAllPokemonFetching: boolean,
    allPokemonError: Error | null,
    isFavPokemonFetching: boolean,
    favPokemonError: Error | null,
    allPokemon: Pokemon[],
    favPokemon: Pokemon[],
    search: string,
}