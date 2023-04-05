import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, setCategoryId } from '../redux/slices/filterSlice';

export function Categories() {
  const { categoryId } = useSelector(selectFilter);

  const dispatch = useDispatch();
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((obj, i) => {
          return (
            <li
              key={i}
              className={categoryId === i ? 'active' : ''}
              onClick={() => onChangeCategory(i)}>
              {obj}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
