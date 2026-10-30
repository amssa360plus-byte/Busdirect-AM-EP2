
fetch('http://127.0.0.1:5500/data/trips.json')
.then(function(jawad){
    return jawad.json();
})
.then(function(trips){
    let placeholder = document.querySelector('#classic')
    let out = ""
    for(let ids  of trips){
        out += `
           <div class="grid grid-cols-1 md:grid-cols-4 gap-1 lg:grid-cols-3 gap4" id="classic">
           <button herf="cabine.html" id="fristbutton">
                    <div class="border-2 border-black rounded-xl h-40 bg-white p-2">
                        <img src="img/icontarjet-removebg-preview.png" alt="trajet" class="w-[50px]">
                        <div>
                            <span>${ids.departure}</span>
                            <span>${ids.destination}</span>
                        </div>
                    </div>
                </button>
            </div>    
        `
    }
    placeholder.innerHTML = out

})