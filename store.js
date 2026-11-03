fetch('data/trips.json')
.then(function(jawad) {
    return jawad.json();
})
.then(function(trips) {
    let placeholder = document.querySelector('#classic');
    const one = document.querySelector('#one');
    const two = document.querySelector('#two')
    const three = document.querySelector('#three')
    const four = document.querySelector('#four')

    function displayTrips(out) {
        let output = '';

        for (let city of out) {
            output += `
            <div class="relative left-[100px] top-[20px]">
                <a href="cabine.html""
                    class="w-full text-left rounded-xl transition duration-300 hover:-translate-y-1">

                    <div class="w-full min-h-[180px] border-4 border-gray-300 rounded-xl
                                bg-white p-5 transition duration-300
                                hover:border-green-500 hover:bg-green-50 hover:shadow-lg">

                        <img src="img/icontarjet-removebg-preview.png"
                             alt="trajet"
                             class="w-[50px] mb-4">

                        <div class="flex items-center justify-between gap-3 text-base font-semibold">
                            <span>${city.departure}</span>
                            <span class="text-green-600">To</span>
                            <span>${city.destination}</span>
                        </div>

                        <div class="grid grid-cols-2 gap-4 mt-5 border-t pt-3">
                            <div>
                                <p class="text-sm text-gray-500">Time Depart</p>
                                <span class="font-bold">${city.departureTime}</span>
                            </div>

                            <div>
                                <p class="text-sm text-gray-500">Time d'arrivée</p>
                                <span class="font-bold">${city.arrivalTime}</span>
                            </div>
                        </div>
                    </div>
                </a>
                </div>
            `;
        }

        placeholder.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 w-[1000px]">
                ${output}
            </div>
        `;
    }

    displayTrips(trips.slice(0, 6));

    one.addEventListener('click', function(e) {
        e.preventDefault();
        displayTrips(trips.slice(0, 6)); 
    });
    two.addEventListener('click', function(e){
        e.preventDefault();
        displayTrips(trips.slice(6, 12))
    })
    three.addEventListener('click', function(e){
        e.preventDefault();
        displayTrips(trips.slice(12, 18))
    })
    four.addEventListener('click', function(e){
        e.preventDefault
        displayTrips(trips.slice(18, 20))
    })
        const searche = document.querySelector('#searche');

    searche.addEventListener('input', function () {
        const mot = searche.value.trim().toLowerCase();

        const resulta = trips.filter(function (trip) {
            return trip.departure.toLowerCase().includes(mot)
                || trip.destination.toLowerCase().includes(mot);
        });

        displayTrips(resulta.slice(0, 6));
    });
       
      const filtre = document.querySelector('#filter');

    filtre.addEventListener('change', function () {
        const choix = filtre.value;

        if (choix === 'tous') {
            displayTrips(trips.slice(0, 6));
        }
        else if (choix === 'dispo') {
            const dispos = trips.filter(function (trip) {
                return trip.reservations.length < trip.capacity;
            });
            displayTrips(dispos.slice(0, 6))

        }
        else if (choix === 'com') {
            const complets = trips.filter(function (trip) {
                return trip.reservations.length >= trip.capacity;
            });
            displayTrips(complets.slice(0, 6));
        }
    });
})
    