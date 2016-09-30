'use strict';
const angular = require('angular');
import LoginController from './login.controller';

export default angular.module('saveButtonAppApp.login', [])
  .controller('LoginController', LoginController)
  .name;
