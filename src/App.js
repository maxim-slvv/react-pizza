import React from 'react';
import axios from 'axios';

import { Header } from './components/Header';
import { Categories } from './components/Categories';
import { Sort } from './components/Sort';
import { PizzaCard } from './components/PizzaCard';
import { PizzaSkeleton } from './components/PizzaSkeleton';

import './scss/app.scss';

function App() {
  const [items, setItems] = React.useState([]);

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const func = async () => {
      try {
        setLoading(true);
        const pizzasResponse = await axios
          .get('https://640c843094ce1239b0af1fc8.mockapi.io/pizzas')
          .then((res) => res.data);
        setItems(pizzasResponse);
        setLoading(false);
      } catch (error) {
        alert(`Ошибка при получении списка пицц ${error}`);
      }
    };
    func();
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {loading
              ? [...new Array(6)].map((_, id) => <PizzaSkeleton key={id} />)
              : items.map((obj) => (
                  <PizzaCard
                    title={obj.title}
                    price={obj.price}
                    key={obj.id}
                    imageUrl={obj.imageUrl}
                    sizes={obj.sizes}
                    types={obj.types}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
