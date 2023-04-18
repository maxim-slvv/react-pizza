import React from 'react';

import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { setFilters, selectFilter, FilterSlice, SortInclude } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzas } from '../redux/slices/pizzasSlice';

import { Pagination, PizzaSkeleton, PizzaCard, Categories, Sort, list } from '../components';

import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sortType, orderType, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzas);

  //TODO: сделать сортировку для цен в обратную сторону
  var page = `&page=${currentPage}&limit=4`;
  var category = categoryId ? `&category=${categoryId}` : '';
  var sortBy = sortType.sortProperty ? `&sortBy=${sortType.sortProperty}` : '';
  var order = orderType ? `&order=${orderType}` : '';
  var search = searchValue ? `&search=${searchValue}` : '';
  const getPizzas = async () => {
    dispatch(fetchPizzas({ page, category, sortBy, order, search }));
  };

  React.useEffect(() => {
    if (isMounted.current) {
      //!ПОНАЧАЛУ ЭТОГО НЕ БУДЕТ
      const queryString = qs.stringify({
        currentPage,
        categoryId,
        sortProperty: sortType.sortProperty,
        orderType,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
    //TODO: при обновлении страницы сделать так что бы отправлялся запрос
    //*это был переломный 15 видос
    //TODO: убрал отрицание - потом если что пофиксить
    if (window.location.search) {
      dispatch(fetchPizzas({ page, category, sortBy, order, search }));
    }
    //TODO удалить searchValue
    // eslint-disable-next-line
  }, [categoryId, sortType, orderType, searchValue, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      const objFilter = {
        ...params,
        sort,
      } as FilterSlice & SortInclude;
      dispatch(setFilters(objFilter));
      isSearch.current = true;
    }
    // eslint-disable-next-line
  }, [categoryId]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
    // eslint-disable-next-line
  }, [categoryId, sortType, orderType, searchValue, currentPage]);
  //TODO типизировать

  const pizzas = items.map((obj: any) => (
    <PizzaCard
      key={obj.id}
      id={obj.id}
      imageUrl={obj.imageUrl}
      title={obj.title}
      sizes={obj.sizes}
      types={obj.types}
      price={obj.price}
      count={obj.count}
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
      {categoryId === 0 && <Pagination />}
    </div>
  );
};
export default Home;
