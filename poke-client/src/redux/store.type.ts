import { PaginationState } from "./pagination/pagination.types";
import { PokemonState } from "./pokemon/pokemon.types";
import { ToastState } from "./toast/toast.types";
import { UserState } from "./user/user.types";

export interface RootState {
    user: UserState,
    toast: ToastState,
    page: PaginationState,
    pokemon: PokemonState,
}

export default RootState;