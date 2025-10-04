export const fetchCountries = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all?fields=name,currencies");
  const data = await res.json();
  return data.map(country => ({
    name: country.name.common,
    currency: Object.keys(country.currencies || {})[0],
  }));
};

export const convertCurrency = async (base, target, amount) => {
  const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
  const data = await res.json();
  const rate = data.rates[target];
  return (amount * rate).toFixed(2);
};
