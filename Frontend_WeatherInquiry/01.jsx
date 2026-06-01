import { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  
  const [weather, setWeather] = useState(null);
  
  async function handleSearch() {
    
    //Send a request
    const res = await fetch(
      "https://geocoding-api.open-meteo.com/v1/search?name=" + city
    );
    
    //Convert the string to a JS object
    const data = await res.json();

    //Inside the data now
    //{
    //results: [...]
    //}
    //Take out the first result
    const firstResult = data.results[0];

    //Show the object from Console
    console.log(firstResult);

    //Finding the weather through both of the latitude and the longitude in API
    const latitude = firstResult.latitude;
    const longitude = firstResult.longitude;
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherRes.json();
    setWeather(weatherData.current_weather);
  }
  
  
  return (
    <div>
      <h1>Weather Inquiry</h1>

      <input
      placeholder="Please type the city"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={handleSearch} >Inquiry</button>

      //If weather exists → display the content after it.
      {weather && (
      <div>
        <p>Temperature: {weather.temperature}°C</p>
        <p>Wind Speed: {weather.windspeed}</p>
      </div>
      )}
    </div>
  );
}

export default App;
