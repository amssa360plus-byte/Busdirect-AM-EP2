
let busApp = null;
document.addEventListener("submit", function (event) {

    const form = event.target;

    const formIds = [
        "reserve-form",
        "modify-form",
        "cancel-form",
        "reserve-form-wiat"
    ];

    if (!formIds.includes(form.id)) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    if (!busApp) return;

    busApp.handleSubmit(form);

}, true);


document.addEventListener("DOMContentLoaded", async function () {

    const params = new URLSearchParams(location.search);
    const tripId = Number(params.get("id") || 1);

    try {

        const response = await fetch("data/trips.json");

        if (!response.ok) {
            throw new Error("Erreur chargement JSON");
        }

        const trips = await response.json();

        const trajet = trips.find(function (trip) {
            return Number(trip.id) === tripId;
        });

        if (!trajet) {
            throw new Error("Trajet introuvable");
        }


        // 3. Informations du trajet
        const price = Number(trajet.price);
        const capacity = Number(trajet.capacity);

        document.querySelector("#safi").textContent =
            trajet.departure;

        document.querySelector("#marackech").textContent =
            trajet.destination;

        document.querySelector("#price").textContent =
            price;

        document.querySelector("#allplace").textContent =
            capacity;


        const reservationKey = "seats_trip_" + tripId;
        const waitingKey = "waiting_trip_" + tripId;


        function readStorage(key, fallback) {

            try {

                const data = localStorage.getItem(key);

                return data === null
                    ? fallback
                    : JSON.parse(data);

            } catch (error) {

                console.error(error);

                return fallback;
            }
        }


        function saveStorage(key, data) {

            try {

                localStorage.setItem(
                    key,
                    JSON.stringify(data)
                );

                return true;

            } catch (error) {

                console.error(error);

                return false;
            }
        }


        function normalizeReservations(data) {

            const result = {};

            if (Array.isArray(data)) {

                data.forEach(function (person) {

                    const seat = Number(person.seat);

                    if (seat >= 1 && seat <= capacity) {

                        result[seat] = {
                            seat: seat,
                            name: person.name || "",
                            phone: person.phone || ""
                        };
                    }
                });

            } else if (data && typeof data === "object") {

                Object.keys(data).forEach(function (seat) {

                    const person = data[seat];
                    const number = Number(seat);

                    if (
                        number >= 1 &&
                        number <= capacity &&
                        person
                    ) {

                        result[number] = {

                            seat: number,

                            name: typeof person === "string"
                                ? person
                                : person.name || "",

                            phone: typeof person === "string"
                                ? ""
                                : person.phone || ""
                        };
                    }
                });
            }

            return result;
        }


