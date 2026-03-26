const CATEGORY_NAME_INPUT_REGEX = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\s]*$/;
const CATEGORY_NAME_REGEX = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\s]+$/;
const URL_REGEX = /^https?:\/\/.+/;

export function isValidCategoryNameInput(value: string) {
  return CATEGORY_NAME_INPUT_REGEX.test(value);
}

export function isValidImageUrlInput(value: string) {
  return value === "" || URL_REGEX.test(value);
}

export function validateCategoryName(name: string) {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return "Name is required";
  }

  if (!CATEGORY_NAME_REGEX.test(trimmedName)) {
    return "Name can only contain letters, numbers, and spaces";
  }

  return null;
}

export function validateImageUrl(url: string) {
  const trimmedUrl = url.trim();

  if (!trimmedUrl) {
    return "Image URL is required";
  }

  if (!URL_REGEX.test(trimmedUrl)) {
    return "Image URL must start with http:// or https://";
  }

  return null;
}
