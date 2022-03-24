import React from 'react';
import { Categories, SortPopup, PizzaBlock, PizzaLoadingBlock } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { setCategorty } from '../redux/actions/filter';

const categoryItems = ['Мясные', 'Вегатарианские', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
  { name: 'популярности', type: 'popular' },
  { name: 'цене', type: 'price' },
  { name: 'алфавиту', type: 'alphabet' },
];

function Home() {
  const pizzaLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const items = useSelector(({ pizzas }) => pizzas.items);
  const { category, sortBy } = useSelector(({ filters }) => filters);
  const dispatch = useDispatch();

  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategorty(index));
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories onClickItem={onSelectCategory} items={categoryItems} />
        <SortPopup items={sortItems} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {pizzaLoaded
          ? items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
          : Array(10)
              .fill(0)
              .map((_, index) => <PizzaLoadingBlock key={index} />)}
      </div>
    </div>
  );
}

export default Home;
