
var pokedex = document.getElementById("pokedex");
var P = new Pokedex.Pokedex();
var Poke_cache = [];
var maximum = 1;

//This function will display 200 pokemon at a time then remember where it stops at
//for future calls
var display20Poke = () => {
  getAllPokemons(maximum);
  maximum += 200;
  console.log(maximum);
};

//This function send request to get all the pokemons information then send those
//to display function
var getAllPokemons = input => {
  for (let i = input; i < input + 200 && i <= 807; ++i) {
    P.getPokemonByName(i) // with Promise
      .then(function (response) {
        console.log(response.name);
        const Pokemon = {
          id: response.id,
          name: response.name.replace("-", " "),
          default: response.sprites["front_default"],
          shiny: response.sprites["front_shiny"],
          display: response.sprites["front_default"],
          type: response.types.map(type => type.type.name).join(", "),
          height: response.height,
          weight: response.weight,
          ability: response.abilities
            .map(ability => ability.ability.name.replace("-", " "))
            .join(", "),
          speed: response.stats[0].base_stat,
          special_defense: response.stats[1].base_stat,
          special_attack: response.stats[2].base_stat,
          defense: response.stats[3].base_stat,
          attack: response.stats[4].base_stat,
          hp: response.stats[5].base_stat,
          species: response.species.name,
          moves: response.moves,
          defense_stats: buildDefenseStats(response.types)
        };
        displayPokemon(Pokemon);
        console.log(Pokemon.defense_stats);
      });
  }
};

//this function take a Pokemon input then generate a HTMLString with that input
//then insert that HTMLString to the HTML page
var displayPokemon = Pokemon => {
  var pokemonHTMLString = `
    <div class="flip-card">
      <div class="card-front">
        <p class="card-title" onclick ="getinfo(${Pokemon.id})" >${
    Pokemon.name
    } </p>
        <img class="card-image default" src="${Pokemon.display}">
      </div>
      <div class="card-back">
        <div class="img-row">
          <img class="card-image " src="${Pokemon.default}">
          <img class="card-image " src="${Pokemon.shiny}"/>
        </div>
        <div class="audio-buttons">
          <img id="volume_logo" src="../FrontEnd_Pokedex/resources/volume-high.svg" onclick="playaudio(${
    Pokemon.id
    })">
          <audio id="audio${Pokemon.id}" src="../FrontEnd_Pokedex/sound/${
    Pokemon.id
    }.wav" ></audio>
        </div> 
        <div class="section-title">Info</div>
        <table class="info">
          <tr>
            <td>Height</td>
            <td class="info-value">${Pokemon.height}</td>
          </tr>
          <tr>
            <td>Weight</td>
            <td class="info-value">${Pokemon.weight}</td>
          </tr>
          <tr>
            <td>Type</td>
            <td class="info-value">${Pokemon.type}</td>
          </tr>
          <tr>
            <td>Ability</td>
            <td class="info-value">${Pokemon.ability}</td>
          </tr>
        </table>
        <div class="section-title">Stats</div>
        <div class="stat-bars">
          <div class="bar-label">HP</div>
          <div class="bar bar-hp" style="--bar-value:${(Pokemon.hp / 200) * 100}%;">${
    Pokemon.hp
    }</div>
          <div class="bar-label">Attack</div>
          <div class="bar bar-attack" style="--bar-value:${(Pokemon.attack / 200) *
    100}%;">${Pokemon.attack}</div>
          <div class="bar-label">Defense</div>
          <div class="bar bar-defense" style="--bar-value:${(Pokemon.defense / 200) *
    100}%;">${Pokemon.defense}</div>
          <div class="bar-label">Speed</div>
          <div class="bar bar-speed" style="--bar-value:${(Pokemon.speed / 200) *
    100}%;">${Pokemon.speed}</div>
          <div class="bar-label">Special Attack</div>
          <div class="bar bar-s-attack" style="--bar-value:${(Pokemon.special_attack / 200) *
    100}%;">${Pokemon.special_attack}</div>
          <div class="bar-label">Special Defense</div>
          <div class="bar bar-s-defense" style="--bar-value:${(Pokemon.special_defense /
      200) *
    100}%;">${Pokemon.special_defense}</div>
        </div>
        <div class="section-title">Damage Multiplier When Attacked</div>
        <div class="defense-stats">
            <table class="info" id="defense${Pokemon.id}"></table>
        </div> 
        <div class="section-title">Other Forms</div>
        <div id = "extra-info${Pokemon.id}" class="extra-info"></div>
        <div class="section-title">Moves</div>
        <div id="move-info${Pokemon.id}" class="move-info"></div>
        <div id="move-info-level${Pokemon.id}" class="move-info">
            <div class="move-categories">Moves learn from level up </div>
        </div>
        <div id="move-info-tutor${Pokemon.id}" class="move-info">
          <div class="move-categories">Moves learn from tutor </div>
        </div>
        <div id="move-info-machine${Pokemon.id}" class="move-info">
          <div class="move-categories">Moves learn from items </div>
        </div>
        <div id="move-info-egg${Pokemon.id}" class="move-info">
          <div class="move-categories">Moves learn from breeding </div>
        </div>

      </div>
    </div>
    `;
  pokedex.insertAdjacentHTML("beforeend", pokemonHTMLString);

  //Calculate defense type weakness
  defenseStatsDiv = document.getElementById("defense" + Pokemon.id);
  for (const [key, value] of Pokemon.defense_stats.entries()) {
    if (value != 1) {
      let defenseStatsHtml = `
      <tr>
        <td>${key}: </td>
        <td class="info-value">${value}x</td>
      </tr>
      `
      defenseStatsDiv.insertAdjacentHTML("beforeend", defenseStatsHtml);
    }
    
  }

  var moves = Pokemon.moves;
  //console.log(moves);

  //Getting additional form
  P.getPokemonSpeciesByName(Pokemon.species) // with Promise
    .then(function (response) {
      const PokemonSpecies = {
        varieties: response.varieties
      };
      if (PokemonSpecies.varieties.length == 1) {
        var VarietyHTMLString = `
                <div class="variety">
                  <p id="variety-name" class="variety-name"> 
                    ${Pokemon.name} does not have other form
                  </p>
                </div>
                `;
        var variety_display = document.getElementById(
          "extra-info" + Pokemon.id
        );
        variety_display.insertAdjacentHTML(
          "beforeend",
          VarietyHTMLString
        );
      }
      for (var k = 0; k < PokemonSpecies.varieties.length; k++) {
        if (k > 0) {
          P.getPokemonByName(PokemonSpecies.varieties[k].pokemon.name).then(
            function (response) {
              const PokemonVariety = {
                sprite: response.sprites.front_default,
                name: response.name.replace("-", " ")
              };
              if (PokemonVariety.sprite != null)
              {
                var VarietyHTMLString = `
                  <div class="variety">
                    <p id="variety-name" class="variety-name"> 
                      ${PokemonVariety.name}
                    </p>
                    <img id="variety-pic class="variety-pic" src ="${PokemonVariety.sprite}"> 
                  </div>
                  `;
                var variety_display = document.getElementById(
                  "extra-info" + Pokemon.id
                );
                variety_display.insertAdjacentHTML(
                  "beforeend",
                  VarietyHTMLString
                );
              }
            }
          );
        }
      }
    });

  for (var i = 0; i < moves.length; ++i) {
    //Sort moves learned by breeding
    if (
      moves[i].version_group_details[moves[i].version_group_details.length - 1]
        .move_learn_method.name == "egg"
    ) {
      var MoveHTMLString = `
        <p>${moves[i].move.name.replace("-", " ")}</p>
      `;
      var movesElement = document.getElementById("move-info-egg" + Pokemon.id);
      movesElement.insertAdjacentHTML("beforeend", MoveHTMLString);
    }

    //Sort moves learned by items/machine
    if (
      moves[i].version_group_details[moves[i].version_group_details.length - 1]
        .move_learn_method.name == "machine"
    ) {
      var MoveHTMLString = `
        <p>${moves[i].move.name.replace("-", " ")}</p>
      `;
      var movesElement = document.getElementById(
        "move-info-machine" + Pokemon.id
      );
      movesElement.insertAdjacentHTML("beforeend", MoveHTMLString);
    }

    //Sort moves learned by leveling up
    if (
      moves[i].version_group_details[moves[i].version_group_details.length - 1]
        .move_learn_method.name == "level-up"
    ) {
      var MoveHTMLString = `
        <p>${moves[i].move.name.replace("-", " ")} Level: ${moves[i].version_group_details[moves[i].version_group_details.length - 1].level_learned_at}</p>
      `;
      var movesElement = document.getElementById(
        "move-info-level" + Pokemon.id
      );
      movesElement.insertAdjacentHTML("beforeend", MoveHTMLString);
    }

    //Sort move learned by tutoring
    if (
      moves[i].version_group_details[moves[i].version_group_details.length - 1]
        .move_learn_method.name == "tutor"
    ) {
      var MoveHTMLString = `
        <p>${moves[i].move.name.replace("-", " ")}</p>
      `;
      var movesElement = document.getElementById(
        "move-info-tutor" + Pokemon.id
      );
      movesElement.insertAdjacentHTML("beforeend", MoveHTMLString);
    }
  }

  //Getting additional moves
  //   for (var m = 0; m < Pokemon.moves.length; m++) {
  //     P.getMoveByName(Pokemon.moves[m].move.name).then(function(response) {
  //       const Move = {
  //         name: response.name.replace("-", " "),
  //         power: response.power,
  //         accuracy: response.accuracy,
  //         pp: response.pp,
  //         type: response.damage_class.name,
  //         damage_type: response.type.name,
  //         effect: response.effect_entries[0].effect,
  //         effect_chance: response.effect_chance,
  //         description: response.flavor_text_entries[2].flavor_text
  //       };
  //       if (Move.power == null) {
  //         Move.power = 0;
  //       }
  //       if (Move.accuracy == null) {
  //         Move.power = 0;
  //       }
  //       Move.damage_type_icon = "resources/" + Move.damage_type + ".png";
  //       Move.effect = Move.effect.replace("$effect_chance", Move.effect_chance);
  //       var move_display = document.getElementById("extra-info" + Pokemon.id);
  //       var MoveHTMLString = `
  //       <div id ="move-card" class="card" >
  //           <h2 class="card-title"  >${Move.name} </h2>
  //           <p>Power: ${Move.power}</p>
  //           <p>Accuracy: ${Move.accuracy}</p>
  //           <p>PP: ${Move.pp}</p>
  //           <p>Type: ${Move.type}</p>
  //           <p>Damage Type: ${Move.damage_type} <img class ="damage_type_icon" src="${Move.damage_type_icon}"> </p>
  //       </div>
  //       `;
  //       move_display.insertAdjacentHTML("beforeend", MoveHTMLString);
  //     });
  //   }
};

var playaudio = id => {
  var audio = document.getElementById("audio" + id);
  audio.play();
};

//Search Feature
var Filter = () => {
  var input = document.getElementById("Input");
  input = input.value.toUpperCase();

  var list = document.getElementById("pokedex");
  var list_element = document.getElementsByClassName("flip-card");

  for (var i = 0; i < list_element.length; ++i) {
    a = list_element[i].getElementsByClassName("card-title")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(input) > -1) {
      list_element[i].style.display = "";
    } else {
      list_element[i].style.display = "none";
    }
  }
};


//PopUp Feature
var getinfo = id => {
  if (!Poke_cache[id]) {
    P.getPokemonByName(id) // with Promise
      .then(function (response) {
        //console.log(response);
        var Pokemon = {
          id: response.id,
          name: response.name,
          default: response.sprites["front_default"],
          shiny: response.sprites["front_shiny"],
          back_default: response.sprites["back_default"],
          back_shiny: response.sprites["back_shiny"],
          display: response.sprites["front_default"],
          type: response.types.map(type => type.type.name).join(","),
          height: response.height,
          weight: response.weight,
          ability: response.abilities
            .map(ability => ability.ability.name)
            .join(","),
          speed: response.stats[0].base_stat,
          special_defense: response.stats[1].base_stat,
          special_attack: response.stats[2].base_stat,
          defense: response.stats[3].base_stat,
          attack: response.stats[4].base_stat,
          hp: response.stats[5].base_stat
        };
        Poke_cache[id] = Pokemon;
        PopUpInfo(Pokemon);
      });
  } else {
    PopUpInfo(Poke_cache[id]);
  }
};

var PopUpInfo = Pokemon => {
  var pokemonHTMLString = `
  <div class ="popup" >
    <button id="CloseButton" onclick ="Close()">Close</button>
    <div class="card" >
        <div class="img-row">
          <img class="card-image " src="${Pokemon.default}">
          <img class="card-image " src="${Pokemon.back_default}">
          <img class="card-image " src="${Pokemon.shiny}"/>
          <img class="card-image " src="${Pokemon.back_shiny}"/>
        </div>
        <h2 class="card-title"  >${Pokemon.name} </h2>
        <p>Height: ${Pokemon.height}</p>
        <p>Weight: ${Pokemon.weight}</p>
        <p>Type: ${Pokemon.type}</p>
        <p>Abilities: ${Pokemon.ability}</p>
        <p>Speed: ${Pokemon.speed}</p>
        <p>Special Defense: ${Pokemon.special_defense}</p>
        <p>Special Attack: ${Pokemon.special_attack}</p>
        <p>Defense: ${Pokemon.defense}</p>
        <p>Attack: ${Pokemon.attack}</p>
        <p>Hp: ${Pokemon.hp}</p>
        <img id="volume_logo" src="/resources/volume-high.svg" onclick="playaudio(${Pokemon.id})">
        <audio id="audio${Pokemon.id}" src="../FrontEnd_Pokedex/sound/${Pokemon.id}.wav" ></audio>
    </div>
  </div>
    `;
  pokedex.insertAdjacentHTML("beforeend", pokemonHTMLString);
};

//Close button for pop up card
var Close = () => {
  var remove = document.querySelector(".popup");
  remove.parentElement.removeChild(remove);
};


//This is used to find the index in the defense matrix below for a pokemon type.
const typeLocation = {
  'normal':0,
  'fighting':1,
  'flying':2,
  'poison':3,
  'ground':4,
  'rock':5,
  'bug':6,
  'ghost':7,
  'steel':8,
  'fire':9,
  'water':10,
  'grass':11,
  'electric':12,
  'psychic':13,
  'ice':14,
  'dragon':15,
  'dark':16,
  'fairy':17
};

//This is used to find the pokemon type name for an index in the defense matrix below.
const locationType = {
  0:'normal',
  1:'fighting',
  2:'flying',
  3:'poison',
  4:'ground',
  5:'rock',
  6:'bug',
  7:'ghost',
  8:'steel',
  9:'fire',
  10:'water',
  11:'grass',
  12:'electric',
  13:'psyschic',
  14:'ice',
  15:'dragon',
  16:'dark',
  17:'fairy'
};

//This matrix represents the attack multiplier against a given pokemon type for 
//another type. Base off of the attack matrix at https://bulbapedia.bulbagarden.net/wiki/Type#In_Pok.C3.A9mon_GO
const defMatrix = [
  [1,1,1,1,1,.5,1,0,.5,1,1,1,1,1,1,1,1,1],
  [2,1,.5,.5,1,2,.5,0,2,1,1,1,1,.5,2,1,2,.5],
  [1,2,1,1,1,.5,2,1,.5,1,1,2,.5,1,1,1,1,1],
  [1,1,1,.5,.5,.5,1,.5,0,1,1,2,1,1,1,1,1,2],
  [1,1,0,2,1,2,.5,1,2,2,1,.5,2,1,1,1,1,1],
  [1,.5,2,1,.5,1,2,1,.5,2,1,1,1,1,2,1,1,1],
  [1,.5,.5,.5,1,1,1,.5,.5,.5,1,2,1,2,1,1,2,.5],
  [0,1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,.5,1],
  [1,1,1,1,1,2,1,1,.5,.5,.5,1,.5,1,2,1,1,2],
  [1,1,1,1,1,.5,2,1,2,.5,.5,2,1,1,2,.5,1,1],
  [1,1,1,1,2,2,1,1,1,2,.5,.5,1,1,1,.5,1,1],
  [1,1,.5,.5,2,2,.5,1,.5,.5,2,.5,1,1,1,.5,1,1],
  [1,1,2,1,0,1,1,1,1,1,2,.5,.5,1,1,.5,1,1],
  [1,2,1,2,1,1,1,1,.5,1,1,1,1,.5,1,1,0,1],
  [1,1,2,1,2,1,1,1,.5,.5,.5,2,1,1,.5,2,1,1],
  [1,1,1,1,1,1,1,1,.5,1,1,1,1,1,1,2,1,0],
  [1,.5,1,1,1,1,1,2,1,1,1,1,1,2,1,1,.5,.5],
  [1,2,1,.5,1,1,1,1,.5,.5,1,1,1,1,1,2,2,1]
]

//calculates the effectiveness of different defense types against the types of 
//the current pokemon. 
function buildDefenseStats(types) {
  var defenseStatsMap = new Map();
  for (let i = 0; i < types.length; ++i) {
      let typeName = types[i].type.name;
      let typeIndex = typeLocation[typeName];
      console.log(typeIndex);
      for (let j = 0; j < defMatrix.length; ++j) {
          let multiplier = defMatrix[j][typeIndex];
          let key = locationType[j];
          if (defenseStatsMap.has(key)) {
              defenseStatsMap.set(key, (defenseStatsMap.get(key) * multiplier));
          }
          else {
              if (multiplier != 1) {
                  defenseStatsMap.set(key, multiplier);
              }
          }
      }     
  }
  return defenseStatsMap;
}
//end defense matrix code

//getAllPokemons();
display20Poke();
