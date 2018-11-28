import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  awesomeThings = [];
  newThing = '';

  /*@ngInject*/
  constructor($http,$state, $scope, Auth, socket) {
    this.$http = $http;
    this.Auth = Auth;
    this.$scope=$scope;
    this.socket = socket;
    $scope.getCurrentUser = Auth.getCurrentUserSync;
    console.log($scope.getCurrentUser().role)
    if($scope.getCurrentUser().role==='admin'){
      $state.go('admin')
    }


  }

  $onInit() {
    this.Auth.getCurrentUser().then(res => {
      this.$http.get(`/api/tests/${res.email}`).then(res => {
        this.$scope.isTestAllowed = false;
        if (res.data.length>0) {
          this.$scope.isTestAllowed = true;
        }
      });
    })

  }

}

export default angular.module('testApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
