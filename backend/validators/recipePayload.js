const allowedDifficulties = ['facile', 'easy', 'medium', 'moyen', 'difficile', 'hard'];
const stringFieldsMax = { recipe_description: 140 };

/**
 * Checks if a value is a non-empty trimmed string.
 * @param {unknown} value Raw input to validate.
 * @returns {value is string} True when the value is a string containing non-whitespace characters.
 */
function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim() !== '';
}

/**
 * Returns the trimmed version of the provided string.
 * @param {string} value Source text.
 * @returns {string} Trimmed string.
 */
function sanitizeString(value) {
  return value.trim();
}

/**
 * Ensures the provided value is a finite, non-negative number.
 * @param {unknown} value Input to validate.
 * @returns {value is number} True when the value passes numeric requirements.
 */
function validateNumeric(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

/**
 * Validates an array of strings and guarantees each entry is non-empty once trimmed.
 * @param {unknown} value Input array candidate.
 * @returns {value is string[]} True if the array is well-formed.
 */
function validateStringArray(value) {
  return (
    Array.isArray(value) &&
    value.every((item) => typeof item === 'string' && item.trim() !== '')
  );
}

/**
 * Validates recipe payloads for both POST and PATCH/PUT operations.
 * @param {Record<string, unknown>} body Raw request body.
 * @param {{ partial?: boolean }} [options] When true, skips required-field enforcement.
 * @returns {{ errors: string[]; payload: Record<string, unknown>; }} Validation errors and sanitized payload.
 */
function validateRecipePayload(body, { partial = false } = {}) {
  const errors = [];
  const cleaned = {};

  const requiredFields = ['title', 'slug'];
  for (const field of requiredFields) {
    const value = body[field];
    if (value === undefined) {
      if (!partial) {
        errors.push(`${field} is required`);
      }
      continue;
    }
    if (!isNonEmptyString(value)) {
      errors.push(`${field} must be a non-empty string`);
      continue;
    }
    cleaned[field] = sanitizeString(value);
  }

  const optionalStrings = ['recipe_description', 'diet_type', 'image_url'];
  for (const field of optionalStrings) {
    if (body[field] === undefined || body[field] === null) continue;
    if (!isNonEmptyString(body[field])) {
      errors.push(`${field} must be a non-empty string`);
      continue;
    }
    const trimmed = sanitizeString(body[field]);
    const max = stringFieldsMax[field];
    if (max && trimmed.length > max) {
      errors.push(`${field} exceeds ${max} characters`);
      continue;
    }
    cleaned[field] = trimmed;
  }

  const numericFields = ['prepTime', 'cookTime', 'servings', 'kcal_per_serving'];
  for (const field of numericFields) {
    if (body[field] === undefined || body[field] === null) continue;
    if (!validateNumeric(body[field])) {
      errors.push(`${field} must be a positive number`);
      continue;
    }
    cleaned[field] = body[field];
  }

  if (body.difficulty !== undefined && body.difficulty !== null) {
    if (!isNonEmptyString(body.difficulty)) {
      errors.push('difficulty must be a non-empty string');
    } else if (!allowedDifficulties.includes(body.difficulty)) {
      errors.push('difficulty is not allowed');
    } else {
      cleaned.difficulty = sanitizeString(body.difficulty);
    }
  }

  if (body.instructions !== undefined && body.instructions !== null) {
    if (!validateStringArray(body.instructions)) {
      errors.push('instructions must be an array of non-empty strings');
    } else {
      cleaned.instructions = body.instructions.map((step) => step.trim());
    }
  }

  if (body.ingredients !== undefined && body.ingredients !== null) {
    if (!validateStringArray(body.ingredients)) {
      errors.push('ingredients must be an array of non-empty strings');
    } else {
      cleaned.ingredients = body.ingredients.map((ingredient) => ingredient.trim());
    }
  }

  return { errors, payload: cleaned };
}

export { validateRecipePayload, allowedDifficulties };
