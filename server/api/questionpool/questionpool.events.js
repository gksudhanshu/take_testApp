/**
 * Questionpool model events
 */

'use strict';

import {EventEmitter} from 'events';
var QuestionpoolEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
QuestionpoolEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Questionpool) {
  for(var e in events) {
    let event = events[e];
    Questionpool.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    QuestionpoolEvents.emit(event + ':' + doc._id, doc);
    QuestionpoolEvents.emit(event, doc);
  };
}

export {registerEvents};
export default QuestionpoolEvents;
