import axios from 'axios';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = React.useState<{
    description: string;
    imageUrl: string;
    id: string;
    title: string;
    price: number;
  }>();

  React.useEffect(() => {
    const getPizza = async () => {
      try {
        const { data } = await axios.get(
          `https://640c843094ce1239b0af1fc8.mockapi.io/pizzas/${id}`,
        );
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы');
        navigate('/');
      }
    };
    getPizza();
    // eslint-disable-next-line
  }, []);

  if (!pizza) {
    return <div>загрузка...</div>;
  }
  return (
    <div className="container">
      <div className="fullpizza">
        <div className="fullpizza__top">
          <img className="fullpizza__image" src={pizza.imageUrl} alt="" />
          <div className="fullpizza__title">
            <h2 className="pizza-block__title">{pizza.title}</h2>
          </div>
          <span className="fullpizza__description">{pizza.description}</span>
        </div>
        <div className="fullpizza__bottom">
          <Link to="/">
            <button className="button button--outline button--add go-back-btn">
              <span>Вернуться назад</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default FullPizza;
