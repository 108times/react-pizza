const initialState = {
  items: [],
  isLoaded: false,
};

const pizzas = (state = initialState, action) => {
  switch (action.type) {
    case 'pizzas/setPizzas':
      return {
        isLoaded: true,
        items: action.payload,
      };

    default:
      return state;
  }
};

export default pizzas;
