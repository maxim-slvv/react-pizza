import React from 'react';

export function Categories({ value, onChangeCategory }) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((obj, i) => {
          return (
            <li key={i} className={value === i ? 'active' : ''} onClick={() => onChangeCategory(i)}>
              {obj}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
