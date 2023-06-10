import domalt from "domalt";

const recipeFactory = (title, desc = "A dish.") => {
  return { title, desc };
}

const newElemRecipe = (recipe) => {
  return domalt.newElem({
    class: "card",
    children: [
      { tag: "h3", content: recipe.title },
      { tag: "p", content: recipe.desc }
    ]
  })
}

const recipes = [
  newElemRecipe(recipeFactory("Tuna pasta")),
  newElemRecipe(recipeFactory("Salmon chirashi")),
  newElemRecipe(recipeFactory("Sardine salad"))
];



export { recipes }