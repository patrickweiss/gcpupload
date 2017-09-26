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

var precacheConfig = [["bower_components/app-layout/app-drawer-layout/app-drawer-layout.html","1d59e0ed57fa72c8c192147925eb844c"],["bower_components/app-layout/app-drawer/app-drawer.html","c93a7976d3bfad91061c8461529751b2"],["bower_components/app-layout/app-header-layout/app-header-layout.html","6901fbc31ce398b1eb08b0465b505431"],["bower_components/app-layout/app-header/app-header.html","2cd5d5d7c9bdabc63ac870d0b1ae8610"],["bower_components/app-layout/app-layout-behavior/app-layout-behavior.html","68c44a7d0ce56eec5179385ddd1fcad5"],["bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","b50a6011f9cb492c9e2a83d2f8955399"],["bower_components/app-layout/app-scroll-effects/app-scroll-effects.html","47ef4a1229fe38f7ebb0b846676908c9"],["bower_components/app-layout/app-scroll-effects/effects/blend-background.html","cb65065f730d76538be3d15794650adf"],["bower_components/app-layout/app-scroll-effects/effects/fade-background.html","d7fe94ca7c381f0d814ae8f03e7a1707"],["bower_components/app-layout/app-scroll-effects/effects/material.html","93d85d4f6d42fd57d73fda270f8b8b5d"],["bower_components/app-layout/app-scroll-effects/effects/parallax-background.html","cb919252b3b9eb1c7d57fc7022353c9a"],["bower_components/app-layout/app-scroll-effects/effects/resize-snapped-title.html","e1917db70703c8af036b1a29fd7d6237"],["bower_components/app-layout/app-scroll-effects/effects/resize-title.html","91cbbf08e10ad1d60804d5403f10b679"],["bower_components/app-layout/app-scroll-effects/effects/waterfall.html","af6cf17fbb4f94216eea9d2e6c26a775"],["bower_components/app-layout/app-toolbar/app-toolbar.html","1969068eeac3ed606025f04bf7871282"],["bower_components/app-layout/helpers/helpers.html","1da38888481edb36a5d7f15a8633dd9f"],["bower_components/app-route/app-location.html","8fd3320544adb5e25f032dc9ca593d45"],["bower_components/app-route/app-route-converter-behavior.html","67ec6daf2bbe9f59beecbdd5b863af14"],["bower_components/app-route/app-route.html","bee92f77d4503b43a33d1761a33936d7"],["bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","29525580c0d4f39a6d65ef1ea65dfa7b"],["bower_components/iron-behaviors/iron-button-state.html","7f7f96935de5deaf9a51264225eb1a5a"],["bower_components/iron-behaviors/iron-control-state.html","f1329af310a186a0c3ce264937c34c5e"],["bower_components/iron-flex-layout/iron-flex-layout.html","3e285c2698feec264710fffd609630ad"],["bower_components/iron-icon/iron-icon.html","0d81dc84af38dfdaa7eca375ab7a9b9e"],["bower_components/iron-iconset-svg/iron-iconset-svg.html","b4ba3d89346b84fd775da5d96c484015"],["bower_components/iron-location/iron-location.html","253d51cc4db35f8179fc351936db8e90"],["bower_components/iron-location/iron-query-params.html","41964ce091583f5f99f9e257dbb86fb2"],["bower_components/iron-media-query/iron-media-query.html","0082aca119880bf33ce3ffd1fa0e9011"],["bower_components/iron-meta/iron-meta.html","bc20529471c77127055f986018af2a23"],["bower_components/iron-pages/iron-pages.html","aeb0aff1b1109fc353d8b7af89792220"],["bower_components/iron-resizable-behavior/iron-resizable-behavior.html","ef694568c45e136bc268824fd6de7a0a"],["bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","9971205eaf94e97c3a987be2d4e50e52"],["bower_components/iron-selector/iron-multi-selectable.html","196a7c658213a28e6924e9152628b50c"],["bower_components/iron-selector/iron-selectable.html","b0803b285eb65f6a9689918d8df735fe"],["bower_components/iron-selector/iron-selection.html","19a051eb5d88baed09f6439512841bda"],["bower_components/iron-selector/iron-selector.html","76e80b0f3e145257b34de6fde1addd1a"],["bower_components/paper-behaviors/paper-inky-focus-behavior.html","52c2ca1ef155e8bca281d806fc9a8673"],["bower_components/paper-behaviors/paper-ripple-behavior.html","360acdba9e68fb7bf5c2be15f3fc5845"],["bower_components/paper-icon-button/paper-icon-button.html","c3acafc40e7feb18eec57b7e49df808c"],["bower_components/paper-ripple/paper-ripple.html","4101ea573f9fe2526b3938aad9c804c0"],["bower_components/paper-styles/color.html","549925227bc04f9c17b52e2e35cd2e26"],["bower_components/paper-styles/default-theme.html","5357609d26772a270098c0e3ebb1bb98"],["bower_components/polymer/lib/elements/array-selector.html","13f4740735a915be0e50ba6a63ed90d7"],["bower_components/polymer/lib/elements/custom-style.html","af3ddc8b66d5a50f3a4b584d43090915"],["bower_components/polymer/lib/elements/dom-bind.html","8ca46cac756cbc24dda155aa8c7b8ab5"],["bower_components/polymer/lib/elements/dom-if.html","8427f370ec84dc76f7cdb21adbd8b8a9"],["bower_components/polymer/lib/elements/dom-module.html","03d709239d9f30b27a38f6ad51eb3cf0"],["bower_components/polymer/lib/elements/dom-repeat.html","b18d003115fb00a6f5f6ffa4cc687aa1"],["bower_components/polymer/lib/legacy/class.html","7ff823bc34d1211a0045c37d34cade9c"],["bower_components/polymer/lib/legacy/legacy-element-mixin.html","105b4074fed3baea87fef7f29f04fa16"],["bower_components/polymer/lib/legacy/mutable-data-behavior.html","61308a9cc1b2cd07bdd49037c643f677"],["bower_components/polymer/lib/legacy/polymer-fn.html","4ecb6f82dd2003974ec5004dcb5644f0"],["bower_components/polymer/lib/legacy/polymer.dom.html","2a07e5afc90480683f2bfe272149ab63"],["bower_components/polymer/lib/legacy/templatizer-behavior.html","499ccaf2f4ddf10fc22775674021e4c1"],["bower_components/polymer/lib/mixins/element-mixin.html","62b1fd791becb5f19c68b296eaa591fd"],["bower_components/polymer/lib/mixins/gesture-event-listeners.html","2adeec3f92aa2847b0fc89190c6f48de"],["bower_components/polymer/lib/mixins/mutable-data.html","c3da616d8fc7f5d73f01e59c9f74e2fb"],["bower_components/polymer/lib/mixins/property-accessors.html","cac80c227b5699f3299451bc72c1ac6b"],["bower_components/polymer/lib/mixins/property-effects.html","d3cef34480813df9a6406862e0ea3ea0"],["bower_components/polymer/lib/mixins/template-stamp.html","3ae63179a267763aa077f99474894b6b"],["bower_components/polymer/lib/utils/array-splice.html","1caf5b485e0d3b5e5e8473bd4aee2051"],["bower_components/polymer/lib/utils/async.html","964f41ccd907d5d57106685d618f8262"],["bower_components/polymer/lib/utils/boot.html","5f152e60691017bdd32a1431471df365"],["bower_components/polymer/lib/utils/case-map.html","fbcc9191460c40f56274059303f240f5"],["bower_components/polymer/lib/utils/debounce.html","b82b45dd67d803863875428273dbd278"],["bower_components/polymer/lib/utils/flattened-nodes-observer.html","b1e4e3c0f93cf643f14eebabda9e0b68"],["bower_components/polymer/lib/utils/flush.html","3f1ae81bfde1d720931126833dcb6c12"],["bower_components/polymer/lib/utils/gestures.html","12b879a092bb4c345b3459bc178889c8"],["bower_components/polymer/lib/utils/import-href.html","ab67a53713c709ca6422271643e5c6ef"],["bower_components/polymer/lib/utils/mixin.html","48def86200787e0dec66d862f6fbf945"],["bower_components/polymer/lib/utils/path.html","c6c703f031a793a1d013efb629f13f7f"],["bower_components/polymer/lib/utils/render-status.html","f1d2f69c7dc8114d8daa841c9a85bf70"],["bower_components/polymer/lib/utils/resolve-url.html","9655e21ed83a0b9c7daab6e150001dda"],["bower_components/polymer/lib/utils/settings.html","38e9fb43ea4b3b61dd2c91a210481322"],["bower_components/polymer/lib/utils/style-gather.html","e8e102bbfca2136cb0bcbf18c342e986"],["bower_components/polymer/lib/utils/templatize.html","957690bce72e5cc7484d5e3f12e62554"],["bower_components/polymer/lib/utils/unresolved.html","2ed3277470301933b1af10d413d8c614"],["bower_components/polymer/polymer-element.html","7e714c300932fa5c6d7bee1c8da03721"],["bower_components/polymer/polymer.html","041f02f3388a7a3c087298fde431df80"],["bower_components/shadycss/apply-shim.html","5b73ef5bfcac4955f6c24f55ea322eb1"],["bower_components/shadycss/apply-shim.min.js","058df1a64fc2a4db3a1bceca054be299"],["bower_components/shadycss/custom-style-interface.html","7e28230b85cdcc2488e87172c3395d52"],["bower_components/shadycss/custom-style-interface.min.js","021cb6e169bd7c5ecc405c048894e043"],["bower_components/webcomponentsjs/custom-elements-es5-adapter.js","a5043c1d0dd16d84558ee6cc2276212e"],["bower_components/webcomponentsjs/gulpfile.js","0366da1f0f7858c9af2daa3ef7d950ea"],["bower_components/webcomponentsjs/webcomponents-hi-ce.js","906534893bff07b0c0b308724c0181bb"],["bower_components/webcomponentsjs/webcomponents-hi-sd-ce.js","eb78f39a4fd73c3ffe22d2f37ce5ca77"],["bower_components/webcomponentsjs/webcomponents-hi.js","cfa7d1d8e693a34ddef6370113ff1520"],["bower_components/webcomponentsjs/webcomponents-lite.js","40e6395790776160002812380044f3f2"],["bower_components/webcomponentsjs/webcomponents-loader.js","f13bbbbf647b7922575a7894367ddaaf"],["bower_components/webcomponentsjs/webcomponents-sd-ce.js","b1f76f6a530bb42555d599e0f8cb7acc"],["index.html","97a4aea919ce876b1c1c547a5b88d8b5"],["manifest.json","39a400389f05600d3ec8c419680017c6"],["src/my-app.html","076f93d2ade6479f3ac036496ff5cb5c"],["src/my-icons.html","1618712b865f25904ddffef31c5d9db0"],["src/my-view1.html","994c081c882c8fe5672e788a3e49a2d3"],["src/my-view2.html","41454612eaa26fb0d24ea28b6cc93d34"],["src/my-view3.html","70900584328d17986a84627991792425"],["src/my-view404.html","97c82b4dbd0ac717ad3893874c7e465f"],["src/shared-styles.html","d5133ed0135bb42a87b98527f8f1c7aa"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
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
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

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
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
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


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = '';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted(["\\/[^\\/\\.]*(\\?|$)"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







