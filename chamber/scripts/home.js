const display = document.querySelector(".grid-spotlights");

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not fetch members.json");
        }

        const data = await response.json();

        const members = data.directory;

        
        const spotlightMembers = members.filter(member =>
            member["membership level"] === "Gold" ||
            member["membership level"] === "Silver"
        );

      
        spotlightMembers.sort(() => Math.random() - 0.5);

        const numberOfMembers = Math.random() < 0.5 ? 2:3;

        const selectedMembers = spotlightMembers.slice(0, numberOfMembers);

        displayMembers(selectedMembers);

    } catch (error) {
        console.error("Error loading members:", error);
    }
}
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
getMembers();