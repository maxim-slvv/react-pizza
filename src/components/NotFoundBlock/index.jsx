import React from 'react';

import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock = () => {
  return (
    <div className={styles.text}>
      <span>😕</span>
      <br />
      <h1>404 Ничего не найдено!</h1>
      <p>К сожалению данная страница отсутсвует в нашем интернет магазине</p>
    </div>
  );
};
