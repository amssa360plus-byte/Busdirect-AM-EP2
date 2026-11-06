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
        document.querySelector("#safi").textContent = trajet.departure;
        document.querySelector("#marackech").textContent = trajet.destination;
        document.querySelector("#price").textContent = price;
        document.querySelector("#allplace").textContent = capacity;
        const reservationKey = "seats_trip_" + tripId;
        const waitingKey = "waiting_trip_" + tripId;
        function readStorage(key, fallback) {
            try {
                const data = localStorage.getItem(key);
                return data === null ? fallback : JSON.parse(data);
            } catch (error) {
                console.error(error);
                return fallback;
            }
        }
        function saveStorage(key, data) {
            try {
                localStorage.setItem(key, JSON.stringify(data));
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
                    if (number >= 1 && number <= capacity && person) {
                        result[number] = {
                            seat: number,
                            name: typeof person === "string" ? person : person.name || "",
                            phone: typeof person === "string" ? "" : person.phone || ""
                        };
                    }
                });
            }
            return result;
        }
        const savedReservations = readStorage(reservationKey, null);
        const reservations = normalizeReservations(
            savedReservations === null ? trajet.reservations : savedReservations
        );
        let waitingList = readStorage(waitingKey, trajet.waitingList || []);
        if (!Array.isArray(waitingList)) {
            waitingList = [];
        }
        function saveReservations() {
            return saveStorage(reservationKey, reservations);
        }
        function saveWaitingList() {
            return saveStorage(waitingKey, waitingList);
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
        function fillSelect(select, placeholder, items, selected) {
            select.innerHTML = "";
            select.add(new Option(placeholder, ""));
            items.forEach(function (item) {
                select.add(
                    new Option(item.label, item.value)
                );
            });
            if (selected) {
                select.value = String(selected);
            }
        }
        function updateSelects() {
            const oldModify = el.modifyPassenger.value;
            const oldCancel = el.cancelPassenger.value;
            const oldTarget = el.modifySeat.value;
            const normal = [];
            const vip = [];
            const booked = [];
            const available = [];
            for (let i = 1; i <= capacity; i++) {
                const person = reservations[i];
                const item = {
                    value: i,
                    label: "Seat " + i
                };
                if (person) {
                    booked.push({
                        value: i,
                        label: person.name + " (Seat " + i + ")"
                    });
                } else {
                    available.push(item);
                    if (i <= 4) {
                        vip.push(item);
                    } else {
                        normal.push(item);
                    }
                }
            }
            const selectedModify = Number(oldModify);
            if (selectedModify && reservations[selectedModify]) {
                available.push({
                    value: selectedModify,
                    label: "Seat " + selectedModify + " (actuel)"
                });
            }
            fillSelect(
                el.reserveSeat,
                "Choix",
                normal,
                el.reserveSeat.value
            );
            fillSelect(
                el.reserveVIP,
                "Choix VIP",
                vip,
                el.reserveVIP.value
            );
            fillSelect(
                el.modifyPassenger,
                "Sélectionner passager",
                booked,
                oldModify
            );
            fillSelect(
                el.modifySeat,
                "Garder le siège actuel",
                available,
                oldTarget
            );
            fillSelect(
                el.cancelPassenger,
                "Sélectionner réservation",
                booked,
                oldCancel
            );
        }
        function updateStats() {
            const occupied = Object.keys(reservations).length;
            const total = occupied * price;
            document.querySelector("#oucupe").textContent =
                occupied;
            document.querySelector(".total-form").textContent =
                total + " DH";
        }
        function displayWaitingList() {
            el.waitingContainer.innerHTML = "";
            if (waitingList.length === 0) {
                el.waitingContainer.textContent =
                    "Aucune personne en attente";
                return;
            }
            waitingList.forEach(function (person, index) {
                const card = document.createElement("div");
                card.className =
                    "border rounded-xl p-3 mb-2 flex justify-between items-center gap-3";
                const info = document.createElement("span");
                info.textContent =
                    person.name + " - " + person.phone;
                const button = document.createElement("button");
                button.type = "button";
                button.textContent = "Remove";
                button.dataset.removeWait = index;
                button.className =
                    "border border-red-300 rounded-lg px-3 py-2 text-red-600";
                card.append(info, button);
                el.waitingContainer.appendChild(card);
            });
        }
        function refresh() {
            displaySeats();
            updateSelects();
            updateStats();
            displayWaitingList();
        }
        el.grid.addEventListener("click", function (event) {
            const button = event.target.closest(".seat-btn");
            if (!button || button.disabled) return;
            const seat = Number(button.dataset.seat);
            if (seat <= 4) {
                el.reserveVIP.value = String(seat);
                el.reserveSeat.value = "";
            } else {
                el.reserveSeat.value = String(seat);
                el.reserveVIP.value = "";
            }
        });
        el.modifyPassenger.addEventListener("change", function () {
            const seat = Number(el.modifyPassenger.value);
            const person = reservations[seat];
            el.modifyName.value = person
                ? person.name
                : "";
            el.modifySeat.value = "";
        });
        function handleSubmit(form) {
            if (form === el.reserveForm) {
                const name = el.reserveName.value.trim();
                const phone = el.reservePhone.value.trim();
                const seat = Number(
                    el.reserveVIP.value || el.reserveSeat.value
                );
                if (!name || !phone) {
                    el.reserveNotification.textContent =
                        "Veuillez saisir le nom et le téléphone.";
                    return;
                }
                if (!seat || seat > capacity || seat < 1) {
                    el.reserveNotification.textContent =
                        "Veuillez choisir un siège.";
                    return;
                }
                if (reservations[seat]) {
                    el.reserveNotification.textContent =
                        "Ce siège est déjà réservé.";
                    return;
                }
                reservations[seat] = {
                    seat: seat,
                    name: name,
                    phone: phone
                };
                if (!saveReservations()) {
                    delete reservations[seat];
                    el.reserveNotification.textContent =
                        "Erreur de sauvegarde.";
                    refresh();
                    return;
                }
                el.ticket.textContent =
                    "Réservation réussie ! " +
                    name + " | Seat " + seat +
                    " | Prix : " + price + " DH";
                el.ticket.classList.remove("hidden");
                el.reserveNotification.textContent = "";
                el.reserveForm.reset();
                refresh();
                return;
            }
            if (form === el.modifyForm) {
                const oldSeat = Number(el.modifyPassenger.value);
                const newName = el.modifyName.value.trim();
                const selectedSeat = Number(el.modifySeat.value);
                if (!oldSeat || !reservations[oldSeat]) {
                    el.modifyNotification.textContent =
                        "Veuillez sélectionner un passager.";
                    return;
                }
                if (!newName) {
                    el.modifyNotification.textContent =
                        "Veuillez saisir le nouveau nom.";
                    return;
                }
                const newSeat = selectedSeat || oldSeat;
                if (
                    newSeat !== oldSeat &&
                    reservations[newSeat]
                ) {
                    el.modifyNotification.textContent =
                        "Ce siège est déjà occupé.";
                    return;
                }
                const oldReservation = reservations[oldSeat];
                delete reservations[oldSeat];
                reservations[newSeat] = {
                    seat: newSeat,
                    name: newName,
                    phone: oldReservation.phone
                };
                if (!saveReservations()) {
                    delete reservations[newSeat];
                    reservations[oldSeat] = oldReservation;
                    el.modifyNotification.textContent =
                        "Erreur de sauvegarde.";
                    refresh();
                    return;
                }
                el.modifyNotification.textContent =
                    "Modification réussie.";
                el.modifyForm.reset();
                refresh();
                return;
            }
            if (form === el.cancelForm) {
                const seat = Number(el.cancelPassenger.value);
                if (!seat || !reservations[seat]) {
                    el.cancelNotification.textContent =
                        "Veuillez sélectionner une réservation.";
                    return;
                }
                const oldReservation = reservations[seat];
                const oldWaiting = waitingList.slice();
                delete reservations[seat];
                let message =
                    "Réservation annulée. Le siège est libre.";
                if (waitingList.length > 0) {
                    const nextPerson = waitingList.shift();
                    reservations[seat] = {
                        seat: seat,
                        name: nextPerson.name,
                        phone: nextPerson.phone || ""
                    };
                    message =
                        nextPerson.name +
                        " a pris le siège " + seat;
                }
                const saved1 = saveReservations();
                const saved2 = saveWaitingList();
                if (!saved1 || !saved2) {
                    reservations[seat] = oldReservation;
                    waitingList.splice(
                        0,
                        waitingList.length,
                        ...oldWaiting
                    );
                    saveReservations();
                    saveWaitingList();
                    el.cancelNotification.textContent =
                        "Erreur de sauvegarde.";
                    refresh();
                    return;
                }
                el.cancelNotification.textContent = message;
                el.cancelForm.reset();
                refresh();
                return;
            }
            if (form === el.waitForm) {
                const name = el.waitName.value.trim();
                const phone = el.waitPhone.value.trim();
                if (!name || !phone) {
                    el.waitNotification.textContent =
                        "Veuillez saisir le nom et le téléphone.";
                    return;
                }
                waitingList.push({
                    name: name,
                    phone: phone
                });
                if (!saveWaitingList()) {
                    waitingList.pop();
                    el.waitNotification.textContent =
                        "Erreur de sauvegarde.";
                    return;
                }
                el.waitNotification.textContent =
                    "Passager ajouté à Waiting List.";
                el.waitForm.reset();
                displayWaitingList();
            }
        }
        el.waitingContainer.addEventListener("click", function (event) {
            const button = event.target.closest("[data-remove-wait]");
            if (!button) return;
            const index = Number(button.dataset.removeWait);
            if (
                !Number.isInteger(index) ||
                index < 0 ||
                index >= waitingList.length
            ) {
                return;
            }
            const removed = waitingList.splice(index, 1)[0];
            if (!saveWaitingList()) {
                waitingList.splice(index, 0, removed);
                el.waitNotification.textContent =
                    "Erreur de sauvegarde.";
                return;
            }
            el.waitNotification.textContent =
                "Passager supprimé.";
            displayWaitingList();
        });
        busApp = {
            handleSubmit: handleSubmit,
            refresh: refresh,
            reservations: reservations,
            waitingList: waitingList,
            saveReservations: saveReservations,
            saveWaitingList: saveWaitingList,
            elements: el,
            trip: trajet,
            price: price
        };
        refresh();
    } catch (error) {
        console.error(error);
        const notification =
            document.querySelector("#reserve-notification");
        if (notification) {
            notification.textContent = error.message;
        }
    }
});