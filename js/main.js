var elList = document.querySelector(".list");

for (var i = 0; i < films.length; i++) {
  var newLi = document.createElement("li");
  newLi.setAttribute("class", "item");
  var newSpan = document.createElement("span");
  newSpan.setAttribute("class", "span");
  newSpan.textContent = films[i].id;
  var newHeading = document.createElement("h3");
  newHeading.setAttribute("class", "margin-bottom");
  newHeading.textContent = films[i].title;
  var newImg = document.createElement("img");
  newImg.setAttribute("class", "margin-bottom");
  newImg.setAttribute("src", films[i].poster);
  newImg.setAttribute("width", "150");
  newImg.setAttribute("height", "250");

  var newParagraph = document.createElement("p");
  newParagraph.setAttribute("class", "margin-bottom");
  newParagraph.textContent = films[i].overview;

  var newDateSpan = document.createElement("span");
  newDateSpan.setAttribute("class", "margin-bottom");
  // release date
  var releaseDate = new Date(films[i].release_date);
  var day = String(releaseDate.getDate()).padStart(2, "0");
  var month = String(releaseDate.getMonth() + 1).padStart(2, "0");
  var year = releaseDate.getFullYear();
  var showDay = day + "." + month + "." + year;
  newDateSpan.textContent = showDay;
  //
  var newSpanGenre = document.createElement("span");
  newSpanGenre.setAttribute("class", "bold");

  for (var j = 0; j < films[i].genres.length; j++) {
    var genreArray = films[i].genres;
    newSpanGenre.textContent = genreArray.join(", ");
  }

  newLi.appendChild(newSpan);
  newLi.appendChild(newHeading);
  newLi.appendChild(newImg);
  newLi.appendChild(newParagraph);
  newLi.appendChild(newDateSpan);
  newLi.appendChild(newSpanGenre);
  elList.appendChild(newLi);
}
