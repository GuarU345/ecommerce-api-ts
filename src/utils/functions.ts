export const getTotal = (quantity: number, price: number) => {
  const total = quantity * price;
  return total;
};

export const getFinalTotal = (prices: number[]) => {
  let total = 0;
  for (let i = 0; i < prices.length; i++) {
    total += prices[i];
  }
  return total;
};
