let pokemonJsonsArray = [];
let pokemonCardBGColorArray = [];
let firstRenderId = 22;
let scrollEnabled = true;



async function init() {
    document.getElementById('show-all-pokemon-container').innerHTML = ''
    await downloadPokemonApiInJsons();
    await downloadApiForBackgroundColors();
    renderAllPokemon();
    renderPokemonTypes()
}


async function downloadPokemonApiInJsons() {
    for (let i = 1; i < firstRenderId; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);
        pokemonJsons = await response.json()
        pokemonJsonsArray.push(pokemonJsons)
    }
    // console.log(pokemonJsonsArray[0])
}


async function downloadApiForBackgroundColors() {
    for (let i = 1; i < firstRenderId; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon-species/${i}/`
        let response = await fetch(url);
        pokemonSpeciesJson = await response.json();

        let cardBackgroundColor = pokemonSpeciesJson['color']['name']
        pokemonCardBGColorArray.push(cardBackgroundColor)
    }
}


function renderAllPokemon() {
    let allPokemonContainer = document.getElementById('show-all-pokemon-container');
    for (let i = 0; i < pokemonJsonsArray.length; i++) {
        const pokemon = pokemonJsonsArray[i];
        let pokemonCardImage = pokemon['sprites']['other']['dream_world']['front_default']

        allPokemonContainer.innerHTML += renderAllPokemmonHtml(i, pokemon, pokemonCardImage);
        changeCardBackgroundColor(i);
        formatPokemonIdText(i)
    }

}


function renderPokemonTypes() {
    for (let i = 0; i < pokemonJsonsArray.length; i++) {
        let typeContainer = document.getElementById(`type-container-${i}`)
        const pokemonTypes = pokemonJsonsArray[i]['types'];
        for (let j = 0; j < pokemonTypes.length; j++) {
            const pokemonType = pokemonTypes[j]['type']['name'];
            typeContainer.innerHTML += renderPokemonTypesHtml(pokemonType);
        }        
    }      
}


function changeCardBackgroundColor(i) {
    document.getElementById(`pokemon-card-${i}`).style.background = pokemonCardBGColorArray[i]
}


function changeOverviewBackgroundColor(i) {
    document.getElementById(`pokemon-overview`).style.background = pokemonCardBGColorArray[i]
}


function formatPokemonIdText(id) {
    let pokemonId = id.toString();
    let number = '#' + pokemonId.padStart(3, '0');
    return number
}


function loadMorePokemon() {
    firstRenderId += 20;
    pokemonJsonsArray = [];
    pokemonCardBGColorArray = [];
    init();
}


function searchField() {
    let searchInput = document.getElementById('search-bar').value.toLowerCase();
    let allPokemonContainer = document.getElementById('show-all-pokemon-container');
    allPokemonContainer.innerHTML = ``;

    for (let i = 0; i < pokemonJsonsArray.length; i++) {
        const pokemon = pokemonJsonsArray[i]
        const pokemonTypes = pokemonJsonsArray[i]['types'];
        const pokemonId =  pokemon['id'].toString();
        const pokemonCardImage = pokemon['sprites']['other']['dream_world']['front_default']

        if (pokemon['name'].includes(searchInput) || pokemonId.includes(searchInput)) {
            allPokemonContainer.innerHTML += renderAllPokemmonHtml(i, pokemon, pokemonCardImage)
            changeCardBackgroundColor(i);
            renderSearchFunctionTypes(i, pokemonTypes)
        }
    }
}


function renderSearchFunctionTypes(i, pokemonTypes) {
    let typeContainer = document.getElementById(`type-container-${i}`)
    for (let j = 0; j < pokemonTypes.length; j++) {
        const pokemonType = pokemonTypes[j]['type']['name'];
        typeContainer.innerHTML += renderPokemonTypesHtml(pokemonType);
    }
}


function openBackground(i) {
    let background = document.getElementById('body');
    background.innerHTML += renderDarkBackgroundHtml();
    
    scrollManagement();
    openPokemonDetails(i);
    changeOverviewBackgroundColor(i)
}


function openPokemonDetails(i) {
    const currentPokemon = pokemonJsonsArray[i];
    
    let darkBackground = document.getElementById('dark-background');
    darkBackground.innerHTML = renderPokeDetailsCardHtml(i, currentPokemon);

    let typesContainer = document.getElementById('overview-types');
    for (let i = 0; i < currentPokemon['types'].length; i++) {
        const type = currentPokemon['types'][i]['type']['name'];
        typesContainer.innerHTML += renderDetailsCardTypesHtml(type);
    }
}


function stopClickingThrough(event) {
    event.stopPropagation();
}


function closeDarkBackground() {
    let darkBackground = document.getElementById('dark-background');
    darkBackground.remove();
    scrollManagement();
}


function scrollManagement(){
    if (scrollEnabled) {
        document.body.style.overflow = 'hidden';
        scrollEnabled = false;
    } else {
        document.body.style.overflow = 'auto';
        scrollEnabled = true;
    }
}


// HTML Functions


function renderAllPokemmonHtml(i, pokemon, pokemonCardImage) {
    return /*html*/`
        <div id="pokemon-card-${i}" class="pokemon-card" onclick="openBackground(${i})">
            <div>
                <h2>${formatPokemonIdText(pokemon['id'])}</h2>
                <h1>${pokemon['name']}</h1>
                <div id="type-container-${i}">
                    <!-- type loop -->
                </div>
            </div>
            <img src="${pokemonCardImage}">
        </div>
    `
}


function renderPokemonTypesHtml(pokemonType) {
    return /*html*/`
        <div class="pokemon-types m-top">${pokemonType}</div>
    `
}


function renderDarkBackgroundHtml() {
    return /*html*/`
        <div id="dark-background" class="dark-background" onclick="closeDarkBackground()">

        </div>
    `
}

function renderPokeDetailsCardHtml(i, currentPokemon) {
    return /*html*/`
        <button class="skip-btn next" onclick="nextPokemon('+')">></button>
        <button class="skip-btn prev" onclick="prevPokemon('-')"><</button>
        <div id="pokemon-details-card-${i}" class="pokemon-details-card" onclick="stopClickingThrough(event)">
            <div id="pokemon-overview">
                <h2>${formatPokemonIdText(currentPokemon['id'])}</h2>
                <h1>${currentPokemon['name']}</h1>
                <div id="overview-types">
                <!-- type loop -->
                </div>
            </div>
        </div>
    `
}

function renderDetailsCardTypesHtml(type) {
    return /*html*/`<div class="pokemon-types m-top">${type}</div>`
}