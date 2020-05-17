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
        const fishName = (fish.name["name-en"]);
        const fishPrice = (fish.price);
        const fishPhrase = (fish["catch-phrase"]);
        const fishMuseum = (fish["museum-phrase"]);
        const newFish = document.createElement('div');
        newFish.innerHTML = `
            <h3>${fishName}</h3>
            <h4>${fishPhrase}</h4>
            <p>${fishMuseum}</p>
            <p class="price">Value: ${fishPrice} </p>
            `;
        newFish.classList.add('fish');

        fishList.appendChild(newFish);
    })
}

catchFish();