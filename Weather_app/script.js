const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const forecast = document.getElementById('fore');
const vid = document.getElementById('vid');

const apikey = "3265874a2c77ae4a04bb96236a642d2f";
const url = (location) => `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`;

async function getWeatherByLocation(location) {
    const resp = await fetch(url(location), {
      origin: "cors"});
    const respData = await resp.json();
    console.log(respData);
    addWeatherToPage(respData);
    addForecastToPage(respData);
    console.log(respData.weather[0].main);

}


function KtoC(K) {
  return Math.floor(K - 273.15);
}

function addForecastToPage(data) {
  const humidity = data.main.humidity;
  const pressure = data.main.pressure;

  const humid = document.getElementById('humidity');
  humid.innerHTML = `
          <h2>${humidity}%</h2>
          <h3>Humidity</h3>
  `;

  const pres = document.getElementById('pressure');
  pres.innerHTML = `
        <h2>${pressure}kPa</h2>
        <h3>Air Pressure</h3>
  `;
}

function addWeatherToPage(data) {
  const temp = KtoC(data.main.temp);

  const weather = document.createElement('div');
  weather.classList.add('weather');
  //image = '';
  //if(data.weather[0].main == "Haze"){
    //  image = "haze.png";
  //}
  //else {
  //image = "https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png";
  //}
  weather.innerHTML = `
      <h3>${search.value}</h3>
      <h1>${temp}<p class="deg">°C</p></h1>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png";/>
      <h2>${data.weather[0].main}</h2>
  `;
  main.innerHTML = "";
  main.appendChild(weather);

  val ='';
  if (data.weather[0].main == "Haze"){
        val = "Haze.mp4";
  }
  else if (data.weather[0].main == "Clouds"){
        val = "clouds.mp4";
  }
  else if (data.weather[0].main == "Clear"){
        val = "clear.mp4";
  }
  else if (data.weather[0].main == "Rain"){
        val = "rain.mp4";
  }
  else{
    val = "Haze.mp4";
  }
  const video = document.createElement('div');
  video.classList.add('video');

  video.innerHTML = `
      <video src = ${val} muted loop autoplay></video>
  `;
  vid.appendChild(video);
}

form.addEventListener("submit", (e) => {
      e.preventDefault();

      const location = search.value;
      if(location) {
        getWeatherByLocation(location)
      }
});
