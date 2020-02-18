var region_display = document.getElementById("region_display");
var P = new Pokedex.Pokedex();

var search = () => {
  //remove previous element if exist
  var remove = document.getElementById("region-card");
  if (remove != null) {
    remove.parentNode.removeChild(remove);
  }

  //

  var regions = document.getElementById("regions");
  var selected_region = regions.options[regions.selectedIndex].value;

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
  } else if (selected_region == "johto") {
    P.getRegionByName("johto") // with Promise
      .then(function(response) {
        const RegionInfo = {
          name: "Johto",
          locations: response.locations,
          main_generation: response.main_generation.name
        };
        displayRegion(RegionInfo);
      });
  } else if (selected_region == "hoenn") {
    P.getRegionByName("hoenn") // with Promise
      .then(function(response) {
        const RegionInfo = {
          name: "Hoenn",
          locations: response.locations,
          main_generation: response.main_generation.name
        };
        displayRegion(RegionInfo);
      });
  } else if (selected_region == "sinnoh") {
    P.getRegionByName("sinnoh") // with Promise
      .then(function(response) {
        const RegionInfo = {
          name: "Sinnoh",
          locations: response.locations,
          main_generation: response.main_generation.name
        };
        displayRegion(RegionInfo);
      });
  } else if (selected_region == "unova") {
    P.getRegionByName("unova") // with Promise
      .then(function(response) {
        const RegionInfo = {
          name: "Unova",
          locations: response.locations,
          main_generation: response.main_generation.name
        };
        displayRegion(RegionInfo);
      });
  } else if (selected_region == "kalos") {
    P.getRegionByName("kalos") // with Promise
      .then(function(response) {
        const RegionInfo = {
          name: "Kalos",
          locations: response.locations,
          main_generation: response.main_generation.name
        };
        displayRegion(RegionInfo);
      });
  } else if (selected_region == "alola") {
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

var displayRegion = RegionInfo => {
  if (RegionInfo.name == "Kanto") {
    //insert Region name and map
    var RegionHTMLString = `
        <div id ="region-card" class="card" >
            <h2 class="card-title"  >${RegionInfo.name} </h2>
            <p>Generation: ${RegionInfo.main_generation}</p>
            <img class = "region-pic" src ="resources/Kanto.png">
        </div>
         `;
    region_display.insertAdjacentHTML("beforeend", RegionHTMLString);

    for (let i = 0; i < RegionInfo.locations.length; ++i) {
      //Each region has many locations
      //Insert each of those location names
      var LocationHTMLString = `
            <div id="${
              RegionInfo.locations[i].name
            }">Location name: ${RegionInfo.locations[i].name
        .toUpperCase()
        .replace("-", " ")}</div>
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
                        <div id="${Areas[j].name}" >Area name: ${Areas[j].name
              .toUpperCase()
              .replace("-", " ")}</div>
                    `;
            var area_display = document.getElementById(
              RegionInfo.locations[i].name
            );
            area_display.insertAdjacentHTML("beforeend", AreaHTMLString);

            P.getLocationAreaByName(Areas[j].name) // with Promise
              .then(function(response) {
                var Area_info = {
                  Pokemon_encounters: response.pokemon_encounters
                };
                for (let k = 0; k < Area_info.Pokemon_encounters.length; ++k) {
                  var PokemonHTMLString = `
                                <div id="${
                                  Area_info.Pokemon_encounters[k].pokemon.name
                                }${Areas[j].name}">
                                    Pokemon Name: ${Area_info.Pokemon_encounters[
                                      k
                                    ].pokemon.name
                                      .toUpperCase()
                                      .replace("-", " ")}
                                </div>
                            `;
                  //console.log( PokemonHtmlString);
                  var pokemon_display = document.getElementById(Areas[j].name);
                  pokemon_display.insertAdjacentHTML(
                    "beforeend",
                    PokemonHTMLString
                  );

                  P.getPokemonByName(
                    Area_info.Pokemon_encounters[k].pokemon.name
                  ) // with Promise
                    .then(function(response) {
                      var sprite = response.sprites["front_default"];
                      var PokemonSpriteHTMLSTRING = `
                                <img src="${sprite}" >
                            `;
                      var pokemon_sprite = document.getElementById(
                        Area_info.Pokemon_encounters[k].pokemon.name +
                          Areas[j].name
                      );
                      pokemon_sprite.insertAdjacentHTML(
                        "beforeend",
                        PokemonSpriteHTMLSTRING
                      );
                    });
                }
              });
          }
        });
    }
  } else if (RegionInfo.name == "Johto") {
    //insert Region name and map
    var RegionHTMLString = `
        <div id ="region-card" class="card" >
            <h2 class="card-title"  >${RegionInfo.name} </h2>
            <p>Generation: ${RegionInfo.main_generation}</p>
            <img class = "region-pic" src ="resources/Johto.png">
        </div>
         `;
    region_display.insertAdjacentHTML("beforeend", RegionHTMLString);

    for (let i = 0; i < RegionInfo.locations.length; ++i) {
      //Each region has many locations
      //Insert each of those location names
      var LocationHTMLString = `
            <div id="${
              RegionInfo.locations[i].name
            }">Location name: ${RegionInfo.locations[i].name
        .toUpperCase()
        .replace("-", " ")}</div>
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
                        <div id="${Areas[j].name}" >Area name: ${Areas[j].name
              .toUpperCase()
              .replace("-", " ")}</div>
                    `;
            var area_display = document.getElementById(
              RegionInfo.locations[i].name
            );
            area_display.insertAdjacentHTML("beforeend", AreaHTMLString);

            P.getLocationAreaByName(Areas[j].name) // with Promise
              .then(function(response) {
                var Area_info = {
                  Pokemon_encounters: response.pokemon_encounters
                };
                for (let k = 0; k < Area_info.Pokemon_encounters.length; ++k) {
                  var PokemonHTMLString = `
                                <div id="${
                                  Area_info.Pokemon_encounters[k].pokemon.name
                                }${Areas[j].name}">
                                    Pokemon Name: ${Area_info.Pokemon_encounters[
                                      k
                                    ].pokemon.name
                                      .toUpperCase()
                                      .replace("-", " ")}
                                </div>
                            `;
                  //console.log( PokemonHtmlString);
                  var pokemon_display = document.getElementById(Areas[j].name);
                  pokemon_display.insertAdjacentHTML(
                    "beforeend",
                    PokemonHTMLString
                  );

                  P.getPokemonByName(
                    Area_info.Pokemon_encounters[k].pokemon.name
                  ) // with Promise
                    .then(function(response) {
                      var sprite = response.sprites["front_default"];
                      var PokemonSpriteHTMLSTRING = `
                                <img src="${sprite}" >
                            `;
                      var pokemon_sprite = document.getElementById(
                        Area_info.Pokemon_encounters[k].pokemon.name +
                          Areas[j].name
                      );
                      pokemon_sprite.insertAdjacentHTML(
                        "beforeend",
                        PokemonSpriteHTMLSTRING
                      );
                    });
                }
              });
          }
        });
    }
  } else if (RegionInfo.name == "Hoenn") {
    //insert Region name and map
    var RegionHTMLString = `
        <div id ="region-card" class="card" >
            <h2 class="card-title"  >${RegionInfo.name} </h2>
            <p>Generation: ${RegionInfo.main_generation}</p>
            <img class = "region-pic" src ="resources/Hoenn.png">
        </div>
         `;
    region_display.insertAdjacentHTML("beforeend", RegionHTMLString);

    for (let i = 0; i < RegionInfo.locations.length; ++i) {
      //Each region has many locations
      //Insert each of those location names
      var LocationHTMLString = `
            <div id="${
              RegionInfo.locations[i].name
            }">Location name: ${RegionInfo.locations[i].name
        .toUpperCase()
        .replace("-", " ")}</div>
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
                        <div id="${Areas[j].name}" >Area name: ${Areas[j].name
              .toUpperCase()
              .replace("-", " ")}</div>
                    `;
            var area_display = document.getElementById(
              RegionInfo.locations[i].name
            );
            area_display.insertAdjacentHTML("beforeend", AreaHTMLString);

            P.getLocationAreaByName(Areas[j].name) // with Promise
              .then(function(response) {
                var Area_info = {
                  Pokemon_encounters: response.pokemon_encounters
                };
                for (let k = 0; k < Area_info.Pokemon_encounters.length; ++k) {
                  var PokemonHTMLString = `
                                <div id="${
                                  Area_info.Pokemon_encounters[k].pokemon.name
                                }${Areas[j].name}">
                                    Pokemon Name: ${Area_info.Pokemon_encounters[
                                      k
                                    ].pokemon.name
                                      .toUpperCase()
                                      .replace("-", " ")}
                                </div>
                            `;
                  //console.log( PokemonHtmlString);
                  var pokemon_display = document.getElementById(Areas[j].name);
                  pokemon_display.insertAdjacentHTML(
                    "beforeend",
                    PokemonHTMLString
                  );

                  P.getPokemonByName(
                    Area_info.Pokemon_encounters[k].pokemon.name
                  ) // with Promise
                    .then(function(response) {
                      var sprite = response.sprites["front_default"];
                      var PokemonSpriteHTMLSTRING = `
                                <img src="${sprite}" >
                            `;
                      var pokemon_sprite = document.getElementById(
                        Area_info.Pokemon_encounters[k].pokemon.name +
                          Areas[j].name
                      );
                      pokemon_sprite.insertAdjacentHTML(
                        "beforeend",
                        PokemonSpriteHTMLSTRING
                      );
                    });
                }
              });
          }
        });
    }
  } else if (RegionInfo.name == "Sinnoh") {
    //insert Region name and map
    var RegionHTMLString = `
        <div id ="region-card" class="card" >
            <h2 class="card-title"  >${RegionInfo.name} </h2>
            <p>Generation: ${RegionInfo.main_generation}</p>
            <img class = "region-pic" src ="resources/Sinnoh.png">
        </div>
         `;
    region_display.insertAdjacentHTML("beforeend", RegionHTMLString);

    for (let i = 0; i < RegionInfo.locations.length; ++i) {
      //Each region has many locations
      //Insert each of those location names
      var LocationHTMLString = `
            <div id="${
              RegionInfo.locations[i].name
            }">Location name: ${RegionInfo.locations[i].name
        .toUpperCase()
        .replace("-", " ")}</div>
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
                        <div id="${Areas[j].name}" >Area name: ${Areas[j].name
              .toUpperCase()
              .replace("-", " ")}</div>
                    `;
            var area_display = document.getElementById(
              RegionInfo.locations[i].name
            );
            area_display.insertAdjacentHTML("beforeend", AreaHTMLString);

            P.getLocationAreaByName(Areas[j].name) // with Promise
              .then(function(response) {
                var Area_info = {
                  Pokemon_encounters: response.pokemon_encounters
                };
                for (let k = 0; k < Area_info.Pokemon_encounters.length; ++k) {
                  var PokemonHTMLString = `
                                <div id="${
                                  Area_info.Pokemon_encounters[k].pokemon.name
                                }${Areas[j].name}">
                                    Pokemon Name: ${Area_info.Pokemon_encounters[
                                      k
                                    ].pokemon.name
                                      .toUpperCase()
                                      .replace("-", " ")}
                                </div>
                            `;
                  //console.log( PokemonHtmlString);
                  var pokemon_display = document.getElementById(Areas[j].name);
                  pokemon_display.insertAdjacentHTML(
                    "beforeend",
                    PokemonHTMLString
                  );

                  P.getPokemonByName(
                    Area_info.Pokemon_encounters[k].pokemon.name
                  ) // with Promise
                    .then(function(response) {
                      var sprite = response.sprites["front_default"];
                      var PokemonSpriteHTMLSTRING = `
                                <img src="${sprite}" >
                            `;
                      var pokemon_sprite = document.getElementById(
                        Area_info.Pokemon_encounters[k].pokemon.name +
                          Areas[j].name
                      );
                      pokemon_sprite.insertAdjacentHTML(
                        "beforeend",
                        PokemonSpriteHTMLSTRING
                      );
                    });
                }
              });
          }
        });
    }
  } else if (RegionInfo.name == "Unova") {
    //insert Region name and map
    var RegionHTMLString = `
        <div id ="region-card" class="card" >
            <h2 class="card-title"  >${RegionInfo.name} </h2>
            <p>Generation: ${RegionInfo.main_generation}</p>
            <img class = "region-pic" src ="resources/Unova.png">
        </div>
         `;
    region_display.insertAdjacentHTML("beforeend", RegionHTMLString);

    for (let i = 0; i < RegionInfo.locations.length; ++i) {
      //Each region has many locations
      //Insert each of those location names
      var LocationHTMLString = `
            <div id="${
              RegionInfo.locations[i].name
            }">Location name: ${RegionInfo.locations[i].name
        .toUpperCase()
        .replace("-", " ")}</div>
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
                        <div id="${Areas[j].name}" >Area name: ${Areas[j].name
              .toUpperCase()
              .replace("-", " ")}</div>
                    `;
            var area_display = document.getElementById(
              RegionInfo.locations[i].name
            );
            area_display.insertAdjacentHTML("beforeend", AreaHTMLString);

            P.getLocationAreaByName(Areas[j].name) // with Promise
              .then(function(response) {
                var Area_info = {
                  Pokemon_encounters: response.pokemon_encounters
                };
                for (let k = 0; k < Area_info.Pokemon_encounters.length; ++k) {
                  var PokemonHTMLString = `
                                <div id="${
                                  Area_info.Pokemon_encounters[k].pokemon.name
                                }${Areas[j].name}">
                                    Pokemon Name: ${Area_info.Pokemon_encounters[
                                      k
                                    ].pokemon.name
                                      .toUpperCase()
                                      .replace("-", " ")}
                                </div>
                            `;
                  //console.log( PokemonHtmlString);
                  var pokemon_display = document.getElementById(Areas[j].name);
                  pokemon_display.insertAdjacentHTML(
                    "beforeend",
                    PokemonHTMLString
                  );

                  P.getPokemonByName(
                    Area_info.Pokemon_encounters[k].pokemon.name
                  ) // with Promise
                    .then(function(response) {
                      var sprite = response.sprites["front_default"];
                      var PokemonSpriteHTMLSTRING = `
                                <img src="${sprite}" >
                            `;
                      var pokemon_sprite = document.getElementById(
                        Area_info.Pokemon_encounters[k].pokemon.name +
                          Areas[j].name
                      );
                      pokemon_sprite.insertAdjacentHTML(
                        "beforeend",
                        PokemonSpriteHTMLSTRING
                      );
                    });
                }
              });
          }
        });
    }
  } else if (RegionInfo.name == "Kalos") {
    //insert Region name and map
    var RegionHTMLString = `
        <div id ="region-card" class="card" >
            <h2 class="card-title"  >${RegionInfo.name} </h2>
            <p>Generation: ${RegionInfo.main_generation}</p>
            <img class = "region-pic" src ="resources/Kalos.png">
        </div>
         `;
    region_display.insertAdjacentHTML("beforeend", RegionHTMLString);

    for (let i = 0; i < RegionInfo.locations.length; ++i) {
      //Each region has many locations
      //Insert each of those location names
      var LocationHTMLString = `
            <div id="${
              RegionInfo.locations[i].name
            }">Location name: ${RegionInfo.locations[i].name
        .toUpperCase()
        .replace("-", " ")}</div>
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
                        <div id="${Areas[j].name}" >Area name: ${Areas[j].name
              .toUpperCase()
              .replace("-", " ")}</div>
                    `;
            var area_display = document.getElementById(
              RegionInfo.locations[i].name
            );
            area_display.insertAdjacentHTML("beforeend", AreaHTMLString);

            P.getLocationAreaByName(Areas[j].name) // with Promise
              .then(function(response) {
                var Area_info = {
                  Pokemon_encounters: response.pokemon_encounters
                };
                for (let k = 0; k < Area_info.Pokemon_encounters.length; ++k) {
                  var PokemonHTMLString = `
                                <div id="${
                                  Area_info.Pokemon_encounters[k].pokemon.name
                                }${Areas[j].name}">
                                    Pokemon Name: ${Area_info.Pokemon_encounters[
                                      k
                                    ].pokemon.name
                                      .toUpperCase()
                                      .replace("-", " ")}
                                </div>
                            `;
                  //console.log( PokemonHtmlString);
                  var pokemon_display = document.getElementById(Areas[j].name);
                  pokemon_display.insertAdjacentHTML(
                    "beforeend",
                    PokemonHTMLString
                  );

                  P.getPokemonByName(
                    Area_info.Pokemon_encounters[k].pokemon.name
                  ) // with Promise
                    .then(function(response) {
                      var sprite = response.sprites["front_default"];
                      var PokemonSpriteHTMLSTRING = `
                                <img src="${sprite}" >
                            `;
                      var pokemon_sprite = document.getElementById(
                        Area_info.Pokemon_encounters[k].pokemon.name +
                          Areas[j].name
                      );
                      pokemon_sprite.insertAdjacentHTML(
                        "beforeend",
                        PokemonSpriteHTMLSTRING
                      );
                    });
                }
              });
          }
        });
    }
  } else if (RegionInfo.name == "Alola") {
    //insert Region name and map
    var RegionHTMLString = `
        <div id ="region-card" class="card" >
            <h2 class="card-title"  >${RegionInfo.name} </h2>
            <p>Generation: ${RegionInfo.main_generation}</p>
            <img class = "region-pic" src ="resources/Alola.png">
        </div>
         `;
    region_display.insertAdjacentHTML("beforeend", RegionHTMLString);

    for (let i = 0; i < RegionInfo.locations.length; ++i) {
      //Each region has many locations
      //Insert each of those location names
      var LocationHTMLString = `
            <div id="${
              RegionInfo.locations[i].name
            }">Location name: ${RegionInfo.locations[i].name
        .toUpperCase()
        .replace("-", " ")}</div>
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
                        <div id="${Areas[j].name}" >Area name: ${Areas[j].name
              .toUpperCase()
              .replace("-", " ")}</div>
                    `;
            var area_display = document.getElementById(
              RegionInfo.locations[i].name
            );
            area_display.insertAdjacentHTML("beforeend", AreaHTMLString);

            P.getLocationAreaByName(Areas[j].name) // with Promise
              .then(function(response) {
                var Area_info = {
                  Pokemon_encounters: response.pokemon_encounters
                };
                for (let k = 0; k < Area_info.Pokemon_encounters.length; ++k) {
                  var PokemonHTMLString = `
                                <div id="${
                                  Area_info.Pokemon_encounters[k].pokemon.name
                                }${Areas[j].name}">
                                    Pokemon Name: ${Area_info.Pokemon_encounters[
                                      k
                                    ].pokemon.name
                                      .toUpperCase()
                                      .replace("-", " ")}
                                </div>
                            `;
                  //console.log( PokemonHtmlString);
                  var pokemon_display = document.getElementById(Areas[j].name);
                  pokemon_display.insertAdjacentHTML(
                    "beforeend",
                    PokemonHTMLString
                  );

                  P.getPokemonByName(
                    Area_info.Pokemon_encounters[k].pokemon.name
                  ) // with Promise
                    .then(function(response) {
                      var sprite = response.sprites["front_default"];
                      var PokemonSpriteHTMLSTRING = `
                                <img src="${sprite}" >
                            `;
                      var pokemon_sprite = document.getElementById(
                        Area_info.Pokemon_encounters[k].pokemon.name +
                          Areas[j].name
                      );
                      pokemon_sprite.insertAdjacentHTML(
                        "beforeend",
                        PokemonSpriteHTMLSTRING
                      );
                    });
                }
              });
          }
        });
    }
  }
};
