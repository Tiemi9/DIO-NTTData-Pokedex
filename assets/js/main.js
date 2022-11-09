const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const limit = 5;
let offset = 0;

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>
            `
        <li class="pokemon ${pokemon.type}">
            <button class="buttonCard"> <a href="./cards.html"> 
            <div class="nameId">
            <span data-id="${pokemon.number}" class="number">${pokemon.number}</span><br>
            <span class="name">${pokemon.name}</span>
            </div>

            <div class="details">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"" 
                    alt="${pokemon.name}">
            </div>
            </a> </button>
        </li>`).join('')

        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    loadPokemonItems(offset, limit)
})



