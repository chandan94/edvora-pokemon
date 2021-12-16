import { useNavigate } from 'react-router';

import './icon-btn.styles.scss';
import { connect } from 'react-redux';

import { IconBtn } from './icon-btn.types';
import { Dispatch } from 'redux';
import { setCurrentUser } from '../../redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { fetchFavPokemonStart } from '../../redux/pokemon/pokemon.action';

const IconButton = ({ button : {iconName , btnName, url ,disabled} ,setCurrentUser, getFavPokemon}: IconBtn) => {
    const navigate = useNavigate();
    const navigateToURL = () => {
        if (url && url.length > 0) {
            if (url === "/favorite-pokemons") {
                getFavPokemon?.();
            }
            navigate(url);
        }
        if (!url && url.length===0 && btnName === 'Log Out')
        {
            setCurrentUser('');
            navigate('/sign-in-up');
        }
    }

    return (
        <div className={`icon icon-btn ${disabled ? 'disable-btn': ''} `} id="icon-btn-id" onClick={navigateToURL}>
            <i className={`bi bi-${iconName} custom-icon`}></i>

            {
                btnName && btnName.length > 0 ?  <p className="icon-btn-name">{btnName}</p> : null
            }
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser,
})

const mapDispatchToProps = (dispatch : Dispatch) => ({
    setCurrentUser: (payload: any) => dispatch(setCurrentUser(payload)),
    getFavPokemon: () => dispatch(fetchFavPokemonStart()),
});
export default connect(mapStateToProps,mapDispatchToProps)(IconButton);