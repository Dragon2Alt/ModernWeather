function aboutUs() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
// Display username from localStorage
const userGreeting = document.getElementById('user-greeting');
const userData = localStorage.getItem('user');
if (userData) {
  const user = JSON.parse(userData);
  userGreeting.textContent = user.username;
} else {
  userGreeting.textContent = '';
}


// Weather API configuration
const apiKey = '312abfd953c970ceaf81f671079f6e22';
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const locationElement = document.querySelector('.location');
const temperatureElement = document.querySelector('.temperature');
const weatherIcon = document.querySelector('.icon img');
const dateTimeElement = document.querySelector('.date-time');
const humidityValue = document.getElementById('humidity-value');
const sunsetValue = document.getElementById('sunset-value');
const windValue = document.getElementById('wind-value');
const sunriseValue = document.getElementById('sunrise-value');
const tempValue = document.getElementById('temp-value');

// Function to format time from Unix timestamp
function formatTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'P.M' : 'A.M';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

// Function to format date
function formatDate() {
  const date = new Date();
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// Function to fetch weather data
async function getWeather(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    
    if (!response.ok) {
      throw new Error('City not found');
    }
    
    const data = await response.json();
    
    // Update UI with weather data
    locationElement.textContent = `${data.name} ${Math.round(data.main.temp)}°C`;
    temperatureElement.textContent = `Feels like ${Math.round(data.main.feels_like)}°`;
    
    
    // Update weather icon
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = data.weather[0].description;
    document.querySelector('.weather-info p').innerText = data.weather[0].description;
    
    
    // Update date and time
    const currentDate = formatDate();
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
    dateTimeElement.innerHTML = `${currentDate}<br />${currentTime}`;
    
    // Update stats
    humidityValue.textContent = `${data.main.humidity}%`;
    windValue.textContent = `${data.wind.speed} m/s`;
    tempValue.textContent = `${Math.round(data.main.temp)}°C`;
    
    // Convert sunrise and sunset times
    sunriseValue.textContent = formatTime(data.sys.sunrise);
    sunsetValue.textContent = formatTime(data.sys.sunset);
    
  } catch (error) {
    locationElement.textContent = 'City not found';
    console.error('Error fetching weather data:', error);
  }
}

// Event listener for search button
searchButton.addEventListener('click', () => {
  const city = searchInput.value.trim();
  if (city) {
    getWeather(city);
  }
});

// Event listener for Enter key
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const city = searchInput.value.trim();
    if (city) {
      getWeather(city);
    }
  }
});

// Load default city on page load
window.addEventListener('load', () => {
  getWeather('Romblon');
});