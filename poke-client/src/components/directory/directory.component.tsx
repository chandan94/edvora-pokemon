// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
// import { selectAllPokemon } from '../../redux/pokemon/pokemon.selector';
import { Pokemon } from '../../redux/pokemon/pokemon.types';
import PokeCard from '../poke-card/poke-card.component';

import './directory.styles.scss';
import { DirectoryProps } from './directory.types';

const Directory = ({ pokemon, showFavAddBtn }: DirectoryProps) => {
    return (
        <div className="directory">
            {
                pokemon.map((pokemon: Pokemon, index) => {
                    return (
                        <PokeCard key={index + 1} pokemon={pokemon} showFavAddBtn={showFavAddBtn}/>
                    )
                })
            }
        </div>
    )
}

export default Directory;