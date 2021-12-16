import { Pokemon } from "../../redux/pokemon/pokemon.types";

export interface HomepageProps {
    getAllPokemon?: () => void,
    allPokemon: Pokemon[],
}