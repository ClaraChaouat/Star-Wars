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

});