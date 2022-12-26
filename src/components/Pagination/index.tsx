import React from 'react';
import ReactPaginate from 'react-paginate';
import {useDispatch, useSelector} from "react-redux";

import {onChangePage} from "../../redux/slices/filterSlice";
import styles from './Pagination.module.scss'


export const Pagination: React.FC = () => {


    // @ts-ignore
    const currentPage = useSelector(state => state.filterPizza.currentPage)
    const dispatch = useDispatch()

    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(event) => dispatch(onChangePage(event.selected + 1))}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage - 1}
        />
    );
};
