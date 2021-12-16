import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { fetchFavPokemonStart } from '../../redux/pokemon/pokemon.action';
import { FavPageProps } from './favorites.types';

import Directory from '../../components/directory/directory.component';

import { createStructuredSelector } from 'reselect';
import { selectFavPokemon } from '../../redux/pokemon/pokemon.selector';

import './favorites.styles.scss';


class FavPage extends React.Component<FavPageProps> {

    componentDidMount() {
        const { getFavPokemon } = this.props;
        getFavPokemon?.();
    }

    render() {
        const { favPokemon } = this.props;
        return (
            <div>
                <Directory pokemon={favPokemon} showFavAddBtn={false}/>
            </div>
        );
    }
};

const mapStatetoProps = createStructuredSelector({
    favPokemon: selectFavPokemon,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getFavPokemon: () => dispatch(fetchFavPokemonStart()),
});

export default connect(mapStatetoProps, mapDispatchToProps)(FavPage);