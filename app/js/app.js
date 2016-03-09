var app = angular.module('waitStaffApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
	//when 'home' clicked, use...
  $routeProvider.when('/', {
  		templateUrl : 'partials/about.html',
  		controller : 'homeController'
  	})
  	//when 'new meal' nav clicked, use...
    .when('/details', {
      templateUrl : 'partials/details.html',
      controller :'detailsController'
    })
    //when 'my earnings' nav clicked, use...
    .when('/earnings', {
      templateUrl : 'partials/earnings.html',
      controller :'earningsController'
    })
    //if anything else happens, go home...
    .otherwise({
      redirectTo : '/'
    });
}]);

/*app.service('sumOfMealsService', function(){
	//keep meals in an array...
	var mealsArray = [];

	//keep total value of meals data...
	var totalData = {
		meal_count: 0,
		tip_total: 0,
		avg_tip: 0.00
	};

	return {
		addMeal: function(meal){
			mealsArray.push(meal);
			totalData.meal_count ++;
			totalData.tip_total += customer.subtotal;
			totalData.avg_tip += (totalData.tip_total/totalData.meal_count)
		},
		getMeals: function(){
			return mealsArray;
		},
		getMealsTotalData: function(){
			return totalData;
		},
		resetEverything: function(){
			mealsArray.length = 0;
			totalData = {
				mealsArray: 0,
				tip_total: 0,
				avg_tip: 0
			};
		}
	};
});

app.controller('mealController', function ($scope, sumofMealsService){
	
	$scope.meal_count = 1;

	//if submit button is clicked...
    $scope.submit = function() {
        $scope.submitted = true;
        $rootScope.$broadcast("calculate", $scope.input);
        $scope.submitted = false;
        resetForm();
    }
    //if reset button is clicked...
    $scope.$on("reset", function() {
        resetForm();
    });
    //if cancel button is clicked...
    $scope.cancel = function() {
        resetForm();
    };
    //called when reset is clicked...
    function resetForm() {
        $scope.input = {
            meal_price:0,
            tax_rate:0,
            tip_percent:0
        };
    }
});

app.controller('earningsController', function(){
	$scope.earnings= {
        tip_total:0.00,
        meal_count:0,
        avg_tip:0.00
    }
    $scope.$on("tip_result", function(event, data) {
        $scope.earnings.tip_total += data.tip;
        $scope.earnings.meal_count += 1;
        $scope.earnings.avg_tip += $scope.earnings.tip_total / $scope.earnings.meal_count;
    });
    $scope.$on("reset", function() {
        $scope.earn= {
        tip_total:0,
        meal_count:0,
        avg_tip:0
    	}
    });
});*/

app.controller('navigationController', [ '$scope', function($scope, $location) {
  $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };

    $scope.classActive = function(viewLocation) {
      if($scope.isActive(viewLocation)) {
        return 'active';
      }
      else {
        return 'inactive';
      }
    };
}]);





