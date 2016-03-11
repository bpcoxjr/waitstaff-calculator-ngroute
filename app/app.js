var app = angular.module('waitStaffApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
	//when 'home' nav clicked, use...
  $routeProvider.when('/', {
  		templateUrl : 'partials/about.html',
  	})
  	//when 'new meal' nav clicked, use...
    .when('/details', {
      templateUrl : 'partials/details.html',
      controller :'mealController'
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

app.controller('mealController', function($scope, $rootScope){
    //if submit button is clicked...
    $scope.submit = function(){
        $scope.submitted = true;
        $scope.$broadcast("calculate", $scope.input);
        $scope.submitted = false;
        clear();
        console.log("submitted!");
    }
    //if clear button is clicked
    $scope.cancel = function(){
        clear();
    };
    //called when reset or clear buttons are clicked
    function clear() {
      //clear input form...
      $scope.input = {
        meal_price: '',
        tax_rate: '',
        tip_percent: ''
      }
      //clear customer totals
      $scope.customer = {
        subtotal: 0.00,
        tip: 0.00,
        total:0.00
      }
    };

    //what to do when 'calculate' broadcast is received...
    $scope.$on("calculate", function(event, data) {
        $scope.customer.subtotal = data.meal_price + (data.meal_price * (data.tax_rate/100));
        $scope.customer.tip = data.meal_price * (data.tip_percent/100);
        $scope.customer.total = $scope.customer.subtotal + $scope.customer.tip;
        $rootScope.$broadcast("tip_result", $scope.customer);
    });
});

app.controller('earningsController', function($scope, $rootScope){

	$scope.earnings= {
        tip_total: 0.00,
        meal_count: 0,
        avg_tip: 0.00
  }
  //when 'tip_result' broadcast received, add to totals
  $scope.$on("tip_result", function(event, data) {
      $scope.earnings.tip_total += data.tip;
      $scope.earnings.meal_count += 1;
      $scope.earnings.avg_tip += $scope.earnings.tip_total / $scope.earnings.meal_count;
  });
  //reset values to zero when user clicks reset button
  function resetEarnings() {
    $scope.earnings = {
      tip_total: 0,
      meal_count: 0,
      avg_tip: 0
    }
  };

});

//how user clicks on nav links are handled...
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





