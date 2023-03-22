import React from 'react';
import axios from 'axios';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaCard } from '../components/PizzaCard';
import { PizzaSkeleton } from '../components/PizzaSkeleton';
import { Pagination } from '../components/Pagination';

export function Home({ searchValue }) {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({ name: 'популярности', sortProperty: 'rating' });
  //TODO: сделать сортировку для цен в обратную сторону
  const [orderType, setOrderType] = React.useState('asc');

  const page = `&page=${currentPage}&limit=4`;
  const category = categoryId ? `category=${categoryId}` : '';
  const sortBy = sortType.sortProperty ? `&sortBy=${sortType.sortProperty}` : '';
  const order = orderType ? `&order=${orderType}` : '';
  const search = searchValue ? `&search=${searchValue}` : '';

  React.useEffect(() => {
    const func = async () => {
      try {
        setLoading(true);
        const pizzasResponse = await axios
          .get(
            `https://640c843094ce1239b0af1fc8.mockapi.io/pizzas?${page}${category}${sortBy}${order}${search}`,
          )
          .then((res) => res.data);
        setItems(pizzasResponse);
        setLoading(false);
      } catch (error) {
        alert(`Ошибка при получении списка пицц ${error}`);
      }
    };
    func();
    window.scrollTo(0, 0);
  }, [categoryId, sortType, orderType, searchValue, currentPage]);

  const pizzas = items.map((obj) => (
    <PizzaCard
      title={obj.title}
      price={obj.price}
      key={obj.id}
      imageUrl={obj.imageUrl}
      sizes={obj.sizes}
      types={obj.types}
    />
  ));

  const skeletons = [...new Array(6)].map((_, id) => <PizzaSkeleton key={id} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)} />
        <Sort
          value={sortType}
          onChangeSort={(obj) => setSortType(obj)}
          isMoreOrLess={(bool) => setOrderType(bool)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{loading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}
