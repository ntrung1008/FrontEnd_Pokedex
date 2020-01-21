const pokedex = document.getElementById("pokedex");
const P = new Pokedex.Pokedex();

var getAllPokemons = () => {
  for (let i = 1; i <= 807; ++i) {
    P.getPokemonByName(i) // with Promise
      .then(function(response) {
        //console.log(response);

        const Pokemon = {
          name: response.name,
          image: response.sprites["front_default"],
          shiny: response.sprites["front_shiny"],
          id: response.id
        };
        displayPokemon(Pokemon);
      });
  }
};

var displayPokemon = Pokemon => {
  var pokemonHTMLString = `
    <li class="card">
        <img class="card-image default" src="${Pokemon.image}"/>
        <img class="card-image shiny" src="${Pokemon.shiny}"/>
        <h2 class="card-title">${Pokemon.id}. ${Pokemon.name}</h2>
        <input type="button" value="Click"  onclick="playaudio(${Pokemon.id})">
        <audio id="audio${Pokemon.id}" src="../FrontEnd_Pokedex/sound/${Pokemon.id}.wav" ></audio>
    </li>
    `;
  pokedex.insertAdjacentHTML("beforeend", pokemonHTMLString);
};

var playaudio = id => {
  var audio = document.getElementById("audio" + id);
  audio.play();
};
getAllPokemons();
