'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('test', {
      url: '/taketest',
      template: '<taketest></taketest>'
    });
}
