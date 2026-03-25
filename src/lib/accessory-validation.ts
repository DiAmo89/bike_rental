const ACCESSORY_NAME_INPUT_REGEX = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\s]*$/;
const ACCESSORY_NAME_REGEX = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\s]+$/;
const ACCESSORY_PRICE_INPUT_REGEX = /^\d*(\.\d{0,2})?$/;

export function isValidAccessoryNameInput(value: string) {
  return ACCESSORY_NAME_INPUT_REGEX.test(value);
}

export function isValidAccessoryPriceInput(value: string) {
  return value === "" || ACCESSORY_PRICE_INPUT_REGEX.test(value);
}

export function validateAccessoryName(name: string) {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return "Name is required";
  }

  if (!ACCESSORY_NAME_REGEX.test(trimmedName)) {
    return "Name can only contain letters, numbers, and spaces";
  }

  return null;
}

export function validateAccessoryPrice(price: string) {
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

export function normalizeAccessoryPrice(price: string) {
  return Number(price).toFixed(2);
}
