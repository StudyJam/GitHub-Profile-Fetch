document
  .getElementById("username")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      getDetails();
    }
  });

function getDetails() {
  document.getElementById("output").style.display = "block";
  const name = document.getElementById("username").value;

  if (name.trim() === "") {
    displayErrorModal("The username field is required");
    return;
  }

  fetch(`https://api.github.com/users/${name}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("User not found");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      document.getElementById("name").innerHTML = data.name || "No Name";
      document.getElementById("bio").innerHTML = data.bio || "No Bio Available";
      document.getElementById("followers").innerHTML =
        data.followers + " Followers";
      document.getElementById("following").innerHTML =
        data.following + " Following";
      document.getElementById("profile").innerHTML = `
    <img src="${data.avatar_url}" />
    `;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      displayErrorModal("Error: User not found");
    });
}
function displayErrorModal(message) {
  document.getElementById("errorMessage").innerHTML = message;
  document.getElementById("errorModal").style.display = "block";
  document.getElementById("output").style.display = "none";
}
function closeErrorModal() {
  document.getElementById("errorModal").style.display = "none";
  window.location.reload();
}