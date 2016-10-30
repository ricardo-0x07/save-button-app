// 'use strict';
const angular = require('angular');
const ngCookies = require('angular-cookies');
const ngResource = require('angular-resource');
const ngSanitize = require('angular-sanitize');
const infiniteScroll = require('ng-infinite-scroll');
import 'angular-socket-io';

const uiRouter = require('angular-ui-router');
const uiBootstrap = require('angular-ui-bootstrap');
const uiNotification = require('angular-ui-notification');

import {routeConfig} from './app.config';
import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';
import opportunities from './components/opportunities/opportunities.component';
import newOpportunity from './components/newOpportunity/newOpportunity.component';
import newOpportunityCamera from './components/newOpportunityCamera/newOpportunityCamera.component';
import newOpportunityPhoto from './components/newOpportunityPhoto/newOpportunityPhoto.component';
import opportunity from './core/opportunity/opportunity.component';
import toast from './core/toast/toast.component';
import opportunityService from './core/services/opportunity/opportunity.service';
import swPrecacheReg from './core/services/preCacheServiceWorker/preCacheServiceWorker.service';
import photoCaptureService from './core/services/photoCapture/photoCapture.service';

import './app.scss';
angular.module('saveButtonAppApp', [
  ngCookies,
  ngResource,
  ngSanitize,
  infiniteScroll,
  'btford.socket-io',
  newOpportunity,
  newOpportunityCamera,
  newOpportunityPhoto,
  photoCaptureService,
  uiRouter,
  uiBootstrap,
  uiNotification,
  _Auth,
  account,
  admin,  navbar,
  footer,
  main,
  constants,
  socket,
  util,
  opportunity,
  toast,
  opportunities,
  swPrecacheReg,
  opportunityService
])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth, preCacheServiceWorker) {
    preCacheServiceWorker._registerServiceWorker();
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document, ['saveButtonAppApp'], {
      strictDi: true
    });
  });
