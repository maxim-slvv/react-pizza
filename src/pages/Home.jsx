import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { setFilters } from '../redux/slices/filterSlice';

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

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  //TODO: сделать сортировку для цен в обратную сторону

  //!изолировал код получения данных из redux и занесения их в переменные, асинхронный запрос
  //!пока не выполнится fetchPizzas - код не отработает
  const fetchPizzas = () => {
    setLoading(true);
    const page = `&page=${currentPage}&limit=4`;
    const category = categoryId ? `category=${categoryId}` : '';
    const sortBy = sortType.sortProperty ? `&sortBy=${sortType.sortProperty}` : '';
    const order = orderType ? `&order=${orderType}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    const func = async () => {
      try {
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
  };
  //!ВШИТИЕ ДАННЫХ В URL
  //!если был первый рендер - при изменении сортировки - то вшиваем данные в url
  //!68 меняем параметр и в следующий раз код отработает снова и снова
  //! потому что надо было его изолировать только от первого рендера

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
    isMounted.current = true; //! мы говорим что был первый рендер
    // eslint-disable-next-line
  }, [categoryId, sortType, orderType, searchValue, currentPage]);

  //! при первом рендере, проверяем URl-параметры и сохраняем в редуксе
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
      isSearch.current = true; //! сделает true если при первом рендере было
      //!что то указано в поисковой строке
      //!и это меняется только при первом рендере
      //* да от меня зависит
    }
    // eslint-disable-next-line
  }, []);

  //! Если был первый рендер то запрашиваем пиццы
  //!но запрашиваем их если пусто в поисковом запросе
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas(); //!
      //! значение по уморчанию у наc false - сработает условие
      //* (или сразу не сработает, зависит от кода выше)
      //! и ниже снова переключатель на false
      //! как они запрашиваются - если в url ничего нету - то рендерим fetchPizzas
      //! если что то было то сначала занесутся данные в state - а затем этот же useEffect
      //! услышит что поменялись переменные за которыми следит и только тогда мы выполним тело этой функции
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
      <div className="content__items">{loading ? skeletons : pizzas}</div>
      <Pagination />
    </div>
  );
}
