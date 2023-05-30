searchForm = document.querySelector('#search-form')
qInput = document.querySelector('#q') 
addedButton = document.querySelector('.added-city-button')
searchedEl = document.querySelector('#searched-city')
resultsContainer = document.querySelector('#results')

var handleSearch = function(event) {
    event.preventDefault();

    var q=qInput.value.trim()
    console.log (q)
    
    
    
    // searchedEl.textContent= q;

    var geoAPI= 'http://api.openweathermap.org/geo/1.0/direct?q=' + q + '&limit=1&appid=e7ef61c6ce67516bc22001eacd3518fd'
    var todayAPI = ""

    console.log(geoAPI)

    fetch(geoAPI)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var result = data[i];
                // console.log (result);
                var lat = data[i].lat;
                // console.log(lat);
                var lon = data[i].lon;
                // console.log(lon);
                var cityName = data[i].name;
                // console.log(cityName); 
                var todayAPI= 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon=' + lon +'&appid=e7ef61c6ce67516bc22001eacd3518fd&units=imperial' 
                console.log(todayAPI);
                
                           
            }
        return fetch(todayAPI)
        })
        .then(function(response){
            return response.json();

        })
        .then(function(data) {
            console.log(data.main.temp);
            var temp = data.main.temp;
            var humidity = data.main.humidity;
            var wind = data.wind.speed;
            var cityName = data.name;
            console.log(temp)
            console.log(humidity)
            console.log(wind)

            var cityHead = document.createElement('h3')
            var weatherList = document.createElement('ul')
            var displayTemp = document.createElement('li')
            var displayWind = document.createElement('li')
            var displayHumid= document.createElement('li')

            cityHead.className = 'card-header m-3';
            weatherList.className = '';
            displayHumid.className = 'list-group-item m-2 humidity-display';
            displayTemp.className = 'list-group-item m-2 temp-display';
            displayWind.className = 'list-group-item m-2 wind-display';

            cityHead.textContent = cityName + ' - Date + Emoji';
            displayTemp.textContent = 'Temp: ' + temp + ' °F';
            displayWind.textContent = "Wind Speed: " + wind + ' MPH';
            displayHumid.textContent = 'Humidity: ' + humidity + '%';
           
            resultsContainer.appendChild(cityHead);
            weatherList.appendChild(displayTemp);
            weatherList.appendChild(displayHumid);
            weatherList.appendChild(displayWind);
            resultsContainer.appendChild(weatherList);
            
            // searchedEl.textContent = cityName


        })
};




searchForm.addEventListener('submit', handleSearch)

