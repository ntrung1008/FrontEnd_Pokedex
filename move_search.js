var move_display = document.getElementById("move_display");
var P = new Pokedex.Pokedex();

var search = () => {
  //remove previous element if exist
  var remove = document.getElementById("move-card");
  if (remove != null) {
    remove.parentNode.removeChild(remove);
  }

  //

  var search_input = document.getElementById("input").value;
  search_input = search_input.toLowerCase();
  search_input = search_input.replace(" ", "-");
  var categories = document.getElementById("categories");
  var selected_category = categories.options[categories.selectedIndex].value;

  if (search_input.length == 0) {
    displayPikachu();
  } else {
    if (selected_category == "name") {
      P.getMoveByName(search_input) // with Promise
        .then(function(response) {
          const Move = {
            name: response.name.replace("-", " "),
            power: response.power,
            accuracy: response.accuracy,
            pp: response.pp,
            type: response.damage_class.name,
            damage_type: response.type.name,
            effect: response.effect_entries[0].effect,
            effect_chance: response.effect_chance,
            description: response.flavor_text_entries[2].flavor_text
          };
          if (Move.power == null) {
            Move.power = 0;
          }
          if (Move.accuracy == null) {
            Move.power = 0;
          }
          Move.damage_type_icon = "resources/" + Move.damage_type + ".png";
          Move.effect = Move.effect.replace(
            "$effect_chance",
            Move.effect_chance
          );
          displayMove(Move);
        });
    }
    if (selected_category == "ailment") {
      P.getMoveAilmentByName(search_input) // with Promise
        .then(function(response) {
          const MoveList = response.moves;
          displayMoveList(MoveList);
        });
    }
    if (selected_category == "damage_type") {
      P.getMoveDamageClassByName(search_input) // with Promise
        .then(function(response) {
          const MoveList = response.moves;
          displayMoveList(MoveList);
        });
    }
  }
};

var displayMove = Move => {
  var MoveHTMLString = `
      <div id ="move-card" class="card" >
          <h2 class="card-title"  >${Move.name} </h2>
          <p>Power: ${Move.power}</p>
          <p>Accuracy: ${Move.accuracy}</p>
          <p>PP: ${Move.pp}</p>
          <p>Type: ${Move.type}</p>
          <p>Damage Type: ${Move.damage_type} <img class ="damage_type_icon" src="${Move.damage_type_icon}"> </p>
          <p>Effect: ${Move.effect}</p>
          <p>Description: ${Move.description}</p>
      </div>
      `;

  move_display.insertAdjacentHTML("beforeend", MoveHTMLString);
};

var displayPikachu = () => {
  var MoveHTMLString = `
    <div id = "move-card" class="card">
    <h1>Nothing found. Have a gif of Pikachu</h1>
    <img src="https://media.giphy.com/media/lOa0tPKiMLdqVdFiS8/giphy.gif" alt="Dancing Pikachu">
    </div>
    `;
  move_display.insertAdjacentHTML("beforeend", MoveHTMLString);
};
var displayMoveList = MoveList => {
  for (let i = 0; i < MoveList.length; i++) {
    P.getMoveByName(MoveList[i].name) // with Promise
      .then(function(response) {
        const Move = {
          name: response.name.replace("-", " "),
          power: response.power,
          accuracy: response.accuracy,
          pp: response.pp,
          type: response.damage_class.name,
          damage_type: response.type.name,
          effect: response.effect_entries[0].effect,
          effect_chance: response.effect_chance,
          description: response.flavor_text_entries[2].flavor_text
        };
        if (Move.power == null) {
          Move.power = 0;
        }
        if (Move.accuracy == null) {
          Move.power = 0;
        }
        Move.damage_type_icon = "resources/" + Move.damage_type + ".png";
        Move.effect = Move.effect.replace("$effect_chance", Move.effect_chance);

        var MoveHTMLString = `
        <div id ="move-card" class="card" >
          <h2 class="card-title"  >${Move.name} </h2>
          <p>Power: ${Move.power}</p>
          <p>Accuracy: ${Move.accuracy}</p>
          <p>PP: ${Move.pp}</p>
          <p>Type: ${Move.type}</p>
          <p>Damage Type: ${Move.damage_type} <img class ="damage_type_icon" src="${Move.damage_type_icon}"> </p>
          <p>Effect: ${Move.effect}</p>
          <p>Description: ${Move.description}</p>
        </div>
         `;

        move_display.insertAdjacentHTML("beforeend", MoveHTMLString);
      });
  }
};
