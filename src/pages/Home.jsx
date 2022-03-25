import React from "react";
import {
  Categories,
  SortPopup,
  PizzaBlock,
  PizzaLoadingBlock,
} from "../components";
import { useSelector, useDispatch } from "react-redux";
import { setCategorty, setSortBy } from "../redux/actions/filter";
import { fetchPizzas, setLoaded } from "../redux/actions/pizzas";

const categoryItems = [
  "Мясные",
  "Вегатарианские",
  "Гриль",
  "Острые",
  "Закрытые",
];
const sortItems = [
  { name: "популярности", type: "popular" },
  { name: "цене", type: "price" },
  { name: "алфавиту", type: "name" },
];

function Home() {
  const pizzaLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const items = useSelector(({ pizzas }) => pizzas.items);
  const { category, sortBy } = useSelector(({ filters }) => filters);
  const dispatch = useDispatch();

  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategorty(index));
  }, []);

  const onSelectSort = React.useCallback((index) => {
    dispatch(setSortBy(index));
  });

  React.useEffect(() => {
    dispatch(setLoaded(false));
    dispatch(fetchPizzas(sortBy, category));
  }, [category, sortBy]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoryItems}
        />
        <SortPopup
          activeSort={sortBy}
          onClickSortType={onSelectSort}
          items={sortItems}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {pizzaLoaded
          ? // (category !== null
            //   ? items.filter((item) => item.category === category)
            //   : items
            // )
            items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
          : Array(10)
              .fill(0)
              .map((_, index) => <PizzaLoadingBlock key={index} />)}
      </div>
    </div>
  );
}

export default Home;
