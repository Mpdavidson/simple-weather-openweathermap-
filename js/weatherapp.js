$(document).ready(function(){
    //hide initial buttons
    //declare lat and lon
            var search;
            var longitude;
            var latitude;
    //Current Weather
	    //prevent default
	    $('form').submit(function (evt) {
	    evt.preventDefault();
	    // define variables
	    var weatherAPI = "http://api.openweathermap.org/data/2.5/weather?zip=" + search + ",us&APPID=ab6945f5d48c51b058971dbb9140fa01";
	    search = $('#search').val();
	    // display data
	    if(search.length < 5){
	    	$('#lessThanFive').fadeIn(1800, function(){});
	        $('#greaterThanFive').hide();
	        $('#mainWeather').hide();
	        $('#supWeather').hide();
	        $('#forecastDiv').hide();
	    }else if(search.length > 5){
	    	$('#greaterThanFive').fadeIn(1800, function(){});
	    	$('#lessThanFive').hide();
	        $('#mainWeather').hide();
	        $('#supWeather').hide();
	        $('#forecastDiv').hide();
	    }else{
	        $('#lessThanFive').hide();
	        $('#greaterThanFive').hide();
	        $('#fiveDay').hide();
	        $('#forecastData').hide()
	        $('#currentForecast').hide()
	        $('#forecastDiv').hide()
	        $('#mainWeather').fadeIn(2400, function(){});
	        $('#supWeather').fadeIn(3200, function(){});
	        $('#forecastDiv').fadeIn(2400, function(){});
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
	      $('#temperature').text(Math.round(data.main.temp) + "° Fahrenheit");
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
	   if(search === ''){
	      $('#fiveDay').hide()
	    }else{
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
	        //Date
	        var epochArray = [];
	        var dateArray = [];
	        var utcSeconds;
	        for(i=1;i<data.list.length;i++){
	        epochArray.push(data.list[i].dt);
		}
		for(i=0;i<epochArray.length;i++){
		var utcSeconds = epochArray[i];
		var d = new Date(0);
		d.setUTCSeconds(utcSeconds);
		var month = (d.getMonth() + 1);
		var day = d.getDate();
		dateArray.push(month + '/' + day);
		}
		console.log(dateArray);
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
	        //Set Date
	          for(i=0;i<dateArray.length;i++){
	            $('#date' + i).text(dateArray[i]);
	          }
	        //Icon for day
	          for(i=0;i<icon.length;i++){
	            $('#day' + i).html('<img src="assets/img/64px/' + icon[i] + '.png">');
	          }
	        //Min / Max temps for forecast
	          for(i=1;i<count;i++){
	          $('#min' + i).text(Math.round(data.list[i].temp.min) + "°");
	          }
	           for(i=1;i<count;i++){
	          $('#max' + i).text(Math.round(data.list[i].temp.max) + "°");
	          }
	    	//Description of weather
	    	 for(i=0;i<capitalizedDescription.length;i++){
	    	   $('#des' + i).text(capitalizedDescription[i]);
	    	   }
	       }
	    }
	    $.getJSON(weatherAPITwo, weatherOptionsTwo, displayWeatherTwo);
	  });//end click 2
  //Current Forecast
	  $('#todayForecast').click(function(){
	  if(search === ''){
	      $('#forecastDiv').hide();
	      $('#currentCondition').hide();
	      $('#forecastData').hide();
	      $('#currentForecast').hide();
	    }else{
	    //declare variable
	    var count = 1;
	    var weatherAPIThree = "http://api.openweathermap.org/data/2.5/forecast/daily?lat=" + latitude + "&lon=" + longitude + "&cnt=" + count;
	    //display
	     $('#mainWeather').hide();
	     $('#supWeather').hide();
	     $('#forecastDiv').fadeIn(2400, function(){});
	     $('#currentCondition').fadeIn(2400, function(){});
	     $('#forecastData').fadeIn(2400, function(){});
	     $('#currentForecast').fadeIn(2400, function(){});
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
	        $('#minTempForecast').text(Math.round(data.list[0].temp.min) + "°");
	        $('#maxTempForecast').text(Math.round(data.list[0].temp.max) + "°");
	        $('#humidityForecast').text(Math.round(data.list[0].humidity)+ "%");
	    }
	    }
	    $.getJSON(weatherAPIThree, weatherOptionsThree, displayWeatherThree);
	  });//end click 
  //Current Conditions Click
	  $('#currentCondition').click(function(){
	  if(search === ''){
	      $('#mainWeather').hide();
	      $('#supWeather').hide();
	      $('#forecastDiv').hide();
	    }else{
	    // define variables
	    var weatherAPIFour = "http://api.openweathermap.org/data/2.5/weather?zip=" + search + ",us&APPID=ab6945f5d48c51b058971dbb9140fa01";
	    console.log(search);
	    // display data
	        $('#forecastData').hide()
	        $('#currentForecast').hide()
	        $('#forecastDiv').hide()
	        $('#mainWeather').fadeIn(2400, function(){});
	        $('#supWeather').fadeIn(3200, function(){});
	        $('#forecastDiv').fadeIn(2400, function(){});
	    // the AJAX part
	    var weatherOptionsFour = {
	       zip : search,
	       units : 'imperial'
	    };
	    function displayWeatherFour(data) {
	      //declare icon variable for later use
	      var icon = data.weather[0].icon;
	      //capitalize description for output
	      var description = data.weather[0].description;
	      var capitalizedDescription = description.charAt(0).toUpperCase() + description.substring(1);
	      //add data to tables
	      $('#temperature').text(Math.round(data.main.temp) + "° Fahrenheit");
	      $('#img').html('<img src="assets/img/' + icon + '.png">');
	      $('#description').text(capitalizedDescription);
	      $('#windSpeed').text( data.wind.speed.toFixed(1) + " mph");
	      $('#humidity').text(data.main.humidity + "%");
	       //give lat and lon their value
	      longitude = Math.round(data.coord.lon);
	      latitude = Math.round(data.coord.lat);
	    }
	  }
   $.getJSON(weatherAPIFour, weatherOptionsFour, displayWeatherFour);
 }); // end click 4

}); //end ready
