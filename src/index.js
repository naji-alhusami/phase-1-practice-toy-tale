let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const formSubmit = document.querySelector(".add-toy-form");

  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const divToys = document.getElementById("toy-collection");
  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then((data) => {
      data.map((toy) => {
        const divToy = document.createElement("div");
        divToy.setAttribute("class", "card");
        divToy.innerHTML = `
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button class="like-btn" id=${toy.id} likes=${toy.likes} onclick="">Likes</button>
        `;
        divToys.appendChild(divToy);
      });

      const likeButtons = document.querySelectorAll(".like-btn");
      for (let i = 0; i < likeButtons.length; i++) {
        likeButtons[i].addEventListener("click", (e) => {
          let counter = data[i].likes;
          e.preventDefault();
          fetch(`http://localhost:3000/toys/${e.target.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              likes: counter + 1,
            }),
          });
        });
      }
    });

  const nameInput = document.getElementsByName("name")[0];
  const imgInput = document.getElementsByName("image")[0];

  console.log(imgInput);

  formSubmit.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: nameInput.value,
        image: imgInput.value,
        likes: 0,
      }),
    });
  });
});
