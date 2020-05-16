const fishList = document.querySelector('#fish');
const endpoint = './fish.json';

const catchFish = () => {
    fetch(endpoint)
        .then(data => data.json())
        .then(results => console.log(results))
}

catchFish();