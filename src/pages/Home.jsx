import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

import { SearchContext } from '../App';
import { Categories } from '../components/Categories';
import { Sort, list } from '../components/Sort';
import { PizzaCard } from '../components/PizzaCard';
import { PizzaSkeleton } from '../components/PizzaSkeleton';
import { Pagination } from '../components/Pagination';

export function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sortType, orderType, currentPage } = useSelector((state) => state.filter);
  const { items, status } = useSelector((state) => state.pizzas);
  const { searchValue } = React.useContext(SearchContext);

  //TODO: сделать сортировку для цен в обратную сторону

  const getPizzas = async () => {
    const page = `&page=${currentPage}&limit=4`;
    const category = categoryId ? `category=${categoryId}` : '';
    const sortBy = sortType.sortProperty ? `&sortBy=${sortType.sortProperty}` : '';
    const order = orderType ? `&order=${orderType}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchPizzas({ page, category, sortBy, order, search }));
  };

  //TODO: при обновлении страницы сделать так что бы отправлялся запрос
  //*это был переломный 15 видос
  React.useEffect(() => {
    if (isMounted.current) {
      //!ПОНАЧАЛУ ЭТОГО НЕ БУДЕТ
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
        orderType,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
    // eslint-disable-next-line
  }, [categoryId, sortType, orderType, searchValue, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
    // eslint-disable-next-line
  }, [categoryId, sortType, orderType, searchValue, currentPage]);

  const pizzas = items.map((obj) => (
    <PizzaCard
      title={obj.title}
      price={obj.price}
      key={obj.id}
      id={obj.id}
      imageUrl={obj.imageUrl}
      sizes={obj.sizes}
      types={obj.types}
    />
  ));
  //TODO: вернуть фэйковый массив на 6 пицц - или не надо будет...
  const skeletons = [...new Array(4)].map((_, id) => <PizzaSkeleton key={id} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {/* //TODO: сделать отдельное окошко для пиццы которое будет высвечиваться поверх Всего
      //TODO: там будут добавки и все это будет компоноваться в массив и передаваться в backend
      //TODO: тоесть такой же функционал как на сайте
      //TODO: при выборе другого теста - меняется картинка
      //TODO: при выборе друго размера - меняется размер
      //TODO: тоесть налету меняется картинка и потом медленно сужение изображения
      //TODO: а в корзине будут высвечиваться добавки и прочее */}
      <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      <Pagination />
    </div>
  );
}
