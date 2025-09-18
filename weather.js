const apikey = "5ec6984a6dc669940087d0aa38e43f72";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherContainer = document.querySelector(".weather");
const errorContainer = document.querySelector(".error");
const feelsLike = document.querySelector(".feels-like");
const pressure = document.querySelector(".pressure");

searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkweather(searchBox.value);
    }
});

searchBtn.addEventListener("click", () => {
    checkweather(searchBox.value);
});

searchBtn.addEventListener("mousedown", () => {
    searchBtn.style.transform = "scale(0.95)";
});

searchBtn.addEventListener("mouseup", () => {
    searchBtn.style.transform = "";
});

searchBtn.addEventListener("mouseleave", () => {
    searchBtn.style.transform = "";
});

async function checkweather(city) {
    weatherContainer.style.display = "none";
    searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    
    const response = await fetch(apiURL + city + `&appid=${apikey}`);
    
    if(response.status == 404){
        errorContainer.style.display = "block";
        weatherContainer.style.display = "none";
        searchBtn.innerHTML = '<i class="fas fa-search"></i>';
    } else {
        let data = await response.json();
        console.log(data);
        
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        
        feelsLike.innerHTML = Math.round(data.main.feels_like) + "°C";
        pressure.innerHTML = data.main.pressure + " hPa";
        
        const iconElement = document.querySelector(".weather-icon i");
        const temp = data.main.temp;
        
        if (temp <= 0) {
            if (data.weather[0].main == "Snow") {
                iconElement.className = "fas fa-snowflake";
            } else if (data.weather[0].main == "Rain") {
                iconElement.className = "fas fa-cloud-showers-heavy ice-rain";
            } else {
                iconElement.className = "fas fa-icicles";
            }
        } 
        else if (data.weather[0].main == "Clouds") {
            iconElement.className = "fas fa-cloud";
        } else if (data.weather[0].main == "Clear") {
            iconElement.className = "fas fa-sun";
        } else if (data.weather[0].main == "Rain") {
            iconElement.className = "fas fa-cloud-rain";
        } else if (data.weather[0].main == "Drizzle") {
            iconElement.className = "fas fa-cloud-drizzle";
        } else if (data.weather[0].main == "Mist") {
            iconElement.className = "fas fa-smog";
        } else if (data.weather[0].main == "Snow") {
            iconElement.className = "fas fa-snowflake";
        } else if (data.weather[0].main == "Thunderstorm") {
            iconElement.className = "fas fa-bolt";
        } else {
            iconElement.className = "fas fa-cloud-sun";
        }
                changeBackground(data.main.temp);
        
        errorContainer.style.display = "none";
        weatherContainer.style.display = "block";
        searchBtn.innerHTML = '<i class="fas fa-search"></i>';
    }
}

function changeBackground(temp) {
    const body = document.body;
    
    if (temp < 0) {
        body.style.background = "linear-gradient(135deg, #0c2461, #1e3799, #4a69bd)";
    } else if (temp < 10) {
        body.style.background = "linear-gradient(135deg, #0f2027, #203a43, #2c5364)";
    } else if (temp < 20) {
        body.style.background = "linear-gradient(135deg, #5614b0, #dbd65c)";
    } else if (temp < 30) {
        body.style.background = "linear-gradient(135deg, #f46b45, #eea849)";
    } else {
        body.style.background = "linear-gradient(135deg, #ff4b1f, #ff9068)";
    }
}
checkweather("Karachi");