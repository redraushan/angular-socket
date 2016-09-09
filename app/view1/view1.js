'use strict';

angular.module('myApp.view1', ['ngRoute','ngStomp'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.factory('socketService',function($stomp,$log){
    $stomp.setDebug(function (args) {
        $log.debug(args)
    });

    var incoming =

    $stomp
        .connect('http://localhost:8080/stomp')

        // frame = CONNECTED headers
        .then(function (frame) {
            var subscription = $stomp.subscribe('/topic/pets', function (message, headers, res) {
                 incoming = JSON.stringify(message);

            }, {
                'headers': 'are awesome'
            });
        })

     return incoming;

})
.controller('View1Ctrl', ['$stomp','$log','$scope',function($stomp,$log,$scope) {

    $scope.message = 'Waiting...';
    $scope.author = 'Raushan';

    $stomp.setDebug(function (args) {
        $log.debug(args)
    });

    $stomp
        .connect('http://localhost:8080/stomp')

        // frame = CONNECTED headers
        .then(function (frame) {
            var subscription = $stomp.subscribe('/topic/pets', function (message) {
                $scope.message = JSON.stringify(message);
                $scope.$apply();

            }, {
                'headers': 'are awesome'
            });
        })





}]);