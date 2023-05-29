import { writeInTheFile, readFile } from "./FileOperations.js";
import { printMovie } from "./Main.js";
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

export async function viewCatalog(catalog) {
  catalog.forEach((movie) => {
    printMovie(movie);
  });
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

export async function searchCatalog() {
  console.log("Please select an option:");
  console.log("1. Search by Title");
  console.log("2. Search by Director");
  console.log("3. Search by Genre");
  console.log("4. Search by Year");
  console.log("Anything else to cancel.");
  const searchType = input("Option : ");

  const catalog = await readFile();
  switch (searchType) {
    case "1":
      const title = input("Enter Movie title : ");
      const result1 = catalog.filter((movie) => {
        return (
          movie.title.includes(title.toLowerCase()) ||
          movie.title.includes(title.toUpperCase())
        );
      });
      if (result1) {
        console.log("-----------------------");

        console.log("Search Result");
        viewCatalog(result1);
      } else {
        console.log("No Movies found");
      }
      break;
    case "2":
      const director = input("Enter Movie director : ");
      const result2 = catalog.filter((movie) => {
        return (
          movie.director.includes(director.toLowerCase()) ||
          movie.director.includes(director.toUpperCase())
        );
      });
      if (result2) {
        console.log("-----------------------");

        console.log("Search Result");
        viewCatalog(result2);
      } else {
        console.log("No Movies found");
      }
      break;
    case "3":
      const genre = input("Enter Movie genre : ");
      const result3 = catalog.filter((movie) => {
        return (
          movie.genre.includes(genre.toLowerCase()) ||
          movie.genre.includes(genre.toUpperCase())
        );
      });
      if (result3) {
        console.log("-----------------------");

        console.log("Search Result");

        viewCatalog(result3);
      } else {
        console.log("No Movies found");
      }
      break;
    case "4":
      const year = input("Enter Movie year : ");
      const result4 = catalog.filter((movie) => {
        return movie.year == year;
      });
      if (result4) {
        console.log("-----------------------");
        console.log("Search Result");
        viewCatalog(result4);
      } else {
        console.log("No Movies found");
      }
    default:
      break;
  }
}
