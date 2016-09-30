'use strict';
const angular = require('angular');
import SignupController from './signup.controller';

export default angular.module('saveButtonAppApp.signup', [])
    .controller('SignupController', SignupController)
    .name;
