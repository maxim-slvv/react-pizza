import { Header } from './components/Header';
import { Categories } from './components/Categories';
import { Sort } from './components/Sort';
import { PizzaCard } from './components/PizzaCard';

import './scss/app.scss';

function App() {
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
            <PizzaCard title="Мексиканская" price="500" />
            <PizzaCard title="Мексиканская" price="500" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
