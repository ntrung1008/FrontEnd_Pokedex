var region_display = document.getElementById("region_display");
var P = new Pokedex.Pokedex();

var search = () => {
  //remove previous element if exist
  var remove = document.getElementById("region_display");
  remove.innerHTML = "";
  //

  var regions = document.getElementById("regions");
  var selected_region = regions.options[regions.selectedIndex].value;

  //User chooses Kanto region
  if (selected_region == "kanto") {
    P.getRegionByName("kanto") // with Promise
      .then(function(response) {
        const RegionInfo = {
          name: "Kanto",
          locations: response.locations,
          main_generation: response.main_generation.name
        };
        displayRegion(RegionInfo);
      });
  } 
  //User chooses Johto region
  else if (selected_region == "johto") {
    P.getRegionByName("johto") // with Promise
      .then(function(response) {
        const RegionInfo = {
          name: "Johto",
          locations: response.locations,
          main_generation: response.main_generation.name
        };
        displayRegion(RegionInfo);
      });
  } 
  //User chooses Hoenn region
  else if (selected_region == "hoenn") {
    P.getRegionByName("hoenn") // with Promise
      .then(function(response) {
        const RegionInfo = {
          name: "Hoenn",
          locations: response.locations,
          main_generation: response.main_generation.name
        };
        displayRegion(RegionInfo);
      });
  } 
  //User chooses Sinnoh region
  else if (selected_region == "sinnoh") {
    P.getRegionByName("sinnoh") // with Promise
      .then(function(response) {
        const RegionInfo = {
          name: "Sinnoh",
          locations: response.locations,
          main_generation: response.main_generation.name
        };
        displayRegion(RegionInfo);
      });
  } 
  //User chooses Unova region
  else if (selected_region == "unova") {
    P.getRegionByName("unova") // with Promise
      .then(function(response) {
        const RegionInfo = {
          name: "Unova",
          locations: response.locations,
          main_generation: response.main_generation.name
        };
        displayRegion(RegionInfo);
      });
  }
  //User chooses  Kalos region 
  else if (selected_region == "kalos") {
    P.getRegionByName("kalos") // with Promise
      .then(function(response) {
        const RegionInfo = {
          name: "Kalos",
          locations: response.locations,
          main_generation: response.main_generation.name
        };
        displayRegion(RegionInfo);
      });
  } 
  //User chooses Alola region
  else if (selected_region == "alola") {
    P.getRegionByName("alola") // with Promise
      .then(function(response) {
        const RegionInfo = {
          name: "Alola",
          locations: response.locations,
          main_generation: response.main_generation.name
        };
        displayRegion(RegionInfo);
      });
  }
};

//This function will get the region info based on what the user chooses
//Every REGION has different LOCATIONS
//Every LOCATION has different AREAS
//Every AREA has different POKEMONS
//So this function will first use the region name to send a request for Locations names
//Then for each locaiton names, it will send a request for area names
//Then  for each area names, it will send a request for the pokemon in that area
//Then it will make HTMLStrings based on the reponses it gets back and insert it into the main html page
var displayRegion = RegionInfo => {
  if (RegionInfo.name == "Kanto") {
    //insert Region name and map
    var RegionHTMLString = `
        <div id ="region-card" class="card" >
            <h2 class="card-title"  >Welcome to ${RegionInfo.name} !!!</h2>
            <img class = "region-pic" src ="resources/Kanto.png" alt="Region Map">
            <div class="region-description">
              The Kanto region is located east of Johto and south of Sinnoh. All cities in Kanto are named after colors (Viridian City, Lavender Town, Indigo Plateau, etc.), with the exception of Pallet Town, which is also a reference to color.
            </div>
            <div class="locations-title">
              <p>Locations</p>
            </div>
        </div>
         `;
    region_display.insertAdjacentHTML("beforeend", RegionHTMLString);

    for (let i = 0; i < RegionInfo.locations.length; ++i) {
      //Each region has many locations
      //Insert each of those location names
      var LocationHTMLString = `
            <div class ="location-card" id="${RegionInfo.locations[i].name}">
              <div class="location-name">
              ${RegionInfo.locations[i].name.replace("-", " ")}
              </div>
            </div>
            `;
      var location_display = document.getElementById("region-card");
      location_display.insertAdjacentHTML("beforeend", LocationHTMLString);

      //Each locations has many areas
      //Get those areas and insert them
      P.getLocationByName(RegionInfo.locations[i].name) // with Promise
        .then(function(response) {
          var Areas = response.areas;
          for (let j = 0; j < Areas.length; j++) {
            var AreaHTMLString = `
                        <div class ="area-card">Area: ${Areas[j].name.replace("-", " ")}</div>
                        <div class ="area-pokemon-card" id="${Areas[j].name}" </div>
                                `;
            var area_display = document.getElementById(RegionInfo.locations[i].name);
            area_display.insertAdjacentHTML("beforeend", AreaHTMLString);

            P.getLocationAreaByName(Areas[j].name) // with Promise
              .then(function(response) {
                var Area_info = {
                  Pokemon_encounters: response.pokemon_encounters
                };
                for (let k = 0; k < Area_info.Pokemon_encounters.length; ++k) {
                  var PokemonHTMLString = `
                                <div class ="pokemon-card" id="${Area_info.Pokemon_encounters[k].pokemon.name}${Areas[j].name}">
                                  <div class= "pokemon-name">
                                    ${Area_info.Pokemon_encounters[k].pokemon.name.replace("-", " ")}
                                  </div>
                                </div>
                                `;
                  //console.log( PokemonHtmlString);
                  var pokemon_display = document.getElementById(Areas[j].name);
                  pokemon_display.insertAdjacentHTML("beforeend",PokemonHTMLString);

                  P.getPokemonByName(Area_info.Pokemon_encounters[k].pokemon.name) // with Promise
                    .then(function(response) {
                      var sprite = response.sprites["front_default"];
                      var PokemonSpriteHTMLSTRING = `
                                <img class= "poke-pic" src="${sprite}" alt="Sprite Image">
                            `;
                      var pokemon_sprite = document.getElementById(Area_info.Pokemon_encounters[k].pokemon.name +Areas[j].name);
                      pokemon_sprite.insertAdjacentHTML("beforeend",PokemonSpriteHTMLSTRING);
                    });
                }
              });
          }
        });
    }
  }
  else  if (RegionInfo.name == "Johto") {
    //insert Region name and map
    var RegionHTMLString = `
        <div id ="region-card" class="card" >
            <h2 class="card-title"  >Welcome to ${RegionInfo.name} !!!</h2>
            <img class = "region-pic" src ="resources/Johto.png" alt="Region Image">
            <div class="region-description">
              Johto is located west of Kanto and south of Sinnoh
            </div>
        </div>
         `;
    region_display.insertAdjacentHTML("beforeend", RegionHTMLString);

    for (let i = 0; i < RegionInfo.locations.length; ++i) {
      //Each region has many locations
      //Insert each of those location names
      var LocationHTMLString = `
            <div class ="location-card" id="${RegionInfo.locations[i].name}">
              <div class="location-name">
              Location name: ${RegionInfo.locations[i].name.replace("-", " ")}
              </div>
            </div>
            `;
      var location_display = document.getElementById("region-card");
      location_display.insertAdjacentHTML("beforeend", LocationHTMLString);

      //Each locations has many areas
      //Get those areas and insert them
      P.getLocationByName(RegionInfo.locations[i].name) // with Promise
        .then(function(response) {
          var Areas = response.areas;
          for (let j = 0; j < Areas.length; j++) {
            var AreaHTMLString = `
                        <div class ="area-card">Area name: ${Areas[j].name.replace("-", " ")}</div>
                        <div class ="area-pokemon-card" id="${Areas[j].name}" </div>
                                `;
            var area_display = document.getElementById(RegionInfo.locations[i].name);
            area_display.insertAdjacentHTML("beforeend", AreaHTMLString);

            P.getLocationAreaByName(Areas[j].name) // with Promise
              .then(function(response) {
                var Area_info = {
                  Pokemon_encounters: response.pokemon_encounters
                };
                for (let k = 0; k < Area_info.Pokemon_encounters.length; ++k) {
                  var PokemonHTMLString = `
                                <div class ="pokemon-card" id="${Area_info.Pokemon_encounters[k].pokemon.name}${Areas[j].name}">
                                  <div class= "pokemon-name">
                                    ${Area_info.Pokemon_encounters[k].pokemon.name.replace("-", " ")}
                                  </div>
                                </div>
                                `;
                  //console.log( PokemonHtmlString);
                  var pokemon_display = document.getElementById(Areas[j].name);
                  pokemon_display.insertAdjacentHTML("beforeend",PokemonHTMLString);

                  P.getPokemonByName(Area_info.Pokemon_encounters[k].pokemon.name) // with Promise
                    .then(function(response) {
                      var sprite = response.sprites["front_default"];
                      var PokemonSpriteHTMLSTRING = `
                                <img class= "poke-pic" src="${sprite}" alt="Sprite Image">
                            `;
                      var pokemon_sprite = document.getElementById(Area_info.Pokemon_encounters[k].pokemon.name +Areas[j].name);
                      pokemon_sprite.insertAdjacentHTML("beforeend",PokemonSpriteHTMLSTRING);
                    });
                }
              });
          }
        });
    }
  }
  else  if (RegionInfo.name == "Hoenn") {
    //insert Region name and map
    var RegionHTMLString = `
        <div id ="region-card" class="card" >
            <h2 class="card-title"  >Welcome to ${RegionInfo.name} !!!</h2>
            <img class = "region-pic" src ="resources/Hoenn.png" alt="Region Image">
            <div class="region-description">
              Hoenn is located south of Sinnoh. The names of most of the cities in Hoenn are made of two words put together (Little Root, Fort Tree, Slate Port, Ever Grande, etc.) rather than colors or plants as Kanto and Johto 
            </div>
        </div>
         `;
    region_display.insertAdjacentHTML("beforeend", RegionHTMLString);

    for (let i = 0; i < RegionInfo.locations.length; ++i) {
      //Each region has many locations
      //Insert each of those location names
      var LocationHTMLString = `
            <div class ="location-card" id="${RegionInfo.locations[i].name}">
              <div class="location-name">
              Location name: ${RegionInfo.locations[i].name.replace("-", " ")}
              </div>
            </div>
            `;
      var location_display = document.getElementById("region-card");
      location_display.insertAdjacentHTML("beforeend", LocationHTMLString);

      //Each locations has many areas
      //Get those areas and insert them
      P.getLocationByName(RegionInfo.locations[i].name) // with Promise
        .then(function(response) {
          var Areas = response.areas;
          for (let j = 0; j < Areas.length; j++) {
            var AreaHTMLString = `
                        <div class ="area-card">Area name: ${Areas[j].name.replace("-", " ")}</div>
                        <div class ="area-pokemon-card" id="${Areas[j].name}" </div>
                                `;
            var area_display = document.getElementById(RegionInfo.locations[i].name);
            area_display.insertAdjacentHTML("beforeend", AreaHTMLString);

            P.getLocationAreaByName(Areas[j].name) // with Promise
              .then(function(response) {
                var Area_info = {
                  Pokemon_encounters: response.pokemon_encounters
                };
                for (let k = 0; k < Area_info.Pokemon_encounters.length; ++k) {
                  var PokemonHTMLString = `
                                <div class ="pokemon-card" id="${Area_info.Pokemon_encounters[k].pokemon.name}${Areas[j].name}">
                                  <div class= "pokemon-name">
                                    ${Area_info.Pokemon_encounters[k].pokemon.name.replace("-", " ")}
                                  </div>
                                </div>
                                `;
                  //console.log( PokemonHtmlString);
                  var pokemon_display = document.getElementById(Areas[j].name);
                  pokemon_display.insertAdjacentHTML("beforeend",PokemonHTMLString);

                  P.getPokemonByName(Area_info.Pokemon_encounters[k].pokemon.name) // with Promise
                    .then(function(response) {
                      var sprite = response.sprites["front_default"];
                      var PokemonSpriteHTMLSTRING = `
                                <img class= "poke-pic" src="${sprite}" alt="Pokemon Image">
                            `;
                      var pokemon_sprite = document.getElementById(Area_info.Pokemon_encounters[k].pokemon.name +Areas[j].name);
                      pokemon_sprite.insertAdjacentHTML("beforeend",PokemonSpriteHTMLSTRING);
                    });
                }
              });
          }
        });
    }
  }
  else  if (RegionInfo.name == "Sinnoh") {
    //insert Region name and map
    var RegionHTMLString = `
        <div id ="region-card" class="card" >
            <h2 class="card-title"  >Welcome to ${RegionInfo.name} !!!</h2>
            <img class = "region-pic" src ="resources/Sinnoh.png" alt="Region Image">
            <div class="region-description">
            Sinnoh is located north of Kanto, Johto, and Hoenn. Most of Sinnoh's routes are on land, having very few water routes, in vast contrast to Hoenn
            </div>
        </div>
         `;
    region_display.insertAdjacentHTML("beforeend", RegionHTMLString);

    for (let i = 0; i < RegionInfo.locations.length; ++i) {
      //Each region has many locations
      //Insert each of those location names
      var LocationHTMLString = `
            <div class ="location-card" id="${RegionInfo.locations[i].name}">
              <div class="location-name">
              Location name: ${RegionInfo.locations[i].name.replace("-", " ")}
              </div>
            </div>
            `;
      var location_display = document.getElementById("region-card");
      location_display.insertAdjacentHTML("beforeend", LocationHTMLString);

      //Each locations has many areas
      //Get those areas and insert them
      P.getLocationByName(RegionInfo.locations[i].name) // with Promise
        .then(function(response) {
          var Areas = response.areas;
          for (let j = 0; j < Areas.length; j++) {
            var AreaHTMLString = `
                        <div class ="area-card">Area name: ${Areas[j].name.replace("-", " ")}</div>
                        <div class ="area-pokemon-card" id="${Areas[j].name}" </div>
                                `;
            var area_display = document.getElementById(RegionInfo.locations[i].name);
            area_display.insertAdjacentHTML("beforeend", AreaHTMLString);

            P.getLocationAreaByName(Areas[j].name) // with Promise
              .then(function(response) {
                var Area_info = {
                  Pokemon_encounters: response.pokemon_encounters
                };
                for (let k = 0; k < Area_info.Pokemon_encounters.length; ++k) {
                  var PokemonHTMLString = `
                                <div class ="pokemon-card" id="${Area_info.Pokemon_encounters[k].pokemon.name}${Areas[j].name}">
                                  <div class= "pokemon-name">
                                    ${Area_info.Pokemon_encounters[k].pokemon.name.replace("-", " ")}
                                  </div>
                                </div>
                                `;
                  //console.log( PokemonHtmlString);
                  var pokemon_display = document.getElementById(Areas[j].name);
                  pokemon_display.insertAdjacentHTML("beforeend",PokemonHTMLString);

                  P.getPokemonByName(Area_info.Pokemon_encounters[k].pokemon.name) // with Promise
                    .then(function(response) {
                      var sprite = response.sprites["front_default"];
                      var PokemonSpriteHTMLSTRING = `
                                <img class= "poke-pic" src="${sprite}" alt="Pokemon Image">
                            `;
                      var pokemon_sprite = document.getElementById(Area_info.Pokemon_encounters[k].pokemon.name +Areas[j].name);
                      pokemon_sprite.insertAdjacentHTML("beforeend",PokemonSpriteHTMLSTRING);
                    });
                }
              });
          }
        });
    }
  }
  else  if (RegionInfo.name == "Unova") {
    //insert Region name and map
    var RegionHTMLString = `
        <div id ="region-card" class="card" >
            <h2 class="card-title"  >Welcome to ${RegionInfo.name} !!!</h2>
            <img class = "region-pic" src ="resources/Unova.png" alt="Region Image">
            <div class="region-description">
            Unova is far away from the four other large regions, and the Pokémon which inhabit Unova are diverse and different from those of Kanto, Johto, Hoenn, and Sinnoh.            </div>
        </div>
         `;
    region_display.insertAdjacentHTML("beforeend", RegionHTMLString);

    for (let i = 0; i < RegionInfo.locations.length; ++i) {
      //Each region has many locations
      //Insert each of those location names
      var LocationHTMLString = `
            <div class ="location-card" id="${RegionInfo.locations[i].name}">
              <div class="location-name">
              Location name: ${RegionInfo.locations[i].name.replace("-", " ")}
              </div>
            </div>
            `;
      var location_display = document.getElementById("region-card");
      location_display.insertAdjacentHTML("beforeend", LocationHTMLString);

      //Each locations has many areas
      //Get those areas and insert them
      P.getLocationByName(RegionInfo.locations[i].name) // with Promise
        .then(function(response) {
          var Areas = response.areas;
          for (let j = 0; j < Areas.length; j++) {
            var AreaHTMLString = `
                        <div class ="area-card">Area name: ${Areas[j].name.replace("-", " ")}</div>
                        <div class ="area-pokemon-card" id="${Areas[j].name}" </div>
                                `;
            var area_display = document.getElementById(RegionInfo.locations[i].name);
            area_display.insertAdjacentHTML("beforeend", AreaHTMLString);

            P.getLocationAreaByName(Areas[j].name) // with Promise
              .then(function(response) {
                var Area_info = {
                  Pokemon_encounters: response.pokemon_encounters
                };
                for (let k = 0; k < Area_info.Pokemon_encounters.length; ++k) {
                  var PokemonHTMLString = `
                                <div class ="pokemon-card" id="${Area_info.Pokemon_encounters[k].pokemon.name}${Areas[j].name}">
                                  <div class= "pokemon-name">
                                    ${Area_info.Pokemon_encounters[k].pokemon.name.replace("-", " ")}
                                  </div>
                                </div>
                                `;
                  //console.log( PokemonHtmlString);
                  var pokemon_display = document.getElementById(Areas[j].name);
                  pokemon_display.insertAdjacentHTML("beforeend",PokemonHTMLString);

                  P.getPokemonByName(Area_info.Pokemon_encounters[k].pokemon.name) // with Promise
                    .then(function(response) {
                      var sprite = response.sprites["front_default"];
                      var PokemonSpriteHTMLSTRING = `
                                <img class= "poke-pic" src="${sprite}" alt="Pokemon Image">
                            `;
                      var pokemon_sprite = document.getElementById(Area_info.Pokemon_encounters[k].pokemon.name +Areas[j].name);
                      pokemon_sprite.insertAdjacentHTML("beforeend",PokemonSpriteHTMLSTRING);
                    });
                }
              });
          }
        });
    }
  }
  else  if (RegionInfo.name == "Kalos") {
    //insert Region name and map
    var RegionHTMLString = `
        <div id ="region-card" class="card" >
            <h2 class="card-title"  >Welcome to ${RegionInfo.name} !!!</h2>
            <img class = "region-pic" src ="resources/Kalos.png" alt="Region Image">
            <div class="region-description">
            The Kalos region is shaped like a five-pointed star, with one of its biggest cities being Lumiose City in the north-central part of the region. It features a vast network of rivers and waterways snaking through much of its landscape, cities and towns.            </div>
        </div>
         `;
    region_display.insertAdjacentHTML("beforeend", RegionHTMLString);

    for (let i = 0; i < RegionInfo.locations.length; ++i) {
      //Each region has many locations
      //Insert each of those location names
      var LocationHTMLString = `
            <div class ="location-card" id="${RegionInfo.locations[i].name}">
              <div class="location-name">
              Location name: ${RegionInfo.locations[i].name.replace("-", " ")}
              </div>
            </div>
            `;
      var location_display = document.getElementById("region-card");
      location_display.insertAdjacentHTML("beforeend", LocationHTMLString);

      //Each locations has many areas
      //Get those areas and insert them
      P.getLocationByName(RegionInfo.locations[i].name) // with Promise
        .then(function(response) {
          var Areas = response.areas;
          for (let j = 0; j < Areas.length; j++) {
            var AreaHTMLString = `
                        <div class ="area-card">Area name: ${Areas[j].name.replace("-", " ")}</div>
                        <div class ="area-pokemon-card" id="${Areas[j].name}" </div>
                                `;
            var area_display = document.getElementById(RegionInfo.locations[i].name);
            area_display.insertAdjacentHTML("beforeend", AreaHTMLString);

            P.getLocationAreaByName(Areas[j].name) // with Promise
              .then(function(response) {
                var Area_info = {
                  Pokemon_encounters: response.pokemon_encounters
                };
                for (let k = 0; k < Area_info.Pokemon_encounters.length; ++k) {
                  var PokemonHTMLString = `
                                <div class ="pokemon-card" id="${Area_info.Pokemon_encounters[k].pokemon.name}${Areas[j].name}">
                                  <div class= "pokemon-name">
                                    ${Area_info.Pokemon_encounters[k].pokemon.name.replace("-", " ")}
                                  </div>
                                </div>
                                `;
                  //console.log( PokemonHtmlString);
                  var pokemon_display = document.getElementById(Areas[j].name);
                  pokemon_display.insertAdjacentHTML("beforeend",PokemonHTMLString);

                  P.getPokemonByName(Area_info.Pokemon_encounters[k].pokemon.name) // with Promise
                    .then(function(response) {
                      var sprite = response.sprites["front_default"];
                      var PokemonSpriteHTMLSTRING = `
                                <img class= "poke-pic" src="${sprite}" alt="Pokemon Image">
                            `;
                      var pokemon_sprite = document.getElementById(Area_info.Pokemon_encounters[k].pokemon.name +Areas[j].name);
                      pokemon_sprite.insertAdjacentHTML("beforeend",PokemonSpriteHTMLSTRING);
                    });
                }
              });
          }
        });
    }
  }
  
};
