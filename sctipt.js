const url = "https://reqres.in/api/users";
const search = document.querySelector("#search");
const searchBtn = document.querySelector("#search_btn");
const user = document.querySelector("#result");
const content = document.querySelector(".content");
const newFilms = document.querySelector("#new");
let api = "ae256541&";
searchBtn.addEventListener("click", (e) => {
  let searchValue = search.value;
  if (searchValue.length === 0) {
    search.className = "nothing_write";
    user.innerHTML = "Поле ввода пустое, введите название ! ";
    user.slyle.display = "none";
  } else search.classList.remove("nothing_write");

  fetch(`https://www.omdbapi.com/?t=${search.value}&apikey=${api}`)
    .then((response) => response.json())
    .then((movie) => {
      if (movie.Poster == undefined && searchValue.length !== 0) {
        user.innerHTML = `
                <div class="not_found">
                По вашему запросу " ${search.value} " ничего не найдено ! 
                </div>
                `;
      } else
        user.innerHTML = `
            <div><img src="${movie.Poster}"></div>
            <div class="about_film">
            <li><span class="bold">Title:</span> ${movie.Title}</li>
            <li><span class="bold">Year:</span> ${movie.Year}</li>
            <li><span class="bold">Rated:</span> ${movie.Rated}</li>
            <li><span class="bold">Released:</span> ${movie.Released}</li>
            <li><span class="bold">Runtime:</span> ${movie.Runtime}</li>
            <li><span class="bold">Actors:</span> ${movie.Actors}</li>
            <li><span class="bold">Director:</span> ${movie.Director}</li>
            </div>
            `;
      user.className = "result";
    });
  fetch(`https://www.omdbapi.com/?t=${search.value}&apikey=${api}`)
    .then((response) => response.json())
    .then((json) => json.Ratings)
    .then((rating) =>
      rating.forEach((element) => {
        let ul = document.createElement("ul");
        ul.className = "rating";
        ul.innerHTML = `
            
            <span class="bold"> <li>${element.Source}:</li></span>
            <li>${element.Value}</li>
            
            `;
        let about = document.querySelector(".about_film");
        about.append(ul);
      })
    );
});

newFilms.addEventListener("click", function () {
  fetch(`https://www.themoviedb.org/terms-of-use`)
    .then((response) => response.json())
    .then((mov) => console.log(mov));
});
