

var winReactions = ['😀','😍','👻','😺','👍','👏','✌️','🤟','🎩','🕶','🦄','🐳','🍄']
var loseReactions = ['🐓','🐣','😾','👎','🍎']
var App = angular.module('gogol', ['ngAnimate']);
App.controller('index', ['$scope', '$http', '$location', '$timeout', function ($scope, $http, $location, $timeout) {
    var queueTimeOut = 1500;
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

    $scope.gameState = {
        currState:'wait'
    };

    
$scope.charecterQueue = [];

$scope.emojiStack = [];

$scope.currQuestion = $scope.data[0];
$scope.currQuestionPos = 0;
$scope.isCounting=false;

$scope.initGame = function() {
    $scope.charecterQueue.push($scope.data[0]);  
    $scope.charecterQueue.push($scope.data[1]); 
$scope.currQuestionPos = 1;
$scope.gameState.currState = 'wait';
}

$scope.nextMove = function() {
    console.log('nextmove');
    $scope.currQuestionPos++;
    $scope.charecterQueue.push($scope.data[$scope.currQuestionPos++]);  
    $scope.gameState.currState = 'wait';
}

$scope.verdict = function(v) {
    $scope.emojiStack=[];

if (v=='win')
{
    $scope.gameState.currState = 'winScreen';

    // move forawrd
    $timeout( function(){
        $scope.nextMove();
    }, queueTimeOut );

    // emoji waterfall
    for(var i=0;i<30;i++) {
        $timeout (function(){
            $scope.emojiStack.push(winReactions[Math.floor(Math.random() * winReactions.length)]);
        }, 200*i);
    }
    


}    else {

    $scope.gameState.currState = 'loseScreen';
    for(var i=0;i<30;i++) {
        $timeout (function(){
            $scope.emojiStack.push(loseReactions[Math.floor(Math.random() * loseReactions.length)]);
        }, 200*i);
    }

    // end the game
        $timeout( function(){
    $scope.endGame();
        }, queueTimeOut );

} 
}

$scope.checkWin = function(more) {
    $scope.gameState.currState = 'halt';
    if (($scope.charecterQueue[$scope.charecterQueue.length-1].age > $scope.charecterQueue[$scope.charecterQueue.length-2].age && more == 'more') || ($scope.charecterQueue[$scope.charecterQueue.length-1].age <= $scope.charecterQueue[$scope.charecterQueue.length-2].age && more == 'less')) {        
        $scope.verdict('win');
    } else {
        $scope.verdict('lose');
    }

}


$scope.endGame = function() { 
//TODO
$scope.gameState.currState = 'end';

}

$scope.initGame();

}]);