-- Seed: insert sample recipes as setup

INSERT INTO recipes (
  id, title, recipe_description, slug, ingredients, instructions, diet_type,
  prepTime, cookTime, difficulty, servings, kcal_per_serving, image_url, last_update
) VALUES

(1,
 'Chakchouka aux pois chiches',
 'Ragoût savoureux de tomates et poivrons relevé d''épices, enrichi de pois chiches pour un plat complet.',
 'chakchouka-aux-pois-chiches',
 '["2 oignons","2 gousses d''ail","1 poivron rouge","1 poivron jaune","4 tomates mûres (ou 1 boîte de tomates concassées)","200 g de pois chiches cuits","2 cuillères à soupe d''huile d''olive","1 cuillère à café de paprika","1/2 cuillère à café de cumin","Sel et poivre","Persil frais"]'::jsonb,
 '["Émincer les oignons et l''ail, couper les poivrons en lanières.","Faire revenir l''oignon et l''ail dans l''huile d''olive jusqu''à ce qu''ils soient translucides.","Ajouter les poivrons et cuire 5–7 minutes.","Ajouter les tomates, le paprika, le cumin, saler et poivrer. Laisser mijoter 10–15 minutes.","Incorporer les pois chiches et laisser réchauffer 5 minutes.","Servir garni de persil, accompagné de pain ou de semoule."]'::jsonb,
 'vegan', 15, 25, 'facile', 4, 320, 'http://localhost:8000/assets/img/chakchouka.webp', '2025-12-08T10:30:00Z'::timestamptz
),

(2,
 'Pâte à pizza maison',
 'Une pâte souple et croustillante, facile à réaliser à la main ou en machine.',
 'pate-a-pizza-maison',
 '["500 g de farine","300 ml d''eau tiède","10 g de sel","7 g de levure sèche de boulanger","2 cuillères à soupe d''huile d''olive"]'::jsonb,
 '["Délayer la levure dans l''eau tiède et laisser reposer 5 minutes.","Mélanger la farine et le sel dans un grand saladier.","Ajouter l''eau + levure et l''huile, puis pétrir 8–10 minutes jusqu''à obtenir une pâte lisse.","Laisser pousser la pâte couverte 1 à 2 heures jusqu''à doublement de volume.","Former les boules, étaler et garnir selon vos envies, puis cuire 10–12 minutes à four très chaud (250°C)."]'::jsonb,
 'vegan', 20, 12, 'moyen', 4, 450, 'http://localhost:8000/assets/img/pizza-dough.webp', '2025-12-08T10:30:00Z'::timestamptz
),

(3,
 'Pâte à crêpes',
 'Recette classique de pâte à crêpes légère, adaptée pour sucré ou salé.',
 'pate-a-crepes',
 '["250 g de farine","3 œufs","500 ml de lait","1 pincée de sel","2 cuillères à soupe d''huile ou de beurre fondu"]'::jsonb,
 '["Mélanger la farine et le sel dans un saladier.","Ajouter les œufs puis le lait progressivement en fouettant pour éviter les grumeaux.","Ajouter l''huile ou le beurre fondu, laisser reposer 30 minutes si possible.","Cuire les crêpes dans une poêle légèrement huilée, 1–2 minutes par face.","Garnir selon votre goût (sucre, confiture, chocolat, fromage, jambon...)."]'::jsonb,
 'végétarien', 10, 20, 'facile', 6, 180, 'http://localhost:8000/assets/img/crepes.webp', '2025-12-08T10:30:00Z'::timestamptz
);

-- End of seed
