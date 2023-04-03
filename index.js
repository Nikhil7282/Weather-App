let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");

//Api Key
key="f7bcb4b0744051f61f67e30da5417b6b"

let getWeather = () => {
  let cityValue = cityRef.value;

  if (cityValue.length == 0) {
    result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
  }
  else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;

    cityRef.value = "";

    fetch(url)
      .then((resp) => {
        if(resp.ok){
          // console.log(resp.json())
          return resp.json()
        }
        else{
          `<h1>Error</h1>`
        }
      })
      .then((data) => {

        console.log(data);
        // console.log(data.weather[0].icon);
        // console.log(data.weather[0].main);
        // console.log(data.weather[0].description);
        // console.log(data.name);
        // console.log(data.main.temp_min);
        // console.log(data.main.temp_max);

        result.innerHTML = `
        <h2>${data.name}</h2>
        <h4 class="weather">${data.weather[0].main}</h4>
        <h4 class="desc">${data.weather[0].description}</h4>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <h1>${data.main.temp} &#176;</h1>
        <div class="temp-container">
            <div>
                <h4 class="title">min</h4>
                <h4 class="temp">${data.main.temp_min}&#176;</h4>
            </div>
            <div>
                <h4 class="title">max</h4>
                <h4 class="temp">${data.main.temp_max}&#176;</h4>
            </div>
        </div>
        `;
      })
      .catch(() => {
        result.innerHTML = `<h3 class="msg">City not found</h3>`;
      });
  }
};
searchBtn.addEventListener("click", getWeather);
cityRef.addEventListener("keydown",function(e){
  if(e.key =="Enter"){
    getWeather()
  }
})
window.addEventListener("load" ,getWeather);