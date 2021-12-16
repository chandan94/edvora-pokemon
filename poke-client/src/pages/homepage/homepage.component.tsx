import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { fetchAllPokemonStart } from '../../redux/pokemon/pokemon.action';
import { HomepageProps } from './homepage.types';


import Directory from '../../components/directory/directory.component';
import CusPagination from '../../components/pagination/pagination.component';

import './homepage.styles.scss';
import { createStructuredSelector } from 'reselect';
import { selectAllPokemon } from '../../redux/pokemon/pokemon.selector';

class HomePage extends React.Component<HomepageProps> {

    componentDidMount() {
        const { getAllPokemon } = this.props;
        getAllPokemon?.();
    }

    render() {
        const { allPokemon } = this.props;
        return (
            <div>
                <Directory pokemon={allPokemon} showFavAddBtn={true}/>
                <CusPagination />
            </div>
        );
    }
};

const mapStatetoProps = createStructuredSelector({
    allPokemon: selectAllPokemon,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getAllPokemon: () => dispatch(fetchAllPokemonStart()),
});

export default connect(mapStatetoProps, mapDispatchToProps)(HomePage);