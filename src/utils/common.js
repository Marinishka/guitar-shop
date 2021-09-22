export const numberFormatter = new Intl.NumberFormat();

export const getCapitalizedWord = (word) => {
  return word[0].toUpperCase() + word.substr(1);
};

export const sortFunctionToLargest = (parameter) => {
  return function (num1, num2) {
    return num1[parameter] - num2[parameter];
  };
};

export const sortFunctionToSmallest = (parameter) => {
  return function (num1, num2) {
    return num2[parameter] - num1[parameter];
  };
};
