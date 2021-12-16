import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';

import IconButton from '../icon-btn/icon-btn.component';
import { IconBtnProps } from '../icon-btn/icon-btn.types';
import { createStructuredSelector } from "reselect";

import { Dispatch } from 'redux';
import { HeaderProps } from './header.types';

import './header.styles.scss';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { setPokemonSearch, fetchAllPokemonStart } from '../../redux/pokemon/pokemon.action';

const Header = ({ currUser, setSearch, getAllPokemon } : HeaderProps ) => {

    const navigate = useNavigate();


    const signIn: IconBtnProps = {
        iconName: "person-check-fill",
        btnName: "Sign In",
        url: "/sign-in-up",
        quantity: 0,
        disabled: false,
    }
    const logOut : IconBtnProps = {
        iconName : "person-check-fill",
        btnName : "Log Out",
        url : "",
        quantity:0,
        disabled : false
    }

    const fav : IconBtnProps = {
        iconName : "heart-fill",
        btnName : "Favorites",
        url : "/favorite-pokemons",
        quantity:0,
        disabled : false
    }


    // const handleSearchFormSubmit = (e: any) => {
    //     e.preventDefault();
    // }

    // const handleEmptySearch = (e: any) => {
    //     const searchBar: any = document.getElementById("search-bar");
    //     const searchValue = searchBar ? searchBar.value : "";
    //     if (searchValue.length === 0) {
    //         setSearch?.("");
    //         getAllPokemon?.();
    //     }
    // }

    // const handleSearch = () => {
    //     const searchBar: any = document.getElementById("search-bar")
    //     const searchValue = searchBar ? searchBar.value : "";
    //     if (searchValue.length > 0) {
    //         setSearch?.(searchValue);
    //         getAllPokemon?.();
    //     }
    // }

    const handleBrandClick = () => {
        navigate("/");
        getAllPokemon?.();
    }

    const handleNavSelect = (selectedKey: string | null) => navigate(selectedKey ? selectedKey : "", { replace: true });

    return (
        <Navbar className="header" bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand href="" onClick={handleBrandClick}>
                    Pokedex
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav onSelect={handleNavSelect} id="poke-nav" className="justify-content-center">
                        {/* <Form className="d-flex" onSubmit={handleSearchFormSubmit}>
                            <FormControl
                                type="search"
                                placeholder="Search Pokemon names..."
                                className="search-bar"
                                aria-label="Search"
                                id="search-bar"
                                onChange={handleEmptySearch}
                            />
                            <Button variant="outline-light search-icon" onClick={handleSearch}><i className="bi bi-search"></i></Button>
                        </Form> */}
                        <div className="icon-btn-group">
                            {
                                currUser ?
                                <IconButton button={fav} />
                                : null
                            }
                            {
                                currUser ?
                                    <IconButton button={logOut} />
                                :   <IconButton button={signIn} />
                            }
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

const mapStateToProps = createStructuredSelector({
    currUser : selectCurrentUser,
});

const mapDispatchToProps = (dispatch : Dispatch) => ({
    setSearch: (search : string) => dispatch(setPokemonSearch(search)),
    getAllPokemon: () => dispatch(fetchAllPokemonStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);