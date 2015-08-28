$(document).ready(function(){
    $('form').submit(function (evt) {
    evt.preventDefault();
    $('#mainWeather').fadeIn(2400, function(){});
    $('table').fadeIn(3200, function(){});
    // the AJAX part
    var search = $('#search').val();
    var weatherAPI = "http://api.openweathermap.org/data/2.5/weather?zip=" + search + ",us&APPID=ab6945f5d48c51b058971dbb9140fa01";
    var weatherOptions = {
       zip : search,
       units : 'imperial'
    };
    function displayWeather(data) {
      var icon = data.weather[0].icon;
      console.log(icon);
      $('#temperature').text(data.main.temp + "째 fahrenheit");
      $('#img').html('<img src="assets/img/' + icon + '.png">');
      $('#description').text(data.weather[0].description);
      $('#windSpeed').text(data.wind.speed + " mph");
      $('#humidity').text(data.main.humidity + "%");
    }
    $.getJSON(weatherAPI, weatherOptions, displayWeather);

  }); // end click

}); //end ready
