export function recetteFactory (data) {
  const { id, name, servings, ingredients, time, description, appliance, ustensils } = data

  function getCardDOM () {
    const cardDom = document.createElement('div')
    cardDom.classList.add('recette-card')
    cardDom.setAttribute('data-id', id)

    cardDom.innerHTML = '<div class="recette-img"></div><div class="recette-card-body"><div><h5 class="recette-card-title"></h5><div><i class="fa-regular fa-clock"></i><p class="time"></p></div></div><div class="recette-card-ingr-desc"><div class="ingredients"></div><div class="description"></div></div></div>'
    
    const pDescription = document.createElement('p')
    pDescription.innerText = description

    cardDom.querySelector('.recette-card-title').innerText = name
    cardDom.querySelector('.time').innerText = time + 'min'
    cardDom.querySelector('.description').appendChild(pDescription)
    
    const divAddIngredients = cardDom.querySelector('.recette-card-ingr-desc')
    divAddIngredients.prepend(getIngredientsDOM(cardDom))
    return (cardDom)
  }

  function getIngredientsDOM (cardDom) {
    const ingredientsDom = cardDom.querySelector('.ingredients')
    ingredients.forEach(ingredient => {
        const pIngredient = document.createElement('p')
        if (ingredient.unit){
            pIngredient.innerText = ingredient.ingredient + ': ' + ingredient.quantity + ' ' + ingredient.unit
        } else if(ingredient.quantity) {
            pIngredient.innerText = ingredient.ingredient + ': ' + ingredient.quantity
        } else {
            pIngredient.innerText = ingredient.ingredient
        }
        ingredientsDom.appendChild(pIngredient)
    })

    return (ingredientsDom)
  }

  return {
    id,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils,
    getCardDOM,
    getIngredientsDOM
  }
}

export async function getRecettes () {
  const result = await fetch('./data/recipes.json')
  const recipes = await result.json()

  return recipes.recipes
}
