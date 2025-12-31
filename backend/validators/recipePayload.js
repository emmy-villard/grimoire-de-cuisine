const allowedDifficulties = ['facile', 'easy', 'medium', 'moyen', 'difficile', 'hard'];
const stringFieldsMax = { recipe_description: 140 };

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim() !== '';
}

function sanitizeString(value) {
  return value.trim();
}

function validateNumeric(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

function validateStringArray(value) {
  return (
    Array.isArray(value) &&
    value.every((item) => typeof item === 'string' && item.trim() !== '')
  );
}

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
