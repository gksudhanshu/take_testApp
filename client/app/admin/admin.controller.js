'use strict';

export default class AdminController {
  /*@ngInject*/
  constructor($http,$scope) {
    $http.get(`/api/tests`).then(res=>{
      $scope.users=res.data;
    })
  }

 
}
