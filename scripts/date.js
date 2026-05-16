let today = new Date();
document.getElementById("currentYear").innerHTML = `&copy;${today.getFullYear()}`;
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;