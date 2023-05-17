import { recetteFactory, getRecettes } from '../factories/recetteFactory.js'
import { triRecettes, getSearchIngredients, getSearchAppareils, getSearchUstensiles } from '../utils/mainSearch.js'
import { displaySearchTags, ingredientsSearchListener, appareilsSearchListener, ustensilesSearchListener } from '../utils/tagSearch.js'

export async function displayRecettes(recettes) {
  const recettesSection = document.querySelector('.section-recette')
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

  const ingredientsTag = document.querySelector('.ingredients-tag')
  const appareilsTag = document.querySelector('.appareils-tag')
  const ustensilesTag = document.querySelector('.ustensiles-tag')

  ingredientsSearchBar.addEventListener('focus', (e) => {
    e.target.placeholder = 'Rechercher un ingérident'
    dropDownSearchBar.style.width = '100%'
    e.target.parentNode.style.flexGrow = '10'
    e.target.style.width = '100%'
    ingredientsTag.style.display = 'flex'
  })
  appareilsSearchBar.addEventListener('focus', (e) => {
    e.target.placeholder = 'Rechercher un appareil'
    dropDownSearchBar.style.width = '100%'
    e.target.parentNode.style.flexGrow = '10'
    e.target.style.width = '100%'
    appareilsTag.style.display = 'flex'
  })
  ustensilesSearchBar.addEventListener('focus', (e) => {
    e.target.placeholder = 'Rechercher un ustensile'
    dropDownSearchBar.style.width = '100%'
    e.target.parentNode.style.flexGrow = '10'
    e.target.style.width = '100%'
    ustensilesTag.style.display = 'flex'
  })

  ingredientsSearchBar.addEventListener('blur', (e) => {
    e.target.placeholder = 'Ingéridents'
    dropDownSearchBar.style.width = '500px'
    e.target.parentNode.style.flexGrow = '1'
    e.target.style.width = '130px'
    ingredientsTag.style.display = 'none'
  })
  appareilsSearchBar.addEventListener('blur', (e) => {
    e.target.placeholder = 'Appareils'
    dropDownSearchBar.style.width = '500px'
    e.target.parentNode.style.flexGrow = '1'
    e.target.style.width = '130px'
    appareilsTag.style.display = 'none'
  })
  ustensilesSearchBar.addEventListener('blur', (e) => {
    e.target.placeholder = 'Ustensiles'
    dropDownSearchBar.style.width = '500px'
    e.target.parentNode.style.flexGrow = '1'
    e.target.style.width = '130px'
    ustensilesTag.style.display = 'none'
  })
}

initRecette()