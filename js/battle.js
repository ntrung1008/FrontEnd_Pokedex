var P = new Pokedex.Pokedex();
var Poke_cache = {};
var maximum = 1;

var getAllPokemonsForBattle = input => {
    for (let i = input; i <= 807; ++i) {
      P.getPokemonByName(i) // with Promise
        .then(function (response) {
          const Pokemon = {
            id: response.id,
            name: response.name.replace("-", " "),
            default: response.sprites["front_default"],
            display: response.sprites["front_default"],
            type: response.types.map(type => type.type.name).join(", "),
            speed: response.stats[0].base_stat,
            special_defense: response.stats[1].base_stat,
            special_attack: response.stats[2].base_stat,
            defense: response.stats[3].base_stat,
            attack: response.stats[4].base_stat,
            hp: response.stats[5].base_stat,
            species: response.species.name,
            //defense_stats: buildDefenseStats(response.types)
          };
          Poke_cache[response.name.toUpperCase()] = Pokemon;
        });
    }
};

var Filter = () => {
    const input1 = document.getElementById("Input1");
    const input2 = document.getElementById("Input2");

    input1.value = "blastoise";
    input2.value = "charizard";

    const comparisonWrapper = document.getElementById("ComparisonWrapper");

    input1Text = input1.value.toUpperCase();
    input2Text = input2.value.toUpperCase();

    if (input1Text in Poke_cache && input2Text in Poke_cache) {
        let pokemonForComparison = [Poke_cache[input1Text], Poke_cache[input2Text]];
        console.log(pokemonForComparison);

        var comparisonHtmlString = `
            <div id="Comparison-card">
                <div id="Comparison-label">
                    <p>${pokemonForComparison[0].name} vs ${pokemonForComparison[1].name}
                </div>
                <div id="Pokemon-pics">
                    <div class="Pokemon-1">
                        <img class="card-image " src="${pokemonForComparison[0].default}">
                    </div>
                    <div class="Pokemon-2">
                        <img class="card-image " src="${pokemonForComparison[1].default}">
                    </div>
                </div>
                <div id="Comparison-statbars" class="stat-bars">
                    <div class="stat-bars-label">
                        <p>HP</p>
                    </div>
                    <div id="hp-bars" class="stat-bars">
                        <div class="comparison-bar1" style="--bar-value:${pokemonForComparison[0].hp}%;">${pokemonForComparison[0].hp}</div>
                        <div class="comparison-bar2" style="--bar-value:${pokemonForComparison[1].hp}%;">${pokemonForComparison[1].hp}</div>
                    </div>
                    <div class="stat-bars-label">
                        <p>Speed</p>
                    </div>
                    <div id="speed-bars" class="stat-bars">
                        <div class="comparison-bar1" style="--bar-value:${pokemonForComparison[0].speed}%;">${pokemonForComparison[0].speed}</div>
                        <div class="comparison-bar2" style="--bar-value:${pokemonForComparison[1].speed}%;">${pokemonForComparison[1].speed}</div>
                    </div>
                    <div class="stat-bars-label">
                        <p>Attack</p>
                    </div>
                    <div id="attack-bars" class="stat-bars">
                        <div class="comparison-bar1" style="--bar-value:${pokemonForComparison[0].attack}%;">${pokemonForComparison[0].attack}</div>
                        <div class="comparison-bar2" style="--bar-value:${pokemonForComparison[1].attack}%;">${pokemonForComparison[1].attack}</div>
                    </div>
                    <div class="stat-bars-label">
                        <p>Defense</p>
                    </div>
                    <div id="defense-bars" class="stat-bars">
                        <div class="comparison-bar1" style="--bar-value:${pokemonForComparison[0].defense}%;">${pokemonForComparison[0].defense}</div>
                        <div class="comparison-bar2" style="--bar-value:${pokemonForComparison[1].defense}%;">${pokemonForComparison[1].defense}</div>
                    </div>
                </div>
            </div>
        `

        let comparisonCard = document.getElementById("Comparison-card");
        if (comparisonCard != null) {
            comparisonCard.remove();
        }

        comparisonWrapper.insertAdjacentHTML("beforeend", comparisonHtmlString);

    }
    else console.log("not found");


};

getAllPokemonsForBattle(1);