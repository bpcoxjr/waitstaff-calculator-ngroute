//declare 'waitStaffApp' as an Angular module relying on ngRoute, store in 'app' variable
var app = angular.module('waitStaffApp', ['ngRoute']);

//global variables
app.value('earnings', [])//empty array to store earnings values in

//
app.config(['$routeProvider', function($routeProvider) {
  //when 'home' nav clicked, use...
  $routeProvider.when('/', {
      templateUrl : 'partials/about.html',
    })
    //when 'new meal' nav clicked, use...
    .when('/details', {
      templateUrl : 'partials/details.html',
      controller :'inputController'
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

//controller that takes meal price, tax rate, and tip % as input and calculates customer totals
app.controller('inputController', function($scope, earnings){
  //everything clear to begin with
  $scope.input = {
    meal_price: null,
    tax_rate: null,
    tip_percent: null
  };
  $scope.customer = {
    subtotal: 0,
    tip: 0,
    total: 0
  }
  //if submit button is clicked
  $scope.submit = function(){
      $scope.submitted = true;
      calculateMeal($scope.input);
      calculateEarnings($scope.input);
      $scope.submitted = false;
      clear();
      console.log("submitted!");
  }
  //if clear button is clicked, call clear function
  $scope.cancel = function(){
    clear();
  }
  function clear(){
      $scope.input = {
      meal_price: null,
      tax_rate: null,
      tip_percent: null
    }
      console.log("Clear!");
  };
  //do the math on subtotal, tip, and total
  function calculateMeal(input) {
      resetCustomerTotals(); //clear previous customer total when new customer data submitted
      $scope.customer.subtotal = input.meal_price + (input.meal_price * (input.tax_rate/100));
      $scope.customer.tip = input.meal_price * (input.tip_percent)/100;
      $scope.customer.total = $scope.customer.subtotal + $scope.customer.tip;
      //$rootScope.$broadcast("tip_result", $scope.customer); //let earningsController know customer results
  };
  function resetCustomerTotals() {
      $scope.customer= {
          subtotal:0.00,
          tip:0.00,
          total:0.00
      }
  }
  //push customer submitted data into array that can be accessed by 'earningsController'
  function calculateEarnings(input){
    earnings.push({'meal_price':input.meal_price, 'tax_rate':input.tax_rate, 'tip_percent': input.tip_percent});
  } 
});

//controller that calculates total tips, total meal count, and average tip per meal
app.controller('earningsController', function($scope, earnings){
  $scope.earnings= { //everything at zero to begin with
        tip_total: 0.00,
        meal_count: 0,
        avg_tip: 0.00
  }
  //loop through each meal in the global earnings array to calculate earnings
  for(var meal in earnings){ 
    $scope.earnings.tip_total += earnings[meal].meal_price * (earnings[meal].tip_percent/100);
    $scope.earnings.meal_count += 1;
    $scope.earnings.avg_tip = $scope.earnings.tip_total / $scope.earnings.meal_count;
    console.log(earnings.tip_total);
  } 
  $scope.reset = function(){
    $scope.earnings = {
        tip_total: 0,
        meal_count: 0,
        avg_tip: 0
    }
    console.log("Reset clicked, earnings reset!");
  };
});
