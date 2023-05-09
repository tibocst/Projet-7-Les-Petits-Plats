import { getRecettes } from '../factories/recetteFactory.js'

export async function triRecettes(string) {
    const lowerString = string.toLowerCase()
    console.log(lowerString)
    const recettes = await getRecettes()
    var recettesTri = recettes.filter((recette) => recette.name.toLowerCase().includes(lowerString) || recette.description.toLowerCase().includes(lowerString) || triIngredients(recette.ingredients, lowerString))
    return recettesTri
}

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
    const cardRecettes = document.querySelectorAll('.card-recette > div > div > div')
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