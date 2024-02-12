export const getTotal = (quantity: number, price: number) => {
  const total = quantity * price;
  return total;
};

export const getFinalTotal = (totals: any) => {
  let total = 0;
  for (let i = 0; i < totals.length; i++) {
    total += totals[i];
  }
  return total;
};
