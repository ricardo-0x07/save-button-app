'use strict';
/* global require, window, navigator */

var IndexController = function () {
};

IndexController.prototype.myIdbHandler = function (request, values, options) {
  var _that = this;
  if (!this._dbPromise) {
    this._dbPromise = self.idb.open('save-button-db', 1, function (upgradeDb) {
      upgradeDb.createObjectStore('opportunities', {
        keyPath: 'url'
      });
    });
  }
  this.status = function (response) {
    var responseText;
    var response2 = response.clone();
    return response2.text()
      .then(function (text) {
        responseText = text;
        _that._storeOpportunityData({ url: response2.url, text: text });
        return new Response(responseText);
      })
      .then(function () {
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response);
        }
        return Promise.reject(new Error(response.statusText));
      });
  };

  this._storeOpportunityData = function (data) {
    // console.log('db open');
    this._dbPromise.then(function (db) {
      if (!db) {
        return;
      }

      var tx = db.transaction('opportunities', 'readwrite');
      var store = tx.objectStore('opportunities');
      store.put(data);
      return tx.complete;
    });
  };

  this._checkIdb = function (url) {
    console.log('url', url);
    return this._dbPromise.then(function (db) {
      if (!db) {
        return Promise.reject(new Error('no db'));
      }
      console.log("return db.transaction('opportunities')");
      return db.transaction('opportunities')
        .objectStore('opportunities').get(url);
    });
  };
  this.fetchOpportunities = function (request) {
    this.urlUse = '';
    this.urlUse = request.url;
    return self.fetch(request)
      .then(_that.status)
      .catch(function (error) {
        console.log('Request failed', error);
      });
  };

  return this._checkIdb(request.url).then(function (data) {
    if (data) {
      console.log('data', data);
      return new Response(data.text);
    }
    console.log(' _that.fetchOpportunities(request)');
    return _that.fetchOpportunities(request);
  })
  .then(function() {
    console.log('return _that.fetchOpportunities(request);');
    return _that.fetchOpportunities(request);
  })
  .catch(function () {
    console.log('error fect ops');
    return _that.fetchOpportunities(request);
  });
};
module.exports = new IndexController();
