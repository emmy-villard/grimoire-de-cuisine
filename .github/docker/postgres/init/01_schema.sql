CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    recipe_description VARCHAR(140),
    slug VARCHAR(50) NOT NULL,
    diet_type VARCHAR(20),
    prepTime INT,
    cookTime INT,
    difficulty VARCHAR(20),
    servings INT,
    kcal_per_serving INT,
    instructions TEXT[],
    ingredients TEXT[],
    image_url VARCHAR(500),
    last_update TIMESTAMPTZ NOT NULL
)