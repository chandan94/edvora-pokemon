import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import FavPage from './pages/favorites/favorites.component';
import SignInUp from './pages/sign-in-up/sign-in-up.component';

import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selector';
import { AppProps } from './App.types';
import { connect } from 'react-redux';

import './App.css';


const App = ({ currentUser }: AppProps) => {
  return (
    <div>
      <Header />
      <Routes>
        <Route element={currentUser && currentUser.length > 0? <HomePage /> : <Navigate replace to="/sign-in-up" />} path="/" />
        <Route element={!currentUser? <SignInUp /> : <Navigate replace to="/" /> } path="/sign-in-up" />
        <Route element={currentUser && currentUser.length > 0? <FavPage /> : <Navigate replace to="/sign-in-up" /> } path="/favorite-pokemons" />
      </Routes>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(App);
