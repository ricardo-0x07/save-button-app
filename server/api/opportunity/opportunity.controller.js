/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/opportunitys              ->  index
 * POST    /api/opportunitys              ->  create
 * GET     /api/opportunitys/:id          ->  show
 * PUT     /api/opportunitys/:id          ->  upsert
 * PATCH   /api/opportunitys/:id          ->  patch
 * DELETE  /api/opportunitys/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import sqldb from '../../sqldb';
import { Opportunity, File } from '../../sqldb';
var webPush = require('web-push');
webPush.setGCMAPIKey('AIzaSyCiHGnS84m-QlGEJXDvGS0zoMUBCw7cn7c');

// Send Push Notification to Opportunity Notification Subscribers
function sendPushNotification(opportunity) {
  sqldb.Subscription.findAll()
    .then(function (response) {
      var i;
      for (i = 0; i < (response.length); i++) {
        var subscriber = response[i].dataValues;
        var pushSubscription = JSON.parse(subscriber.subscription);
        // var pushSubscription = {
        //   endpoint: subscriber.endpoint,
        //   keys: {
        //     p256dh: subscriber.p256dh,
        //     auth: subscriber.auth
        //   }
        // };
        webPush.sendNotification(pushSubscription, JSON.stringify({
          action: 'opportunityNotification',
          name: 'Opportunity',
          msg: opportunity.description,
          opportunityId: opportunity.id
        }))
        .then(function(response) {
          console.log('push notification response', response);
        })
        .catch(function(error) {
          console.log('push notification error', error);
        });
      };
    });
}
function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {

    if (entity) {
      // return res.status(statusCode).json(entity);
      res.status(statusCode).json(entity);
      return entity;
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function (entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch (err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    console.log('error', err);
    res.status(statusCode).send(err);
  };
}

// Gets a list of Opportunitys
export function index(req, res) {
  return Opportunity.findAll({ include: [{ model: sqldb.File }] })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Opportunity from the DB
export function show(req, res) {
  return Opportunity.find({
    include: [{
      model: File,
      where: {
        id: req.params.id
      }
    }]
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Opportunity in the DB
export function create(req, res) {
  return Opportunity.create(req.body, { include: [sqldb.File] })
    .then(respondWithResult(res, 201))
    .then(sendPushNotification)
    .catch(handleError(res));
}

// Upserts the given Opportunity in the DB at the specified ID
export function upsert(req, res) {
  if (req.body.id) {
    delete req.body.id;
  }

  return Opportunity.upsert(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Opportunity in the DB
export function patch(req, res) {
  if (req.body.id) {
    delete req.body.id;
  }
  return Opportunity.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Opportunity from the DB
export function destroy(req, res) {
  return Opportunity.find({
    where: {
      id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
