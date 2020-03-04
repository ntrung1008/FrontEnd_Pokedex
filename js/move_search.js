var move_display = document.getElementById("move_display");
var P = new Pokedex.Pokedex();

var search = () => {
  //remove previous element if exist
  var remove = document.getElementById("move_display");
  remove.innerHTML = "";

  //

  var search_input = document.getElementById("input").value;
  search_input = search_input.toLowerCase();
  search_input = search_input.replace(" ", "-");
  var categories = document.getElementById("categories");
  var selected_category = categories.options[categories.selectedIndex].value;

  //If the search field is empty, display error with Pikachu gif
  if (search_input.length == 0) {
    displayPikachu();
  } else {
    //If the user wants to search a move by name, then we only need to display one move
    if (selected_category == "name") {
      P.getMoveByName(search_input) // with Promise
        .then(function (response) {
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
    //Otherwise if the user wants to look at a list of moves based on ailments or damage  type then we need to
    //display them as a list
    if (selected_category == "ailment") {
      P.getMoveAilmentByName(search_input) // with Promise
        .then(function (response) {
          const MoveList = response.moves;
          displayMoveList(MoveList);
        });
    }
    if (selected_category == "damage_type") {
      P.getMoveDamageClassByName(search_input) // with Promise
        .then(function (response) {
          const MoveList = response.moves;
          displayMoveList(MoveList);
        });
    }
  }
};

//display only one move, used when user search move by name
var displayMove = Move => {
  var MoveHTMLString = `
      <div id ="move-card" class="card">
          <h2 class="card-title"  >${Move.name} </h2>
          <table class="move-table">
            <tr>
              <td class="move-label">Power:</td>
              <td class="move-data">${Move.power}</td>
            </tr>
            <tr>
              <td class="move-label">Accuracy:</td>
              <td class="move-data">${Move.accuracy}</td>
            </tr>
            <tr>
              <td class="move-label">PP:</td>
              <td class="move-data">${Move.pp}</td>
            </tr>
            <tr>
              <td class="move-label">Type:</td>
              <td class="move-data">${Move.type}</td>
            </tr>
            <tr>
              <td class="move-label">Damage Type:</td>
              <td class="move-data">${Move.damage_type} <img class= "damage_type_icon" src="${Move.damage_type_icon}"></td>
            </tr>
            <tr>
              <td class="move-label">Effect:</td>
              <td class="move-data">${Move.effect}</td>
            </tr>
            <tr>
              <td class="move-label">Description:</td>
              <td class="move-data">${Move.description}</td>
            </tr>
          </table
      </div>
      `;

  move_display.insertAdjacentHTML("beforeend", MoveHTMLString);
};

//display a gif of pikachu when user left the search field empty
var displayPikachu = () => {
  var MoveHTMLString = `
    <div id = "move-card" class="card">
    <h1 class="pikachu-message">Nothing found. Have a gif of Pikachu instead!</h1>
    <img src="https://media.giphy.com/media/lOa0tPKiMLdqVdFiS8/giphy.gif" alt="Dancing Pikachu">
    </div>
    `;
  move_display.insertAdjacentHTML("beforeend", MoveHTMLString);
};

//display a list of moves when user searches moves by ailments or damage type
var displayMoveList = MoveList => {
  for (let i = 0; i < MoveList.length; i++) {
    P.getMoveByName(MoveList[i].name) // with Promise
      .then(function (response) {
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
        <div id ="move-card" class="card">
            <h2 class="card-title"  >${Move.name} </h2>
            <table class="move-table">
              <tr>
                <td class="move-label">Power:</td>
                <td class="move-data">${Move.power}</td>
              </tr>
              <tr>
                <td class="move-label">Accuracy:</td>
                <td class="move-data">${Move.accuracy}</td>
              </tr>
              <tr>
                <td class="move-label">PP:</td>
                <td class="move-data">${Move.pp}</td>
              </tr>
              <tr>
                <td class="move-label">Type:</td>
                <td class="move-data">${Move.type} </td>
              </tr>
              <tr>
                <td class="move-label">Damage Type:</td>
                <td class="move-data">${Move.damage_type} <img class= "damage_type_icon" src="${Move.damage_type_icon}"></td>
              </tr>
              <tr>
                <td class="move-label">Effect:</td>
                <td class="move-data">${Move.effect}</td>
              </tr>
              <tr>
                <td class="move-label">Description:</td>
                <td class="move-data">${Move.description}</td>
              </tr>
            </table
        </div>
        `;

        move_display.insertAdjacentHTML("beforeend", MoveHTMLString);
      });
  }
};
