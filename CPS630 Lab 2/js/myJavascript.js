var apiKey = 'f4e83aa77ae6dd52961e234800550216';
var url = 'http://api.openweathermap.org/data/2.5/weather?q=';
var appID = '&APPID=';
var celsius = '&units=metric';
var fahrenheit  = '&units=imperial';
//Default url 
var defaultURL = 'http://api.openweathermap.org/data/2.5/weather?q=Brampton&units=metric&APPID=f4e83aa77ae6dd52961e234800550216';
var defaultCity = 'brampton';
var city;
var updatedURL;

var weatherContainer = document.getElementById("weather-info");

//five day forcast url
var fiveDay = 'http://api.openweathermap.org/data/2.5/forecast?q=';
var fivedefault = 'http://api.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml';
var mode = '&mode=JSON&APPID=f4e83aa77ae6dd52961e234800550216';
var country; 



//geting info 
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET', defaultURL);
	//what should happen once the data is loaded 
	ourRequest.onload = function(){
		city = defaultCity;
		console.log(JSON.parse(ourRequest.responseText));
		var ourData2 = JSON.parse(ourRequest.responseText);
		renderHTML(ourData2);
		fiveDayForcast();
		};
	ourRequest.send();
	
// get the city weather the user as asked for  
function cityFunction()
{	
	searchbar = document.getElementById("location_searchbox");
	city = searchbar.value;
	document.getElementById("location").innerHTML = city;
	updateByCity(city);
	
}
function celFunction()
{
		var ourRequest = new XMLHttpRequest();
		ourRequest.open('GET',url + city + celsius + appID + apiKey);
	ourRequest.onload = function(){
		var ourData2 = JSON.parse(ourRequest.responseText);
		document.getElementById("temperature").innerHTML = ourData2.main.temp + '&degC';
			document.getElementById("max").innerHTML = ourData2.main.temp_max + '&degC';
			document.getElementById("min").innerHTML = ourData2.main.temp_min + '&degC';
		};
	ourRequest.send();

}

function fahFunction()
{
		var ourRequest = new XMLHttpRequest();
		ourRequest.open('GET',url + city + fahrenheit + appID + apiKey);
	ourRequest.onload = function(){
		console.log(JSON.parse(ourRequest.responseText));
		var ourData2 = JSON.parse(ourRequest.responseText);
		document.getElementById("temperature").innerHTML = ourData2.main.temp + '&degF';
			document.getElementById("max").innerHTML = ourData2.main.temp_max + '&degF';
			document.getElementById("min").innerHTML = ourData2.main.temp_min + '&degF';
		};
	ourRequest.send();

}

function updateByCity(Usercity)
	{
	ourRequest.open('GET',url + city + celsius + appID + apiKey);
	ourRequest.onload = function(){
		console.log(JSON.parse(ourRequest.responseText));
		var ourData2 = JSON.parse(ourRequest.responseText);
			var ourData2 = JSON.parse(ourRequest.responseText);
		renderHTML(ourData2);fiveDayForcast();
		
		};
	ourRequest.send();
}

//to add html into the div 
function renderHTML(data){
	//var htmlString = "this is a test";
	document.getElementById("temperature").innerHTML = data.main.temp + '&degC';
	document.getElementById("humidity").innerHTML = data.main.humidity ;
	document.getElementById("icon").src = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
	document.getElementById("direction").innerHTML = data.wind.deg + '&deg';
	document.getElementById("wind").innerHTML = data.wind.speed;
	document.getElementById("max").innerHTML = data.main.temp_max + '&degC';
	document.getElementById("min").innerHTML = data.main.temp_min + '&degC';
	document.getElementById("description").innerHTML = data.weather[0].description;
	document.getElementById("detail").innerHTML = data.weather[0].main;
	country = data.sys.country;
	document.getElementById("country").innerHTML = country;
}

function fiveDayForcast()
{
	ourRequest.open('GET', fiveDay + city + ','+ country + celsius +mode);
	//what should happen once the data is loaded 
	ourRequest.onload = function(){
		console.log(JSON.parse(ourRequest.responseText));
		var ourData2 = (JSON.parse(ourRequest.responseText));
		sendHTML(ourData2);
		hourly(ourData2);
		weekDays(ourData2);
		};
	ourRequest.send();
	
	function sendHTML(data){
		var counter = 40; 
		var count= 1;
		var string = count.toString();
		for (i =0; i<counter; i=i+8 )
		{
			string = count.toString();
			if (count > 0 && count <6)
			{
				var day = new Date(data.list[i].dt*1000).getDay();
				var hour  = new Date(data.list[i].dt*1000).getHours();
				var time = data.list[i].dt_txt;
				var date =  time.substring(0,10);
				var weekDay;
				if(day == 0)
				{
					weekday = 'Sunday';
				}
				else if (day == 1)
				{
					weekday = 'Monday';
				}
				else if (day == 2)
				{
					weekday = 'Tuesday';
				}
				else if (day == 3)
				{
					weekday = 'Wednesday';
				}
				else if (day == 4)
				{
					weekday = 'Thursday';
				}
				else if (day == 5)
				{
					weekday = 'Friday';
				}
				else 
				{
					weekday = 'Saturday';
				}
				document.getElementById("day" + string).innerHTML = weekday; //data.list[i].dt;
				document.getElementById("date" + string).innerHTML = date; //data.list[i].dt;
				document.getElementById("time" + string).innerHTML = time.substring(10,19);
				document.getElementById("des" + string).innerHTML = data.list[i].weather[0].description;
				document.getElementById("pic" + string).src = 'http://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png';
				document.getElementById("temp" + string).innerHTML = data.list[i].main.temp + '&deg';
				document.getElementById("humi" + string).innerHTML = data.list[i].main.humidity;
				document.getElementById("windS" + string).innerHTML = data.list[i].wind.speed;
			}
			count++;
		}
	

	}
}
var weekDays;
function weekDays(data)
{
		var counter = 12; 
		var count= 1;
		var string = count.toString();
		for (i =0; i<counter; i++ )
		{
			var day = new Date(data.list[i].dt*1000).getDay();
			
			if(day == 0)
			{
				weekdays = 'Sunday';
			}
			else if (day == 1)
			{
				weekdays = 'Monday';
			}
			else if (day == 2)
			{
				weekdays = 'Tuesday';
			}
			else if (day == 3)
			{
				weekdays = 'Wednesday';
			}
			else if (day == 4)
			{
				weekdays = 'Thursday';
			}
			else if (day == 5)
			{
				weekdays = 'Friday';
			}
			else 
			{
				weekdays = 'Saturday';
			}
		}
}	

function hourly(data)
{
	var houlyDays = "";
	var hourlydate= "";
	var hourlytimes = "";
	var hourlydes = "";
	var hourlypics = "";
	var hourlytel = "";
	var hourlyhul = "";
	var	hourlywil = "";
	var time ;
	var date;
	var count = 1;
	var string; 
	var counter = 24;
	var weekdays; 
		for (i =0; i<counter; i++ )
		{
			//week days 
			var day = new Date(data.list[i].dt*1000).getDay();
			time = data.list[i].dt_txt;
			date =  time.substring(0,10);
			if(day == 0)
			{
				weekdays = 'Sunday';
			}
			else if (day == 1)
			{
				weekdays = 'Monday';
			}
			else if (day == 2)
			{
				weekdays = 'Tuesday';
			}
			else if (day == 3)
			{
				weekdays = 'Wednesday';
			}
			else if (day == 4)
			{
				weekdays = 'Thursday';
			}
			else if (day == 5)
			{
				weekdays = 'Friday';
			}
			else 
			{
				weekdays = 'Saturday';
			}
			string =count.toString();
			document.getElementById("d" + string).innerHTML = weekdays; 
			document.getElementById("da" + string).innerHTML = time.substring(0,10); //data.list[i].dt;
				document.getElementById("t" + string).innerHTML = time.substring(10,19);
				document.getElementById("de" + string).innerHTML = data.list[i].weather[0].description;
				document.getElementById("p" + string).src = 'http://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png';
				document.getElementById("te" + string).innerHTML = data.list[i].main.temp + '&deg';
				document.getElementById("hu" + string).innerHTML = data.list[i].main.humidity;
				document.getElementById("wi" + string).innerHTML = data.list[i].wind.speed;
			count++;
			/*
			
			
			//hours 
			hourlydate = hourlydate + "<tr><td>" + time.substring(0,10); +"</td></tr>" ;
			hourlytimes = hourlytimes + "<tr><td>" + time.substring(10,19) +"</td></tr>" ;
			hourlydes = hourlydes + "<tr><td>" + data.list[i].weather[0].description +"</td></tr>" ;
			hourlytel = hourlytel + "<tr><td>" + data.list[i].main.temp + '&deg' +"</td></tr>" ;
			hourlyhul = hourlyhul + "<tr><td>" + data.list[i].main.humidity + '%' +"</td></tr>" ;
			hourlywil = hourlywil + "<tr><td>" + data.list[i].wind.speed + "km/h" +"</td></tr>" ;
			hourlypics = hourlypics + "<tr><td><img width='50px'" + 'src= http://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png'+ "></td></tr>";
			*/
		}
		/*
		var a = document.getElementById("d1");
		a.insertAdjacentHTML("beforeend",houlyDays);
		var c = document.getElementById("da1");
		c.insertAdjacentHTML("beforeend",hourlydate);
		var b = document.getElementById("t1");
		b.insertAdjacentHTML("beforeend",hourlytimes);
		var d = document.getElementById("de1");
		d.insertAdjacentHTML("beforeend",hourlydes);
		var e = document.getElementById("p1");
		e.insertAdjacentHTML("beforeend",hourlypics);
		var f = document.getElementById("te1");
		f.insertAdjacentHTML("beforeend",hourlytel);
		var g = document.getElementById("hu1");
		g.insertAdjacentHTML("beforeend",hourlyhul);
		var h = document.getElementById("wi1");
		h.insertAdjacentHTML("beforeend",hourlywil);
		*/
}

/*
//-----------------------------------------------------
// add this at the end if you have time 
function handle_search(event)
{
	if(event.keyCode == 13)
	{
		location_search = location_searchbox.value;
		loadWeather();
	}
}*/
