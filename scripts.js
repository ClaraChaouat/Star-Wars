//Fetching the movie title from the API
fetch("https://swapi.dev/api/films")
  .then((res) => res.json())
  .then((data) => {
    console.log(data.results);
    const ulToc = document.getElementById("movie-results");
    data.results.forEach(function (item) {
      const li = document.createElement("li");
      li.className = "movie js-movie";
      li.setAttribute("id", `${item.episode_id}`);
      li.innerText = item.title;
      ulToc.append(li);
    });

    // Defining variables to query the required movie details to be inserted in the html
    const movieTitle = document.querySelector("[data-id=movie-title]");
    const movieProducer = document.querySelector("[data-id=movie-producer]");
    const movieDirector = document.querySelector("[data-id=movie-director]");
    const movieReleaseDate = document.querySelector(
      "[data-id=movie-release-date]"
    );

    const movieButtonFavorite = document.querySelector(
      "[data-id=movie-favorite]"
    );
    const movieFavoriteStar = document.querySelector("[data-id=movie-star]");
    let movieId;

    // Function to define the actions when clicking the button
    const handleClick = () => {
      movieFavoriteStar.classList.toggle("hidden");
      if (movieButtonFavorite.innerText == "remove") {
        movieButtonFavorite.innerText = "favorite";
        localStorage.removeItem(String(movieId));
      } else {
        movieButtonFavorite.innerText = "remove";
        localStorage.setItem(movieId, true);
      }
    };

    //Fetching the required movie details
    Array.from(document.getElementsByClassName("js-movie")).forEach((el) => {
      el.addEventListener("click", (event) => {
        console.log(event);
        movieId = el.id;
        fetch(`https://swapi.dev/api/films/${movieId}`)
          .then((res) => res.json())
          .then((data) => {
            const isFavorite = localStorage.getItem(movieId);
            console.log(isFavorite);
            console.log(data);
            console.log(data.title);
            movieTitle.innerText = data.title;
            movieProducer.innerText = data.producer;
            movieDirector.innerText = data.director;
            movieReleaseDate.innerText = data.release_date;

            movieFavoriteStar.src = "images/star-regular.svg";
            movieFavoriteStar.setAttribute("id", "star");
            movieFavoriteStar.className = "star-img";

            //Changing the text on the button depending the "movie status (favorite or not)"
            const changingButtonText = () => {
              movieButtonFavorite.classList.remove("hidden");
              if (isFavorite == "true") {
                movieButtonFavorite.innerText = "remove";
              } else {
                movieFavoriteStar.className = "hidden";
                movieButtonFavorite.innerText = "favorite";
              }
            };

            changingButtonText();

            movieButtonFavorite.removeEventListener("click", handleClick);
            movieButtonFavorite.addEventListener("click", handleClick);
          });
      });
    });
  });
