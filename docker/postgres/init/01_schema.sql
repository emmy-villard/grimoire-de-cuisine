CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(80) NOT NULL,
    recipe_description VARCHAR(140),
    slug VARCHAR(80) NOT NULL,
    diet_type VARCHAR(30),
    prepTime INT CHECK (prepTime IS NULL OR prepTime >= 0),
    cookTime INT CHECK (cookTime IS NULL OR cookTime >= 0),
    difficulty VARCHAR(20),
    servings INT CHECK (servings IS NULL OR servings > 0),
    kcal_per_serving INT CHECK (kcal_per_serving IS NULL OR kcal_per_serving >= 0),
    instructions TEXT[],
    ingredients TEXT[],
    image_url VARCHAR(500),
    last_update TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT difficulty_allowed CHECK (
        difficulty IS NULL OR difficulty IN ('facile','easy','medium','moyen','difficile','hard')
    ),
    CONSTRAINT instructions_array CHECK (instructions IS NULL OR array_length(instructions, 1) IS NULL OR array_length(instructions, 1) >= 1),
    CONSTRAINT ingredients_array CHECK (ingredients IS NULL OR array_length(ingredients, 1) IS NULL OR array_length(ingredients, 1) >= 1)
);

CREATE UNIQUE INDEX IF NOT EXISTS recipes_slug_unique ON recipes (LOWER(slug));