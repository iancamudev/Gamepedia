export const descendent = (arr) => {
  arr.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return arr;
};

export const ascendent = (arr) => {
  arr.sort((a, b) => {
    if (a.name > b.name) {
      return -1;
    }
    if (a.name < b.name) {
      return 1;
    }
    return 0;
  });
  return arr;
};

export const ratingAsc = (arr) => {
  arr.sort((a, b) => {
    if (a.rating < b.rating) return -1;
    if (a.rating > b.rating) return 1;
    return 0;
  });
  return arr;
};

export const ratingDesc = (arr) => {
  arr.sort((a, b) => {
    if (a.rating > b.rating) return -1;
    if (a.rating < b.rating) return 1;
    return 0;
  });
  return arr;
};
