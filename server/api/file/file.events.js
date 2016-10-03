/**
 * File model events
 */

'use strict';

import {EventEmitter} from 'events';
var File = require('../../sqldb').File;
var FileEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FileEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  File.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    FileEvents.emit(event + ':' + doc.id, doc);
    FileEvents.emit(event, doc);
    done(null);
  };
}

export default FileEvents;
