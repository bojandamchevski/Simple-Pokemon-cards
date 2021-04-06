var container = document.getElementById("main-container");
var colors = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#F4E7DA",
    rock: "#D5D5D4",
    fairy: "#FCEAFF",
    poison: "#98D7A5",
    bug: "#F8D5A3",
    dragon: "#97B3E6",
    psychic: "#EAEDA1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5"
}

var mainTypes = Object.keys(colors);

async function fetchPokemons(number) {
    var response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
    var data = await response.json();
    createPokemonCard(data);
    console.log(data);
}

var i = 1;
var numberOfPokemons = 10;
async function setPokemonId() {
    while (i <= numberOfPokemons) {
        await fetchPokemons(i)
        i++;
    }
}

function createPokemonCard(pokemon) {
    var pokemonTypes = pokemon.types.map(types => types.type.name);
    var type = mainTypes.find(type => pokemonTypes.indexOf(type) > -1);
    var color = colors[type];
    var pokemonElement = document.createElement("div");
    pokemonElement.style.backgroundColor = color;
    pokemonElement.classList.add("pokemon");
    pokemonElement.innerHTML = `
    <div class="img-container">
        <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="pokemon">
    </div>
    <div class="info">
        <span class="number">ID:${pokemon.id}</span>
        <h3 class="name">${pokemon.name}</h3>
        <small class="type">Type:<span><em>${type}</em></span></small>
    </div>`;
    container.appendChild(pokemonElement);
}

var showPokemonsBtn = document.getElementById("show-pokemons");
showPokemonsBtn.addEventListener("click", () => {
    setPokemonId();
    showPokemonsBtn.style.display = "none";
    nextBtn.style.display = "inline-block";
});

var nextBtn = document.getElementById("next-btn");
var prevBtn = document.getElementById("prev-btn");

nextBtn.addEventListener("click", () => {
    prevBtn.style.display = "inline-block";
    container.innerHTML = "";
    numberOfPokemons += 10;
    i >= 190 ? nextBtn.style.display = "none" : nextBtn.style.display = "inline-block";
    i <= 10 ? prevBtn.style.display = "none" : prevBtn.style.display = "inline-block";
    setPokemonId();
});

prevBtn.addEventListener("click", () => {
    prevBtn.style.display = "inline-block";
    container.innerHTML = "";
    numberOfPokemons -= 10;
    i -= 20;
    i <= 10 ? prevBtn.style.display = "none" : prevBtn.style.display = "inline-block";
    i >= 190 ? nextBtn.style.display = "none" : nextBtn.style.display = "inline-block";
    setPokemonId();
});