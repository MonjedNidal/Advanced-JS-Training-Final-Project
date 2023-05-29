import fetch from "node-fetch";
import { addMovie } from "./MoviesManagement.js";
import { printMovie } from "./Main.js";
import Prompt from "prompt-sync";
const input = Prompt();

export async function fetchData(title) {
  const apiKey = "8bbd35c6";
  let url = `http://www.omdbapi.com/?apikey=${apiKey}`;

  if (title) {
    url += `&t=${title}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  if (data.Error) {
    throw "Movie not found!";
  }
  return data;
}

async function ifToSave(movie) {
  const saveAns = input("Enter 1 to save the movie : ");
  if (saveAns == 1) {
    await addMovie(movie);
  }
}

export async function handleApiSearch() {
  try {
    const title = input("Enter Movie title : ");
    const response = await fetchData(title);
    const movie = {
      id: Math.floor(Math.random() * 1000) + 10,
      title: response.Title,
      releaseYear: response.Year,
      genre: response.Genre,
      director: response.Director,
    };
    if (movie) {
      printMovie(movie);
    } else {
      console.log("Movie not found");
    }
    await ifToSave(movie);
  } catch (error) {
    console.log(error);
  }
}
