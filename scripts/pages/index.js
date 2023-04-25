import { recetteFactory, getRecettes } from '../factories/recetteFactory.js'

async function displayRecettes (recettes) {
    const recettesSection = document.querySelector('.card-recette > div')
    console
    
    recettes.forEach((recette) => {
      const recetteModel = recetteFactory(recette)
      const cardDOM = recetteModel.getCardDOM()
  
      recettesSection.appendChild(cardDOM)
    })
}

async function initRecette () {
    const recettes = await getRecettes()
  
    console.log(recettes)
    displayRecettes(recettes)
}
  
initRecette()