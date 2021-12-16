import { takeLatest, all, call, put, select } from "redux-saga/effects";
import { axiosGetCall, axiosPostCall } from "../../util/axios.util";
import { fetchAllPokemonFailure, fetchAllPokemonSuccess, fetchFavPokemonSuccess } from "./pokemon.action";
import { pokemonActions } from "./pokemon.types";
import pokeConstants from "../../constants/poke.constants";
import { setTotalPageCount } from "../pagination/pagination.action";
import { selectCurrentUser } from "../user/user.selector";
import { selectActivePage } from "../pagination/pagination.selector";
import { selectPokemonSearch } from "./pokemon.selector";

export function* fetchAllPokemon(): Generator<any, any, any>{
    try {
        const page = yield select(selectActivePage);
        const search = yield select(selectPokemonSearch)
        const getAllPokemonResp = yield axiosGetCall(pokeConstants.POKEMON_BASE_URL, search, page);
        const { count , results } = getAllPokemonResp;
        yield put(setTotalPageCount(count));
        yield put(fetchAllPokemonSuccess(results));
    } catch (err: any) {
        yield put(fetchAllPokemonFailure(err));
    }
}

export function* fetchFavPokemonStartSaga() {
    yield takeLatest(pokemonActions.FETCH_FAV_POKEMON_START, fetchFavPokemon);
}

export function* fetchFavPokemon(): Generator<any, any, any>{
    try {
        const { FAV_POKE_URL, GET_FAV_LIST } = pokeConstants;
        const curerntUser = yield select(selectCurrentUser);
        const favPokemon = yield axiosPostCall(FAV_POKE_URL + GET_FAV_LIST, "", {
            user: curerntUser
        });
        // const { count , results } = getAllPokemonResp;
        // yield put(setTotalPageCount(count));
        yield put(fetchFavPokemonSuccess(favPokemon));
    } catch (err: any) {
        yield put(fetchAllPokemonFailure(err));
    }
}

export function* fetchAllPokemonStartSaga() {
    yield takeLatest(pokemonActions.FETCH_ALL_POKEMON_START, fetchAllPokemon);
}

export default function* pokemonSaga() {
    yield all([
        call(fetchAllPokemonStartSaga),
        call(fetchFavPokemonStartSaga)
    ]);
}