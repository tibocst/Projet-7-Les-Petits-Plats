import { recetteFactory, getRecettes } from '../factories/recetteFactory.js'

async function displayRecettes(recettes) {
  const recettesSection = document.querySelector('.card-recette > div')
  recettesSection.innerHTML = ''

  recettes.forEach((recette) => {
    const recetteModel = recetteFactory(recette)
    const cardDOM = recetteModel.getCardDOM()

    recettesSection.appendChild(cardDOM)
  })
}

async function triRecettes(string) {
  const lowerString = string.toLowerCase()
  console.log(lowerString)
  const recettes = await getRecettes()
  var recettesTri = recettes.filter((recette) => recette.name.toLowerCase().includes(lowerString) || recette.description.toLowerCase().includes(lowerString) || triIngredients(recette.ingredients, lowerString))
  return recettesTri
}

function triIngredients(ingredients, lowerString) {
  return ingredients.some((i) => i.ingredient.toLowerCase().includes(lowerString));
}

function displaySearchTags(obj, type) {
  const divDom = document.querySelector(type)
  divDom.innerHTML = ''

  obj.forEach(variable => {
    const pDom = document.createElement('p')
    pDom.innerText = variable
    divDom.appendChild(pDom)
  })
  setEventListenerTags(type)
}

function getSearchIngredients(obj) {
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

function getSearchAppareils(obj) {
  var result = []
  obj.forEach(recette => {
    var resultTestLower = result.map(variable => variable.toLowerCase())
    if (!resultTestLower.includes(recette.appliance.toLowerCase())) {
      result.push(recette.appliance)
    }
  })

  return result
}

function getSearchUstensiles(obj) {
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

function setEventListenerTags(type) {
  const pdivDom = document.querySelectorAll(type + '> p')

  pdivDom.forEach(p => {
    p.addEventListener('click', triByTag)
  })
}

async function triByTag(e) {
  // quand on clique sur un tag, doit nous afficher une liste de recette avec ces tags la + en fonction de la recherche principale
  const tagLowerCase = e.target.innerText.toLowerCase()
  const recettes = await getMultipleRecettesById(getAllCurrentReccettesId())

  if (e.target.parentNode.classList.contains('ingredients-tag')) {
    const divDom = document.querySelector('.ingredients-tag')
    const recettesTri = recettes.filter(recette => triIngredients(recette.ingredients, tagLowerCase))
    displayRecettes(recettesTri)

    displaySearchTags(getSearchIngredients(recettesTri), '.ingredients-tag')
    displaySearchTags(getSearchAppareils(recettesTri), '.appareils-tag')
    displaySearchTags(getSearchUstensiles(recettesTri), '.ustensiles-tag')
  }
  else if (e.target.parentNode.classList.contains('appareils-tag')) {
    const divDom = document.querySelector('.appareils-tag')
    const recettesTri = recettes.filter(recette => recette.appliance.toLowerCase().includes(tagLowerCase))
    displayRecettes(recettesTri)

    displaySearchTags(getSearchIngredients(recettesTri), '.ingredients-tag')
    displaySearchTags(getSearchAppareils(recettesTri), '.appareils-tag')
    displaySearchTags(getSearchUstensiles(recettesTri), '.ustensiles-tag')
  }
  else if (e.target.parentNode.classList.contains('ustensiles-tag')) {
    const divDom = document.querySelector('.ustensiles-tag')
    const recettesTri = recettes.filter(recette => {
      const ustensilsLowerCase = recette.ustensils.map(ustensil => ustensil.toLowerCase())
      return ustensilsLowerCase.includes(tagLowerCase)
    })
    displayRecettes(recettesTri)

    displaySearchTags(getSearchIngredients(recettesTri), '.ingredients-tag')
    displaySearchTags(getSearchAppareils(recettesTri), '.appareils-tag')
    displaySearchTags(getSearchUstensiles(recettesTri), '.ustensiles-tag')
  }
}

function getAllCurrentReccettesId() {
  const result = []
  const cardRecettes = document.querySelectorAll('.card-recette > div > div > div')
  cardRecettes.forEach(recette => {
    result.push(parseInt(recette.dataset.id))
  })
  return result
}

async function getMultipleRecettesById(idArray) {
  var recettes = await getRecettes()
  const result = recettes.filter(recette => {
    return idArray.includes(recette.id)
  })

  return result
}


async function initRecette() {
  const recettes = await getRecettes()

  displayRecettes(recettes)
  displaySearchTags(getSearchIngredients(recettes), '.ingredients-tag')
  displaySearchTags(getSearchAppareils(recettes), '.appareils-tag')
  displaySearchTags(getSearchUstensiles(recettes), '.ustensiles-tag')

  const mainSearchBar = document.querySelector('.search-bar_main')
  mainSearchBar.addEventListener("keyup", async (e) => {
    if (e.target.value.length > 2) {
      const recettesTri = await triRecettes(e.target.value)
      displayRecettes(recettesTri)
      displaySearchTags(getSearchIngredients(recettesTri), '.ingredients-tag')
      displaySearchTags(getSearchAppareils(recettesTri), '.appareils-tag')
      displaySearchTags(getSearchUstensiles(recettesTri), '.ustensiles-tag')
    } else {
      displayRecettes(recettes)
      displaySearchTags(getSearchIngredients(recettes), '.ingredients-tag')
      displaySearchTags(getSearchAppareils(recettes), '.appareils-tag')
      displaySearchTags(getSearchUstensiles(recettes), '.ustensiles-tag')
    }
  })
}

initRecette()