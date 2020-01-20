const pokedex = document.getElementById('pokedex');
const P = new Pokedex.Pokedex();

var getAllPokemons = () =>
{
    for( let i =1; i<=807; ++i)
    {
        P.getPokemonByName(i) // with Promise
        .then(function(response) {
        console.log(response);

        const Pokemon = {
            name:response.name,
            image:response.sprites['front_default'],
            id:response.id    
        }
        displayPokemon(Pokemon);
    });
    }
}

var displayPokemon =(Pokemon)=>{
    var pokemonHTMLString = 
     `
    <li class="card">
    <img class="card-image" src="${Pokemon.image}"/>
    <h2 class="card-title">${Pokemon.id}. ${Pokemon.name}</h2>
    </li>
    `;
    pokedex.insertAdjacentHTML('beforeend',pokemonHTMLString);
};
getAllPokemons();