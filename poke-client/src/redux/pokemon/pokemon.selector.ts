import { createSelector } from "reselect";
import { RootState } from "../store.type";
import { PokemonState } from "./pokemon.types";

export const selectPokemon = (state: RootState) => state.pokemon;

export const selectAllPokemon = createSelector (
    [selectPokemon],
    (pokemon: PokemonState) => pokemon.allPokemon,
)

export const selectFavPokemon = createSelector(
    [selectPokemon],
    (pokemon: PokemonState) => pokemon.favPokemon
)

export const selectPokemonSearch = createSelector(
    [selectPokemon],
    (pokemon: PokemonState) => pokemon.search
)