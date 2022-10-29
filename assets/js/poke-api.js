
const pokeApi = {}

function convertPokeApiDetailsToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.order
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types 
    
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailsToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 25) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    return fetch(url) // fetch retorna uma promisse de response, processamento assincrono (para o que não tem a resposta imediata).
        .then((response) => response.json()) //transformando o response em uma promessa do body convertido em jason
        .then((jsonBody) => jsonBody.results)  //vamos pegar no jason o results
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail)) // mapeando  alista de requisição dos detlahes dos pokemons((pokemon) => fetch(pokemon.url).then((response) => response.json())))
        .then((detailsRequest) => Promise.all(detailsRequest))
        .then((pokemonDetails) => pokemonDetails)
    }
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

// Promise.all([ //recebe uma lista(array) de promessas
// fetch('https://pokeapi.co/api/v2/pokemon/1/'),
// fetch('https://pokeapi.co/api/v2/pokemon/1/'),
// fetch('https://pokeapi.co/api/v2/pokemon/1/'),
// fetch('https://pokeapi.co/api/v2/pokemon/1/')
// ]).then((results) => {
// console.log(results)
// })