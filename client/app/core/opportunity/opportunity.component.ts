'use strict';
const angular = require('angular');
export interface IOpportunity {
  id: number;
  name: string;
  imagePath: string;
  description: string;
  location: string;
  created_at ?: string;
  updated_at ?: string;
};


export class opportunityComponent {
  public opportunity: IOpportunity;
  /*@ngInject*/
  constructor() {
    this.message = 'World';
    console.log('this', this);

  }
}

export default angular.module('saveButtonAppApp.opportunity', [])
  .component('opportunity', {
    template: require('./opportunity.component.html'),
    bindings: { opportunity: '<' },
    controller: opportunityComponent
  })
  .name;
