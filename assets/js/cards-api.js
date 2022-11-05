
//consumindo Api
//`https://pokeapi.co/api/v2/pokemon/${pokemon}`

const url = `https://pokeapi.co/api/v2/pokemon/`

function convertDataToPokemon(pokemon) {
    return `
    <section  class="card">
            <header class="header">
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
            <ul class="types">
                <li class="type">grass</li>
                <li class="type">poison</li>
            </ul>

            <number class="number">#001</number>
        </div>

        <div class="img">
            <img class="pokemonImg"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
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
                <li class="lista aboutPokemon">Species: </li>
                <li class="lista aboutPokemon">Height: </li>
                <li class="lista aboutPokemon">weight: </li>
                <li class="lista aboutPokemon">Abilities: </li>
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
                <li class="lista statsPokemon">Total: </li>
            </ul>
        </div>
        </main>
        
    `

}
const pokeCard = document.getElementById('pokemonCards')

fetch(url)
    .then(res => res.json())
    .then(data => data.results)
    .then((pokemonCard = []) => {
        pokeCard.innerHTML += pokemonCard.map(convertDataToPokemon).join('')

    }).catch((error) => console.error(error));

