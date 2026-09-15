const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");


gridbutton.addEventListener("click", () => {
	
	display.classList.add("grid");
	display.classList.remove("list");
});

listbutton.addEventListener("click", showList); 

function showList() {
	display.classList.add("list");
	display.classList.remove("grid");
}
fetch("data/members.json")
    .then(response => response.json())
    .then(data => {
        displayMembers(data.directory);
    });

function displayMembers(members) {
    members.forEach(member => {
        const card = document.createElement("section");

        card.classList.add("card");

        card.innerHTML = `
            <img src="${member["image file name with extension"]}" alt="${member["company name"]}">
            <h2>${member["company name"]}</h2>
            <p>${member["company addresses"]}</p>
            <p>${member["company phone number"]}</p>
			<p>${member["membership level"]}</p>
			<p>${member["email"]}</p>
            <a href="${member["company website URL"]}" target="_blank">Website</a>
        `;

        display.appendChild(card);
    });
}