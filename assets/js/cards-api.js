function convertTypes(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`
)}


function convertAbilities(pokemonAbilities) {
    return pokemonAbilities.map((abilities) => `<li class="ability">${abilities.ability.name}</li>`
)}

function convertStats(pokemonStats) {
    return pokemonStats.map((stats) => `<li class="stat">${stats.base_stat}</li>`
    )}

//consumindo Api
//`https://pokeapi.co/api/v2/pokemon/${pokemon}`

const url = `https://pokeapi.co/api/v2/pokemon/`

function convertDataToPokemon(pokemon) {
    return `
    <section  class="card ${pokemon.types[0].type.name}">
            <header class="header ">
                <div class="options">
                    <button class="button">
                        <a href="./index.html"><img src="./assets/img/seta.png" alt=""></a>
                    </button>
                    <button  class="button btnHeart" value="like" >
                        <img class="heart" src="./assets/img/whiteLike.png" alt="ícone de coração para curtir o card">
                    </button>
                </div>
            </header>     
    <h2 class="name">${pokemon.name}</h2>
        <hr>
        <div class="pokemons">
            <ul class="types ">
                ${convertTypes(pokemon.types).join('')}
            </ul>

            <number class="number">#0${pokemon.id}</number>
        </div>

        <div class="img">
            <img class="pokemonImg"
                src="${pokemon.sprites.other.dream_world.front_default}"
                alt="Imagem do ${pokemon.name}">
        </div>

    </section>


    <main class="main">
        <nav class="navgation">
            <li id="1" class="lista navBar">About</li>
            <li id="2" class="lista navBar">Base Stats</li>
        </nav>
            <hr>
        <div data-id="1" class="about show" >
            <ul class="general">
                <li class="lista aboutPokemon">Base Experience: ${pokemon.base_experience}</li>
                <li class="lista aboutPokemon">Height: ${pokemon.height}</li>
                <li class="lista aboutPokemon">Weight: ${pokemon.weight}</li>
                <li class="lista aboutPokemon pokeAbilities">Abilities: ${convertAbilities(pokemon.abilities).join('  ')}</li>
            </ul>
        </div>

        <div data-id="2" class="baseStats">
            <ul class="stats">
                <li class="lista statsPokemon">HP: </li>
                <li class="lista statsPokemon">Atackt: </li>
                <li class="lista statsPokemon">Defense: </li>
                <li class="lista statsPokemon">Sp. Atk: </li>
                <li class="lista statsPokemon">Sp. Def: </li>
                <li class="lista statsPokemon">Speed: </li>
            </ul>
            <div class="pokeStats">${convertStats(pokemon.stats).join('')}</div>
        </div>
        </main>
        
    `

}
const pokeCard = document.getElementById('pokemonCards')

fetch(url)
    .then(res => res.json())
    .then(data => data.results)
    .then((pokemons) => pokemons.map((pokemon) => fetch(pokemon.url)
        .then((response) => response.json())))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokeDetails) => pokeDetails)
    .then((pokemonCard = []) => {
        pokeCard.innerHTML = pokemonCard.map(convertDataToPokemon).join('')

    })

    

