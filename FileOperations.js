export function writeInTheFile(array) {
  const jsonData = JSON.stringify(array);
  fs.writeFile("./data/data.json", jsonData, "utf8", (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
  });
}

export function readFile() {
  return new Promise((resolve, reject) => {
    fs.readFile("./data/data.json", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        reject(err);
        return;
      }
      const catalog = JSON.parse(data);
      resolve(catalog);
    });
  });
}
