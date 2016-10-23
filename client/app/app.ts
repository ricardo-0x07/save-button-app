// 'use strict';
const angular = require('angular');
// import ngAnimate from 'angular-animate';
const ngCookies = require('angular-cookies');
const ngResource = require('angular-resource');
const ngSanitize = require('angular-sanitize');
const infiniteScroll = require('ng-infinite-scroll');
import 'angular-socket-io';

const uiRouter = require('angular-ui-router');
const uiBootstrap = require('angular-ui-bootstrap');
const uiNotification = require('angular-ui-notification');
// const simpleTransition = require('simple-transition');
// const compassMixins = require('compass-mixins');
// const ngMessages = require('angular-messages');
// import ngValidationMatch from 'angular-validation-match';

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
// import home from './components/home/home.component';
import opportunities from './components/opportunities/opportunities.component';
import opportunity from './core/opportunity/opportunity.component';
import toast from './core/toast/toast.component';
import opportunityService from './core/services/opportunity/opportunity.service';
import swPrecacheReg from './core/services/preCacheServiceWorker/preCacheServiceWorker.service';
// import opportunitiesIndexedDbService from './core/services/opportunitiesIndexedDb/indexedDb';

import './app.scss';
angular.module('saveButtonAppApp', [
  ngCookies,
  ngResource,
  ngSanitize,
  // ngCordova,
  infiniteScroll,

  'btford.socket-io',

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
  // home,
  opportunity,
  toast,
  opportunities,
  swPrecacheReg,
  // opportunitiesIndexedDbService,
  opportunityService
])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth, preCacheServiceWorker) {
    preCacheServiceWorker._registerServiceWorker();
    console.log('preCacheServiceWorker', preCacheServiceWorker);
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
