'use strict';
const angular = require('angular');
import IOpportunity from '../../interfaces/opportunity.interface';

export interface IOpportunityService {
		getOppertunities();
}

/*@ngInject*/
class OpportunityService implements IOpportunityService {
  private opportunities: IOpportunity[] = [
    { id: 1, name: 'electronics', imagePath: '../images/deal1.jpeg', description: ' Best Buy has one day sale 50% off electronics. Today Only.' },
    { id: 2, name: 'Microwave food', imagePath: '../images/deal2.jpeg', description: ' Truevalues 50% sale on djouno Pizza.' },
    { id: 3, name: 'Chistmas sale', imagePath: '../images/deal3.jpeg', description: ' Walmart sale on toys and gift. Starts Today.' }
  ];

  constructor() {
    console.log('this', this);
  }
  getOppertunities() {
    console.log('this.opportunities', this.opportunities);
    return this.opportunities;
  }
}

export default angular.module('saveButtonAppApp.opportunity.service', [])
  .service('OpportunityService', OpportunityService).name;
