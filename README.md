# Pokedex
This is an application meant to provide the user with on-demand information about different Pokemon. It provides a dashboard with a trading card-like interface to view information about each Pokemon. It also provides data for a given move or a given region, and provides an interface for viewing data for a matchup between two pokemon. 

## API
This application aggregates data gathered using the pokeAPI. This API provides a large amount of Pokemon-related data, you can find out more at https://pokeapi.co/.
<br/><br/>
In order to access the API, we used the pokeapi-js-wrapper npm package. More on this package can be found at https://github.com/PokeAPI/pokeapi-js-wrapper.<br/>
This package gives the user the means to use promises to search for pokemon data by name, id, etc. 

## Tools
Dependency Management - NPM<br/>
We chose not to use any front-end frameworks. This application utilizes Javascript using promises to gather and process data. The layout uses HTML and the styling is done using CSS with animations. 


