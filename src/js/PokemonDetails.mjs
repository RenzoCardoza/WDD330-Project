import { capitalizeName, getLocalStorage, setLocalStorage } from "./utils.mjs"

//function that has the template for the details card
function pokemonDetailsTemplate(pokemon){
    const pokeName = capitalizeName(pokemon.name);
    const ability = capitalizeName(pokemon.abilities[0].ability.name);
    return `<h2 id="pokemonDetailsTitle">Pokemon Details</h2>
        <div class="pokemon-details-card">
            <h3 class="pokemonTitle">${pokeName} - #${pokemon.id}</h3>
            <div class="pokemon-details">
                <img 
                    id="sprite"
                    src=${pokemon.sprites.front_default}
                    alt="image of ${pokeName}"
                >
                <div id="p-details"> 
                    <p class="pokemon-stats" id="baseExp">Base Experience: ${pokemon.base_experience}</p>
                    <p class="pokemon-stats" id="height">Height: ${pokemon.height}</p>
                    <p class="pokemon-stats" id="ability">Ability: ${ability}</p>
                    <p class="pokemon-stats" id="pokemon-type">Type: ${pokemon.types[0].type.name}</p>
                </div>
            </div>
            <button class="addPokeBuildBtn">Add to the Builder</button>
    </div>`
}

export default class PokemonDetails {
    constructor(pokemonId, dataSource, cardContainer, moveContainer){
        this.pokemonId = pokemonId;
        this.dataSource = dataSource;
        this.pokemon = [];
        this.moves = [];
        this.cardContainer = cardContainer;
        this.movesContainer = moveContainer
    }
    async init(){
        //get the details of the pokemon by the ID using the pokeservices
        this.pokemon = await this.dataSource.findPokemonById(this.pokemonId);
        this.moves = this.getPokemonMoves(this.pokemon);
        //render it to the main using the template function above
        this.renderPokemonDetails(this.cardContainer, this.movesContainer, this.moves);
        this.createEventListener();
    }
    renderPokemonDetails(cardElement, moveContainer, moveList){
        let details = pokemonDetailsTemplate(this.pokemon);
        //insert the html snippet into the code
        cardElement.insertAdjacentHTML("afterbegin", details);
        /// here will be the code to iterate through the list and display the p elements
        for (let i = 0; i < moveList.length; i++){
            moveContainer.appendChild(moveList[i]);
        }
    }
    getPokemonMoves(pokemon){
        //this array will contain p elements
        const pElements = [];
        for (let i = 0; i < pokemon.moves.length; i++){
            //create a p element and add the text from the api to the innerHTML property
            let moveText = capitalizeName(pokemon.moves[i].move.name);
            let pElement = document.createElement("p");
            pElement.innerHTML = moveText;
            pElements.push(pElement);
        }
        return pElements;
    }
    createEventListener(){
        let button = document.querySelector(".addPokeBuildBtn");
        button.addEventListener("click", () => {
            let teamList = getLocalStorage("team");
            if (!teamList){
                let list = [];
                list.push(this.pokemonId);
                setLocalStorage("team", list);
                button.innerHTML = "Added Successfully";
            } else  if (teamList.length < 6){    
                teamList.push(this.pokemonId);
                setLocalStorage("team", teamList);
                button.innerHTML = "Added Successfully";
            } else {
                button.innerHTML = "Edit your team first";
            }
        });
    }
}