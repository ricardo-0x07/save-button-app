/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/_index.html","be46dd885dbc2f5231801670d7bca864"],["/app/account/login/login.html","80d8b17cf5f94182daf2e29296b6be9e"],["/app/account/settings/settings.html","b4688627bf0c2e8a309e2c7e9fbebd04"],["/app/account/signup/signup.html","d40748e1d3d7b798e41223a272d073e8"],["/app/admin/admin.html","261f725e655ea7a105288e48a7415b84"],["/app/components/home/home.html","0c8f5f914de7a46b3d56ebe5d1256711"],["/app/components/opportunities/opportunities.html","8165416d36c1b1b039514d88636fecb5"],["/app/core/opportunity/opportunity.component.html","c8a8ab8b123ed8279ef68188d1d328c8"],["/app/main/main.html","30d2e568bdeb988a03f1e1d28d848ee8"],["/assets/fonts/bootstrap/glyphicons-halflings-regular.eot","f4769f9bdb7466be65088239c12046d1"],["/assets/fonts/bootstrap/glyphicons-halflings-regular.svg","89889688147bd7575d6327160d64e760"],["/assets/fonts/bootstrap/glyphicons-halflings-regular.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["/assets/fonts/bootstrap/glyphicons-halflings-regular.woff","fa2772327f55d8198301fdb8bcfc8158"],["/assets/fonts/bootstrap/glyphicons-halflings-regular.woff2","448c34a56d699c29117adc64c43affeb"],["/assets/fonts/font-awesome/FontAwesome.otf","5dc41d8fe329a22fa1ee9225571c843e"],["/assets/fonts/font-awesome/fontawesome-webfont.eot","25a32416abee198dd821b0b17a198a8f"],["/assets/fonts/font-awesome/fontawesome-webfont.svg","d7c639084f684d66a1bc66855d193ed8"],["/assets/fonts/font-awesome/fontawesome-webfont.ttf","1dc35d25e61d819a9c357074014867ab"],["/assets/fonts/font-awesome/fontawesome-webfont.woff","c8ddf1e5e5bf3682bc7bebf30f394148"],["/assets/fonts/font-awesome/fontawesome-webfont.woff2","e6cf7c6ec7c2d6f670ae9d762604cb0b"],["/assets/images/deal1.jpeg","5e207ef3d83e437025a01a46b071dff9"],["/assets/images/deal2.jpeg","be5f2e655feda015950045cb89a7efe7"],["/assets/images/deal3.jpeg","f8cbe38dbd50f8aadcd3a099ec6826ea"],["/assets/images/headerBg.png","18bec6448b8aa886f90ab3ca51d49eec"],["/assets/images/imgA.jpg","7cd6294663111f99165666b18e2fe71f"],["/assets/images/imgB.jpg","396ddcd8c8f0c6f9bb8e91c367e6e241"],["/assets/images/imgC.jpg","db3c8b9990890dde492979f09d3a10ca"],["/assets/images/project.png","4f1ecdb94be6d15d626aa3a326f42079"],["/assets/images/projectBg.jpeg","2ba8416c2261be749ee1855d7495c099"],["/assets/images/rework.png","8c68e0fd9064ad3407c774b84c84763f"],["/assets/images/save-button.jpg","df7aee487e7b6910e7cb41e0fd2b7e94"],["/assets/images/save-button.png","4e4e7e6e47569a8be343483152448590"],["/assets/images/slice3.jpg","671211fa8909c7d24573e05f18cff789"],["/assets/images/spinner.gif","7b9776076d5fceef4993b55c9383dedd"],["/assets/images/yeoman.png","750a60175113de02b335efdf05ce2299"],["/components/footer/footer.html","a970576825363e6ec06a7211b8958ea4"],["/components/modal/modal.html","59e93412dd7bbb524f13f3e23a022bb4"],["/components/navbar/navbar.html","da7e7577c0053e995ebbcee94796ec7a"],["/components/oauth-buttons/oauth-buttons.html","d17f5ba53d9ff0b1f2094f111a4b9b42"],["/index.html","b3f8c0854774a8dcee34c45eb7ce4cec"],["/lib/node_modules/sw-toolbox/docs/jekyll-theme/_includes/components/footer.html","48f539ff1d678853a4143210b9569863"],["/lib/node_modules/sw-toolbox/docs/jekyll-theme/_includes/components/nav-drawer-docs-entry.html","78b4821effb67051cebfaa6fc6d52c9b"],["/lib/node_modules/sw-toolbox/docs/jekyll-theme/_includes/components/nav-drawer.html","4c2e19b929658ace9590d364e9ef411d"],["/lib/node_modules/sw-toolbox/docs/jekyll-theme/_includes/components/site-header.html","13bd86a83a2737407f51bf8445a1c37d"],["/lib/node_modules/sw-toolbox/docs/jekyll-theme/_includes/html-head.html","92f0f6ebf96b1d75175fa5612b72264b"],["/lib/node_modules/sw-toolbox/docs/jekyll-theme/_includes/variables.html","66fc16fe2e071c8d8b72448a9c26ff59"],["/lib/node_modules/sw-toolbox/docs/jekyll-theme/_layouts/default.html","0d3aab880863e9960f39c23dd56da202"],["/lib/node_modules/sw-toolbox/docs/jekyll-theme/_layouts/index.html","d36804e24965be7a8f3e1eed42ee402c"],["/lib/node_modules/sw-toolbox/docs/jekyll-theme/_layouts/jsdoc.html","8d1ded30ff15c8704bef16041f9a57ef"]];
var cacheName = 'sw-precache-v2-save-button-app-' + (self.registration ? self.registration.scope : '');




var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {credentials: 'same-origin'}));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});




