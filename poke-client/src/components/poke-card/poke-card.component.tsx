import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';

import { PokeCardProps } from './poke-card.types';
import { ToastState } from '../../redux/toast/toast.types';
import { setToastComp } from '../../redux/toast/toast.actions';
import pokeConstants from '../../constants/poke.constants';

import ToastNotification from '../../components/toast/toast.component';
import './poke-card.styles.scss';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';

const PokeCard = ({ pokemon, showToast, currentUser, showFavAddBtn }: PokeCardProps) => {

    const { POKEMON_IMG_URL, FAV_POKE_URL } = pokeConstants;
    const { name, url } = pokemon;
    const id = url.slice(url.indexOf("pokemon") + "pokemon/".length, url.lastIndexOf("/"));
    const srcUrl = `${POKEMON_IMG_URL}${id}.png`;

    const handleAddFavPokemon = () => {
        axios.post(FAV_POKE_URL,
            {
            pokemonId: id,
            name,
            url,
            defaultImg: srcUrl,
            user: currentUser
        }, {
            headers: {"Access-Control-Allow-Origin": "*"}
        })
        .then(resp => {
            const toast = {
                show: true,
                header: "Add Favorite",
                msg: `${name} added to your favorite pokemon list successfully`,
                variant: "success",
            };
            if (resp.status !== 201) {
                toast.msg = `Failed to add ${name} to your favorite pokemon list, please try again later.`
                toast.variant = "warning"
            }
            showToast?.(toast)
        })
        .catch(err => {
            console.error(err);
        })
    }

    return (
        <div className="poke-card">
            <Card>
                <Card.Img variant="top" src={srcUrl} />
                <Card.Body>
                    <Card.Title>{name ? name.slice(0, 1).toUpperCase() + name.slice(1) : ''}</Card.Title>
                </Card.Body>
                {
                    showFavAddBtn?
                    <Card.Footer>
                    <Button variant="dark" type="button" onClick={handleAddFavPokemon}>
                        Add as Favorite
                    </Button>
                    </Card.Footer> : null
                }
            </Card>
            <ToastNotification />
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch : Dispatch) => ({
    showToast: (show: ToastState) => dispatch(setToastComp(show)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PokeCard);