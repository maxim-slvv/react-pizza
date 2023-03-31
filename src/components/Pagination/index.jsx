import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filterSlice';

import styles from './Pagination.module.scss';

export const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.filter.currentPage);
  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
      forcePage={currentPage - 1}
      pageRangeDisplayed={4} //?будет отображаться 4 компонента
      pageCount={3} //?страниц будет 3 (в идеале backend должен вернуть число страниц
      //? и мы бы его сюда подставили)
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};
