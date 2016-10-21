'use strict';
/* global require, window, navigator */
// console.log('global', global);


// function openDatabase() {
//     var idb = require('idb');
//     return idb.open('save-button-db', 1, function (upgradeDb) {
//         console.log('openDatabase');
//         upgradeDb.createObjectStore('opportunities', {
//             keyPath: 'url'
//         });
//     });
// };

var IndexController = function () {
    // this._dbPromise = openDatabase();
};

// IndexController.prototype._checkIdb = function (url) {
//     return this._dbPromise.then(function (db) {
//         if (!db) {
//             return;
//         }
//         var tx = db.transaction('opportunities');
//         var store = tx.objectStore('opportunities');
//         return store.get(url);
//     });
// };

// IndexController.prototype.fetchOpportunities = function (request) {
//     this.urlUse = '';
//     this.urlUse = request.url;
//     return this.fetch(request)
//         .then(this.status)
//         // .then(text)
//         .catch(function (error) {
//             console.log('Request failed', error);
//         });
// };

// IndexController.prototype._storeOpportunityData = function (data) {
//     console.log('db open');
//     this._dbPromise.then(function (db) {
//         if (!db) {
//             return;
//         }

//         var tx = db.transaction('opportunities', 'readwrite');
//         var store = tx.objectStore('opportunities');
//         store.put(data);
//         return tx.complete;
//     });
// };
// IndexController.prototype.status = function (response) {
//     var response2 = response.clone();
//     response2.text()
//         .then(function (text) {
//             console.log('text', text);
//             this._storeOpportunityData({ url: response2.url, text: text });
//         });
//     // console.log('data2', data2);
//     console.log('response', response);
//     if (response.status >= 200 && response.status < 300) {
//         return Promise.resolve(response);
//     }
//     return Promise.reject(new Error(response.statusText));
// };
IndexController.prototype.myIdbHandler = function (request, values, options) {
  var _that = this;
  // this._dbPromise = this.openDatabase();
  console.log('this._dbPromise', this._dbPromise);
  if (!this._dbPromise) {
    console.log('self', self);
    this._dbPromise = self.idb.open('save-button-db', 1, function (upgradeDb) {
      console.log('openDatabase');
      upgradeDb.createObjectStore('opportunities', {
        keyPath: 'url'
      });
    });
  }
  console.log('this._dbPromise', this._dbPromise);
  this.status = function (response) {
    var responseText;
    var response2 = response.clone();
    return response2.text()
      .then(function (text) {
        console.log('text', text);
        responseText = text;
        _that._storeOpportunityData({ url: response2.url, text: text });
        return responseText;
      })
      .then(function () {
        // console.log('data2', data2);
        console.log('response', response);
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response);
        }
        return Promise.reject(new Error(response.statusText));
      });
    // // console.log('data2', data2);
    // console.log('response', response);
    // if (response.status >= 200 && response.status < 300) {
    //   return Promise.resolve(response);
    // }
    // return Promise.reject(new Error(response.statusText));
  };

  this._storeOpportunityData = function (data) {
    console.log('db open');
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
      return db.transaction('opportunities')
        .objectStore('opportunities').get(url);
    });
  };
  this.fetchOpportunities = function (request) {
    this.urlUse = '';
    this.urlUse = request.url;
    return self.fetch(request)
      .then(_that.status)
      // .then(text)
      .catch(function (error) {
        console.log('Request failed', error);
      });
  };
  return this._checkIdb(request.url).then(function (data) {
    console.log('data', data);
    if (data) {
      console.log('data', data);
      console.log('Response', Response);
      return new Response(data.text);
    }
    console.log(' _that.fetchOpportunities(request)');
    return _that.fetchOpportunities(request);
  }).catch(function () {
    console.log('error fect ops');
    return _that.fetchOpportunities(request);
  });
};
module.exports = new IndexController();
