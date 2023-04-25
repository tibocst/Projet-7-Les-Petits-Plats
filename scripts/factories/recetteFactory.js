export function recetteFactory (data) {
  const { id, name, servings, ingredients, time, description, appliance, ustensils } = data

  function getCardDOM () {
    const cardDom = document.createElement('div')
    cardDom.classList.add('card','col-4')
    cardDom.style.width = '18rem'
    cardDom.innerHTML = '<div class="recette-img row"></div><div class="card-body row"><div class="row"><h5 class="card-title col"></h5><div class="col"><i class="fa-regular fa-clock row"></i><p class="time row"></p></div></div><div class="row"><div class="ingredients col"></div><div class="description col"></div></div></div>'
    
    const pDescription = document.createElement('p')
    pDescription.innerText = description

    cardDom.querySelector('.card-title').innerText = name
    cardDom.querySelector('.time').innerText = time + 'min'
    cardDom.querySelector('.description').appendChild(pDescription)
    
    cardDom.appendChild(getIngredientsDOM(cardDom))

    return (cardDom)
  }

  function getIngredientsDOM (cardDom) {
    const ingredientsDom = cardDom.querySelector('.ingredients')
    ingredients.forEach(ingredient => {
        const pIngredient = document.createElement('p')
        if (ingredient.unit){
            pIngredient.innerText = ingredient.ingredient + ': ' + ingredient.quantity + ' ' + ingredient.unit
        } else {
            pIngredient.innerText = ingredient.ingredient + ': ' + ingredient.quantity
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
