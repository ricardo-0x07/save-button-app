'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './opportunities.routes';

import Opportunity from '../../core/opportunity/opportunity.component';

// import OpportunityService from '../../core/services/opportunity.service';

export interface IOppertunity {
  id: number;
  name: string;
  imagePath: string;
  description: string;
  location: string;
  created_at ?: string;
  updated_at ?: string;
};


export class OpportunitiesComponent {
  public opportunities: Opportunity[] = [];
  /*@ngInject*/
  constructor(public opportunityService) {
    this.opportunities = this.opportunityService.
    console.log('this', this)
  }
}

export default angular.module('saveButtonAppApp.opportunities', [uiRouter, Opportunity])
  .config(routes)
  .component('opportunities', {
    template: require('./opportunities.html'),
    controller: OpportunitiesComponent,
    bindings: { opportunities: '<' }
    // controllerAs: 'opportunitiesCtrl'
  })
  .name;
