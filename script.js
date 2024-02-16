let pokemonJsonsArray = [];
let pokemonCardBGColorArray = [];
let firstRenderId = 22;



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
    console.log(pokemonJsonsArray[0])
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


// HTML Functions


function renderAllPokemmonHtml(i, pokemon, pokemonCardImage) {
    return /*html*/`
        <div id="pokemon-card-${i}" class="pokemon-card">
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