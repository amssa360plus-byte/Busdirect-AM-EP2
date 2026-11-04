
const params = new URLSearchParams(location.search);
const id = Number(params.get("id"));
fetch('data/trips.json')
.then(function(response) {
    return response.json();
})
.then(function(trips) {

    const trajet = trips.find(function(trip) {
        return Number(trip.id)===id;
    });

    console.log(trajet);

    document.querySelector("#safi").textContent = trajet.departure;
    document.querySelector("#marackech").textContent = trajet.destination;
    document.querySelector('#price').textContent = trajet.price;
    price = trajet.price

}); 
