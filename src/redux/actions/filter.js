const setSortBy = (name) => ({
  type: 'filters/setSortBy',
  payload: name,
});

const setCategorty = (catIndex) => ({
  type: 'filters/setCategory',
  payload: catIndex,
});

export { setSortBy, setCategorty };
