import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const FullPizza: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    id: string;
    title: string;
    price: number;
  }>();
  console.log(pizza);
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
  }, []);

  if (!pizza) {
    return <div>загрузка...</div>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} width={200} height={200} alt="" />
      <h2>{pizza.id}</h2>
      <p>{pizza.title}</p>
      <h4>{pizza.price} БУБЛИКОВ</h4>
    </div>
  );
};
