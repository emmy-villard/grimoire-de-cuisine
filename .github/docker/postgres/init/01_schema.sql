CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    recipe_description VARCHAR(140) NOT NULL,
    slug VARCHAR(50) NOT NULL,
    diet_type VARCHAR(20) NOT NULL,
    prepTime INT NOT NULL,
    cookTime INT NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    servings INT NOT NULL,
    kcal_per_serving INT NOT NULL,
    instructions TEXT[] NOT NULL,
    ingredients TEXT[] NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    last_update TIMESTAMPTZ NOT NULL
)