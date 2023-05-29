import Prompt from "prompt-sync";
import { readFile } from "./FileOperations.js";
import { addMovie, updateMovie, deleteMovie } from "./MoviesOperations.js";

let input = Prompt();

const firstScreen = () => {
  console.log("-----------------------");
  console.log("Welcome to Movie Catalog");
  console.log("-----------------------");
  console.log("Please select an option:");
  console.log("1. View Movie Catalog");
  console.log("2. Add a Movie");
  console.log("3. Update a Movie");
  console.log("4. Delete a Movie");
  console.log("Anything else to exit.");
  console.log("-----------------------");
  let option = input("Option: ");
  return option;
};

function handleMovieInput() {
  const id = Math.floor(Math.random() * 1000) + 10;
  const title = input("Enter Movie title : ");
  const director = input("Enter Movie director : ");
  const genre = input("Enter Movie genre : ");
  const releaseYear = input("Enter Movie release year : ");
  const movie = {
    id,
    title,
    director,
    genre,
    releaseYear,
  };
  return movie;
}

function viewCatalog(catalog) {
  catalog.forEach((movie) => {
    console.log("-----------------------");
    console.log("Movie Id: " + movie.id);
    console.log("Movie Name: " + movie.title);
    console.log("Movie Year: " + movie.releaseYear);
    console.log("Movie Genre: " + movie.genre);
    console.log("Movie Director: " + movie.director);
  });
}

async function main() {
  while (true) {
    let option = firstScreen();
    switch (option) {
      case "1":
        const catalog = await readFile();
        viewCatalog(catalog);
        break;
      case "2":
        const movie = handleMovieInput();
        await addMovie(movie);
        break;
      case "3":
        await updateMovie();
        break;
      case "4":
        await deleteMovie();
        break;
      default:
        return;
    }
  }
}

main();
