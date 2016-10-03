/**
 * Opportunity model events
 */

'use strict';

import {EventEmitter} from 'events';
var Opportunity = require('../../sqldb').Opportunity;
var OpportunityEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
OpportunityEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Opportunity.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    OpportunityEvents.emit(event + ':' + doc.id, doc);
    OpportunityEvents.emit(event, doc);
    done(null);
  };
}

export default OpportunityEvents;
