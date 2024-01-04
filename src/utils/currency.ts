export function formatCurrency(currency: string, amount: number) {
  return new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: currency,
  }).format(amount);
}

export function convertPointsToDollarAmount(balance: number) {
  return balance / 10;
}
