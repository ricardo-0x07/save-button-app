'use strict';
const angular = require('angular');

/*@ngInject*/
export function opportunitiesIndexedDbService($window) {
  console.log('$window', $window);
  // AngularJS will instantiate a singleton by calling "new" on this function
  return {
    urlUse: '',
    stnUrlUse:'',
 openDatabase: function() {
      $window.idb = require('idb');
      return $window.idb.open('save-button-db', 1, function (upgradeDb) {
        console.log('openDatabase');
        upgradeDb.createObjectStore('opportunities', {
          keyPath: 'url'
        });
      });
  },
  _checkIdb: function(url) {
    return this.openDatabase().then(function (db) {
      if (!db) {
        return;
      }
      var tx = db.transaction('opportunities');
      var store = tx.objectStore('opportunities');
      return store.get(url);
    });
  },
  fetchOpportunities: function(request) {
    this.urlUse = '';
    this.urlUse = request.url;
    return $window.fetch(request)
      .then(this.status)
      // .then(text)
      .catch(function (error) {
        console.log('Request failed', error);
      });
  },
  _storeOpportunityData: function(data) {
    console.log('db open');
    this.openDatabase().then(function (db) {
      if (!db) {
        return;
      }

      var tx = db.transaction('opportunities', 'readwrite');
      var store = tx.objectStore('opportunities');
      store.put(data);
      return tx.complete;
    });
  },
  status: function(response) {
    var response2 = response.clone();
    response2.text()
      .then(function (text) {
        console.log('text', text);
        this._storeOpportunityData({ url: response2.url, text: text });
      });
    // console.log('data2', data2);
    console.log('response', response);
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    }
    return Promise.reject(new Error(response.statusText));
  },
  myIdbHandler:  function (request, values, options) {
    this._checkIdb(request.url)
      .then(function (data) {
        console.log('data', data);
        return new Response(data.text);
      })
      .catch(function () {
        // console.log(error);
        return this.fetchOpportunities(request);
      });
  }

}
}

export default angular.module('saveButtonAppApp.opportunitiesIndexedDb', [])
  .service('opportunitiesIndexedDb', opportunitiesIndexedDbService)
  .name;
