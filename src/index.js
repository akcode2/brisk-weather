const model = () => {
  // Secure this in prod
  const apiKey = "8dfac318e5d043b1af2192352230809";
  const baseURL = "https://api.weatherapi.com/v1";

  // Define paramaters
  const params = new URLSearchParams({
    key: apiKey,
    q: "auto:ip",
    days: 3,
  });

  // Construct the request URL
  const fullURL = `${baseURL}/forecast.json?${params.toString()}`;

  // Define the async function
  async function getWeather() {
    // First, fetch the data
    const response = await fetch(fullURL, { mode: "cors" });
    // Then return the JSON
    return response.json();
  }
  // Do the fetching
  getWeather().then((data) => {
    console.log(data);
  });
};
model();
