/**
 * Subscription model events
 */

'use strict';

import {EventEmitter} from 'events';
var Subscription = require('../../sqldb').Subscription;
var SubscriptionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SubscriptionEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Subscription.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    SubscriptionEvents.emit(event + ':' + doc.id, doc);
    SubscriptionEvents.emit(event, doc);
    done(null);
  };
}

export default SubscriptionEvents;
