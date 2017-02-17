var APPID = "498a9bceafba210b709855b0a8f14280";
var temp;
var loc;
var icon;
var humidity;
var wind;
var direction;
var city;
var cityId;
var currentDate;
var bool = false;

//Variables for time and date hourly forecast
var timeOne;
var timeTwo;
var timeThree;
var timeFour;
var tempOne;
var tempTwo;
var tempThree;
var tempFour;

//Variables for Daily Forecast
var dayOfWeekOne;
var dayOfWeekTwo;
var dayOfWeekThree;
var dayOfWeekFour;
var dayOfWeekFive;
var tempOfWeekOne;
var tempOfWeekTwo;
var tempOfWeekThree;
var tempOfWeekFour;
var tempOfWeekFive;

var week = [];
var tempDaily = [];

var mega;

function update(weather){
	temp.innerHTML = weather.temp;
	loc.innerHTML = weather.loc;
	icon.src = "imgs/codes/" + weather.code + ".png";
	humidity.innerHTML = weather.humidity;
	direction.innerHTML = weather.direction;
	wind.innerHTML = weather.wind;
}

function updateFive(weather){
	timeOne.innerHTML = weather.timeOne;
	timeTwo.innerHTML = weather.timeTwo;
	timeThree.innerHTML = weather.timeThree;
	timeFour.innerHTML = weather.timeFour;

	tempOne.innerHTML = weather.tempOne;
	tempTwo.innerHTML = weather.tempTwo;
	tempThree.innerHTML = weather.tempThree;
	tempFour.innerHTML = weather.tempFour;

	dayOfWeekOne.innerHTML = weather.dayOfWeekOne;
	dayOfWeekTwo.innerHTML = weather.dayOfWeekTwo;
	dayOfWeekThree.innerHTML = weather.dayOfWeekThree;
	dayOfWeekFour.innerHTML = weather.dayOfWeekFour;
	dayOfWeekFive.innerHTML = weather.dayOfWeekFive;

	tempOfWeekOne.innerHTML = weather.tempOfWeekOne;
	tempOfWeekTwo.innerHTML = weather.tempOfWeekTwo;
	tempOfWeekThree.innerHTML = weather.tempOfWeekThree;
	tempOfWeekFour.innerHTML = weather.tempOfWeekFour;
	tempOfWeekFive.innerHTML = weather.tempOfWeekFive;
	
}


function updateByCity(city) {
	var url = "http://api.openweathermap.org/data/2.5/weather?" + 
				 "q=" +city +
				"&appid=" + APPID;
	sendRequest(url);


}

function updateFiveDay(city){
	var url = "http://api.openweathermap.org/data/2.5/forecast?" +
				"q=" + city + "&appid=" + APPID;

	sendRequestFiveDay(url);
}


//TOO BUGGY DO NOT USE
function changeDegrees(){
	/*
	var weather = {};
	if(bool == false){
		for(i = 0; i < tempDaily.length; i++){
			alert(tempDaily[i]);
			tempDaily[i] = KelvinToF(tempDaily[i]);

		}
			weather.tempOfWeekOne = tempDaily[0];
			weather.tempOfWeekTwo = tempDaily[1];
			weather.tempOfWeekThree = tempDaily[2];
			weather.tempOfWeekFour = tempDaily[3];
			weather.tempOfWeekFive = tempDaily[4];

		bool = true;
		
	}
	else bool = false;

	updateFive(weather);
	*/
}




function sendRequest(url){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var data = JSON.parse(xmlhttp.responseText);
			var weather = {};
			weather.code = data.weather[0].id;
			weather.humidity = data.main.humidity;
			weather.wind = data.wind.speed;
			weather.direction = degreesToDirection(data.wind.deg)
			weather.loc = data.name;
			weather.temp = data.main.temp;
			weather.temp = KelvinToC(weather.temp);

			

			update(weather);

		}
	};
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
}

function sendRequestFiveDay(url){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var data = JSON.parse(xmlhttp.responseText);
			var weather = {};
			weather.temp = data.list[0].main.temp;
			
			currentDate = data.list[0].dt_txt.split('-');
				
			weather.timeOne = data.list[0].dt_txt.split(" ");
			weather.timeOne = getTime(weather.timeOne);

			weather.timeTwo = data.list[1].dt_txt.split(" ");
			weather.timeTwo = getTime(weather.timeTwo);

			weather.timeThree = data.list[2].dt_txt.split(" ");
			weather.timeThree = getTime(weather.timeThree);

			weather.timeFour = data.list[3].dt_txt.split(" ");
			weather.timeFour = getTime(weather.timeFour);

			weather.tempOne = KelvinToC(data.list[0].main.temp);
			weather.tempTwo = KelvinToC(data.list[1].main.temp);
			weather.tempThree = KelvinToC(data.list[2].main.temp);
			weather.tempFour = KelvinToC(data.list[3].main.temp);

			if(tempDaily.length > 0){
				for(i = tempDaily.length; i > 0; i--){
					tempDaily.pop();
				}
			}
			
			
			
			for(i = 0; i < data.list.length; i++){
				var tempTime;
				var day;
				tempTime = data.list[i].dt_txt.split(" ");
				day = tempTime[0];
				tempTime = tempTime[1].split(":");
				tempTime = tempTime[0];


				if(tempTime == 15){
					week.push(getDayName(day));
					tempDaily.push(data.list[i].main.temp);

				}

			}


			
			weather.dayOfWeekOne = week[0];
			weather.dayOfWeekTwo = week[1];
			weather.dayOfWeekThree = week[2];
			weather.dayOfWeekFour = week[3];
			weather.dayOfWeekFive = week[4];

			for(i = 0; i < tempDaily.length; i++){

				tempDaily[i] = KelvinToC(tempDaily[i]);
			}



			weather.tempOfWeekOne = tempDaily[0];
			weather.tempOfWeekTwo = tempDaily[1];
			weather.tempOfWeekThree = tempDaily[2];
			weather.tempOfWeekFour = tempDaily[3];
			weather.tempOfWeekFive = tempDaily[4];
		
				
			updateFive(weather);
			

		}
	};
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
}


function grabInfo(){

	temp = document.getElementById("temperature");
    loc = document.getElementById("location");
    icon = document.getElementById("icon");
    humidity = document.getElementById("humidity");
    wind = document.getElementById("wind");
    direction = document.getElementById("direction");
    city = document.getElementById("cityId").value;
    
    timeOne = document.getElementById("firstTime");
    timeTwo = document.getElementById("secondTime");
    timeThree = document.getElementById("thirdTime");
    timeFour = document.getElementById("fourthTime");
    tempOne = document.getElementById("firstTemp");
    tempTwo = document.getElementById("secondTemp");
    tempThree = document.getElementById("thirdTemp");
    tempFour = document.getElementById("fourthTemp");
    
    
    dayOfWeekOne = document.getElementById("dayOne");
    dayOfWeekTwo = document.getElementById("dayTwo");
    dayOfWeekThree = document.getElementById("dayThree");
    dayOfWeekFour = document.getElementById("dayFour");
    dayOfWeekFive = document.getElementById("dayFive");
    tempOfWeekOne = document.getElementById("tempDayOne");
    tempOfWeekTwo = document.getElementById("tempDayTwo");
    tempOfWeekThree = document.getElementById("tempDayThree");
    tempOfWeekFour = document.getElementById("tempDayFour");
    tempOfWeekFive = document.getElementById("tempDayFive");


   document.getElementsByClassName('tablinks')[0].click();
	
    updateByCity(city);
    updateFiveDay(city);

}



function KelvinToF(k){
	return Math.round(k*(9/5) - 459.67)+ '&deg' + "F";
}

function KelvinToC(k){
	return Math.round(k - 273.15) + '&deg' + "C";
}

function openTab(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";

}

function degreesToDirection(degrees){
    var range = 360/16;
    var low = 360 - range/2;
    var high = (low + range) % 360;
    var angles = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    for( i in angles ) {
	if(degrees >= low && degrees < high){
	    return angles[i];
	}
	low = (low + range) % 360;
	high = (high + range) % 360;
    }
    return "N";
    
}

function getTime(time){
	time = time[1].split(':');
	if(time[0] >= 12)
		return time[0] + ":00 pm "
	return time[0] + ":00 am ";
}

function getDayName(dateString){
	return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date(dateString).getDay()];

}














