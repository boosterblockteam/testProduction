export function formatCurrency(amount: number) {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    // useGrouping: false // Elimina esta líne si quieres el searador de miles
  });
}

export function formatCurrencyInteger(amount: number) {
  return formatCurrency(amount).substring(0, formatCurrency(amount).length - 3)
}

export function formatCurrencyDecimal(amount: number) {
  return formatCurrency(amount).substring(formatCurrency(amount).length - 3)
}