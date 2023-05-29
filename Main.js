import Prompt from "prompt-sync";
import fs from "fs";
import { writeInTheFile, readFile } from "./FileOperations";
let input = Prompt();

// ----------------------

// TODO - Display Movie Catalog: Read movie data from a JSON file and display a list of movies in the catalog.

const firstScreen = () => {
  console.log("-----------------------");
  console.log("Welcome to Movie Catalog");
  console.log("-----------------------");
  console.log("Please select an option:");
  console.log("1. View Movie Catalog");
  console.log("2. Add a Movie");
  console.log("3. Update a Movie");
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

async function addMovie(movie) {
  try {
    const catalog = await readFile();
    catalog.push(movie);
    writeInTheFile(catalog);
    console.log("-----------------------");
    console.log("The movie added successfully");
  } catch (error) {
    console.log(error);
  }
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

async function updateMovie() {
  try {
    const id = input("Enter movie id : ");
    const catalog = await readFile();
    const movie = catalog.find((movie) => movie.id == id);
    if (movie) {
      movie.title = input("Enter new title : ");
      movie.director = input("Enter new director : ");
      movie.genre = input("Enter new genre : ");
      movie.releaseYear = input("Enter new release year : ");
    }
    writeInTheFile(catalog);
    console.log("Movie updated successfully");
  } catch (error) {
    console.log(error);
  }
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
      default:
        return;
    }
  }
}

main();
