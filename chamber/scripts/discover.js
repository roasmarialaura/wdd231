import {places} from '../data/places.mjs'
console.log(places)
const showHere = document.querySelector("#allPlaces")

const visitMessage = document.querySelector("#visitMessage");
const now = Date.now();
const lastVisit = localStorage.getItem("lastVisit");

if (lastVisit === null) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} 
else {
    const timeDifference = now - Number(lastVisit);
     const oneDay = 24 * 60 * 60 * 1000;

    if (timeDifference < oneDay) {
    
        visitMessage.textContent = "Back so soon! Awesome!";
    } else {
       
        const daysPassed = Math.floor(timeDifference / oneDay);
        const dayWord = daysPassed === 1 ? "day" : "days";

        visitMessage.textContent =
            `You last visited ${daysPassed} ${dayWord} ago.`;
    }
}
localStorage.setItem("lastVisit", now);

function displayItems(places) {
    places.forEach(x => {
        const thecard = document.createElement('div')
        const thephoto = document.createElement('img')
        thephoto.src = `images/${x.image_url}`
        thephoto.alt = x.name
        thecard.appendChild(thephoto)
        const thetitle = document.createElement('h2')
        thetitle.innerText = x.name
        thecard.appendChild(thetitle)
        const theaddress = document.createElement('address')
        theaddress.innerText = x.address
        thecard.appendChild(theaddress)
        const thedesc = document.createElement('p')
        thedesc.innerText = x.description
        thecard.appendChild(thedesc)
        const thebutton = document.createElement('button');
        thebutton.textContent = 'Learn More';
        thecard.appendChild(thebutton);

        showHere.appendChild(thecard)
    });
}

displayItems(places);