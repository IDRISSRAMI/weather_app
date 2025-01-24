let weather = {
  apiKey: "3a5f58f5c172e7b994f9e7759fe436d6",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });
weather.fetchWeather("beni mellal");
let wint = [];
var input = document.querySelectorAll(".search-bar").value;



let click_fav = document.querySelector(".click_fav");
let temp = document.querySelector(".temp");
let city = document.querySelector(".city");
let favorite = document.querySelector(".favorite .favorite_list");

// click_fav.addEventListener("click", function (event) {
//   let div = document.createElement("div");
//   console.log(city.textContent);
//   div.innerHTML = `
//       <div class="fav">
//         <p class="temp">${temp.textContent}</p>
//         <p class="city_name">${city.textContent}</p>
//         <button ><i class="fa-solid fa-trash trach"></i></button>
//       </div>
//   `;
//   favorite.append(div);
//   let deleteBtn = div.querySelector(".delete_btn");
// });


// document.addEventListener("click", function (event) {
//   if (event.target.classList.contains("trach")) {
//     console.log(event.target.parentElement.parentElement.remove());
//   }
// });









// Initialize favorites from localStorage
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Function to render favorites
function renderFavorites() {
  favorite.innerHTML = ""; // Clear existing DOM
  favorites.forEach((fav) => {
    let div = document.createElement("div");
    div.classList.add("fav");
    div.innerHTML = `
      <p class="temp">${fav.temp}</p>
      <p class="city_name">${fav.city}</p>
      <button class="delete_btn"><i class="fa-solid fa-trash trach"></i></button>
    `;
    favorite.append(div);
  });
}

// Add event listener to "Add to Favorite" button
click_fav.addEventListener("click", function () {
  const cityName = city.textContent;
  const cityTemp = temp.textContent;

  // Check if city already exists in favorites
  const exists = favorites.some((fav) => fav.city === cityName);
  if (exists) {
    alert(`${cityName} is already in your favorites!`);
    return;
  }

  // Add new favorite and save to localStorage
  const newFav = { city: cityName, temp: cityTemp };
  favorites.push(newFav);
  localStorage.setItem("favorites", JSON.stringify(favorites));

  // Re-render the list
  renderFavorites();
});

// Add event listener to handle delete actions
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("trach")) {
    const parentDiv = event.target.closest(".fav");
    const cityName = parentDiv.querySelector(".city_name").textContent;

    // Remove from favorites array
    favorites = favorites.filter((fav) => fav.city !== cityName);
    localStorage.setItem("favorites", JSON.stringify(favorites));

    // Remove from DOM
    parentDiv.remove();
  }
});

// Initial render from localStorage
renderFavorites();


