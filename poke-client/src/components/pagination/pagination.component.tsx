import { Pagination } from "react-bootstrap";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectActivePage, selectTotalPage } from "../../redux/pagination/pagination.selector";
import { IPagingProps } from "./pagination.types";

import './pagination.styles.scss';
import { Dispatch } from "redux";
import { setActivePageNumber } from "../../redux/pagination/pagination.action";
import { fetchAllPokemonStart } from "../../redux/pokemon/pokemon.action";

const CusPagination = ({active, total, setActivePage, search, getAllPokemon }: IPagingProps) => {

    const pages = [];

    const handlePageClick = (e: any) => {
        const page = Number.parseInt(e.target.text, 10);
        if (setActivePage) {
            setActivePage(page);
            getAllPokemon?.()
        }
    }

    const totalCount = total ? total : 0;

    let pageCount = (totalCount / 100);

    if (totalCount  % 100!== 0) {
        pageCount = pageCount + 1;
    }


    if(total) {
        for (let num = 1; num <= pageCount; num++) {
            pages.push(
                <Pagination.Item key={total + 1 + num} active={num === active} onClick={handlePageClick} >
                {num}
                </Pagination.Item>,
            );
        }
    }


    return (
        <div className={`ice-paging`}>
            <Pagination size="lg">{pages}</Pagination>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    total : selectTotalPage,
    active : selectActivePage,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setActivePage: (page: number) => dispatch(setActivePageNumber(page)),
    getAllPokemon: () => dispatch(fetchAllPokemonStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CusPagination);