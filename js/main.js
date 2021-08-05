const elMovieList = selectElement(".movies__list");
const elMovieTemplate = selectElement(".movie__template").content;

// Form elements
const elForm = selectElement(".movies__form");
const elMoviesInput = selectElement(".movies__form__input", elForm);
const elSelectGenres = selectElement(".movies__form__select", elForm);
const elSelectSort = selectElement(".sort-films", elForm);

// Rendering genres

function renderGenres(filmArr, element) {
  const result = [];
  filmArr.forEach((film) => {
    film.genres.forEach((genre) => {
      if (!result.includes(genre)) {
        result.push(genre);
      }
    });
  });

  result.forEach((genre) => {
    const newOption = createDOM("option");
    newOption.value = genre;
    newOption.textContent = genre;

    element.appendChild(newOption);
  });
}

renderGenres(films, elSelectGenres);

// rendering by genres

// Rendering films
function filmRender(filmArr, element) {
  element.innerHTML = null;
  filmArr.forEach((film) => {
    const movieTemplate = elMovieTemplate.cloneNode(true);

    selectElement(".movies__img", movieTemplate).setAttribute(
      "src",
      film.poster
    );
    selectElement(".movies__img", movieTemplate).setAttribute(
      "alt",
      film.title
    );

    selectElement(".movies__heading", movieTemplate).textContent = film.title;
    selectElement(".movies__paragraph-description", movieTemplate).textContent =
      film.overview.split(" ").slice(0, 20).join(" ") + " ...";

    selectElement(".movies__time", movieTemplate).textContent = normalizeDate(
      film.release_date
    );
    selectElement(".movies__time", movieTemplate).setAttribute(
      "datetime",
      normalizeDate(film.release_date)
    );

    const genreList = selectElement(".movies__genres-list", movieTemplate);
    genreList.innerHTML = null;

    film.genres.forEach((genre) => {
      const newLi = createDOM("li");
      newLi.textContent = genre;
      genreList.appendChild(newLi);
    });

    element.appendChild(movieTemplate);
  });
}

filmRender(films, elMovieList);

function sortFilms(filmArr, format) {
  const sortedAlph = filmArr.sort((a, b) => {
    if (a.title > b.title) {
      return 1;
    } else if (a.title < b.title) {
      return -1;
    } else {
      return 0;
    }
  });

  const sortedDate = filmArr.sort((a, b) => a.release_date - b.release_date);

  if (format === "a_z") {
    return sortedAlph;
  } else if (format === "z_a") {
    return sortedAlph.reverse();
  } else if (format === "old_new") {
    return sortedDate;
  } else if (format === "new_old") {
    return sortedDate.reverse();
  }
}

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const moviesInput = elMoviesInput.value.trim();
  const regex = new RegExp(moviesInput, "gi");
  const searchedFilms = films.filter((film) => film.title.match(regex));
  const selectGenre = elSelectGenres.value.trim();
  const selectSort = elSelectSort.value.trim();

  let genredFilms = [];

  if (selectGenre === "All") {
    genredFilms = searchedFilms;
  } else {
    genredFilms = searchedFilms.filter((film) =>
      film.genres.includes(selectGenre)
    );
  }

  const sortedFilms = sortFilms(genredFilms, selectSort);

  filmRender(sortedFilms, elMovieList);
});
