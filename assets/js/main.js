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

pokeApi.getPokemons().then((pokemons = []) => { // vem a lista vazia
    // const listItems = []
    pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('') //forma mais elegante de fazer todo o código comentado abaixo
    // const newList = pokemons.map((pokemon) => { //passando uma função transformadora, podemos colocar valores como index, value, array, etc
    //     return convertPokemonToLi(pokemon) //retorna a lista convertida em li sem usar o for comentado abaixo
    // })

    //console.log(pokemons)

    // const newHtml = newList.join('') //junta todos os elementos da lista como string com o separador escolhido

    // pokemonList.innerHTML += newHtml

    // for (let i = 0; i < pokemons.length; i++) { //transformando o lista de pokemons recebidas em jason para a lista de HTML
    //     const pokemon = pokemons[i];//precisamos transferir tudo para o HTML*
    //     listItems.push(convertPokemonToLi(pokemon))
    // }

    // console.log(listItems)

})