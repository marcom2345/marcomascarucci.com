(function(){
  'use strict';

  var marcomApp = angular.module('marcomApp', ['ngRoute']).run(run);

  run.$inject = ['$rootScope', '$location', '$window'];
  function run($rootScope, $location, $window) {
    $window.ga('create', 'UA-90848036-1', 'auto');
    $window.ga('send', 'pageview', $location.path());
  }

  marcomApp.config(['$routeProvider',
    function($routeProvider){
      $routeProvider
        .when('/', {
          templateUrl: 'home.html',
          controller: 'HomeController',
        })
        .when('/about', {
          templateUrl: 'about.html',
        })
        .when('/contact', {
          templateUrl: 'contact.html',
          controller: 'ContactController',
        })
        .when('/projects', {
          templateUrl: 'projects.html',
          controller: 'ProjectController',
        })
        .when('/projects/:project_id', {
          templateUrl: 'project_info.html',
          controller: 'ProjectController',
        })
        .otherwise({
          redirectTo: '/'
        });
    }
  ]);

  marcomApp.controller('BodyController', ['$scope',
    function($scope){
      $scope.footer = true;
    }
  ]);

  marcomApp.controller('HomeController', ['$scope', '$http',
    function($scope, $http){
      $scope.projects = [];

      $http.get('data/projects.json' + '?' + new Date().getTime())
        .then(function(response){
          $scope.projects = response.data;
        });
    }
  ]);

  marcomApp.controller('ContactController', ['$scope', '$http',
    function($scope, $http){
      $scope.data = { choice: 1 };
      $scope.success = false;

      $scope.submit = function() {
        $http.post('http://marcomascarucci.com:3000/contact', {
          choice:  $scope.data.choice,
          from:    $scope.data.from,
          subject: $scope.data.subject,
          message: $scope.data.message,
        })
          .then(
            function() {
              $scope.data = { choice: 1 };
              $scope.success = true;
            },
            function() {
              alert('Si è verificato un errore. Riprova più tardi.');
            }
          );
      }
    }
  ]);

  marcomApp.controller('ProjectController', ['$scope', '$routeParams', '$http', '$filter',
    function($scope, $routeParams, $http, $filter){
      $scope.projects = [];
      $scope.currentProject = {};

      $http.get('data/projects.json' + '?' + new Date().getTime())
        .then(function(response){
          $scope.projects = response.data;

          if (!$routeParams.project_id) {
            $scope.currentProject = $scope.projects[0];
            return;
          }

          var found = $filter('filter')($scope.projects, {
            id: $routeParams.project_id
          }, true);

          $scope.currentProject = found[0];
        });
    }
  ]);
})();
