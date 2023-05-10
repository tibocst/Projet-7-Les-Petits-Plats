import { getSearchIngredients, getSearchAppareils, getSearchUstensiles, getAllCurrentReccettesId, getMultipleRecettesById, triIngredients } from './mainSearch.js'
import { displayRecettes } from '../pages/index.js'

export function displaySearchTags(obj, type) {
    const divDom = document.querySelector(type)
    divDom.innerHTML = ''

    obj.forEach(variable => {
        const pDom = document.createElement('p')
        pDom.innerText = variable
        divDom.appendChild(pDom)
    })
    setEventListenerTags(type)
}

function setEventListenerTags(type) {
    const pdivDom = document.querySelectorAll(type + '> p')

    pdivDom.forEach(p => {
        p.addEventListener('click', triByTag)
    })
}

async function triByTag(e) {
    // quand on clique sur un tag, doit nous afficher une liste de recette avec ces tags la + en fonction de la recherche principale
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

function addSearchTag(e) {
    if (!checkIfTagAlreadyExist(e.target.innerText)) {
        const divSearchTags = document.querySelector('.search-tag')
        const divDom = document.createElement('div')
        const imgDom = document.createElement('img')
        const pDom = document.createElement('p')
        pDom.innerText = e.target.innerText
        imgDom.setAttribute('src', './assets/xmark-solid.svg')
        divDom.appendChild(pDom)
        divDom.appendChild(imgDom)
        divSearchTags.appendChild(divDom)
    }
}

function checkIfTagAlreadyExist(stringToCheck) {
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

function getCurrentTags(type) {
    var result = []
    const pDom = document.querySelectorAll(type + ' > p')
    pDom.forEach(variable => {
        result.push(variable.innerText)
    })
    console.log(result)
    return result
}

