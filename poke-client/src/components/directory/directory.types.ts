import { Pokemon } from "../../redux/pokemon/pokemon.types";

export interface DirectoryProps {
    pokemon: Pokemon[],
    showFavAddBtn: boolean,
}