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


    console.log(geoAPI)

    fetch(geoAPI)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var result = data[i];
                console.log (result);
                var lat = data[i].lat;
                console.log(lat);
                var lon = data[i].lon;
                console.log(lon);
                var cityName = data[i].name;
                console.log(cityName); 
                var todayAPI= 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon=' + lon +'&appid=e7ef61c6ce67516bc22001eacd3518fd&units=imperial' 
                console.log(todayAPI)            
            }
         return [lat, lon, cityName]  
        })

   
};




searchForm.addEventListener('submit', handleSearch)

