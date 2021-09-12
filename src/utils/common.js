export const getNumberWithSpaces = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ` `);
};

export const getCapitalizedWord = (word) => {
  return word[0].toUpperCase() + word.substr(1);
};
