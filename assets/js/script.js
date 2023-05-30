searchForm = document.querySelector('#search-form')
qInput = document.querySelector('#q') 
addedButton = document.querySelector('.added-city-button')
searchedEl = document.querySelector('#searched-city')
resultsContainer = document.querySelector('#results')
fiveDayContainer = document.querySelector('#fiveDayContainer')
var handleSearch = function(event) {
    event.preventDefault();
    resultsContainer.innerHTML = null;

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
            var date = data.dt*1000;
            var formattedDate = dayjs(date).format("MMM D");
            // var weatherIcon = weather.icon
            var lon = data.coord.lon;
            var lat = data.coord.lat;
            var fivedayAPI = 'https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid=e7ef61c6ce67516bc22001eacd3518fd&units=imperial'
            console.log(fivedayAPI)
            // console.log(temp);
            // console.log(humidity);
            // console.log(wind);
            // console.log(lon, lat)

            var cityHead = document.createElement('h3');
            var weatherList = document.createElement('ul');
            var displayTemp = document.createElement('li');
            var displayWind = document.createElement('li');
            var displayHumid= document.createElement('li');

            cityHead.className = 'card-header m-3';
            weatherList.className = '';
            displayHumid.className = 'list-group-item m-2 humidity-display';
            displayTemp.className = 'list-group-item m-2 temp-display';
            displayWind.className = 'list-group-item m-2 wind-display';

            cityHead.textContent = cityName + ' - '+ formattedDate;
            //figure out weather icon
            displayTemp.textContent = 'Temp: ' + temp + ' °F';
            displayWind.textContent = "Wind Speed: " + wind + ' MPH';
            displayHumid.textContent = 'Humidity: ' + humidity + '%';
           
            resultsContainer.appendChild(cityHead);
            weatherList.appendChild(displayTemp);
            weatherList.appendChild(displayHumid);
            weatherList.appendChild(displayWind);
            resultsContainer.appendChild(weatherList);
            
            // searchedEl.textContent = cityName

            return fetch(fivedayAPI)
        })
        .then(function(response){
            return response.json();

        })
        .then(function(data){
            console.log(data.list);
            for (var i = 0; i < data.list.length; i+=8) {
                console.log(data.list[i])
                var date = data.list[i].dt * 1000
                var formattedDate = dayjs(date).format("MMM D")
                console.log (formattedDate)
                var temp = data.list[i].main.temp;
                var humid = data.list[i].main.humidity;
                var wind = data.list[i].wind.speed;
                console.log (temp , humid , wind)

                // var header = document.createElement('h3');
                var cardEl = document.createElement('div');
                var cardHead= document.createElement('div')
                var ulEl = document.createElement('ul')
                var displayTemp = document.createElement('li');
                var displayWind = document.createElement('li');
                var displayHumid= document.createElement('li');

                // header.className = 'h3';
                cardEl.className = 'col-3 col-xl card m-2  fivedayCard';
                cardEl.setAttribute('style', 'width: 18rem;' )
                cardHead.className = 'card-header fivedayDate'
                ulEl.className = 'list-group list-group-flush'
                displayTemp.className = 'list-group-item fivedayTemp'
                displayWind.className = 'list-group-item fivedayWind'
                displayHumid.className = 'list-group-item fivedayHumidity'

                // header.textContent = "5 - Day Forecast"
                cardHead.textContent = formattedDate
                displayTemp.textContent = 'Temp: ' + temp + ' °F';
                displayWind.textContent = "Wind Speed: " + wind + ' MPH';
                displayHumid.textContent = 'Humidity: ' + humid + '%';
                
                fiveDayContainer.appendChild(cardEl);
                ulEl.appendChild(displayTemp);
                ulEl.appendChild(displayWind);
                ulEl.appendChild(displayHumid);

                cardEl.appendChild(cardHead);
                cardEl.appendChild(ulEl);
                
    
            }


        })
};




searchForm.addEventListener('submit', handleSearch)

