import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import toastReducer from './toast/toast.reducer';
import paginatonReducer from './pagination/pagination.reducer';
import pokemonReducer from './pokemon/pokemon.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist:['cart', 'user']
}

const rootReducer = combineReducers({
    user: userReducer,
    toast: toastReducer,
    page: paginatonReducer,
    pokemon: pokemonReducer,
});

export default persistReducer(persistConfig, rootReducer);