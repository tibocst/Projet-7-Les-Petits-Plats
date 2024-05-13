import { recetteFactory, getRecettes } from '../factories/recetteFactory.js'
import { triRecettes, getSearchIngredients, getSearchAppareils, getSearchUstensiles, getAllCurrentReccettesId } from '../utils/mainSearch.js'
import { displaySearchTags, ingredientsSearchListener, appareilsSearchListener, ustensilesSearchListener, triRecettesByAlreadyAddedTag } from '../utils/tagSearch.js'

export async function displayRecettes(recettes) {
  const recettesSection = document.querySelector('.section-recette')
  recettesSection.innerHTML = ''

  recettes.forEach((recette) => {
    const recetteModel = recetteFactory(recette)
    const cardDOM = recetteModel.getCardDOM()

    recettesSection.appendChild(cardDOM)
  })
  // permet l'affichage correct du dernier élément des recettes si le nbr de recette est impair
  if(!getAllCurrentReccettesId().length%2 === 0) {
    const cardDivDom = document.createElement('div')
    cardDivDom.setAttribute('class', 'recette-card')
    recettesSection.appendChild(cardDivDom)
  }
}

async function initRecette() {
  const recettes = await getRecettes()

  displayRecettes(recettes)
  displaySearchTags(getSearchIngredients(recettes), '.ingredients-tag')
  displaySearchTags(getSearchAppareils(recettes), '.appareils-tag')
  displaySearchTags(getSearchUstensiles(recettes), '.ustensiles-tag')

  const mainSearchBar = document.querySelector('.search-bar_main')
  mainSearchBar.addEventListener("keyup", async (e) => {
    //commence la recherche à partir de 3 caractères
    if (e.target.value.length > 2) {
      const recettesTri = triRecettesByAlreadyAddedTag(await triRecettes(e.target.value))
      displayRecettes(recettesTri)
      displaySearchTags(getSearchIngredients(recettesTri), '.ingredients-tag')
      displaySearchTags(getSearchAppareils(recettesTri), '.appareils-tag')
      displaySearchTags(getSearchUstensiles(recettesTri), '.ustensiles-tag')
    } else {
      const recettesTri = triRecettesByAlreadyAddedTag(recettes)
      displayRecettes(recettesTri)
      displaySearchTags(getSearchIngredients(recettesTri), '.ingredients-tag')
      displaySearchTags(getSearchAppareils(recettesTri), '.appareils-tag')
      displaySearchTags(getSearchUstensiles(recettesTri), '.ustensiles-tag')
    }
  })

  const ingredientsSearchBar = document.querySelector('.ingredients-searchbar')
  const appareilsSearchBar = document.querySelector('.appareils-searchbar')
  const ustensilesSearchBar = document.querySelector('.ustensiles-searchbar')

  ingredientsSearchBar.addEventListener('input', ingredientsSearchListener)
  appareilsSearchBar.addEventListener('input', appareilsSearchListener)
  ustensilesSearchBar.addEventListener('input', ustensilesSearchListener)

  const dropDownSearchBarAll = document.querySelectorAll('.dropdown-searchbar > div')
  const dropDownSearchBar = document.querySelector('.dropdown-searchbar')

  dropDownSearchBarAll.forEach((element) => {
    element.querySelector('input').addEventListener('focus', (e) => {
      switch (e.target.className) {
        case 'ingredients-searchbar':
          e.target.placeholder = 'Rechercher un ingrédient'
          break;
        case 'appareils-searchbar':
          e.target.placeholder = 'Rechercher un appareil'
          break;
        case 'ustensiles-searchbar':
          e.target.placeholder = 'Rechercher un ustensile'
          break;
        default:
          break;
      }
      
      dropDownSearchBar.style.width = '100%'
      e.target.parentNode.style.flexGrow = '10'
      e.target.parentNode.querySelector('div').style.display = 'flex'
      e.target.parentNode.querySelector('img').style.transform = 'rotate(0deg)'
    })
  })

  dropDownSearchBarAll.forEach((element) => {
    element.querySelector('input').addEventListener('blur', (e) => {
      switch (e.target.className) {
        case 'ingredients-searchbar':
          e.target.placeholder = 'Ingrédients'
          break;
        case 'appareils-searchbar':
          e.target.placeholder = 'Appareils'
          break;
        case 'ustensiles-searchbar':
          e.target.placeholder = 'Ustensiles'
          break;
        default:
          break;
      }
      
      dropDownSearchBar.style.width = '500px'
      e.target.parentNode.style.flexGrow = '1'
      e.target.parentNode.querySelector('div').style.display = 'none'
      e.target.parentNode.querySelector('img').style.transform = 'rotate(180deg)'
    })
  })

  const explicationSiteClose = document.querySelector('.explicationSite_close')
  
  explicationSiteClose.addEventListener('click', (e) => {
    document.querySelector('.explicationSite').style.display = 'none'
  })
}

initRecette()