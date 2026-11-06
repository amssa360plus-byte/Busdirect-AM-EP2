
document.addEventListener("DOMContentLoaded", async function () {

    const params = new URLSearchParams(window.location.search);
    const tripId = Number(params.get("id") || 1);

    try {

        const response = await fetch("data/trips.json");

        if (!response.ok) {
            throw new Error("Erreur de chargement JSON");
        }

        const trips = await response.json();

        const trajet = trips.find(function (trip) {
            return Number(trip.id) === tripId;
        });

        if (!trajet) {
            throw new Error("Trajet introuvable");
        }

        const capacity = Number(trajet.capacity);
        const price = Number(trajet.price);

        document.querySelector("#safi").textContent =
            trajet.departure;

        document.querySelector("#marackech").textContent =
            trajet.destination;

        document.querySelector("#price").textContent =
            price;

        document.querySelector("#allplace").textContent =
            capacity;

        const reservations = {};

const reservationKey = "seats_trip_" + tripId;


function readStorage(key) {

    try {

        const data = localStorage.getItem(key);

        return data === null ? null : JSON.parse(data);

    } catch (error) {

        console.error("Erreur LocalStorage", error);

        return null;
    }
}


function normalizeReservations(data) {

    const result = {};

    if (Array.isArray(data)) {

        data.forEach(function (person) {

            result[person.seat] = {

                seat: Number(person.seat),

                name: person.name,

                phone: person.phone || ""
            };

        });

    } else if (data && typeof data === "object") {

        Object.keys(data).forEach(function (seat) {

            const person = data[seat];

            result[seat] = {

                seat: Number(seat),

                name: typeof person === "string"
                    ? person
                    : person.name,

                phone: typeof person === "string"
                    ? ""
                    : person.phone || ""
            };

        });
    }

    return result;
}


const savedReservations = readStorage(reservationKey);

   reservations = normalizeReservations(
    
    savedReservations === null
        ? trajet.reservations
        : savedReservations

);


function saveReservations() {

    try {

        localStorage.setItem(
            reservationKey,
            JSON.stringify(reservations)
        );

        return true;

    } catch (error) {

        console.error("Erreur de sauvegarde", error);

        return false;
    }
}


if (savedReservations === null) {

    saveReservations();

}


        trajet.reservations.forEach(function (person) {

            reservations[person.seat] = person;

        });

        const seatsGrid = document.querySelector("#seats-grid");

        let container = seatsGrid.querySelector(".seats-grid");

        if (!container) {

            container = document.createElement("div");

            container.className = "seats-grid";

            seatsGrid.appendChild(container);
        }

        function getSeat(number) {

            let seat = seatsGrid.querySelector(
                '[data-seat="' + number + '"]'
            );

            if (!seat) {

                seat = document.createElement("button");

                seat.type = "button";

                seat.dataset.seat = number;

                seat.className = "seat-btn";

                container.appendChild(seat);
            }

            return seat;
        }

        function displaySeats() {

            for (let i = 1; i <= capacity; i++) {

                const id = String(i).padStart(2, "0");

                const reservation = reservations[i];

                const seat = getSeat(i);

                seat.id = "place" + id;

                let number = seat.querySelector(".seat-num");

                if (!number) {

                    number = document.createElement("span");

                    number.className = "seat-num";

                    seat.appendChild(number);
                }

                number.textContent = id;

                let status = seat.querySelector(".seat-libre");

                if (!status) {

                    status = document.createElement("span");

                    status.className = "seat-libre";

                    seat.appendChild(status);
                }

                status.id = "libre" + id;

                let name = seat.querySelector(
                    '[id="namerev' + id + '"]'
                );

                if (!name) {

                    name = document.createElement("span");

                    seat.appendChild(name);
                }

                name.id = "namerev" + id;

                let phone = seat.querySelector(
                    '[id="palceNumiro' + id + '"]'
                );

                if (!phone) {

                    phone = document.createElement("span");

                    seat.appendChild(phone);
                }

                phone.id = "palceNumiro" + id;
                if (reservation) {

                    seat.disabled = true;

                    seat.style.backgroundColor =
                        i <= 4 ? "#fde68a" : "#fecaca";

                    status.textContent = "Occupé";

                    name.textContent = reservation.name;

                    phone.textContent = reservation.phone || "";

                } else {

                    seat.disabled = false;

                    seat.style.backgroundColor =
                        i <= 4 ? "#fef9c3" : "#dcfce7";

                    status.textContent = "Libre";

                    name.textContent = "";

                    phone.textContent = "";
                }
            }

        }

        function updateStats() {

            const occupied = Object.keys(reservations).length;

            document.querySelector("#oucupe").textContent =
                occupied;

            document.querySelector(".total-form").textContent =
                occupied * price + " DH";
        }

        displaySeats();

        updateStats();

        window.BusDirect = {

            trip: trajet,

            tripId: tripId,

            capacity: capacity,

            price: price,

            reservations: reservations,

            seatsGrid: seatsGrid,

            displaySeats: displaySeats,

            updateStats: updateStats,

            saveReservations: saveReservations,
        };

    } catch (error) {

        console.error(error);
        alert(error.message);
    }
});

document.addEventListener("DOMContentLoaded", async function () {

    const params = new URLSearchParams(window.location.search);

    const tripId = Number(params.get("id") || 1);


    try {

        const response = await fetch("data/trips.json");

        if (!response.ok) {
            throw new Error("Erreur de chargement JSON");
        }

        const trips = await response.json();


        const trajet = trips.find(function (trip) {

            return Number(trip.id) === tripId;

        });


        if (!trajet) {

            throw new Error("Trajet introuvable");

        }


        const capacity = Number(trajet.capacity);

        const price = Number(trajet.price);


        document.querySelector("#safi").textContent =
            trajet.departure;

        document.querySelector("#marackech").textContent =
            trajet.destination;

        document.querySelector("#price").textContent =
            price;

        document.querySelector("#allplace").textContent =
            capacity;


        const reservationKey = "seats_trip_" + tripId;


        function readStorage(key) {

            try {

                const data = localStorage.getItem(key);

                return data === null ? null : JSON.parse(data);

            } catch (error) {

                console.error(error);

                return null;
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

                    if (number >= 1 && number <= capacity && person) {

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


        const savedReservations = readStorage(reservationKey);

        const reservations = normalizeReservations(

            savedReservations === null
                ? trajet.reservations
                : savedReservations

        );


        function saveReservations() {

            try {

                localStorage.setItem(
                    reservationKey,
                    JSON.stringify(reservations)
                );

                return true;

            } catch (error) {

                console.error(error);

                return false;
            }
        }


        if (savedReservations === null) {

            saveReservations();

        }


        const seatsGrid = document.querySelector("#seats-grid");

        let container = seatsGrid.querySelector(".seats-grid");

        if (!container) {

            container = document.createElement("div");

            container.className = "seats-grid";

            seatsGrid.appendChild(container);
        }


        function getSeat(number) {

            let seat = seatsGrid.querySelector(
                '[data-seat="' + number + '"]'
            );

            if (!seat) {

                seat = document.createElement("button");

                seat.type = "button";

                seat.className = "seat-btn";

                seat.dataset.seat = number;

                container.appendChild(seat);
            }

            return seat;
        }


        function getOrCreateChild(button, selector, id, className) {

            let element = button.querySelector(selector);

            if (!element) {

                element = document.createElement("span");

                button.appendChild(element);
            }

            element.id = id;

            element.className = className;

            return element;
        }


        function displaySeats() {

            for (let i = 1; i <= capacity; i++) {

                const id = String(i).padStart(2, "0");

                const reservation = reservations[i];

                const isVIP = i <= 4;


                const seat = getSeat(i);

                seat.id = "place" + id;

                seat.dataset.seat = i;

                seat.type = "button";

                seat.classList.add("seat-btn");


                let number = seat.querySelector(".seat-num");

                if (!number) {

                    number = document.createElement("span");

                    seat.prepend(number);
                }

                number.className = "seat-num";

                number.textContent = id;


                const status = getOrCreateChild(

                    seat,

                    ".seat-libre",

                    "libre" + id,

                    "seat-libre"

                );


                const name = getOrCreateChild(

                    seat,

                    '[id="namerev' + id + '"]',

                    "namerev" + id,

                    "text-slate-700 font-semibold"

                );


                const phone = getOrCreateChild(

                    seat,

                    '[id="palceNumiro' + id + '"]',

                    "palceNumiro" + id,

                    "text-xs text-slate-600"

                );


                if (reservation) {

                    seat.disabled = true;

                    seat.style.backgroundColor = isVIP
                        ? "yellow"
                        : "red";

                    status.textContent = "Occupé";

                    name.textContent = reservation.name;

                    phone.textContent = reservation.phone || "";


                } else {

                    seat.disabled = false;

                    seat.style.backgroundColor = isVIP
                        ? "#fef9c3"
                        : "#dcfce7";

                    status.textContent = "Libre";

                    name.textContent = "";

                    phone.textContent = "";
                }
            }
        }


        function updateStats() {

            const occupied = Object.keys(reservations).length;

            const total = occupied * price;


            document.querySelector("#oucupe").textContent =
                occupied;


            document.querySelector(".total-form").textContent =
                total + " DH";
        }


        displaySeats();


        updateStats();


        window.BusDirect = {

            trip: trajet,

            tripId: tripId,

            capacity: capacity,

            price: price,

            reservations: reservations,

            saveReservations: saveReservations,

            seatsGrid: seatsGrid,

            displaySeats: displaySeats,

            updateStats: updateStats

        };


    } catch (error) {

        console.error(error);

        alert(error.message);

    }

});
