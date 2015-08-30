$(document).ready(function(){
    //prevent default
    $('form').submit(function (evt) {
    evt.preventDefault();
    // define variables
    var weatherAPI = "http://api.openweathermap.org/data/2.5/weather?zip=" + search + ",us&APPID=ab6945f5d48c51b058971dbb9140fa01";
    var search = $('#search').val();
    // display data
    if(search.length < 5){
    	$('#lessThanFive').fadeIn(1800, function(){});
    	$('#greaterThanFive').hide();
    	$('table').hide();
    }else if(search.length > 5){
    	$('#greaterThanFive').fadeIn(1800, function(){});
    	$('#lessThanFive').hide();
    	$('table').hide();
    }else{
      $('#lessThanFive').hide()
      $('#greaterThanFive').hide()
      $('#mainWeather').fadeIn(2400, function(){});
      $('table').fadeIn(3200, function(){});
    // the AJAX part
    var weatherOptions = {
       zip : search,
       units : 'imperial'
    };
    function displayWeather(data) {
      var icon = data.weather[0].icon;
      console.log(icon);
      $('#temperature').text(Math.round(data.main.temp) + "째 fahrenheit");
      $('#img').html('<img src="assets/img/' + icon + '.png">');
      $('#description').text(data.weather[0].description);
      $('#windSpeed').text( data.wind.speed.toFixed(1) + " mph");
      $('#humidity').text(data.main.humidity + "%");
    }
    $.getJSON(weatherAPI, weatherOptions, displayWeather);
   }
  }); // end click

}); //end ready
