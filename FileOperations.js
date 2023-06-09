import fs from "fs";
const filePath = "./data/data.json";
export function readFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        reject(err);
        return;
      }
      let catalog;
      try {
        catalog = JSON.parse(data);
      } catch (error) {
        console.error("Please Try again");
        reject(error);
        return readFile();
      }
      resolve(catalog);
    });
  });
}

export async function writeInTheFile(array) {
  const jsonData = JSON.stringify(array);
  fs.writeFile(filePath, jsonData, "utf8", (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
  });
}
