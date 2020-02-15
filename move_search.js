var move_display = document.getElementById("move_display");
var P = new Pokedex.Pokedex();

var search = () =>
{
    var search_input = document.getElementById("input").value;
    search_input=search_input.toLowerCase();
    search_input=search_input.replace(" ","-");
    var categories= document.getElementById("categories");
    var selected_category=categories.options[categories.selectedIndex].value;

    if(search_input.length ==0)
    {
        displayPikachu();
    }
    else
    {
        if(selected_category =="name" )
        {
            P.getMoveByName(search_input) // with Promise
            .then(function(response) {
            const Move = {
                name:response.name,
                power :response.power,
                accuracy :response.accuracy,
                pp: response.pp,
                type: response.damage_class.name,
                damage_type: response.type.name,
                effect:response.effect_entries[0].effect,
                description:response.flavor_text_entries[2].flavor_text,
            };
            if(Move.power == null)
            {
                Move.power=0;
            }
            displayMove(Move);
            });
        }
    }
    

}

var displayMove = Move => {
    var MoveHTMLString = `
      <div class="card" >
          <h2 class="card-title"  >${Move.name} </h2>
          <p>Power: ${Move.power}</p>
          <p>Accuracy: ${Move.accuracy}</p>
          <p>PP: ${Move.pp}</p>
          <p>Type: ${Move.type}</p>
          <p>Damage Type: ${Move.damage_type}</p>
          <p>Effect: ${Move.effect}</p>
          <p>Description: ${Move.description}</p>
      </div>
    </div>
      `;
    move_display.insertAdjacentHTML("beforeend", MoveHTMLString);
};

var displayPikachu=()=>
{
    var MoveHTMLString=`
    <h1>Nothing found. Have a gif of Pikachu</h1>
    <img src="https://media.giphy.com/media/lOa0tPKiMLdqVdFiS8/giphy.gif" alt="Dancing Pikachu">
    `;
    move_display.insertAdjacentHTML("beforeend", MoveHTMLString);
    
}