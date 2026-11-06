
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


        const savedReservations = readStorage(
            reservationKey,
            null
        );

        const reservations = normalizeReservations(
            savedReservations === null
                ? trajet.reservations
                : savedReservations
        );


        let waitingList = readStorage(
            waitingKey,
            trajet.waitingList || []
        );

        if (!Array.isArray(waitingList)) {
            waitingList = [];
        }


        function saveReservations() {

            return saveStorage(
                reservationKey,
                reservations
            );
        }


        function saveWaitingList() {

            return saveStorage(
                waitingKey,
                waitingList
            );
        }


        if (savedReservations === null) {
            saveReservations();
        }

        if (localStorage.getItem(waitingKey) === null) {
            saveWaitingList();
        }


        const el = {

            grid: document.querySelector("#seats-grid"),

            reserveForm: document.querySelector("#reserve-form"),
            reserveName: document.querySelector("#reserve-name"),
            reservePhone: document.querySelector("#Number"),
            reserveSeat: document.querySelector("#reserve-seat"),
            reserveVIP: document.querySelector("#reserve-seatvip"),
            reserveNotification: document.querySelector("#reserve-notification"),
            ticket: document.querySelector("#ticket-preview"),

            modifyForm: document.querySelector("#modify-form"),
            modifyPassenger: document.querySelector("#modify-passenger"),
            modifyName: document.querySelector("#modify-name"),
            modifySeat: document.querySelector("#modify-seat"),
            modifyNotification: document.querySelector("#modify-notification"),

            cancelForm: document.querySelector("#cancel-form"),
            cancelPassenger: document.querySelector("#cancel-passenger"),
            cancelNotification: document.querySelector("#cancel-notification"),

            waitForm: document.querySelector("#reserve-form-wiat"),
            waitName: document.querySelector("#reserve-name-wait"),
            waitPhone: document.querySelector("#reserve-number-wiat"),
            waitNotification: document.querySelector("#waiting-notification"),
            waitingContainer: document.querySelector("#waiting-list")

        };


        if (Object.values(el).some(function (element) {
            return !element;
        })) {

            throw new Error("Un élément HTML est manquant");
        }


        function getSeat(number) {

            const id = String(number).padStart(2, "0");

            return el.grid.querySelector(
                '[data-seat="' + number + '"]'
            ) || document.querySelector("#place" + id);
        }


        function displaySeats() {

            for (let i = 1; i <= capacity; i++) {

                const id = String(i).padStart(2, "0");

                const seat = getSeat(i);

                if (!seat) continue;

                seat.id = "place" + id;

                seat.dataset.seat = i;

                const reservation = reservations[i];

                const status = seat.querySelector(".seat-libre");

                const name = document.querySelector(
                    "#namerev" + id
                );

                let phone = document.querySelector(
                    "#palceNumiro" + id
                );

                if (!phone) {

                    phone = document.createElement("span");

                    phone.id = "palceNumiro" + id;

                    seat.appendChild(phone);
                }


                if (reservation) {

                    seat.disabled = true;

                    seat.style.backgroundColor =
                        i <= 4 ? "yellow" : "red";

                    if (status) {
                        status.textContent = "Occupé";
                    }

                    if (name) {
                        name.textContent = reservation.name;
                    }

                    phone.textContent =
                        reservation.phone || "";

                } else {

                    seat.disabled = false;

                    seat.style.backgroundColor = "#dcfce7";

                    if (status) {
                        status.textContent = "Libre";
                    }

                    if (name) {
                        name.textContent = "";
                    }

                    phone.textContent = "";
                }
            }
        }