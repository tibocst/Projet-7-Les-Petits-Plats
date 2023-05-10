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
  appareilsSearchBar.addEventListener("input", await appareilsSearchListener)
  ustensilesSearchBar.addEventListener("input", await ustensilesSearchListener)


  // a faire : ajouter un event listner sur chaque champs de recherche des tags qui pointe vers une fonction de recherche dans tagSearch.js
  // puis : dans la fonction, faire qu'elle écoute les caractères lu pr l'event listener et qu'elle filtre en fonction des tags présents sur la page
  // puis : au clic sur un tag, qu'il soit ajouté (fonction déjà créé) mais que le texte dans la bare de recherche du tag se clean
  // puis : créer une fonction pour supprimer les tags et ajouter les recettes à la suppression du tag
}

initRecette()