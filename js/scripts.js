//écoute de l'événement "DOMContentLoaded" et exécution de la fonction init lorsque le DOM de la page HTML est chargé.
document.addEventListener("DOMContentLoaded", init);

//https://nssdc.gsfc.nasa.gov/planetary/factsheet/

const planets = [
    { name: "Mercure", mass: 0.330, diameter: 4879, density: 5429, number_of_moons: 0, distance_from_sun: 57.9 },
    { name: "Vénus", mass: 4.87, diameter: 12.104, density: 5243, number_of_moons: 0, distance_from_sun: 0 },
    { name: "Terre", mass: 5.97, diameter: 12.756, density: 5514, number_of_moons: 1, distance_from_sun: 149.6 },
    { name: "Mars", mass: 0, diameter: 0, density: 0, number_of_moons: 0, distance_from_sun: 0 },
    { name: "Jupiter", mass: 0, diameter: 0, density: 0, number_of_moons: 0, distance_from_sun: 0 },
    { name: "Saturne", mass: 0, diameter: 0, density: 0, number_of_moons: 0, distance_from_sun: 0 },
    { name: "Uranus", mass: 0, diameter: 0, density: 0, number_of_moons: 0, distance_from_sun: 0 },
    { name: "Neptune", mass: 0, diameter: 0, density: 0, number_of_moons: 0, distance_from_sun: 0 },
];


function onClick(event) {
    console.log(event);
}

function onSubmit(event) {
    event.preventDefault();//évite le rechargement de page


    const keyword_input = document.querySelector("#keyword");

    const keyword = keyword_input.value;//valeur du champ keyword

    let found_planet;

    for (const a_planet of planets) {
        if (a_planet.name.toLowerCase() === keyword.toLowerCase()) {
            found_planet = a_planet;
        }
    }

    if (found_planet) {
        const search_results = document.querySelector("#search-results");

        const template = `
            <h2>${found_planet.name}</h2>
            <p>Masse : ${found_planet.mass}10<sup>24</sup>kg</p>
        `;

        search_results.innerHTML = template;
        console.log("La planète existe");
    } else {
        console.log("La planète n'existe pas");
    }


}

function init() {
    console.log('init');

    const test_button = document.querySelector("#test");
    test_button.addEventListener('click', onClick);

    const search_form = document.querySelector("#search-form");
    search_form.addEventListener('submit', onSubmit);
}