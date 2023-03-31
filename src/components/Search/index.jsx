import React from 'react';
import debounce from 'lodash.debounce';

import { SearchContext } from '../../App';

import styles from './Search.module.scss';

export const Search = () => {
  const { setSearchValue } = React.useContext(SearchContext);

  const [value, setValue] = React.useState('');

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      console.log(str);
      setSearchValue(str);
    }, 250),
    [],
  );

  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const inputRef = React.useRef();
  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  };

  return (
    <div className={styles.block}>
      <input
        onChange={(e) => onChangeInput(e)}
        ref={inputRef}
        value={value}
        className={styles.input}
        placeholder="Поиск Пиццы..."
      />
      <svg
        className="svgOne"
        height="512px"
        id="Layer_1"
        version="1.1"
        viewBox="0 0 512 512"
        width="512px"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M448.3,424.7L335,311.3c20.8-26,33.3-59.1,33.3-95.1c0-84.1-68.1-152.2-152-152.2c-84,0-152,68.2-152,152.2  s68.1,152.2,152,152.2c36.2,0,69.4-12.7,95.5-33.8L425,448L448.3,424.7z M120.1,312.6c-25.7-25.7-39.8-59.9-39.8-96.3  s14.2-70.6,39.8-96.3S180,80,216.3,80c36.3,0,70.5,14.2,96.2,39.9s39.8,59.9,39.8,96.3s-14.2,70.6-39.8,96.3  c-25.7,25.7-59.9,39.9-96.2,39.9C180,352.5,145.8,338.3,120.1,312.6z" />
      </svg>
      {value && (
        <svg
          onClick={() => onClickClear('')}
          className="svgTwo"
          height="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" />
          <path d="M0 0h48v48H0z" fill="none" />
        </svg>
      )}
    </div>
  );
};
