
const pokeApi = {}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url) // fetch retorna uma promisse de response, processamento assincrono (para o que não tem a resposta imediata).
        .then((response) => response.json()) //transformando o response em uma promessa do body convertido em jason
        .then((jsonBody) => jsonBody.results)  //vamos pegar no jason o results
        .catch((error) => console.error(error))
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

 