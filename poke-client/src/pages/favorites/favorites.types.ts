import { Pokemon } from "../../redux/pokemon/pokemon.types";

export interface FavPageProps {
    getFavPokemon: () => void,
    favPokemon: Pokemon[]
}