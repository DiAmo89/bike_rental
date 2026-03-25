const BIKE_TEXT_INPUT_REGEX = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\s.,'"()\-]*$/;
const BIKE_TEXT_REGEX = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\s.,'"()\-]+$/;
const BIKE_PRICE_INPUT_REGEX = /^\d*(\.\d{0,2})?$/;

export function isValidBikeTextInput(value: string) {
  return BIKE_TEXT_INPUT_REGEX.test(value);
}

export function isValidBikePriceInput(value: string) {
  return value === "" || BIKE_PRICE_INPUT_REGEX.test(value);
}

export function validateBikeTextField(fieldName: string, value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  if (!BIKE_TEXT_REGEX.test(trimmedValue)) {
    return `${fieldName} contains unsupported special characters`;
  }

  return null;
}

export function validateBikePrice(price: string) {
  if (!price.trim()) {
    return "Price per day must be a valid number";
  }

  const parsedPrice = Number(price);

  if (Number.isNaN(parsedPrice)) {
    return "Price per day must be a valid number";
  }

  if (parsedPrice < 0) {
    return "Price per day must be 0 or greater";
  }

  return null;
}

export function normalizeBikePrice(price: string) {
  return Number(price).toFixed(2);
}
