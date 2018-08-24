

var winReactions = ['😀','😍','👻','😺','👍','👏','✌️','🤟','🎩','🕶','🦄','🐳','🍄']
var loseReactions = ['🐓','🐣','😾','👎','🍎']
var App = angular.module('gogol', ['ngAnimate']);
App.controller('index', ['$scope', '$http', '$location', '$timeout', function ($scope, $http, $location, $timeout) {
   
    $scope.data = [];

    var currentTime = new Date();
var currYear = currentTime.getFullYear();
    // get game data
    $http.post("https://flutterflutter.herokuapp.com/api/nextchallenge")
    .then(function(response) {
        console.log(response.data);
        for (var i = 0; i < response.data.length; i++) {
            $scope.data.push({
                name: response.data[i].name,
                age: currYear - response.data[i].year,
                img: response.data[i].image,
                isMale: response.data[i].is_male
            });
        }
$scope.initGame();

    });
   
   
    var queueTimeOut = 1500;

    $scope.gameState = {
        currState:'wait'
    };

    


$scope.initGame = function() {
    $scope.charecterQueue = [];
$scope.emojiStack = [];
$scope.currQuestion = $scope.data[0];
$scope.currQuestionPos = 0;
$scope.isCounting=false;
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
    for(var i=0;i<20;i++) {
        $timeout (function(){
            $scope.emojiStack.push(winReactions[Math.floor(Math.random() * winReactions.length)]);
        }, 50*i);
    }
    


}    else {

    $scope.gameState.currState = 'loseScreen';
    for(var i=0;i<20;i++) {
        $timeout (function(){
            $scope.emojiStack.push(loseReactions[Math.floor(Math.random() * loseReactions.length)]);
        }, 50*i);
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



    // generate random positions 
    $scope.randomPos = [];
    for (j=0;j<100;j++)
    {
        $scope.randomPos[j]= Math.floor((Math.random() * 200) - 100);

    }

        

// $scope.getRandom = function(){
//     return Math.floor((Math.random()*500)+1);
//   }



}]);