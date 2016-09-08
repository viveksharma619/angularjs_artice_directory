var myApp = angular.module('myApp',[ 'ui.router', 'ngResource']);

myApp.config(function( $stateProvider, $urlRouterProvider){
    
    $urlRouterProvider.otherwise('/home');

    $stateProvider
    .state('home', {
        url:'/home',
        templateUrl:'pages/home.html' ,
        controller:'homeController as home',
    })
    .state('result', {
        url:'/result',
        templateUrl:'pages/result.html' ,
        controller:'resultController as result',
         params:{
             home: null
        }
    });
});
//service
myApp.service('searchService', function($resource){
    
    this.search = function (q, begin_date, end_date, page){
        var articleAPI =  $resource('https://api.nytimes.com/svc/search/v2/articlesearch.json');
        var articleData = articleAPI.get({ 'api-key' :'b5dd2eb9cbc94d92abdffbaea8260f6c', q : q , begin_date : begin_date , end_date : end_date, page : page });
        return articleData;
    }
});
//controllers
myApp.controller('homeController', function($state){
    var home  = this;
    home.q = null;
    home.end_date = new Date();
    home.begin_date = new Date();
    home.page = 1;
  
    home.sendData = sendData;
    
    function sendData(){
        console.log(home);
        $state.go('result',{ home: home  });
    }
});

myApp.controller('resultController', function($state, $stateParams, searchService){
    var result = this;
    result.q = $stateParams.home.q;
    result.begin_date = moment($stateParams.home.begin_date).format('YYYYMMDD');
    result.end_date = moment($stateParams.home.end_date).format('YYYYMMDD');
    result.page = $stateParams.home.page;
    result.data = searchService.search(result.q , result.begin_date, result.end_date, result.page);
    
  console.log(result.data);
});