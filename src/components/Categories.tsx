import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, setCategoryId } from '../redux/slices/filterSlice';
import { useWhyDidYouUpdate } from 'ahooks';

export const Categories: React.FC = React.memo(() => {
  const { categoryId } = useSelector(selectFilter);
  const dispatch = useDispatch();
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  //TODO типизировать id
  const onChangeCategory = (id: any) => {
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
});
