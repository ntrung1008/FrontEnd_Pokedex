const P = new Pokedex.Pokedex();

var getAllPokemons = () =>
{
    for( let i =1; i<=890; ++i)
    {
        const golduck = await P.getPokemonByName('golduck') // with await, be sure to be in an async function (and in a try/catch)
        console.log(golduck)
    }
}

getAllPokemons();