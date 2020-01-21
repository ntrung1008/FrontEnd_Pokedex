const pokedex = document.getElementById('pokedex');
const P = new Pokedex.Pokedex();
const sound = new Audio();

var getAllPokemons = () =>
{
    for( let i =1; i<=807; ++i)
    {
        P.getPokemonByName(i) // with Promise
        .then(function(response) {
        //console.log(response);

        sound.src="../sound/$(i)";
        const Pokemon = {
            name:response.name,
            image:response.sprites['front_default'],
            id:response.id,
            cry:sound
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
    <input type="button" value="Click"  onclick="playaudio()">
    <audio id="audio${Pokemon.id}" src="../FrontEnd_Pokedex/sound/${Pokemon.id}.wav" ></audio>
    </li>
    `;
    pokedex.insertAdjacentHTML('beforeend',pokemonHTMLString);
};

var playaudio= ()=>
{
    var audio = document.getElementById("audio${Pokemon.id}");
    audio.play();
}
getAllPokemons();