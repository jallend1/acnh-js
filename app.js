const fishList = document.querySelector('#fishlist');
const sortForm = document.querySelector('#sortform');
const type = document.querySelector('#type');
const endpoint = './fish.json';
let fishArray = [];

const catchFish = () => {
    fetch(endpoint)
        .then(data => data.json())
        .then(results => {
            console.log()
            fishArray = Object.keys(results)              // Takes the keys of the object
                .map(key => results[key])                       // and maps them into an array with the details
                displayFish(sortFish())                              // Passes the array into the display function
            })   
}

function changeType(e){
    if(e.target.textContent === 'Fish'){
        type.children[0].classList.add('active');
        type.children[1].classList.remove('active');
        catchFish();
    }else if(e.target.textContent === 'Bugs'){
        type.children[0].classList.remove('active');
        type.children[1].classList.add('active');
        console.log('Bug time!')
    }
}

const displayFish = (fishies) => {
    console.log(fishies)
    console.dir(sortForm);
    fishies.forEach(fish => {
        const { price, 
                ["catch-phrase"]: fishPhrase, 
                ["museum-phrase"]: fishMuseum} 
                = fish
        const fishName = properCase(fish.name["name-en"]);
        const newFish = document.createElement('div');
        newFish.innerHTML = `
            <div>
                <header>
                    <h3>${fishName}</h3>
                    <h3 class="price"> ${price} bells </h3>
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

function sortFish(){
    console.log(sortForm.value);
    return fishArray.sort((a, b) => a.price - b.price)
}

catchFish();
sortFish(fishArray);

sortForm.addEventListener('click', sortFish);
fishList.addEventListener('click', expandFish);
type.addEventListener('click', changeType);