import { getHours, format } from 'date-fns'

const model = (location) => {
  // Secure this in prod
  const apiKey = "8dfac318e5d043b1af2192352230809";
  const baseURL = "https://api.weatherapi.com/v1";
  const dataLocation = location ? location : "auto:ip";

  // Define paramaters
  const params = new URLSearchParams({
    key: apiKey,
    q: dataLocation,
    days: 3,
    aqi: 'yes'
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

  return getWeather();
};

const view = (model) => {
    // Get DOM objects
    const localTime = document.getElementById('time');
    const temp = document.getElementById('temp');
    const feelsLike = document.getElementById('tempFeels');
    const conditionCode = model.current.condition.code;
    const conditionText = document.getElementById('conditionText');
    const humidity = document.getElementById('humidity');
    const chanceOfRain = document.getElementById('chanceOfRain');
    const uvIndex = document.getElementById('uvIndex');
    const uvAction = document.getElementById('uvAction');
    const airQuality = document.getElementById('airQuality');
    const airAction = document.getElementById('airAction');
    const forecast = document.getElementById('forecast');

    const uvScale = {
        '1' : {'exposure': 'Low', 'action': 'Wear SPF 15. You can safely enjoy being outside!'},
        '2' : {'exposure': 'Low', 'action': 'Wear SPF 15. You can safely enjoy being outside!'},
        '3' : {'exposure': 'Moderate', 'action': 'Wear SPF 30 and protective clothing. Seek shade during midday hours.'},
        '4' : {'exposure': 'Moderate', 'action': 'Wear SPF 30 and protective clothing. Seek shade during midday hours.'},
        '5' : {'exposure': 'Moderate', 'action': 'Wear SPF 30 and protective clothing. Seek shade during midday hours.'},
        '6' : {'exposure': 'High', 'action': 'Wear SPF 30. Protection against sun damage is needed. Seek shade during midday hours.'},
        '7' : {'exposure': 'High', 'action': 'Wear SPF 30. Protection against sun damage is needed. Seek shade during midday hours.'},
        '8' : {'exposure': 'Very High', 'action': 'Protection against sun damage is a must. Take steps to reduce sun exposure between 10 AM - 4 PM.'},
        '9' : {'exposure': 'Very High', 'action': 'Protection against sun damage is a must. Take steps to reduce sun exposure between 10 AM - 4 PM.'},
        '10' : {'exposure': 'Very High', 'action': 'Protection against sun damage is a must. Take steps to reduce sun exposure between 10 AM - 4 PM.'},
        '11' : {'exposure': 'Extreme', 'action': 'Protection against sun damage is a must. Take steps to reduce sun exposure between 10 AM - 4 PM.'},
    };

    const aqiScale = {
        '1' : {'level' : 'Good', 'implications' : 'Air quality is considered satisfactory, and air pollution poses little or no risk'},
        '2' : {'level' : 'Moderate','implications' : 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.'},
        '3' : {'level' : 'Unhealthy for sensitive groups', 'implications': 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.'},
        '4' : {'level' : 'Unhealthy', 'implications' : 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects'},
        '5' : {'level' : 'Very unhealthy', 'implications' : 'Health warnings of emergency conditions. The entire population is more likely to be affected.'},
        '6' : {'level' : 'Hazardous', 'implications' : 'Health alert: everyone may experience more serious health effects'}
    }

    const conditionsByCode = {
            1000: {
              "day": "Sunny",
              "night": "Clear",
              "icon": './images/clear-day.svg'
            },
            1003: {
              "day": "Partly cloudy",
              "night": "Partly cloudy",
              "icon": './images/partly-cloudy-day.svg'
            },
            1006: {
              "day": "Cloudy",
              "night": "Cloudy",
              "icon": './images/cloudy.svg'
            },
            1009: {
              "day": "Overcast",
              "night": "Overcast",
              "icon": './images/overcast-day.svg'
            },
            1030 : {
              "day": "Mist",
              "night": "Mist",
              "icon": './images/mist.svg'
            },
            1063: {
              "day": "Patchy rain possible",
              "night": "Patchy rain possible",
              "icon": './images/partly-cloudy-day-rain.svg'
            },
            1066: {
              "day": "Patchy snow possible",
              "night": "Patchy snow possible",
              "icon": './images/partly-cloudy-snow.svg'
            },
            1069: {
              "day": "Patchy sleet possible",
              "night": "Patchy sleet possible",
              "icon": './images/partly-cloudy-sleet.svg'
            },
            1072: {
              "day": "Patchy freezing drizzle possible",
              "night": "Patchy freezing drizzle possible",
              "icon": './images/partly-cloudy-sleet.svg'
            },
            1087: {
              "day": "Thundery outbreaks possible",
              "night": "Thundery outbreaks possible",
              "icon": './images/thunderstorms-day-rain.svg'
            },
            1114: {
              "day": "Blowing snow",
              "night": "Blowing snow",
              "icon": './images/snow.svg'
            },
            1117: {

              "day": "Blizzard",
              "night": "Blizzard",
              "icon": './images/thunderstorms-snow.svg'
            },
            1135: {
              "day": "Fog",
              "night": "Fog",
              "icon": './images/fog.svg'
            },
            1147: {
              "day": "Freezing fog",
              "night": "Freezing fog",
              "icon": './images/fog.svg'
            },
            1150: {
              "day": "Patchy light drizzle",
              "night": "Patchy light drizzle",
              "icon": './images/partly-cloudy-day-drizzle.svg'
            },
            1153: {
              "day": "Light drizzle",
              "night": "Light drizzle",
              "icon": './images/drizzle.svg'
            },
            1168: {
              "day": "Freezing drizzle",
              "night": "Freezing drizzle",
              "icon": './images/drizzle.svg'
            },
            1171: {

              "day": "Heavy freezing drizzle",
              "night": "Heavy freezing drizzle",
              "icon": './images/drizzle.svg'
            },
            1180: {
              "day": "Patchy light rain",
              "night": "Patchy light rain",
              "icon": './images/partly-cloudy-day-rain.svg'
            },
            1183: {
              "day": "Light rain",
              "night": "Light rain",
              "icon": './images/drizzle.svg'
            },
            1186: {
              "day": "Moderate rain at times",
              "night": "Moderate rain at times",
              "icon": './images/rain.svg'
            },
            1189: {
              "day": "Moderate rain",
              "night": "Moderate rain",
              "icon": './images/rain.svg'
            },
            1192: {
              "day": "Heavy rain at times",
              "night": "Heavy rain at times",
              "icon": './images/thunderstorms-rain.svg'
            },
            1195: {
              "day": "Heavy rain",
              "night": "Heavy rain",
              "icon": './images/thunderstorms-rain.svg'
            },
            1198: {
              "day": "Light freezing rain",
              "night": "Light freezing rain",
              "icon": './images/sleet.svg'
            },
            1201: {
              "day": "Moderate or heavy freezing rain",
              "night": "Moderate or heavy freezing rain",
              "icon": './images/sleet.svg'
            },
            1204: {
              "day": "Light sleet",
              "night": "Light sleet",
              "icon": './images/sleet.svg'
            },
            1207: {
              "day": "Moderate or heavy sleet",
              "night": "Moderate or heavy sleet",
              "icon": './images/sleet.svg'
            },
            1210: {
              "day": "Patchy light snow",
              "night": "Patchy light snow",
              "icon": 323
            },
            1213: {
              "day": "Light snow",
              "night": "Light snow",
              "icon": './images/partly-cloudy-day-snow.svg'
            },
            1216: {
              "day": "Patchy moderate snow",
              "night": "Patchy moderate snow",
              "icon": './images/partly-cloudy-day-snow.svg'
            },
            1219: {
              "day": "Moderate snow",
              "night": "Moderate snow",
              "icon": './images/snow.svg'
            },
            1222: {
              "day": "Patchy heavy snow",
              "night": "Patchy heavy snow",
              "icon": './images/snow.svg'
            },
            1225: {
              "day": "Heavy snow",
              "night": "Heavy snow",
              "icon": './images/snow.svg'
            },
            1237: {
              "day": "Ice pellets",
              "night": "Ice pellets",
              "icon": './images/hail.svg'
            },
            1240: {
              "day": "Light rain shower",
              "night": "Light rain shower",
              "icon": './images/rain.svg'
            },
            1243: {
              "day": "Moderate or heavy rain shower",
              "night": "Moderate or heavy rain shower",
              "icon": './images/rain.svg'
            },
            1246: {
              "day": "Torrential rain shower",
              "night": "Torrential rain shower",
              "icon": './images/rain.svg'
            },
            1249: {
              "day": "Light sleet showers",
              "night": "Light sleet showers",
              "icon": './images/sleet.svg'
            },
            1252: {
              "day": "Moderate or heavy sleet showers",
              "night": "Moderate or heavy sleet showers",
              "icon": './images/sleet.svg'
            },
            1255: {
              "day": "Light snow showers",
              "night": "Light snow showers",
              "icon": './images/snow.svg'
            },
            1258: {
              "day": "Moderate or heavy snow showers",
              "night": "Moderate or heavy snow showers",
              "icon": './images/snow.svg'
            },
            1261: {
              "day": "Light showers of ice pellets",
              "night": "Light showers of ice pellets",
              "icon": './images/sleet.svg'
            },
            1264: {
              "day": "Moderate or heavy showers of ice pellets",
              "night": "Moderate or heavy showers of ice pellets",
              "icon": './images/sleet.svg'
            },
            1273: {
              "day": "Patchy light rain with thunder",
              "night": "Patchy light rain with thunder",
              "icon": './images/thunderstorms-day-rain.svg'
            },
            1276: {
              "day": "Moderate or heavy rain with thunder",
              "night": "Moderate or heavy rain with thunder",
              "icon": './images/thunderstorms-day-rain.svg'
            },
            1279: {
              "day": "Patchy light snow with thunder",
              "night": "Patchy light snow with thunder",
              "icon": './images/thunderstorms-day-snow.svg'
            },
            1282: {
              "day": "Moderate or heavy snow with thunder",
              "night": "Moderate or heavy snow with thunder",
              "icon": './images/thunderstorms-day-snow.svg'
            }
    }

    // new Date() expects time in milliseconds (numerical, not string)
    // so we multiply by 1000, pass this to format, and finally update the localTime span
    localTime.textContent = (format(new Date(model.location.localtime_epoch * 1000), 'EEEE, MMM do'));
    // Set condition text
    conditionText.textContent = model.current.condition.text;
    // Set current temperature
    temp.textContent = `${Math.round(model.current.temp_f)}°`;
    // Set Feels Like temperature
    feelsLike.textContent = `${Math.round(model.current.feelslike_f)}°`;
    // Set humidity
    humidity.textContent = `${model.current.humidity}%`;
    // Set chance of rain
    chanceOfRain.textContent = `${model.forecast.forecastday[0].day.daily_chance_of_rain}%`;
    // Set UV Index
    uvIndex.textContent = `${model.current.uv} ${uvScale[model.current.uv].exposure}`;
    // Set UV Action
    uvAction.textContent = `${uvScale[model.current.uv].action}`;
    // Set Air Quality Index
    airQuality.textContent = `${model.current.air_quality["us-epa-index"]} ${aqiScale[model.current.air_quality["us-epa-index"]].level}`
    airAction.textContent = `${aqiScale[model.current.air_quality["us-epa-index"]].implications}`;

    // Clear any previous forecast divs
    forecast.textContent = '';

    // Create hourly forecast divs
    // The array is zero-indexed so the current hour integer
    // actually represents the next hour's index
    const hourIndex = getHours(new Date());
    for (let i = hourIndex; i < 24; i++) {
        const hour = model.forecast.forecastday[0].hour[i];

        const hourDiv = document.createElement('div');
        hourDiv.classList.add('hour');

        const hourlyTime = document.createElement('div');
        hourlyTime.classList.add('hourlyTime');

        const hourlyTemp = document.createElement('div');
        hourlyTemp.classList.add('hourlyTemp');

        const hourlyImg = document.createElement('img');
        hourlyImg.classList.add('hourlyImg');

        const hourlyChance = document.createElement('div');
        hourlyChance.classList.add('hourlyChance');

        if (i === hourIndex) {
            hourlyTime.textContent = 'Now';
        }
        else {
            hourlyTime.textContent = format(new Date(hour.time_epoch * 1000), 'haaa');
        }

        hourlyTemp.textContent = `${Math.round(hour.temp_f)}°`;
        hourlyImg.src = conditionsByCode[hour.condition.code].icon;
        hourlyChance.textContent = `${hour.chance_of_rain}%`;

        hourDiv.append(hourlyTime, hourlyTemp, hourlyImg, hourlyChance);
        forecast.append(hourDiv);
    }
}      

const controller = async () => {
    // Call model() and when the promise is resolved, assign
    // the result to weatherData
    const weatherData = await model();

    // Call view() and pass in weatherData
    view(weatherData);
    console.log(weatherData);

    // Get input field
    const searchForm = document.getElementById('searchForm');
    const searchBox = document.getElementById('searchBox');
    searchBox.value = weatherData.location.name;

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const newLocationData = await model(searchBox.value);
        view(newLocationData);
    })
}


controller();