const types = document.querySelector('#types');
const fishList = document.querySelector('#fishlist');
const endpoint = './fish.json';

const catchFish = () => {
    fetch(endpoint)
        .then(data => data.json())
        .then(results => {
            const fishArray = Object.keys(results)              // Takes the keys of the object
                .map(key => results[key])                       // and maps them into an array with the details
            displayFish(fishArray)                              // Passes the array into the display function
        })   
}

const displayFish = (fishies) => {
    fishies.forEach(fish => {
        console.log(fish);
        const fishName = properCase(fish.name["name-en"]);
        const fishPrice = (fish.price);
        const fishPhrase = (fish["catch-phrase"]);
        const fishMuseum = (fish["museum-phrase"]);
        const newFish = document.createElement('div');
        newFish.innerHTML = `
            <div>
                <header>
                    <h3>${fishName}</h3>
                    <h3 class="price"> ${fishPrice} bells </h3>
                    <img class="toggle" src="./images/arrow-expand.png">
                </header>
                <main class="collapsed">
                    <h4>${fishPhrase}</h4>
                    <p>${fishMuseum}</p>
                </main>
            </div>
            `;
        newFish.classList.add('fish');
        fishList.appendChild(newFish);
    })
}

const expandFish = e => {
    if(e.target.classList.contains('toggle')){                              // Limits collapsing to just the item divs
        const details = e.target.parentNode.parentNode.children[1];         // Selects the div with the deets
        details.classList.toggle('collapsed')
        details.classList.contains('collapsed') 
            ? e.target.src = './images/arrow-expand.png' 
            : e.target.src = './images/arrow-collapse.png';
    }
}

function properCase(name){
    const isSpace = name.indexOf(' ');
    let properName = name[0].toUpperCase();
    if(isSpace === -1){                                                     // If no spaces, adds the rest of the name
        properName += name.slice(1);
    }else{                                                                  // If space, capitalize the second word
        properName += name.slice(1, isSpace + 1)                
        properName += name[isSpace + 1].toUpperCase();
        properName += name.slice(isSpace + 2);
    }
    return properName;
    
}

catchFish();

fishList.addEventListener('click', expandFish);