$(document).ready(function(){
    //declare lat and lon
            var longitude;
            var latitude;
    //Current Weather
	    //prevent default
	    $('#currentCondition, form').submit(function (evt) {
	    evt.preventDefault();
	    // define variables
	    var weatherAPI = "http://api.openweathermap.org/data/2.5/weather?zip=" + search + ",us&APPID=ab6945f5d48c51b058971dbb9140fa01";
	    var search = $('#search').val();
	    // display data
	    if(search.length < 5){
	    	$('#lessThanFive').fadeIn(1800, function(){});
	        $('#greaterThanFive').hide();
	        $('#fiveDay').hide();
	        $('#forecastData').hide();
	        $('#currentCondition').hide();
	        $('#currentForecast').hide();
	        $('#forecast').hide();
	        $('#mainWeather').hide();
	        $('#supWeather').hide();
	        $('#forecast').hide();
	        $('#todayForecast').hide();
	    }else if(search.length > 5){
	    	$('#greaterThanFive').fadeIn(1800, function(){});
	    	 $('#lessThanFive').hide();
	        $('#fiveDay').hide();
	        $('#forecastData').hide()
	        $('#currentCondition').hide()
	        $('#currentForecast').hide()
	        $('#forecast').hide()
	        $('#mainWeather').hide();
	        $('#supWeather').hide();
	        $('#forecast').hide();
	        $('#todayForecast').hide();
	    }else{
	        $('#lessThanFive').hide();
	        $('#greaterThanFive').hide();
	        $('#fiveDay').hide();
	        $('#forecastData').hide()
	        $('#currentCondition').hide()
	        $('#currentForecast').hide()
	        $('#forecast').hide()
	        $('#mainWeather').fadeIn(2400, function(){});
	        $('#supWeather').fadeIn(3200, function(){});
	        $('#forecast').fadeIn(2400, function(){});
	        $('#todayForecast').fadeIn(3200, function(){});
	    // the AJAX part
	    var weatherOptions = {
	       zip : search,
	       units : 'imperial'
	    };
	    function displayWeather(data) {
	      //declare icon variable for later use
	      var icon = data.weather[0].icon;
	      //capitalize description for output
	      var description = data.weather[0].description;
	      var capitalizedDescription = description.charAt(0).toUpperCase() + description.substring(1);
	      //add data to tables
	      $('#temperature').text(Math.round(data.main.temp) + "째 Fahrenheit");
	      $('#img').html('<img src="assets/img/' + icon + '.png">');
	      $('#description').text(capitalizedDescription);
	      $('#windSpeed').text( data.wind.speed.toFixed(1) + " mph");
	      $('#humidity').text(data.main.humidity + "%");
	       //give lat and lon their value
	      longitude = Math.round(data.coord.lon);
	      latitude = Math.round(data.coord.lat);
	    }
	    $.getJSON(weatherAPI, weatherOptions, displayWeather); 
	   }
	  }); // end click
  //5 Day Forecast
	  $('#forecast').click(function(){
	    //declare variable
	    var count = 6;
	    var weatherAPITwo = "http://api.openweathermap.org/data/2.5/forecast/daily?lat=" + latitude + "&lon=" + longitude + "&cnt=" + count;
	    //display
	    $('#fiveDay').fadeIn(2400, function(){});
	    //Ajax Part
	    var weatherOptionsTwo = {
	       lat : latitude,
	       lon : longitude,
	       cnt : count,
	       units : 'imperial'
	    };
	    function displayWeatherTwo(data){
	        //icon array
	        var icon = [];
	          for(i=1;i<data.list.length;i++){
	            icon.push(data.list[i].weather[0].icon);
	          }
	        //capitalize description for output
	        var description = [];
	          for(i=1;i<data.list.length;i++){
	            description.push(data.list[i].weather[0].description);
	            }
	        var capitalizedDescription = [];
	          for(i=0;i<description.length;i++){
	          capitalizedDescription.push(description[i].charAt(0).toUpperCase() + description[i].substring(1))
	          }
	        //Icon for day
	          for(i=0;i<icon.length;i++){
	            $('#day' + i).html('<img src="assets/img/64px/' + icon[i] + '.png">');
	          }
	        //Min / Max temps for forecast
	          for(i=1;i<6;i++){
	          $('#min' + i).text(Math.round(data.list[i].temp.min) + "째");
	          }
	           for(i=1;i<6;i++){
	          $('#max' + i).text(Math.round(data.list[i].temp.max) + "째");
	          }
	    	//Description of weather
	    	 for(i=0;i<5;i++){
	    	   $('#des' + i).text(capitalizedDescription[i]);
	    	   }
	    }
	    $.getJSON(weatherAPITwo, weatherOptionsTwo, displayWeatherTwo);
	  });//end click 2
  //Current Forecast
	  $('#todayForecast').click(function(){
	    //declare variable
	    var count = 1;
	    var weatherAPIThree = "http://api.openweathermap.org/data/2.5/forecast/daily?lat=" + latitude + "&lon=" + longitude + "&cnt=" + count;
	    //display
	     $('#mainWeather').hide();
	     $('#supWeather').hide();
	     $('#todayForecast').hide();
	     $('#forecast').fadeIn(2400, function(){});
	     $('#currentCondition').show();
	     $('#forecastData').show();
	     $('#currentForecast').show();
	    //Ajax Part
	    var weatherOptionsThree = {
	       lat : latitude,
	       lon : longitude,
	       cnt : count,
	       units : 'imperial'
	    };
	    function displayWeatherThree(data){
	      //declare icon
	        var icon = data.list[0].weather[0].icon;
	        console.log(icon);
	      //capitalize description  
	        var description = data.list[0].weather[0].description;
	        var capitalizedDescription = description.charAt(0).toUpperCase() + description.substring(1);
	      //add data to table
	        $('#foreImg').html('<img src="assets/img/' + icon + '.png">');
	        $('#descriptionForecast').text(capitalizedDescription);
	        $('#minTempForecast').text(Math.round(data.list[0].temp.min) + "째");
	        $('#maxTempForecast').text(Math.round(data.list[0].temp.max) + "째");
	        $('#humidityForecast').text(Math.round(data.list[0].humidity)+ "%");
	    }
	    $.getJSON(weatherAPIThree, weatherOptionsThree, displayWeatherThree);
	  });//end click 3

}); //end ready
