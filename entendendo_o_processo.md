# CONSTRUINDO UMA POKEDEX

## FAZENDO UMA REQUEST VIA JAVASCRIPT

Vamos consumir uma API (pokeapi - https://pokeapi.co/), queremos preencher a lista de class "pokemon" com itens da API, para isso vamos chamar http via JS com o fetch API.

```js
const offset = 0
const limit = 10

const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}limit=${limit}`

fetch(url) // processamento assíncrono, retorna uma promessa de resposta, ou seja não recebe na hora como se fosse local.
    .then(function(response) { //essa será a resposta, essa função ocorrerá deppis que a resposta do fetch chegar
        console.log(response) // esse será printado após a resposta abaixo.
    })

const x = 10 + 10
console.log(x) // esse processamento ocorrerá antes da fetch pois é local.
```

## MANIPULANDO O RESULTADO DA REQUISIÇÃO

Acima vimos como buscar a requisição e usamos o then para buscar a resposta e executar a função, porém poderá ser uma requisição com fracasso, nesse caso, usamos o metodo '.catch'.

Na response do fetch, no body, recebemos 'readbleString', ou seja, sempre vem como string, e podemos manipula-la, nesse caso, precisamos transforma-lá em um json para acessar e manipular. Para isso, no proprio 'response', temos o metodo json

```js
fecth(url)
    .then(function(response) { //sucesso na requisição
        response.json() // esse metodo permite a converão para json
    })
    .catch(function (error) { //fracasso na requisição
        console.error(error)
    })
    .finally(function() {
        console.log('Requisição Concluída!') // independente do sucesso ou fracasso, mostra que o processo foi concluído.
    })
```

baseado no metodo 'try' 'catch':
```js
try {

} catch(error) {

} finally {

}
```

Essa forma não é aconselhavél, porém podemos entender melhor. (callback dentro de outra callback, criando uma árvore, podera dificultar a manutençaõ.)
```js
fecth(url)
    .then(function(response) { 

        response.json().then(function(responseBody) {
            console.log(responseBody) //aqui ja recebemos o objeto convertido
    })
})

    .catch(function (error) { 
        console.error(error)
    })
    .finally(function() {
        console.log('Requisição Concluída!') 
    })
```

Podemos encadear vários '.then para melhorar o código e deicar mais fácil de manipular e de ler. è como uma função de transformação encadeada.
```js
fecth(url)
    .then(function(response) { 
         return response.json() // retorna uma promisse da converção (promessa do body convertido em json)
    })
    .then(function(jsonBody) {
        console.log(jasonBody) // ja entende que vem da promisse de conversão e ja devolve o body convertido, já podemos manipular
    })
    .catch(function (error) { 
        console.error(error) 
    })
    .finally(function() {
        console.log('Requisição Concluída!') 
    })
```

para simplificar todo esse código podemos usar o arrow functions
```js
fetch(url)
    .then((response) => {
        return response.json()
    })
    .then((jsonBody) => {
        console.log(jsonBody)
    })
    .catch((error) => {
        console.error(error)
    })
    .finally(
        console.log('Requisição Concluída!')
```

Quando só temos uma linha dentro da função podemos reduzir ainda mais as linhas de código, deixando tudo em uma linha:
```js
fetch(url)
    .then((response) => return response.json())
    .then((jsonBody) => console.log(jsonBody))
    .catch((error) => console.error(error))
    .finally(console.log('Requisição Concluída!')); 
```

## TRANSDORMANDO A LISTA DE POKEMON EM UMA LISTA HTML

O que nos interessa de fato é o 'results' do body, por isso vamos direto ao ponto.
```js
fetch(url)
    .then((response) =>  response.json())
    .then((jsonBody) => jasonBody.results)
    .then((pokemonList) => { //dessa forma irá retornar a lista dos pokemons como queremos em array
        debugger
        console.log(pokemonList)
    })
    .catch((error) => console.error(error))
    .finally(console.log('Requisição Concluída!')); 
```

Precismaos converter os dados que recebemos em array para a lista (li) do html

```js
function convertPokemonToLi (pokemon) {
    return `
    <li class="pokemon grass">
        <span class="number">${pokemon.number}</span>
        <span class="name">${pokemom.name}</span>

        <div class="details">
            <ol class="types">
                <li class="type grass">Grass</li>
                <li class="type poison">Poison</li>
            </ol>

            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
                alt="${pokemom.name}">
        </div>

    </li>`

}
fetch(url)
    .then((response) => return response.json())
    .then((jsonBody) => jasonBody.results)
    .then((pokemons) => { 
        
        for (let i = 0; i < pokemons.length; i++) { //estamos transformando os dados na lista do HTML
            const pokemon = pokemons[i]
            convertPokemonToLi(pokemon) // a lista de pokemon ja em HTML

            document.getElementsByClassName('pokemons') // volta uma lista de HTML pois estamos buscando o elemento pela class do HTML
            document.getElementById('pokemonList') // aqui selecionamos pelo ID, é mais elegante e irá mostrar somente um elemento para manipularmos
    })
    .catch((error) => console.error(error))
    .finally(console.log('Requisição Concluída!')); 
```
Para que possamos manipular a lista no HTML, pegamos o conteúdo da lista que existe no html e adicionamos mais itens. Poderá ver no console do browser.
 - Vamos até o HTML (document.getElementById)
 - Pegamos a lista de pokemons (('pokemonList'))
 - Atribuimos a lista à uma variável (pokemonList) - acesso programático
 - Adicionamos a lista na lista do HTML (innerHTML +=)

```js
const pokemonList = document.getElementsById('pokemonList')
pokemonList.innerHTML += '<li>teste</li>' // o innerhtml é o html que está no elemento da lista (li) porém em formato de texto, quando usamos appendChild será em formato de objeto.
fetch(url)
    .then((response) => return response.json())
    .then((jsonBody) => jasonBody.results)
    .then((pokemons) => { 
        
        for (let i = 0; i < pokemons.length; i++) { 
            const pokemon = pokemonst[i]
            console.log(convertPokemonToLi(pokemon)) 

    .catch((error) => console.error(error))
```
Vamos concatenar a lista de HTML com o resultado do que veio na lista de pokemons convetido, incrementando a lista do HTML com o queu convertemos. Então o código poderá ficar assim:
```js
const pokemonList = document.getElementsBy('pokemonList') //1 pegando a lista em html

fetch(url) //2 fazendo a requisição HTTP
    .then((response) => return response.json()) //3 converte a string em json para manipularmos
    .then((jsonBody) => jasonBody.results) //4 pega os results convertidos a sererm manipulados
    .then((pokemons) => { //5 com o resultado dos pokemons entra no for
        
        for (let i = 0; i < pokemons.length; i++) { 
            const pokemon = pokemons[i] // 6 converte a lista para lista HTML
            pokemonList.innerHTML += convertPokemonToLi(pokemon) //7 (convertPokemonToLi) convertendo a lista de pokemons em uma estrutura de li e 5(innerhtml +=) concatenando a lista html com a lista convetida

    })
    .catch((error) => console.error(error))
```

## SEPARANDO O CONUSMO DA API DA MANOPULAÇÃO DE HTML

Podemos criar arquivos JS distintos para cada finalidade, assim a manutenção e leitura/entendimento será mais fácil. Para isso vamos separa o que é de manipulação de html do de consumo da API.

criamos um poke-api.js e dentro dela colocaremos tudo que é referente a manipulação da PokeAPI
    - criamos um objeto
    - dentro colocaremos um método 'getPokemon' que será uma função que retornará toda a manipulação do no fetch

Vale lembrar que é necesario importat para o arquivo HTML, a ordem importa, nesse caso o poke-api.js ficará acima.

```js
const pokeApi = {}
pokeApi.getPokemos = (offtset , limit ) => {
    const offset = 0
    const limit = 10

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}limit=${limit}`
    fetch(url)
}
```
Podemos colocar os parametros por defalut, caso não rcebamos as variáveis na função
```js
const pokeApi = {}
pokeApi.getPokemos = (offtset = 0 , limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?${offset}limit=${limit}`
    fetch(url)
}
```

Vamos retornar a lista de pokemons pronta, abstraindo o consumo do HTTP e nos dá o resultado pronto. No arquivo poke-api.js:
```js
const pokeApi = {}
pokeApi.getPokemos = (offtset = 0 , limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?${offset}limit=${limit}`
    return fetch(url)
    .then((response) => return response.json())
    .then((jsonBody) => jasonBody.results)
    .catch((error) => console.error(error))
}
```
então vamos ajustar o arquivo main somente com o necessario, entaõ ficará assim:
```js
function convertPokemonToLi (pokemon) {
    return `
    <li class="pokemon grass">
        <span class="number">${pokemon.number}</span>
        <span class="name">${pokemom.name}</span>

        <div class="details">
            <ol class="types">
                <li class="type grass">Grass</li>
                <li class="type poison">Poison</li>
            </ol>

            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
                alt="${pokemom.name}">
        </div>

    </li>`

}
```
```js
const pokemonList = document.getElementsBy('pokemonList')

pokeApi.getPokemons().then((pokemons) => { 
    for (let i = 0; i < pokemons.length; i++) { 
        const pokemon = pokemons[i] 
        pokemonList.innerHTML += convertPokemonToLi(pokemon)
    })
    .catch((error) => console.error(error))
```
vamos aprimorar, pois o for ira demandar muito tempo, ira concatenar um de cada vez, então vamos estimular o browser a renderizar tudo de uma ves, para isso vamos transformar a lista que temos de pokemos em uma lista nova de HTML
```js
const pokemonList = document.getElementsBy('pokemonList')

pokeApi.getPokemons().then((pokemons) => { 
    const listItems = []

    for (let i = 0; i < pokemons.length; i++) { 
        const pokemon = pokemons[i] 
        listItems.push(convertPokemonToLi(pokemon))
    }
    console.log(listItems) //teremos a lista com todo nosso HTML - tinhamos 10 pokemons e agora teremos 10itens de lista em html
})
    
```

## USANDO A FUNÇÃO AUXILIAR MAP 

Temos algumas funções auxiliares que nos ajudam a manipular itens de lista, uma delas é o 'map' (nele podemmos passar uma função trasnformadora, reduzindo consideravelmente todo o código.)
```js
const pokemonList = document.getElementsBy('pokemonList')

pokeApi.getPokemons().then((pokemons = []) => { //vamos garantir que venha uma lista colocando por default no parametro
   
    const newList = pokemons.map((pokemon) => { //podemos colocar como parameetros : value, index, array
        return convertPokemonToLi(pokemon) //estamos convertendo a lista enquanto retornamos sem precisar do for
    })

    const newHTML = newList.join('') //join junta os elementos em uma string com o separador que determinarmos

    pokemonList.innerHTML += newList
})
    
```
Agora que entedemos, vamos diminuir ainda mais as linhas de código:
```js
const pokemonList = document.getElementsBy('pokemonList')

pokeApi.getPokemons().then((pokemons = []) => { 
    pokemonList.innerHTML += pokemons.map.(convertPokemonToLi).join('') 
})
```
- fizemos a requisição http (pokeApi.getPokemons)
- recebemos a lista (.then((pokemons = [])))
- transformamos constinua sendo um for (map)
- que para cada elemento irá chamar a função (convertPokemonToLi)
- irá devolver uma string (li)
- que irá compor uma lista nova (pokemons)
- concatemos os elementos à essa lista nova com o separador determinado (join('')) com o HTML novo
- colocamos dentro do html que estamos manipulando (innerHTML)
- gerando assim a nova lista de pokemons


```js
const pokemonList = document.getElementsBy('pokemonList')

pokeApi.getPokemons().then((pokemons = []) => { 
    const newHtml = pokemons.map.(convertPokemonToLi).join('') 
    pokemonList.innerHTML = newHtml
})
```

## BUSCANDO MAIS DETALHES DOS POKEMONS

Precisamos de mais detalhes do pokemon, pois só recebemos os nomes, por isso precisamos fazer a requisição do detalhe de cada pokemon para que não tenhamos que fazer uma rquisisão para cada um e ter que esperar cada requisição ser conluida, usaremos uma estrategia: 'Promisse.all' (recebe uma lista de promessas).

```js
const pokeApi = {}
pokeApi.getPokemos = (offtset = 0 , limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?${offset}limit=${limit}`
    
    return fetch(url)
        .then((response) => return response.json())
        .then((jsonBody) => jasonBody.results)
}

Promisse.all([ //temos que esperar que todas as requisições abaixo terminem
    fecth('https://pokeapi.co/api/v2/pokemon/1/'),
    fecth('https://pokeapi.co/api/v2/pokemon/1/'),
    fecth('https://pokeapi.co/api/v2/pokemon/1/'),
    fecth('https://pokeapi.co/api/v2/pokemon/1/'),
]).then((results) => { //recebemos o resultado
    console.log(results)
```
 - fazemos a requisição (pokeApi.getPokemons...)
 - recebemos a lista de pokemons (.then((response...)
 - vamos transformar essa lista em uma lista de novas requisições (fecth('')...)
 - esperamos a resposta de todas as requisições   
 - só então, vamos usar a resposta dela (.then((results...)

## MANIPULANDO MULTIPLAS REQUISIÇÕES EM PARALELO

Teríamos que tratar cada response convertendo o body para json, então vamos melhorar o código para que não tenha que passar por todas essas requisições e tratamentos individualmente complementando nosso .then para recebermos os detalhes dos pokemons.

```js
const pokeApi = {}

pokeApi.getPokemos = (offtset = 0 , limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?${offset}limit=${limit}`
    
    return fetch(url)
        .then((response) => return response.json())
        .then((jsonBody) => jasonBody.results)
        .then((pokemons) => pokemons.map((pokemon) => fetch(pokemon.url).then((response.json())) //estamos transformando a lsta em uma nova lista que é a lista de promessas de detalhes do pokemon ja convertida em json
        .then((detailRequests) => Promisse.ass(detailRequests)) // esperamos que a lista de requisições seja resolvida
        .then((pokemonsDetails) => { //rcebemos os detalhes dos pokemons
            debugger
            console.log(pokemonsDetails)
        }
}
```
Para facilitar a visualização, vamos separar as funções:
```js
const pokeApi = {}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url).then((response.json())
}
    
pokeApi.getPokemos = (offtset = 0 , limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?${offset}limit=${limit}`
    
    return fetch(url)
        .then((response) => return response.json())
        .then((jsonBody) => jasonBody.results)
        .then((pokemons) => pokemons.map((pokemon) => getPokemonDetail)
        .then((detailRequests) => Promisse.ass(detailRequests)) 
        .then((pokemonsDetails) => pokemonsDetails)
}
```
Com os detalhes podemos manipular nossa li mais genericamente.
```js
function convertPokemonTypesToLi(pokemonTypes) {
    return pokemonTypes.map((typeSolt) => `<li class="type">${typeSlot.type.name}</li>`

}

function convertPokemonToLi (pokemon) {
    return `
    <li class="pokemon grass">
        <span class="number">${pokemon.order}</span>
        <span class="name">${pokemom.name}</span>

        <div class="details">
            <ol class="types">
                ${convertPokemonTypesToLi(pokemon.types).join('')}
            </ol>

            <img src=`${pokemon.sprites.other.dream_world.front_default}`
                alt="${pokemom.name}">
        </div>

    </li>`
```

## TRANSFORMANDO O MODELO DE POKEAPI PARA O NOSSO PROPRIO

Não vamos usar todo os detalhes do pokeApi, por isso vamos buscar somente as informações pertinentes para que possamos generalizar de forma mais simples criando nosso modelo de pokemon.

- vamos criar um novo arquivo 'pokemon_model.js'
- nela vamos criar uma class com o que queremos:
```js
class Pokemon {
    number;
    name;
    type;
    types = [];
    photo;
}
```
Lembrando que devemos chamar esse script no HTML.
Dessa forma, vamos incrementar nossa função para converter para nosso modelo..
```JS
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) { //essa função irá converter os detalhes do API para os nossos
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.order
    pokemon.name = pokeDetail.name
    pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    pokemon.type = pokemon.types.get(0)
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response.json())
}
    
pokeApi.getPokemos = (offtset = 0 , limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?${offset}limit=${limit}`
    
    return fetch(url)
        .then((response) => return response.json())
        .then((jsonBody) => jasonBody.results)
        .then((pokemons) => pokemons.map((pokemon) => getPokemonDetail)
        .then((detailRequests) => Promisse.ass(detailRequests)) 
        .then((pokemonsDetails) => pokemonsDetails)
}
```

```js
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) { //essa função irá converter os detalhes do API para os nossos
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.order
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types //fazendo um destructuring para pegar os types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}
    
pokeApi.getPokemos = (offtset = 0 , limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?${offset}limit=${limit}`
    
    return fetch(url)
        .then((response) => return response.json())
        .then((jsonBody) => jasonBody.results)
        .then((pokemons) => pokemons.map((pokemon) => getPokemonDetail)
        .then((detailRequests) => Promisse.ass(detailRequests)) 
        .then((pokemonsDetails) => pokemonsDetails)
}
```

Com os nossos detalhes em mãos podemos manipular nossa li mais genericamente, além disso não precisaremos da função 'convertPokemonTypesToLi' o map está embutido:
```js
function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon grass">
        <span class="number">${pokemon.number}</span>
        <span class="name">${pokemom.name}</span>

        <div class="details">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
            </ol>

            <img src=`${pokemon.photo}`
                alt="${pokemom.name}">
        </div>

    </li>`
```

## ADICIONANDO OS TIPOS DE POKEMON DINAMICAMENTE

Para manipularmos alguns detalhes em CSS como o Background, vamos colocar uma class na nossa lista do HTML em seguida colcoaresmos as cores de background no CSS respectiva a cada tipo de pokemon
```js
function convertPokemonToLi(pokemon) { //incluir a class type no li do HTML
    return `
    <li class="pokemon ${pokemon.type}"> 
        <span class="number">${pokemon.number}</span>
        <span class="name">${pokemom.name}</span>

        <div class="details">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <img src=`${pokemon.photo}`
                alt="${pokemom.name}">
        </div>

    </li>`
```

## ADICIONANDO BOTÃO DE PAGINAÇÃO

- Criamos um botão no html com type e ID - load more, dentro de uma div com class 'pagination'
- Estilizamos a div e o botão no CSS

## CRIANDO MECANISMO DE PAGINAÇÃO

A ideia é clicar no botão e carreagr mais pokemons
O responsavel por isso é o que está no 'main.js', mas para isso vamos usar o offset e o limit que esta no 'poke-api.js', por isso temos que fazer o controle disso

no ''poke-api.js''
```js
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) { 
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types 

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}
    
pokeApi.getPokemons = (offtset = 0 , limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?${offset}limit=${limit}`
    
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests)) 
        .then((pokemonsDetails) => pokemonsDetails)
}
```
no 'main.js'
```js
const pokemonList = document.getElementsBy('pokemonList') //trouxemos para cima para separar as váriaveis
const loadMoreButton = document.getElementsBy('loadMoreButton') //
const limit = 5;
let offset = 0;

//vamos colocar tudo na função para ficar mais organizado
function loadPokemonItems(offset, limit) { //precisamos receber os parametros offset e limit que estão lá mo main.js
    function convertPokemonToLi(pokemon) {  //colocammos a função para dentro da função que acabamos de criar
        return `
        <li class="pokemon ${pokemon.type}"> 
            <span class="number">${pokemon.number}</span>
            <span class="name">${pokemom.name}</span>

            <div class="details">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src=`${pokemon.photo}`
                    alt="${pokemom.name}">
            </div>

        </li>`
    }
    pokeApi.getPokemons().then((pokemons = []) => { 
        const newHtml = pokemons.map.(convertPokemonToLi).join('') 
        pokemonList.innerHTML += newHtml //ao invés de substituir, irá concatenar por isso mudamos de = para +=
})
}

loadPokemonItems(offset, limit)

//quando clicar no botão queremos que carregue mais itens, para isso usamos o addEventListener('click',) com a função
loadMoreButton.addEventListener('click', () => { 
    loadPokemonItems()
})
```
Vamos compactar ainda mais esse código:
```js
const pokemonList = document.getElementById('pokemonList') //trouxemos para cima para separar as váriaveis
const loadMoreButton = document.getElementById('loadMoreButton') //
const limit = 5;
let offset = 0;
//vamos colocar tudo na função para ficar mais organizado
function loadPokemonItems(offset, limit) { //precisamos receber os parametros offset e limit que estão lá mo main.js
  //não é mais necessario a função 'convertPokemonToLi' pois estamos encapsulando a estrutura do li 
    pokeApi.getPokemons().then((pokemons = []) => { 
        const newHtml = pokemons.map((pokemon) => 
        `
        <li class="pokemon ${pokemon.type}"> 
            <span class="number">${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="details">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"" 
                    alt="${pokemon.name}">
            </div>

        </li>`).join('') 

        pokemonList.innerHTML += newHtml //ao invés de substituir, irá concatenar por isso mudamos de = para +=
})
}

loadPokemonItems(offset, limit) 
//quando clicar no botão queremos que carregue mais itens, para isso usamos o addEventListener('click',) com a função
loadMoreButton.addEventListener('click', () => { 
    offset += limit //incrementando a pagina para carregar a pagina seguinte
    loadPokemonItems (offset, limit)
})
```

## CRIANDO MECANISMO PARA LIMITAR A PAGINAÇÃO

Vamos limitar a quantidade de pokemons, então quando chegar ate a quantidade que desejamos, o botão de load more ira sumir, para isso vamos criar um:
```js
const pokemonList = document.getElementById('pokemonList') 
const loadMoreButton = document.getElementById('loadMoreButton') 
const maxRecords = 11;
const limit = 5;
let offset = 0;


function loadPokemonItems(offset, limit) { 

    pokeApi.getPokemons().then((pokemons = []) => { 
        const newHtml = pokemons.map((pokemon) => 
        `
        <li class="pokemon ${pokemon.type}"> 
            <span class="number">${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="details">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"" 
                    alt="${pokemon.name}">
            </div>

        </li>`).join('') 

        pokemonList.innerHTML += newHtml 
})
}

loadPokemonItems(offset, limit) 

loadMoreButton.addEventListener('click', () => { 
    offset += limit 

    const qtdRecordsNextPage = offset + limit

    if (qtdRecordsNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItems (offset, limit)
    }
    
})

```

## DEBUGANDO PELO BROWSER

- Abrir o console
- Sources
- Encontrar o Arquivo
- Colocar o breakpoint

jeito mais fácil é colocar um 'debugger' no proprío arquivo JS pois as vees temos muitos arquivos e dificulta encontrar no sources.

