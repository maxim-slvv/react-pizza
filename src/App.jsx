import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './redux/slices/filterSlice';

// import { Header } from './components/Header';
// import { Home } from './pages/Home';
// import { Cart } from './pages/Cart';
// import { NotFound } from './pages/NotFound';

import './scss/app.scss';

// export const SearchContext = React.createContext({});

export function App() {
  // const [searchValue, setSearchValue] = React.useState('');

  const count = useSelector((state) => state.filter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button aria-label="Increment value" onClick={() => dispatch(increment())}>
          Increment
        </button>
        <span>{count}</span>
        <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          Decrement
        </button>
      </div>
    </div>
    // <SearchContext.Provider value={{ searchValue, setSearchValue }}>
    //   <div className="wrapper">
    //     <Header />
    //     <div className="content">
    //       <Routes>
    //         <Route path="/" element={<Home />} />
    //         <Route path="/cart" element={<Cart />} />
    //         <Route path="*" element={<NotFound />} />
    //       </Routes>
    //     </div>
    //   </div>
    // </SearchContext.Provider>
  );
}
