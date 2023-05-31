var searchForm = document.querySelector('#search-form')
var qInput = document.querySelector('#q') 
var addedButton = document.querySelector('.added-city-button')
var searchedEl = document.querySelector('#searched-city')
var resultsContainer = document.querySelector('#results')
var fiveDayContainer = document.querySelector('#fiveDayContainer')
var searchHistory = document.querySelector('#search-history')
var searchArray=[]
var forcastHeader = document.querySelectorAll('.h3')

//brings in the buttons from local storage
startUp = function(){
    searchArray = JSON.parse(localStorage.getItem("SearchedCities")) || [];
    console.log(searchArray)
    for (var i = 0; i < searchArray.length; i++){
        addedButton = document.createElement('button')
        addedButton.className = 'btn btn-secondary m-2 added-city-button mb-3';
        addedButton.setAttribute('data', searchArray[i]);
        addedButton.setAttribute('type', 'click' )
        addedButton.textContent=searchArray[i];
        searchHistory.appendChild(addedButton) 
    }

}
//creates an input value for the search and creates the button
var handleSearchSubmit = function(event){
    
    event.preventDefault();
    var city = qInput.value.trim();
    console.log(city);
    handleSearch(city);
    if(!city){
        alert("Please enter a city")
        return
    } else {
    addedButton = document.createElement('button')
    addedButton.className = 'btn btn-secondary m-2 added-city-button mb-3 '+ city;
    addedButton.setAttribute('type', 'click' )
    addedButton.setAttribute('data', city);
    addedButton.textContent=city;
    searchHistory.appendChild(addedButton)
    searchArray.push(city)
    localStorage.setItem("SearchedCities", JSON.stringify(searchArray));} 
}
//Find the city information and displays it
handleSearch = function(city) {
    resultsContainer.innerHTML = null;
    fiveDayContainer.innerHTML = null;
    var q=city
    var geoAPI= 'https://api.openweathermap.org/geo/1.0/direct?q=' + q +',840&limit=1&appid=e7ef61c6ce67516bc22001eacd3518fd'
    fetch(geoAPI)
        .then(function(response) {
            
            return response.json();
        })
        .then(function(data) {
 
            for (var i = 0; i < data.length; i++) {
                var result = data[i];
                var lat = data[i].lat;
                var lon = data[i].lon;
                var cityName = data[i].name;
                var todayAPI= 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon=' + lon +'&appid=e7ef61c6ce67516bc22001eacd3518fd&units=imperial' 
                console.log(todayAPI);
                
                           
            }
        return fetch(todayAPI)
        })
        .then(function(response){
            return response.json();

        })
        .then(function(data) {
         
            var temp = data.main.temp;
            var humidity = data.main.humidity;
            var wind = data.wind.speed;
            var cityName = data.name;
            var date = data.dt*1000;
            var formattedDate = dayjs(date).format("MMM D");

            var lon = data.coord.lon;
            var lat = data.coord.lat;
            var fivedayAPI = 'https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid=e7ef61c6ce67516bc22001eacd3518fd&units=imperial'


            var cityHead = document.createElement('h3');
            var weatherList = document.createElement('ul');
            var displayTemp = document.createElement('li');
            var displayWind = document.createElement('li');
            var displayHumid= document.createElement('li');


            weatherList.className = '';
            displayHumid.className = 'list-group-item m-2 humidity-display';
            displayTemp.className = 'list-group-item m-2 temp-display';
            displayWind.className = 'list-group-item m-2 wind-display';

            cityHead.textContent = cityName + ' - '+ formattedDate;

            displayTemp.textContent = 'Temp: ' + temp + ' °F';
            displayWind.textContent = "Wind Speed: " + wind + ' MPH';
            displayHumid.textContent = 'Humidity: ' + humidity + '%';
           
            resultsContainer.appendChild(cityHead);
            weatherList.appendChild(displayTemp);
            weatherList.appendChild(displayHumid);
            weatherList.appendChild(displayWind);
            resultsContainer.appendChild(weatherList);
            return fetch(fivedayAPI)
        })
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            for (var i = 0; i < data.list.length; i+=8) {
                var date = data.list[i].dt * 1000
                var formattedDate = dayjs(date).format("MMM D")
                var temp = data.list[i].main.temp;
                var humid = data.list[i].main.humidity;
                var wind = data.list[i].wind.speed;
                var cardEl = document.createElement('div');
                var cardHead= document.createElement('div')
                var ulEl = document.createElement('ul')
                var displayTemp = document.createElement('li');
                var displayWind = document.createElement('li');
                var displayHumid= document.createElement('li');
                cardEl.className = 'col-3 col-xl card m-2  fivedayCard';
                cardEl.setAttribute('style', 'width: 18rem;' )
                cardHead.className = 'card-header fivedayDate'
                ulEl.className = 'list-group list-group-flush'
                displayTemp.className = 'list-group-item fivedayTemp'
                displayWind.className = 'list-group-item fivedayWind'
                displayHumid.className = 'list-group-item fivedayHumidity'
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
            forcastHeader.textContent = "5-Day Forecast";

        })
};



startUp()
searchForm.addEventListener('submit', handleSearchSubmit)
searchHistory.addEventListener('click', function(e) {
    var buttonSearch = e.target.textContent
    if (!e.target.matches(".added-city-button") ) {
        return
    }
    handleSearch(buttonSearch)
} 

);

