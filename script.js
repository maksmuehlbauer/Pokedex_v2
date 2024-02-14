let pokemonJsonsArray = [];
let FirstRenderId = 22;

async function init() {
    // document.getElementById('show-all-pokemon-container').innerHTML = ''
    await downloadPokemonApiInJsons();
    renderAllPokemon();
    renderPokemonTypes()
}


async function downloadPokemonApiInJsons() {
    for (let i = 1; i < FirstRenderId; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);
        pokemonJsons = await response.json()
        pokemonJsonsArray.push(pokemonJsons)
    }
    console.log(pokemonJsonsArray[0])
}


function renderAllPokemon() {
    let allPokemonContainer = document.getElementById('show-all-pokemon-container');
    for (let i = 0; i < pokemonJsonsArray.length; i++) {
        const pokemon = pokemonJsonsArray[i];
        let pokemonCardImage = pokemon['sprites']['other']['dream_world']['front_default']
        

        allPokemonContainer.innerHTML += /*html*/`
        <div id="pokemon-card-${i}" class="pokemon-card">
            <h2>${pokemon['id']}</h2>
            <h1>${pokemon['name']}</h1>
            <div id="type-container-${i}">
                <!-- type loop -->
            </div>
            <img src="${pokemonCardImage}">
        </div>
    `    
    }
}


function renderPokemonTypes() {
    for (let i = 0; i < pokemonJsonsArray.length; i++) {
        let typeContainer = document.getElementById(`type-container-${i}`)
        const pokemonTypes = pokemonJsonsArray[i]['types'];
        for (let j = 0; j < pokemonTypes.length; j++) {
            const pokemonType = pokemonTypes[j]['type']['name'];
            typeContainer.innerHTML += `
                <div>${pokemonType}</div>
            `
        }        
    }      
}
