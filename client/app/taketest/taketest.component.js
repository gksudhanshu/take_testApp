'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './taketest.routes';

export class TaketestComponent {
  /*@ngInject*/
  constructor($http, $scope, Auth) {
    this.Auth = Auth;

    this.$scope = $scope;
    this.$http = $http;
    this.currentUser = {};
    $scope.answers = {};
    $scope.correctCount = 0;
    $scope.isSubmitted=false;
    /**
     * calculating result and submit
     */
    $scope.SubmitTest = function () {
      $scope.correctCount = 0;
      $scope.isSubmitted=true;
      var qLength = $scope.questions.length;
      for (var i = 0; i < qLength; i++) {
        var answers = $scope.questions[i].Options;
        $scope.questions[i].userAnswerCorrect = false;
        $scope.questions[i].userAnswer = $scope.answers[i];
        for (var j = 0; j < answers.length; j++) {
          answers[j].selected = "donno";
          if ($scope.questions[i].userAnswer === answers[j].Name && answers[j].IsCorrect === true) {
            $scope.questions[i].userAnswerCorrect = true;
            answers[j].selected = "true";
            $scope.correctCount++;
          } else if ($scope.questions[i].userAnswer === answers[j].Name && answers[j].IsCorrect === false) {
            answers[j].selected = "false";
          }
        }
      }
      /**
       * update score
       */
      
      let ans=$scope.questions.map(qstn=>{
        return {QuestionNo:qstn.QuestionNo,MarkedAnswer:qstn.userAnswer}
      })
      console.log('ans: ',ans)
      $http.put(`/api/tests/${$scope.userEmail}`, {
        correctAnswer: $scope.correctCount,
        Answers: ans
      }).then(res => {
        console.log('Score updated ')
      });

    };


  }

  $onInit() {
    /**
     * Get 5 random questions and insert into test collection
     */
    this.$http.get('/api/questionpools')
      .then(response => {
        this.$scope.questions = response.data;
        /**
         * Get current user
         */
        this.Auth.getCurrentUser().then(res => {
          this.currentUser.Name = res.name;
          this.currentUser.Email = res.email;
          this.currentUser.Starttime = new Date();
          this.currentUser.QuestionNumber = this.$scope.questions.map(vn => {
            return vn.QuestionNo
          });
          this.$scope.userEmail = res.email;
          let testObject = this.currentUser
          /**
           * check user has already taken test or not
           */

          this.$http.get(`/api/tests/${res.email}`).then(res => {
            if (res.data.length === 0) {
              /**
               * Create test
               */
              this.$http.post('/api/tests', {
                testObject
              }).then(res => {
                console.log('Test created: ')
              });
            }else{
              this.$scope.questions=[]
              this.$scope.notAuthorized=true;
              alert("Sorry! You can't Proceed. Please contact us.!!");
            }
          });



        })

      });

  }
}

export default angular.module('testApp.taketest', [uiRouter])
  .config(routes)
  .component('taketest', {
    template: require('./taketest.html'),
    controller: TaketestComponent,
    controllerAs: 'taketestCtrl'
  })
  .name;
