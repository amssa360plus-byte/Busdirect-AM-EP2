let resirvation = [];
let local = [];
let price = 80;
let final = 0
let place  = 0
let ouccepon = 0

const reserveForm = document.querySelector('#reserve-form');
const reserveNameInput = document.querySelector('#reserve-name');
const reserveSeatSelect = document.querySelector('#reserve-seat');
const reserveNotification = document.querySelector('#reserve-notification');
const ticketPreview = document.querySelector('#ticket-preview');

const NameRev01 = document.querySelector('#namerev01');
const NameRev02 = document.querySelector('#namerev02');
const NameRev03 = document.querySelector('#namerev03');
const NameRev04 = document.querySelector('#namerev04');
const NameRev05 = document.querySelector('#namerev05');
const NameRev06 = document.querySelector('#namerev06');
const NameRev07 = document.querySelector('#namerev07');
const NameRev08 = document.querySelector('#namerev08');
const NameRev09 = document.querySelector('#namerev09');
const NameRev10 = document.querySelector('#namerev10');
const NameRev11 = document.querySelector('#namerev11');
const NameRev12 = document.querySelector('#namerev12');
const NameRev13 = document.querySelector('#namerev13');
const NameRev14 = document.querySelector('#namerev14');
const NameRev15 = document.querySelector('#namerev15');
const NameRev16 = document.querySelector('#namerev16');
const NameRev17 = document.querySelector('#namerev17');
const NameRev18 = document.querySelector('#namerev18');
const NameRev19 = document.querySelector('#namerev19');
const NameRev20 = document.querySelector('#namerev20');

const resvplace01 = document.querySelector('#place01');
const resvplace02 = document.querySelector('#place02');
const resvplace03 = document.querySelector('#place03');
const resvplace04 = document.querySelector('#place04');
const resvplace05 = document.querySelector('#place05');
const resvplace06 = document.querySelector('#place06');
const resvplace07 = document.querySelector('#place07');
const resvplace08 = document.querySelector('#place08');
const resvplace09 = document.querySelector('#place09');
const resvplace10 = document.querySelector('#place10');
const resvplace11 = document.querySelector('#place11');
const resvplace12 = document.querySelector('#place12');
const resvplace13 = document.querySelector('#place13');
const resvplace14 = document.querySelector('#place14');
const resvplace15 = document.querySelector('#place15');
const resvplace16 = document.querySelector('#place16');
const resvplace17 = document.querySelector('#place17');
const resvplace18 = document.querySelector('#place18');
const resvplace19 = document.querySelector('#place19');
const resvplace20 = document.querySelector('#place20');

const lib01 = document.querySelector('#libre01');
const lib02 = document.querySelector('#libre02');
const lib03 = document.querySelector('#libre03');
const lib04 = document.querySelector('#libre04');
const lib05 = document.querySelector('#libre05');
const lib06 = document.querySelector('#libre06');
const lib07 = document.querySelector('#libre07');
const lib08 = document.querySelector('#libre08');
const lib09 = document.querySelector('#libre09');
const lib10 = document.querySelector('#libre10');
const lib11 = document.querySelector('#libre11');
const lib12 = document.querySelector('#libre12');
const lib13 = document.querySelector('#libre13');
const lib14 = document.querySelector('#libre14');
const lib15 = document.querySelector('#libre15');
const lib16 = document.querySelector('#libre16');
const lib17 = document.querySelector('#libre17');
const lib18 = document.querySelector('#libre18');
const lib19 = document.querySelector('#libre19');
const lib20 = document.querySelector('#libre20');

const mo_modifie = document.querySelector('#modify-passenger');

reserveForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    const passengerName = reserveNameInput.value.trim();
    let selectedSeat = reserveSeatSelect.value;

    if (passengerName === '') {
    reserveNotification.innerHTML = '<p class="text-red-500 text-sm font-medium">SVP entre Nom passager</p>';
    ticketPreview.classList.add('hidden');
    return;
}

if (selectedSeat === '') {
    for (let i = 1; i <= 20; i++) {
        const autoId = String(i).padStart(2, '0');
        if (document.querySelector('#place' + autoId).style.backgroundColor !== 'red') {
            selectedSeat = String(i);
            reserveSeatSelect.value = selectedSeat;
            break;
        }
    }
}

if (selectedSeat === '') {
    reserveNotification.innerHTML = '<p class="text-red-500 text-sm font-medium">tout ouccupe</p>';
    ticketPreview.classList.add('hidden');
    return;
}
    

    const id = selectedSeat.padStart(2, '0');
    const targetSeat = document.querySelector(`#place${id}`);

    if (targetSeat.style.backgroundColor === "red") {
        reserveNotification.innerHTML = '<p class="text-red-500 text-sm font-medium">set place reserve</p>';
        ticketPreview.classList.add('hidden');
        return;
    }

    reserveNotification.innerHTML = '';

    ticketPreview.innerHTML = `
        <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm space-y-1">
            <p class="font-bold text-slate-900">resirvation succes</p>
            <p class="text-slate-700"><strong>Passagere:</strong> ${passengerName}</p>
            <p class="text-slate-700"><strong>siege:</strong> Seat ${selectedSeat}</p>
            <p class="text-teal-600 font-semibold pt-1">prix: 80 DH</p>
        </div>
    `;

    if (reserveSeatSelect.value === "1") {
        resvplace01.style.backgroundColor = "red";
        lib01.remove();
        NameRev01.innerHTML = `<div class=""><p class="text-slate-700">${passengerName}</p></div>`;
        mo_modifie.innerHTML += `<option value="1">${passengerName} (Seat 1)</option>`;
        resirvation.push(price)
    }    
    if (reserveSeatSelect.value === "2") {
        resvplace02.style.backgroundColor = "red";
        lib02.remove();
        NameRev02.innerHTML = `<div class=""><p class="text-slate-700">${passengerName}</p></div>`;
        mo_modifie.innerHTML += `<option value="2">${passengerName} (Seat 2)</option>`;
        resirvation.push(price)
    }   
    if (reserveSeatSelect.value === "3") {
        resvplace03.style.backgroundColor = "red";
        lib03.remove();
        NameRev03.innerHTML = `<div class=""><p class="text-slate-700">${passengerName}</p></div>`;
        mo_modifie.innerHTML += `<option value="3">${passengerName} (Seat 3)</option>`;
        resirvation.push(price)
    }
    if (reserveSeatSelect.value === "4") {
        resvplace04.style.backgroundColor = "red";
        lib04.remove();
        NameRev04.innerHTML = `<div class=""><p class="text-slate-700">${passengerName}</p></div>`;
        mo_modifie.innerHTML += `<option value="4">${passengerName} (Seat 4)</option>`;
        resirvation.push(price)
    }    
    if (reserveSeatSelect.value === "5") {
        resvplace05.style.backgroundColor = "red";
        lib05.remove();
        NameRev05.innerHTML = `<div class=""><p class="text-slate-700">${passengerName}</p></div>`;
        mo_modifie.innerHTML += `<option value="5">${passengerName} (Seat 5)</option>`;
        resirvation.push(price)
    }  
    if (reserveSeatSelect.value === "6") {
        resvplace06.style.backgroundColor = "red";
        lib06.remove();
        NameRev06.innerHTML = `<div class=""><p class="text-slate-700">${passengerName}</p></div>`;
        mo_modifie.innerHTML += `<option value="6">${passengerName} (Seat 6)</option>`;
        resirvation.push(price)
    }
    if (reserveSeatSelect.value === "7") {
        resvplace07.style.backgroundColor = "red";
        lib07.remove();
        NameRev07.innerHTML = `<div class=""><p class="text-slate-700">${passengerName}</p></div>`;
        mo_modifie.innerHTML += `<option value="7">${passengerName} (Seat 7)</option>`;
        resirvation.push(price)
    }    
    if (reserveSeatSelect.value === "8") {
        resvplace08.style.backgroundColor = "red";
        lib08.remove();
        NameRev08.innerHTML = `<div class=""><p class="text-slate-700">${passengerName}</p></div>`;
        mo_modifie.innerHTML += `<option value="8">${passengerName} (Seat 8)</option>`;
        resirvation.push(price)
    }   
    if (reserveSeatSelect.value === "9") {
        resvplace09.style.backgroundColor = "red";
        lib09.remove();
        NameRev09.innerHTML = `<div class=""><p class="text-slate-700">${passengerName}</p></div>`;
        mo_modifie.innerHTML += `<option value="9">${passengerName} (Seat 9)</option>`;
        resirvation.push(price)
    }
    if (reserveSeatSelect.value === "10") {
        resvplace10.style.backgroundColor = "red";
        lib10.remove();
        NameRev10.innerHTML = `<div class=""><p class="text-slate-700">${passengerName}</p></div>`;
        mo_modifie.innerHTML += `<option value="10">${passengerName} (Seat 10)</option>`;
        resirvation.push(price)
    }
    if (reserveSeatSelect.value === "11") {
        resvplace11.style.backgroundColor = "red";
        lib11.remove();
        NameRev11.innerHTML = `<div class=""><p class="text-slate-700">${passengerName}</p></div>`;
        mo_modifie.innerHTML += `<option value="11">${passengerName} (Seat 11)</option>`;
        resirvation.push(price)
    }
    if (reserveSeatSelect.value === "12") {
        resvplace12.style.backgroundColor = "red";
        lib12.remove();
        NameRev12.innerHTML = `<div class=""><p class="text-slate-700">${passengerName}</p></div>`;
        mo_modifie.innerHTML += `<option value="12">${passengerName} (Seat 12)</option>`;
    }
    if (reserveSeatSelect.value === "13") {
        resvplace13.style.backgroundColor = "red";
        lib13.remove();
        NameRev13.innerHTML = `<div class=""><p class="text-slate-700">${passengerName}</p></div>`;
        resirvation.push(price)
    }
    if (reserveSeatSelect.value === "14") {
        resvplace14.style.backgroundColor = "red";
        lib14.remove();
        NameRev14.innerHTML = `<div class=""><p class="text-slate-700">${passengerName}</p></div>`;
        mo_modifie.innerHTML += `<option value="14">${passengerName} (Seat 14)</option>`;
        resirvation.push(price)
    } 
    if (reserveSeatSelect.value === "15") {
        resvplace15.style.backgroundColor = "red";
        lib15.remove();
        NameRev15.innerHTML = `<div class=""><p class="text-slate-700">${passengerName}</p></div>`;
        mo_modifie.innerHTML += `<option value="15">${passengerName} (Seat 15)</option>`;
        resirvation.push(price)
    }
    if (reserveSeatSelect.value === "16") {
        resvplace16.style.backgroundColor = "red";
        lib16.remove();
        NameRev16.innerHTML = `<div class=""><p class="text-slate-700">${passengerName}</p></div>`;
        mo_modifie.innerHTML += `<option value="16">${passengerName} (Seat 16)</option>`;
        resirvation.push(price)
    }
    if (reserveSeatSelect.value === "17") {
        resvplace17.style.backgroundColor = "red";
        lib17.remove();
        NameRev17.innerHTML = `<div class=""><p class="text-slate-700">${passengerName}</p></div>`;
        mo_modifie.innerHTML += `<option value="17">${passengerName} (Seat 17)</option>`;
        resirvation.push(price)
    }
    if (reserveSeatSelect.value === "18") {
        resvplace18.style.backgroundColor = "red";
        lib18.remove();
        NameRev18.innerHTML = `<div class=""><p class="text-slate-700">${passengerName}</p></div>`;
        mo_modifie.innerHTML += `<option value="18">${passengerName} (Seat 18)</option>`;
        resirvation.push(price)
    
    }
    if (reserveSeatSelect.value === "19") {
        resvplace19.style.backgroundColor = "red";
        lib19.remove();
        NameRev19.innerHTML = `<div class=""><p class="text-slate-700">${passengerName}</p></div>`;
        mo_modifie.innerHTML += `<option value="19">${passengerName} (Seat 19)</option>`;
        resirvation.push(price)
    }
    if (reserveSeatSelect.value === "20") {
        resvplace20.style.backgroundColor = "red";
        lib20.remove();
        NameRev20.innerHTML = `<div class=""><p class="text-slate-700">${passengerName}</p></div>`;
        mo_modifie.innerHTML += `<option value="20">${passengerName} (Seat 20)</option>`;
        resirvation.push(price)
        
    }


    
    ticketPreview.classList.remove('hidden');
    const ouccepe = document.querySelector('.dispo')
    const totalNotification = document.querySelector('.total-form')
    let total = 0
    for(let i = 0 ; i < resirvation.length ; i++){
    total += resirvation[i]
    ouccepon += resirvation[i].length
    
    }
    final = total;
    ouccepe.innerHTML = `<div class="dispo">
                    <span>oucupe: </span>
                    <span id="oucupe">${resirvation.length}</span>
                </div>`
    totalNotification.innerHTML = `<span class = "alltotal">${final}</span>`
});
const modifyForm = document.querySelector('#modify-form');
const modifyPassengerSelect = document.querySelector('#modify-passenger');
const modifyNameInput = document.querySelector('#modify-name');
const modifySeatSelect = document.querySelector('#modify-seat');
const modifyNotification = document.querySelector('#modify-notification');

const cancel = document.querySelector('#cancel-passenger')

modifyForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const oldSeat = modifyPassengerSelect.value;
    const newName = modifyNameInput.value.trim();
    const newSeat = modifySeatSelect.value;     

    if (oldSeat === '') {
        modifyNotification.innerHTML = '<p class="text-red-500 text-sm font-medium">Please select a passenger to modife!</p>';
        return;
    }

    if (newName === '') {
        modifyNotification.innerHTML = '<p class="text-red-500 text-sm font-medium">svp entree neuvelle nom</p>';
        return;
    }

    const oldId = oldSeat.padStart(2, '0');
    const targetNameRev = document.querySelector(`#namerev${oldId}`);

    if (newSeat !== '' && newSeat !== oldSeat) {
        const newId = newSeat.padStart(2, '0');
        const newLibreEl = document.querySelector(`#libre${newId}`);

        if (!newLibreEl) {
            modifyNotification.innerHTML = '<p class="text-red-500 text-sm font-medium">ila deja existe</p>';
            return;
        }

        const oldPlace = document.querySelector(`#place${oldId}`);
        oldPlace.style.backgroundColor = "";
        targetNameRev.innerHTML = "";
        
        const oldLibreContainer = document.createElement('span');
        oldLibreContainer.className = "text-xs text-slate-400 font-medium";
        oldLibreContainer.id = `libre${oldId}`;
        oldLibreContainer.textContent = "Libre";
        oldPlace.appendChild(oldLibreContainer);

        const newPlace = document.querySelector(`#place${newId}`);
        newPlace.style.backgroundColor = "red";
        newLibreEl.remove();

        const newNameRev = document.querySelector(`#namerev${newId}`);
        newNameRev.innerHTML = `<div class=""><p class="text-slate-700">${newName}</p></div>`;

        const optionToUpdate = modifyPassengerSelect.querySelector(`option[value="${oldSeat}"]`);
        if (optionToUpdate) {
            optionToUpdate.value = newSeat;
            optionToUpdate.textContent = `${newName} (Seat ${newSeat})`;
           
        }

        modifyNotification.innerHTML = '<p class="text-teal-600 text-sm font-medium">loperation de modification a ete effrcute avec succes</p>';
        return;
    }

    if (targetNameRev) {
        targetNameRev.innerHTML = `<div class=""><p class="text-slate-700">${newName}</p></div>`;
        modifyNotification.innerHTML = '<p class="text-teal-600 text-sm font-medium">Modification succes</p>';
    }
});

const cancelForm = document.querySelector('#cancel-form');
const cancelPassengerSelect = document.querySelector('#cancel-passenger');
const cancelNotification = document.querySelector('#cancel-notification');

cancelForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    const selectedSeat = cancelPassengerSelect.value;

    if (selectedSeat === '') {
        cancelNotification.innerHTML = '<p class="text-red-500 text-sm font-medium">Vuillez saisir un Nom</p>';
        return;
    }

    const id = selectedSeat.padStart(2, '0');
    const targetSeat = document.querySelector(`#place${id}`);
    const targetNameRev = document.querySelector(`#namerev${id}`);

    if (targetSeat.style.backgroundColor !== "red") {
        cancelNotification.innerHTML = '<p class="text-red-500 text-sm font-medium">la place non reservee</p>';
        return;
    }

    targetSeat.style.backgroundColor = "";
    targetNameRev.innerHTML = "";

    const libreContainer = document.createElement('span');
    libreContainer.className = "seat-libre";
    libreContainer.id = `libre${id}`;
    libreContainer.textContent = "Libre";
    targetSeat.appendChild(libreContainer);

    const modifyPassengerSelect = document.querySelector('#modify-passenger');
    const modifyOption = modifyPassengerSelect.querySelector(`option[value="${selectedSeat}"]`);
    if (modifyOption) {
        modifyOption.remove();
        
    }

    const cancelOption = cancelPassengerSelect.querySelector(`option[value="${selectedSeat}"]`);
    if (cancelOption) {
        cancelOption.remove();
        
    }
    if(resirvation.length > 0){
        resirvation.pop()
    }
    const ouccepe = document.querySelector('.dispo')
    const totalNotification = document.querySelector('.total-form')
    let total = 0 ;
    for(let i = 0 ; i < resirvation.length ; i++){
        total += resirvation[i];
    }
    ouccepe.innerHTML = `<div class="dispo">
                    <span>oucupe: </span>
                    <span id="oucupe">${resirvation.length}</span>
                </div>`
    totalNotification.innerHTML = `<span class = "font-weight: bold; alltotal">${total}</span>`
    

    cancelNotification.innerHTML = '<p class="text-teal-600 text-sm font-medium">Reservation anuller </p>';
    cancelPassengerSelect.value = '';
});
function save() {
    const data = {};
    for (let i = 1; i <= 20; i++) {
        const id = String(i).padStart(2, '0');
        const place = document.querySelector('#place' + id);
        if (place.style.backgroundColor === 'red') {
            data[i] = document.querySelector('#namerev' + id).textContent.trim();
        }
    }
    localStorage.setItem('seats', JSON.stringify(data));
}

function load() {
    const data = JSON.parse(localStorage.getItem('seats')) || {};
    for (const seat in data) {
        reserveNameInput.value = data[seat];
        reserveSeatSelect.value = seat;
        reserveForm.requestSubmit();
    }
    reserveNameInput.value = '';
    reserveSeatSelect.value = '';
    ticketPreview.classList.add('hidden');
}

load();
document.addEventListener('submit', save);