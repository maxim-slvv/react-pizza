import React from 'react';

export function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const onClickCategory = (i) => {
    setActiveIndex(i);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((obj, i) => {
          return (
            <li
              key={i}
              className={activeIndex === i ? 'active' : ''}
              onClick={() => onClickCategory(i)}>
              {obj}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
