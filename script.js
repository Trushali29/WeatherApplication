var app = angular.module("weatherApp",[]);

app.controller("weatherCtrl",
	function($scope,$http,$interval){
		$scope.AppInfo = {
			title:'Weather Application',
			info : 'The Weather app uses OpenWeather API to fetch the current weather reports and generate reports of given city. It generates reports such as latitude and longitude, temperature, humidity and pressure.'
		};

		$scope.city = "";
		var openWeatherCurrentCity = 'https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=478ae31a0efd71e9a6c87327198eddb3';
		$http.get(openWeatherCurrentCity).then(function(response){
			$scope.weatherInfoCurrentCity = {
				City:'Mumbai',
				latitude: 'Latitude '+response.data.coord['lat'],
				longitude: 'Longitude '+response.data.coord['lon'],
				weather_desc : response.data.weather[0]['description'],
				temperature :  Math.round(response.data.main.temp - 273.15),
				feels :'Feels like '+ Math.round(response.data.main.feels_like - 273.25),
				pressure: 'Pressure '+response.data.main.pressure,
				humidity: 'Humidity '+response.data.main.humidity+"%",
				visibility: 'Visibility '+response.data.visibility,
				sunrise: 'Sunrise '+ ((new Date(response.data.sys['sunrise'] * 1000)).toLocaleString()).split(', ')[1],
				sunset: 'Sunset '+ ((new Date(response.data.sys['sunset'] * 1000)).toLocaleString()).split(', ')[1],
				wind_speed: response.data.wind['speed'],
				wind_deg: response.data.wind['deg'],
				country: response.data.sys['country'],
				dt : response.data.dt
			};
		});	
		var time = new Date().toString();
		$scope.datetime = time.split(' ').slice(0,5).join(' ');
		$interval(function(){
			var time = new Date().toString();
			$scope.datetime = time.split(' ').slice(0,5).join(' ');
		},1000);
		$scope.getIcon


		$scope.getWeatherByCity = function(x){
			var openweatherCity = 'https://api.openweathermap.org/data/2.5/weather?q='+x+'&appid=478ae31a0efd71e9a6c87327198eddb3';
			$http.get(openweatherCity).then(function(response){
				console.log(response.data);
				$scope.weatherReport = response.data.weather[0]['description'];
				$scope.weatherInfo = {
					City:x,
					latitude: 'Latitude '+response.data.coord['lat'],
					longitude: 'Longitude '+response.data.coord['lon'],
					weather_desc : response.data.weather[0]['description'],
					temperature :  Math.round(response.data.main.temp - 273.15),
					feels :'Feels like '+ Math.round(response.data.main.feels_like - 273.25),
					pressure: 'Pressure '+response.data.main.pressure,
					humidity: 'Humidity '+response.data.main.humidity + "%",
					visibility: 'Visibility '+response.data.visibility,
					sunrise: 'Sunrise '+ ((new Date(response.data.sys['sunrise'] * 1000)).toLocaleString()).split(', ')[1],
					sunset: 'Sunset '+ ((new Date(response.data.sys['sunset'] * 1000)).toLocaleString()).split(', ')[1],
					wind_speed: response.data.wind['speed'],
					wind_deg: response.data.wind['deg'],
					country: response.data.sys['country'],
					dt : response.data.dt
				};
			});	
			$scope.makeVisible = {
				"visibility" : "visible"
			};
			
		}
		
});
