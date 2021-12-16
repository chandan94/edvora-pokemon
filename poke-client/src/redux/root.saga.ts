import { all, call } from 'redux-saga/effects';
import pokemonSaga from './pokemon/pokemon.sagas';

export default function* rootSaga() {
    yield all([
        call(pokemonSaga)
    ]);
}