import { getRecettes } from '../factories/recetteFactory.js'

// filtre les recettes en fonction d'un string et les renvoies
export async function triRecettes(string) {
    const lowerString = string.toLowerCase()
    console.log(lowerString)
    const recettes = await getRecettes()
    var recettesTri = filterAlternative(recettes, lowerString)
    // recettes.filter((recette) => recette.name.toLowerCase().includes(lowerString) || recette.description.toLowerCase().includes(lowerString) || triIngredients(recette.ingredients, lowerString))
    return recettesTri
}

// début modif algo recherche princiaple

function filterAlternative(array, string) {
        var i = 0
        var j = 0
        var arrayResult = []
        console.log(array.length)
        while (i < array.length) {
          const val = array[i]
          
          if (checkTitre(val.name, string) || checkDescription(val.description, string) || checkIngredients(val.ingredients, string)) {
            arrayResult.push(array[i])
          }
          i++
        }
      
        array.length = j
        return arrayResult
}

function checkTitre(name, string){
    var r = new RegExp(string)
    return r.test(name.toLowerCase())
}

function checkDescription(description, string){
    var r = new RegExp(string)
    return r.test(description.toLowerCase())
}

function checkIngredients(ingredients, string){
    for (let i = 0; i < ingredients.length; i++) {
        var element = ingredients[i].ingredient;
        var r = new RegExp(string)
        console.log(element)
        if(r.test(element.toLowerCase())){
            return true
        }
    }
    return false
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

