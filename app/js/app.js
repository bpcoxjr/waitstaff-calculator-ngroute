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
    //if submit button is clicked:
    $scope.submit = function(){
        $scope.submitted = true;
        $rootScope.$broadcast("calculate", $scope.input); //let the customerController know what's been submitted
        $scope.submitted = false;
        clear();
        console.log("submitted!");
    }
    //if clear button is clicked, call clear function
    $scope.cancel = function(){
        clear();
        console.log("Clear!");
    };

    function clear(){
      $scope.input = {
        meal_price: '',
        tax_rate: '',
        tip_percent: ''
      }
    };
});

/*app.controller('customerTotalsController', function($scope, $rootScope) {
    //customer totals begin at zero
    $scope.customer={
        subtotal:0,
        tip:0,
        total:0
    }
    $scope.$on("calculate", function(event, data) {
        resetCustomerTotals(); //clear previous customer total when new customer data submitted
        $scope.customer.subtotal = data.meal_price + (data.meal_price * (data.tax_rate/100));
        $scope.customer.tip = data.meal_price * (data.tip_percent)/100;
        $scope.customer.total = $scope.customer.subtotal + $scope.customer.tip;
        $rootScope.$broadcast("tip_result", $scope.customer); //let earningsController know customer results
    });

    function resetCustomerTotals() {
        $scope.customer= {
            subtotal:0.00,
            tip:0.00,
            total:0.00
        }
    }
});*/

app.controller('earningsController', function($scope, $rootScope){

  $scope.earnings= { //everything at zero to begin with
        tip_total: 0.00,
        meal_count: 0,
        avg_tip: 0.00
  }
  //when 'tip_result' broadcast received, add to totals
  $scope.$on("tip_result", function(event, data) {
      console.log("Tip results received!");
      $scope.earnings.tip_total += data.tip;
      $scope.earnings.meal_count += 1;
      $scope.earnings.avg_tip += $scope.earnings.tip_total / $scope.earnings.meal_count;
  });

  $scope.$on("reset", function() { //clear everything out when reset button clicked
      $scope.earnings = {
        tip_total: 0,
        meal_count: 0,
        avg_tip: 0
      }
      console.log("Earnings reset!");
  });
});

app.controller('resetController', function($scope, $rootScope){
  $scope.reset = function(){
    $rootScope.$broadcast("reset");
    console.log("Reset clicked!");
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





