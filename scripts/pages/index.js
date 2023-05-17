import { recetteFactory, getRecettes } from '../factories/recetteFactory.js'
import { triRecettes, getSearchIngredients, getSearchAppareils, getSearchUstensiles } from '../utils/mainSearch.js'
import { displaySearchTags, ingredientsSearchListener, appareilsSearchListener, ustensilesSearchListener } from '../utils/tagSearch.js'

export async function displayRecettes(recettes) {
  const recettesSection = document.querySelector('.card-recette > div')
  recettesSection.innerHTML = ''

  recettes.forEach((recette) => {
    const recetteModel = recetteFactory(recette)
    const cardDOM = recetteModel.getCardDOM()

    recettesSection.appendChild(cardDOM)
  })
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

  const ingredientsSearchBar = document.querySelector('.ingredients-searchbar')
  const appareilsSearchBar = document.querySelector('.appareils-searchbar')
  const ustensilesSearchBar = document.querySelector('.ustensiles-searchbar')

  ingredientsSearchBar.addEventListener('input', await ingredientsSearchListener)
  appareilsSearchBar.addEventListener('input', await appareilsSearchListener)
  ustensilesSearchBar.addEventListener('input', await ustensilesSearchListener)
  
  const dropDownSearchBar = document.querySelector('.dropdown-searchbar')

  ingredientsSearchBar.addEventListener('focus', (e) => {
    e.target.placeholder = 'Rechercher un ingérident'
    dropDownSearchBar.style.width = '100%'
    e.target.parentNode.style.flexGrow = '10'
    e.target.style.width = '100%'
  })
  appareilsSearchBar.addEventListener('focus', (e) => {
    e.target.placeholder = 'Rechercher un appareil'
    dropDownSearchBar.style.width = '100%'
    e.target.parentNode.style.flexGrow = '10'
    e.target.style.width = '100%'
  })
  ustensilesSearchBar.addEventListener('focus', (e) => {
    e.target.placeholder = 'Rechercher un ustensile'
    dropDownSearchBar.style.width = '100%'
    e.target.parentNode.style.flexGrow = '10'
    e.target.style.width = '100%'
  })

  ingredientsSearchBar.addEventListener('blur', (e) => {
    e.target.placeholder = 'Ingéridents'
    dropDownSearchBar.style.width = '500px'
    e.target.parentNode.style.flexGrow = '1'
    e.target.style.width = '130px'
  })
  appareilsSearchBar.addEventListener('blur', (e) => {
    e.target.placeholder = 'Appareils'
    dropDownSearchBar.style.width = '500px'
    e.target.parentNode.style.flexGrow = '1'
    e.target.style.width = '130px'
  })
  ustensilesSearchBar.addEventListener('blur', (e) => {
    e.target.placeholder = 'Ustensiles'
    dropDownSearchBar.style.width = '500px'
    e.target.parentNode.style.flexGrow = '1'
    e.target.style.width = '130px'
  })

  // a faire : refaire une recherche sur les recettes après avoir supprimé le tag(à voir comment faire)
}

initRecette()