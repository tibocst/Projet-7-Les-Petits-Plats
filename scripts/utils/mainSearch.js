import { getRecettes } from '../factories/recetteFactory.js'

// début modif algo recherche princiaple
// filtre les recettes en fonction d'un string et les renvoies
export async function triRecettes(string) {
    const lowerString = string.toLowerCase()
    const recettes = await getRecettes()
    var recettesTri = filterAlternative(recettes, lowerString)
    return recettesTri
}

function filterAlternative(recettes, lowerString) {
        let recettesResult = [];
  
        for (let i=0; i < recettes.length;i++) {
          const recette = recettes[i];
          
          if (recette.name.toLowerCase().includes(lowerString) || recette.description.toLowerCase().includes(lowerString) || triIngredients(recette.ingredients, lowerString)) {
            recettesResult.push(recette);
          }
        }
        return recettesResult;
}
//  fin des modifs algo recherche principale

export function triIngredients(ingredients, lowerString) {
    return ingredients.some((i) => i.ingredient.toLowerCase().includes(lowerString));
}

export function getSearchIngredients(obj) {
    var result = []
    obj.forEach(recette => {
        recette.ingredients.forEach(ingredient => {
            var resultTestLower = result.map(variable => variable.toLowerCase())
            if (!resultTestLower.includes(ingredient.ingredient.toLowerCase())) {
                result.push(ingredient.ingredient)
            }
        })
    })

    return result
}

export function getSearchAppareils(obj) {
    var result = []
    obj.forEach(recette => {
        var resultTestLower = result.map(variable => variable.toLowerCase())
        if (!resultTestLower.includes(recette.appliance.toLowerCase())) {
            result.push(recette.appliance)
        }
    })

    return result
}

export function getSearchUstensiles(obj) {
    var result = []
    obj.forEach(recette => {
        var resultTestLower = result.map(variable => variable.toLowerCase())
        recette.ustensils.forEach((value) => {
            if (!resultTestLower.includes(value.toLowerCase())) {
                result.push(value)
            }
        })
    })

    return result
}

export function getAllCurrentReccettesId() {
    const result = []
    const cardRecettes = document.querySelectorAll('.recette-card')
    cardRecettes.forEach(recette => {
        result.push(parseInt(recette.dataset.id))
    })
    return result
}

export async function getMultipleRecettesById(idArray) {
    var recettes = await getRecettes()
    const result = recettes.filter(recette => {
        return idArray.includes(recette.id)
    })

    return result
}

