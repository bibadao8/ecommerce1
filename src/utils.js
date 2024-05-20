export const formatCurrency = (price) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

export const getTruePrice = (price, salePercent) => {
  return price - (price*salePercent/100)
};