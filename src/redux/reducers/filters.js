const initialState = {
  category: 0,
  sortBy: 'rating',
};

const filters = (state = initialState, action) => {
  switch (action.type) {
    case 'filters/setSortBy':
      return {
        ...state,
        sortBy: action.payload,
      };

    case 'filters/setCategory':
      return {
        ...state,
        category: action.payload,
      };

    default:
      return state;
  }
};

export default filters;
