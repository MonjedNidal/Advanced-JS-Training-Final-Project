

async function fetchData() {
  const apiKey = "8bbd35c6";
  const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=Batman`;

  const response = fetch(url);
  const data = await response.json();

  console.log(data);
}
fetchData();
