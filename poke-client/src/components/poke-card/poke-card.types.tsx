import { Pokemon } from "../../redux/pokemon/pokemon.types";
import { ToastState } from "../../redux/toast/toast.types";

export interface PokeCardProps {
    pokemon: Pokemon,
    showToast?: (toast: ToastState) => void,
    showFavAddBtn: boolean,
    currentUser: string,
};