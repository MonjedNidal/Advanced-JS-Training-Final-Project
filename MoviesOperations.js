import { writeInTheFile, readFile } from "./FileOperations.js";
import Prompt from "prompt-sync";
const input = Prompt();

export async function addMovie(movie) {
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

export async function updateMovie() {
  try {
    const id = input("Enter movie id : ");
    const catalog = await readFile();
    const movie = catalog.find((movie) => movie.id == id);
    if (movie) {
      movie.title = input("Enter new title : ");
      movie.director = input("Enter new director : ");
      movie.genre = input("Enter new genre : ");
      movie.releaseYear = input("Enter new release year : ");
    } else {
      console.log("Movie not found");
    }
    writeInTheFile(catalog);
    console.log("Movie updated successfully");
  } catch (error) {
    console.log(error);
  }
}

export async function deleteMovie() {
  try {
    const id = parseInt(input("Enter movie id : "));
    const catalog = await readFile();
    const catalogCopy = catalog.filter((movie) => movie.id !== id);
    if (catalogCopy.length === catalog.length) {
      console.log("Movie not found");
    } else {
      writeInTheFile(catalogCopy);
      console.log("Movie deleted successfully");
    }
  } catch (error) {
    console.log(error);
  }
}
