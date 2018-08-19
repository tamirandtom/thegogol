var App = angular.module('gogol', ['ngAnimate']);
App.controller('index', ['$scope', '$http', '$location', function ($scope, $http, $location, $interval) {

    $scope.data = [{
        name: 'tamir',
        age: '30',
        img: 'http://foo.jpg'
    }, {
        name: 'faa',
        age: '10',
        img: 'http://foo.jpg'
    }, {
        name: 'fii',
        age: '20',
        img: 'http://foo.jpg'
    }
    , {
        name: 'fii',
        age: '40',
        img: 'http://foo.jpg'
    }
    , {
        name: 'fii',
        age: '50',
        img: 'http://foo.jpg'
    }
    , {
        name: 'fii',
        age: '10',
        img: 'http://foo.jpg'
    }
    , {
        name: 'fii',
        age: '45',
        img: 'http://foo.jpg'
    }
    , {
        name: 'fii',
        age: '20',
        img: 'http://foo.jpg'
    }];


$scope.charecterQueue = [];

$scope.currQuestion = $scope.data[0];
$scope.currQuestionPos = 0;
$scope.isCounting=false;

$scope.initGame = function() {
    $scope.charecterQueue.push($scope.data[0]);  
    $scope.charecterQueue.push($scope.data[1]); 
$scope.currQuestionPos = 1;
}

$scope.nextMove = function() {
    $scope.currQuestionPos++;
    $scope.charecterQueue.push($scope.data[$scope.currQuestionPos++]);  
}



$scope.countto = function(num) {
    $scope.charecterQueue[$scope.charecterQueue.length-1]=0;

    $interval(function () {
        if ( $scope.charecterQueue[$scope.charecterQueue.length-1].age < num)
        {
        $scope.charecterQueue[$scope.charecterQueue.length-1].age++;
    }
    }, 1000);
}

$scope.checkWin = function(more) {
    if (($scope.charecterQueue[$scope.charecterQueue.length-1].age > $scope.charecterQueue[$scope.charecterQueue.length-2].age && more == 'more') || ($scope.charecterQueue[$scope.charecterQueue.length-1].age <= $scope.charecterQueue[$scope.charecterQueue.length-2].age && more == 'less')) {        
        console.log('win!');

        $scope.nextMove();
    } else {
        console.log('lose');
        $scope.nextMove();
    }

}



$scope.initGame();

}]);