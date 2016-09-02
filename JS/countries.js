(function(){
	var app = angular.module('country', []);

	app.controller('CountryController', function($http, $scope){
		var c = this;
		$scope.lat = null;
		c.countries = [];
		$scope.showDetails = false;
		$scope.showButtons = false;
		$scope.showCuisines = false;
		$scope.showHotSpots = false;
		$scope.showPlaces = false;
		$scope.showTransport = false;
		$scope.alertpBuildings = false;
		$scope.alertPitStops = false;
		
		$http.get('https://restcountries.eu/rest/v1/all').success(function(data){
			c.countries = data;
			$scope.clist = [];
			for(i=0;i<data.length;i++)
			{
				$scope.clist[i] = data[i].name;
			}
			//$scope.zxc = 6;
		});


		this.getDetails = function(){
			$http.get('https://restcountries.eu/rest/v1/name/'+$scope.contry).success(function(data){
				c.cap = data;
				$scope.capital = c.cap[0].capital;
				$scope.region = c.cap[0].region;
				$scope.subregion = c.cap[0].subregion;
				$scope.population = c.cap[0].population;
				$scope.timezones = c.cap[0].timezones;
				$scope.borders = c.cap[0].borders;
				//$scope.zxc = 6;	
				$http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+$scope.capital+'&key=AIzaSyB1ZP2e6QFpYrY7B3XT0sMtEvKRx7e0V9U').success(function(data){
					c.cord = data;
					c.lat = c.cord.results[0].geometry.location.lat;
					c.lng = c.cord.results[0].geometry.location.lng;
					console.log(c.lat);
					console.log(c.lng);
				});
			});
			$scope.showDetails = true;
			$scope.showButtons = true;
			$scope.showCuisines = false;
			$scope.showHotSpots = false;
			$scope.showPlaces = false;
			$scope.showTransport = false;
			$scope.alertpBuildings = false;
			$scope.alertPitStops = false;
		};


		this.getCuisines = function(){
			console.log("dfgfdg");
			$scope.cuisineItems = [];
			$http.get('https://places.cit.api.here.com/places/v1/categories/cuisines?at='+c.lat+','+c.lng+'&app_id=G2nxilBGsecI9p1zBWHc&app_code=MiJF_FvtRXv0miDbOO3M3g').success(function(data){
				c.cuisines = data;
				for(i=1;i<data.items.length;i++)
				{
					$scope.cuisineItems[i-1] = c.cuisines.items[i].title;
				}
			});
			$scope.showCuisines = true;
			$scope.showHotSpots = false;
			$scope.showDetails = false;
			$scope.showPlaces = false;
			$scope.showTransport = false;
			$scope.alertpBuildings = false;
			$scope.alertPitStops = false;
		};

		
		this.getHotSpots = function(){
			$scope.hotSpots = [];
			$http.get('https://places.cit.api.here.com/places/v1/discover/explore?at='+c.lat+','+c.lng+'&app_id=G2nxilBGsecI9p1zBWHc&app_code=MiJF_FvtRXv0miDbOO3M3g').success(function(data){
				c.spots = data;
				console.log(c.spots);
				for(i=0;i<data.results.items.length;i++)
				{
					$scope.hotSpots[i] = c.spots.results.items[i].title;
				}
			});
			$scope.showCuisines = false;
			$scope.showHotSpots = true;
			$scope.showDetails = false;
			$scope.showPlaces = false;
			$scope.showTransport = false;
			$scope.alertpBuildings = false;
			$scope.alertPitStops = false;
		};


		this.getPlaces = function(){
			$scope.pbuildings = [];
			$http.get('https://places.cit.api.here.com/places/v1/discover/here?at='+c.lat+','+c.lng+'&app_id=G2nxilBGsecI9p1zBWHc&app_code=MiJF_FvtRXv0miDbOO3M3g').success(function(data){
				c.places = data;
				console.log(c.places.results.items.length)
				for(i=0;i<data.results.items.length;i++)
				{
					$scope.pbuildings[i] = c.places.results.items[i].title;
				}
				if(c.places.results.items.length == 0)
				{
					$scope.alertpBuildings = true;
				}
			});
			$scope.showCuisines = false;
			$scope.showHotSpots = false;
			$scope.showDetails = false;
			$scope.showPlaces = true;
			$scope.showTransport = false;
			$scope.alertPitStops = false;
		};


		this.getPitStops = function(){
			$scope.pitStops = [];
			$http.get('https://places.cit.api.here.com/places/v1/browse/pt-stops?at='+c.lat+','+c.lng+'&app_id=G2nxilBGsecI9p1zBWHc&app_code=MiJF_FvtRXv0miDbOO3M3g').success(function(data){
				c.stops = data;
				console.log(c.stops.results.items.length);
				for(i=0;i<data.results.items.length;i++)
				{
					$scope.pitStops[i] = c.stops.results.items[i];
				}
				if(c.stops.results.items.length == 0)
				{
					$scope.alertPitStops = true;
				}
			});
			$scope.showCuisines = false;
			$scope.showHotSpots = false;
			$scope.showDetails = false;
			$scope.showPlaces = false;
			$scope.showTransport = true;
			$scope.alertpBuildings = false;
		};

		
	});

	app.directive('myCountries', function(){
		return{
			restrict: 'E',
			templateUrl: 'my-countries.html'
		};
	});

	app.directive('cDetails', function(){
		return{
			restrict: 'E',
			templateUrl: 'c-details.html'
		};
	});

})();