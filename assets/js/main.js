const offset = 0
const limit = 10
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon">
                <span class="number">#001</span>
                <span class="name">${pokemon.name}</span>

                <div class="details">
                    <ol class="types">
                        <li class="type">Grass</li>
                        <li class="type">Poison</li>
                    </ol>

                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="${pokemon.name}">
                </div>
                
            </li>`
}
const pokemonList = document.getElementById('pokemonList')

fetch(url) // fetch retorna uma promisse de response, processamento assincrono (para o que não tem a resposta imediata).
    .then((response) => response.json()) //transformando o response em uma promessa do body convertido em jason
    .then((jsonBody)     => jsonBody.results)  //vamos pegar no jason o results
    .then((pokemons) => { // vem a lista
        
        for (let i = 0; i < pokemons.length; i++) { //transformando o lista de pokemons recebidas em jason para a lista de HTML
            const pokemon = pokemons[i];//precisamos transferir tudo para o HTML*
            pokemonList.innerHTML += convertPokemonToLi(pokemon)
        }
        
    }) // recebendo o body convertido e printando.
    .catch((error) => console.error(error))

/* A sintaxe reduzida, diminui as linhas de código, caso não o fizesse, ficaria assim:

    .then(function (response) { //then = chame essa função.
        response.jason().then(responseBody)
    })
    .catch(function (error) { //catch = caso  haja algum fracasso ou erro.
        console.error(error)
    })
    .finally(function () {  //finally = quando a operação for conluída independente se der erro ou não.
        console.log("Requisição Concluìda")
    })
*/