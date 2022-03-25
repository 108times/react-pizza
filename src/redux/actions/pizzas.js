import axios from "axios";

const setPizzas = (items) => ({
  type: "pizzas/setPizzas",
  payload: items,
});

const fetchPizzas = (sortBy, category) => (dispatch) => {
  console.log(sortBy, category);

  axios
    .get(
      `http://localhost:3001/pizzas/?${
        category !== null ? `category=${category}&` : "&"
      }_sort=${sortBy}&_order=asc`
    )
    .then(({ data }) => {
      setTimeout(() => {
        dispatch(setPizzas(data));
      }, 500);
    });
};

const setLoaded = (isLoaded) => ({
  type: "pizzas/setLoaded",
  payload: isLoaded,
});

export { setPizzas, fetchPizzas, setLoaded };
