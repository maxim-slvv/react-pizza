import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

export const Pagination = ({ onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4} //?будет отображаться 4 компонента
      pageCount={3} //?страниц будет 3 (в идеале backend должен вернуть число страниц
      //? и мы бы его сюда подставили)
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};
