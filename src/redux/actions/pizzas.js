import axios from 'axios';

const setPizzas = (items) => ({
  type: 'pizzas/setPizzas',
  payload: items,
});

const fetchPizzas = () => (dispatch) => {
  axios.get('http://localhost:3001/pizzas').then(({ data }) => {
    setTimeout(() => {
      dispatch(setPizzas(data));
    }, 1000);
  });
};

export { setPizzas, fetchPizzas };
