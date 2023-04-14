import React from 'react';

import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <span className={styles.span}>😕</span>
      <br />
      <h1 className={styles.h1}>404 Ничего не найдено!</h1>
      <p className={styles.p}>K сожалению данная страница отсутствует в нашем интернет магазине</p>
    </div>
  );
};
