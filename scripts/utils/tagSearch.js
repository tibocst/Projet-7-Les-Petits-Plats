import { getSearchIngredients, getSearchAppareils, getSearchUstensiles, getAllCurrentReccettesId, getMultipleRecettesById, triIngredients, triRecettes } from './mainSearch.js'
import { displayRecettes } from '../pages/index.js'
import { getRecettes } from '../factories/recetteFactory.js'

export function displaySearchTags(obj, type) {
    const divDom = document.querySelector(type)
    divDom.innerHTML = ''

    obj.forEach(variable => {
        if(!checkIfTagAlreadyExist(variable.toLowerCase())){
            const pDom = document.createElement('p')
            pDom.innerText = variable
            divDom.appendChild(pDom)
        }
    })
    setEventListenerTags(type)
}

function setEventListenerTags(type) {
    const pdivDom = document.querySelectorAll(type + '> p')

    pdivDom.forEach(p => {
        p.addEventListener('mousedown', triByTag)
    })
}

async function triByTag(e) {
    // quand on clique sur un tag, doit nous afficher une liste de recette avec ces tags la + en fonction de la recherche principale
    // le if check si c'est le bouton gauche qui est utilisé, sinon l'event ne trigger pas
    if (e.button === 0) {
        if (checkIfTagAlreadyExist(e.target.innerText)) {
            return
        }
        const tagLowerCase = e.target.innerText.toLowerCase()
        const recettes = await getMultipleRecettesById(getAllCurrentReccettesId())
        addSearchTag(e)

        if (e.target.parentNode.classList.contains('ingredients-tag')) {
            const divDom = document.querySelector('.ingredients-tag')
            const recettesTri = recettes.filter(recette => triIngredients(recette.ingredients, tagLowerCase))
            displayRecettes(recettesTri)

            displaySearchTags(getSearchIngredients(recettesTri), '.ingredients-tag')
            displaySearchTags(getSearchAppareils(recettesTri), '.appareils-tag')
            displaySearchTags(getSearchUstensiles(recettesTri), '.ustensiles-tag')

            const ingredientsSearchBar = document.querySelector('.ingredients-searchbar')
            ingredientsSearchBar.value = ''
        }
        else if (e.target.parentNode.classList.contains('appareils-tag')) {
            const divDom = document.querySelector('.appareils-tag')
            const recettesTri = recettes.filter(recette => recette.appliance.toLowerCase().includes(tagLowerCase))
            displayRecettes(recettesTri)

            displaySearchTags(getSearchIngredients(recettesTri), '.ingredients-tag')
            displaySearchTags(getSearchAppareils(recettesTri), '.appareils-tag')
            displaySearchTags(getSearchUstensiles(recettesTri), '.ustensiles-tag')

            const appareilsSearchBar = document.querySelector('.appareils-searchbar')
            appareilsSearchBar.value = ''
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

            const ustensilesSearchBar = document.querySelector('.ustensiles-searchbar')
            ustensilesSearchBar.value = ''
        }
    }
    else {
        return
    }
}

function addSearchTag(e) {
    if (!checkIfTagAlreadyExist(e.target.innerText)) {
        const divSearchTags = document.querySelector('.search-tag')
        const divDom = document.createElement('div')
        const imgDom = document.createElement('img')
        const pDom = document.createElement('p')

        if(e.target.parentNode.classList.contains('ingredients-tag')) {
            divDom.addEventListener("click", deleteSearchTag)
            divDom.classList.add('ingredients-tag_added')
        }
        else if (e.target.parentNode.classList.contains('appareils-tag')) {
            divDom.addEventListener("click", deleteSearchTag)
            divDom.classList.add('appareils-tag_added')
        }
        else if (e.target.parentNode.classList.contains('ustensiles-tag')) {
            divDom.addEventListener("click", deleteSearchTag)
            divDom.classList.add('ustensiles-tag_added')
        }

        pDom.innerText = e.target.innerText
        imgDom.setAttribute('src', './assets/circle-xmark-regular.svg')
        divDom.appendChild(pDom)
        divDom.appendChild(imgDom)
        divSearchTags.appendChild(divDom)
    }
}

async function deleteSearchTag(e){
    console.log(e.target.parentNode)
    e.target.parentNode.parentNode.removeChild(e.target.parentNode)
    const searchBarMain = document.querySelector('.search-bar_main')

    if(searchBarMain.value.length > 2) {
        var recettesTri = await triRecettes(searchBarMain.value)
    }
    else {
        var recettesTri = await getRecettes()
    }
    
    recettesTri = triRecettesByAlreadyAddedTag(recettesTri)

    console.log(recettesTri)

    displayRecettes(recettesTri)

    displaySearchTags(getSearchIngredients(recettesTri), '.ingredients-tag')
    displaySearchTags(getSearchAppareils(recettesTri), '.appareils-tag')
    displaySearchTags(getSearchUstensiles(recettesTri), '.ustensiles-tag')
}

// permet de retrier les recettes après la supprésion d'un tag
export function triRecettesByAlreadyAddedTag(recettesTri){
    const tags = document.querySelectorAll('.search-tag > div')
    var recettes = recettesTri
    if(tags.length === 0) {
        return recettes
    } else {
        tags.forEach(tag => {
            console.log(tag)
            if(tag.classList.contains('ingredients-tag_added')){
                recettes = recettes.filter(recette => triIngredients(recette.ingredients, tag.querySelector('p').innerText.toLowerCase()))
            }
            else if(tag.classList.contains('appareils-tag_added')) {
                recettes = recettes.filter(recette => recette.appliance.toLowerCase().includes(tag.querySelector('p').innerText.toLowerCase()))
            }
            else if(tag.classList.contains('ustensiles-tag_added')) {
                recettes = recettes.filter(recette => {
                    const ustensilsLowerCase = recette.ustensils.map(ustensil => ustensil.toLowerCase())
                    return ustensilsLowerCase.includes(tag.querySelector('p').innerText.toLowerCase())
                })
            }
        });
        return recettes
    }
}

function checkIfTagAlreadyExist(stringToCheck) {
    // check si stringToCheck (en uppercase ou pas) fais déjà partie des tags 
    const divSearchTags = document.querySelectorAll('.search-tag > div > p')
    for (let i = 0; i < divSearchTags.length; i++) {
        const element = divSearchTags[i];
        if (element.innerText.toLowerCase() === stringToCheck.toLowerCase()) {
            return true
        }
    }
    return false
}

export async function ingredientsSearchListener(e) {
    displaySearchTags(getSearchIngredients(await getMultipleRecettesById(getAllCurrentReccettesId())).filter( element => element.toLowerCase().includes(e.target.value.toLowerCase())),'.ingredients-tag')
}

export async function appareilsSearchListener(e) {
    displaySearchTags(getSearchAppareils(await getMultipleRecettesById(getAllCurrentReccettesId())).filter( element => element.toLowerCase().includes(e.target.value.toLowerCase())),'.appareils-tag')

}

export async function ustensilesSearchListener(e) {
    displaySearchTags(getSearchUstensiles(await getMultipleRecettesById(getAllCurrentReccettesId())).filter( element => element.toLowerCase().includes(e.target.value.toLowerCase())),'.ustensiles-tag')
}

