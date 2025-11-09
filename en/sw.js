/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/workbox-core/_private/Deferred.js":
/*!********************************************************!*\
  !*** ./node_modules/workbox-core/_private/Deferred.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Deferred: () => (/* binding */ Deferred)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * The Deferred class composes Promises in a way that allows for them to be
 * resolved or rejected from outside the constructor. In most cases promises
 * should be used directly, but Deferreds can be necessary when the logic to
 * resolve a promise must be separate.
 *
 * @private
 */
class Deferred {
    /**
     * Creates a promise and exposes its resolve and reject functions as methods.
     */
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}



/***/ }),

/***/ "./node_modules/workbox-core/_private/WorkboxError.js":
/*!************************************************************!*\
  !*** ./node_modules/workbox-core/_private/WorkboxError.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WorkboxError: () => (/* binding */ WorkboxError)
/* harmony export */ });
/* harmony import */ var _models_messages_messageGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/messages/messageGenerator.js */ "./node_modules/workbox-core/models/messages/messageGenerator.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * Workbox errors should be thrown with this class.
 * This allows use to ensure the type easily in tests,
 * helps developers identify errors from workbox
 * easily and allows use to optimise error
 * messages correctly.
 *
 * @private
 */
class WorkboxError extends Error {
    /**
     *
     * @param {string} errorCode The error code that
     * identifies this particular error.
     * @param {Object=} details Any relevant arguments
     * that will help developers identify issues should
     * be added as a key on the context object.
     */
    constructor(errorCode, details) {
        const message = (0,_models_messages_messageGenerator_js__WEBPACK_IMPORTED_MODULE_0__.messageGenerator)(errorCode, details);
        super(message);
        this.name = errorCode;
        this.details = details;
    }
}



/***/ }),

/***/ "./node_modules/workbox-core/_private/assert.js":
/*!******************************************************!*\
  !*** ./node_modules/workbox-core/_private/assert.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   assert: () => (/* binding */ finalAssertExports)
/* harmony export */ });
/* harmony import */ var _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/*
 * This method throws if the supplied value is not an array.
 * The destructed values are required to produce a meaningful error for users.
 * The destructed and restructured object is so it's clear what is
 * needed.
 */
const isArray = (value, details) => {
    if (!Array.isArray(value)) {
        throw new _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('not-an-array', details);
    }
};
const hasMethod = (object, expectedMethod, details) => {
    const type = typeof object[expectedMethod];
    if (type !== 'function') {
        details['expectedMethod'] = expectedMethod;
        throw new _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('missing-a-method', details);
    }
};
const isType = (object, expectedType, details) => {
    if (typeof object !== expectedType) {
        details['expectedType'] = expectedType;
        throw new _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('incorrect-type', details);
    }
};
const isInstance = (object, 
// Need the general type to do the check later.
// eslint-disable-next-line @typescript-eslint/ban-types
expectedClass, details) => {
    if (!(object instanceof expectedClass)) {
        details['expectedClassName'] = expectedClass.name;
        throw new _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('incorrect-class', details);
    }
};
const isOneOf = (value, validValues, details) => {
    if (!validValues.includes(value)) {
        details['validValueDescription'] = `Valid values are ${JSON.stringify(validValues)}.`;
        throw new _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('invalid-value', details);
    }
};
const isArrayOfClass = (value, 
// Need general type to do check later.
expectedClass, // eslint-disable-line
details) => {
    const error = new _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('not-array-of-class', details);
    if (!Array.isArray(value)) {
        throw error;
    }
    for (const item of value) {
        if (!(item instanceof expectedClass)) {
            throw error;
        }
    }
};
const finalAssertExports =  false
    ? 0
    : {
        hasMethod,
        isArray,
        isInstance,
        isOneOf,
        isType,
        isArrayOfClass,
    };



/***/ }),

/***/ "./node_modules/workbox-core/_private/cacheMatchIgnoreParams.js":
/*!**********************************************************************!*\
  !*** ./node_modules/workbox-core/_private/cacheMatchIgnoreParams.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cacheMatchIgnoreParams: () => (/* binding */ cacheMatchIgnoreParams)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2020 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

function stripParams(fullURL, ignoreParams) {
    const strippedURL = new URL(fullURL);
    for (const param of ignoreParams) {
        strippedURL.searchParams.delete(param);
    }
    return strippedURL.href;
}
/**
 * Matches an item in the cache, ignoring specific URL params. This is similar
 * to the `ignoreSearch` option, but it allows you to ignore just specific
 * params (while continuing to match on the others).
 *
 * @private
 * @param {Cache} cache
 * @param {Request} request
 * @param {Object} matchOptions
 * @param {Array<string>} ignoreParams
 * @return {Promise<Response|undefined>}
 */
async function cacheMatchIgnoreParams(cache, request, ignoreParams, matchOptions) {
    const strippedRequestURL = stripParams(request.url, ignoreParams);
    // If the request doesn't include any ignored params, match as normal.
    if (request.url === strippedRequestURL) {
        return cache.match(request, matchOptions);
    }
    // Otherwise, match by comparing keys
    const keysOptions = Object.assign(Object.assign({}, matchOptions), { ignoreSearch: true });
    const cacheKeys = await cache.keys(request, keysOptions);
    for (const cacheKey of cacheKeys) {
        const strippedCacheKeyURL = stripParams(cacheKey.url, ignoreParams);
        if (strippedRequestURL === strippedCacheKeyURL) {
            return cache.match(cacheKey, matchOptions);
        }
    }
    return;
}



/***/ }),

/***/ "./node_modules/workbox-core/_private/cacheNames.js":
/*!**********************************************************!*\
  !*** ./node_modules/workbox-core/_private/cacheNames.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cacheNames: () => (/* binding */ cacheNames)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const _cacheNameDetails = {
    googleAnalytics: 'googleAnalytics',
    precache: 'precache-v2',
    prefix: 'workbox',
    runtime: 'runtime',
    suffix: typeof registration !== 'undefined' ? registration.scope : '',
};
const _createCacheName = (cacheName) => {
    return [_cacheNameDetails.prefix, cacheName, _cacheNameDetails.suffix]
        .filter((value) => value && value.length > 0)
        .join('-');
};
const eachCacheNameDetail = (fn) => {
    for (const key of Object.keys(_cacheNameDetails)) {
        fn(key);
    }
};
const cacheNames = {
    updateDetails: (details) => {
        eachCacheNameDetail((key) => {
            if (typeof details[key] === 'string') {
                _cacheNameDetails[key] = details[key];
            }
        });
    },
    getGoogleAnalyticsName: (userCacheName) => {
        return userCacheName || _createCacheName(_cacheNameDetails.googleAnalytics);
    },
    getPrecacheName: (userCacheName) => {
        return userCacheName || _createCacheName(_cacheNameDetails.precache);
    },
    getPrefix: () => {
        return _cacheNameDetails.prefix;
    },
    getRuntimeName: (userCacheName) => {
        return userCacheName || _createCacheName(_cacheNameDetails.runtime);
    },
    getSuffix: () => {
        return _cacheNameDetails.suffix;
    },
};


/***/ }),

/***/ "./node_modules/workbox-core/_private/canConstructResponseFromBodyStream.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/workbox-core/_private/canConstructResponseFromBodyStream.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   canConstructResponseFromBodyStream: () => (/* binding */ canConstructResponseFromBodyStream)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

let supportStatus;
/**
 * A utility function that determines whether the current browser supports
 * constructing a new `Response` from a `response.body` stream.
 *
 * @return {boolean} `true`, if the current browser can successfully
 *     construct a `Response` from a `response.body` stream, `false` otherwise.
 *
 * @private
 */
function canConstructResponseFromBodyStream() {
    if (supportStatus === undefined) {
        const testResponse = new Response('');
        if ('body' in testResponse) {
            try {
                new Response(testResponse.body);
                supportStatus = true;
            }
            catch (error) {
                supportStatus = false;
            }
        }
        supportStatus = false;
    }
    return supportStatus;
}



/***/ }),

/***/ "./node_modules/workbox-core/_private/executeQuotaErrorCallbacks.js":
/*!**************************************************************************!*\
  !*** ./node_modules/workbox-core/_private/executeQuotaErrorCallbacks.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   executeQuotaErrorCallbacks: () => (/* binding */ executeQuotaErrorCallbacks)
/* harmony export */ });
/* harmony import */ var _private_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var _models_quotaErrorCallbacks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/quotaErrorCallbacks.js */ "./node_modules/workbox-core/models/quotaErrorCallbacks.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_2__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/



/**
 * Runs all of the callback functions, one at a time sequentially, in the order
 * in which they were registered.
 *
 * @memberof workbox-core
 * @private
 */
async function executeQuotaErrorCallbacks() {
    if (true) {
        _private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.log(`About to run ${_models_quotaErrorCallbacks_js__WEBPACK_IMPORTED_MODULE_1__.quotaErrorCallbacks.size} ` +
            `callbacks to clean up caches.`);
    }
    for (const callback of _models_quotaErrorCallbacks_js__WEBPACK_IMPORTED_MODULE_1__.quotaErrorCallbacks) {
        await callback();
        if (true) {
            _private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.log(callback, 'is complete.');
        }
    }
    if (true) {
        _private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.log('Finished running callbacks.');
    }
}



/***/ }),

/***/ "./node_modules/workbox-core/_private/getFriendlyURL.js":
/*!**************************************************************!*\
  !*** ./node_modules/workbox-core/_private/getFriendlyURL.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getFriendlyURL: () => (/* binding */ getFriendlyURL)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const getFriendlyURL = (url) => {
    const urlObj = new URL(String(url), location.href);
    // See https://github.com/GoogleChrome/workbox/issues/2323
    // We want to include everything, except for the origin if it's same-origin.
    return urlObj.href.replace(new RegExp(`^${location.origin}`), '');
};



/***/ }),

/***/ "./node_modules/workbox-core/_private/logger.js":
/*!******************************************************!*\
  !*** ./node_modules/workbox-core/_private/logger.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   logger: () => (/* binding */ logger)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2019 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const logger = ( false
    ? 0
    : (() => {
        // Don't overwrite this value if it's already set.
        // See https://github.com/GoogleChrome/workbox/pull/2284#issuecomment-560470923
        if (!('__WB_DISABLE_DEV_LOGS' in globalThis)) {
            self.__WB_DISABLE_DEV_LOGS = false;
        }
        let inGroup = false;
        const methodToColorMap = {
            debug: `#7f8c8d`,
            log: `#2ecc71`,
            warn: `#f39c12`,
            error: `#c0392b`,
            groupCollapsed: `#3498db`,
            groupEnd: null, // No colored prefix on groupEnd
        };
        const print = function (method, args) {
            if (self.__WB_DISABLE_DEV_LOGS) {
                return;
            }
            if (method === 'groupCollapsed') {
                // Safari doesn't print all console.groupCollapsed() arguments:
                // https://bugs.webkit.org/show_bug.cgi?id=182754
                if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
                    console[method](...args);
                    return;
                }
            }
            const styles = [
                `background: ${methodToColorMap[method]}`,
                `border-radius: 0.5em`,
                `color: white`,
                `font-weight: bold`,
                `padding: 2px 0.5em`,
            ];
            // When in a group, the workbox prefix is not displayed.
            const logPrefix = inGroup ? [] : ['%cworkbox', styles.join(';')];
            console[method](...logPrefix, ...args);
            if (method === 'groupCollapsed') {
                inGroup = true;
            }
            if (method === 'groupEnd') {
                inGroup = false;
            }
        };
        // eslint-disable-next-line @typescript-eslint/ban-types
        const api = {};
        const loggerMethods = Object.keys(methodToColorMap);
        for (const key of loggerMethods) {
            const method = key;
            api[method] = (...args) => {
                print(method, args);
            };
        }
        return api;
    })());



/***/ }),

/***/ "./node_modules/workbox-core/_private/timeout.js":
/*!*******************************************************!*\
  !*** ./node_modules/workbox-core/_private/timeout.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   timeout: () => (/* binding */ timeout)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2019 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * Returns a promise that resolves and the passed number of milliseconds.
 * This utility is an async/await-friendly version of `setTimeout`.
 *
 * @param {number} ms
 * @return {Promise}
 * @private
 */
function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


/***/ }),

/***/ "./node_modules/workbox-core/_private/waitUntil.js":
/*!*********************************************************!*\
  !*** ./node_modules/workbox-core/_private/waitUntil.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   waitUntil: () => (/* binding */ waitUntil)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2020 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * A utility method that makes it easier to use `event.waitUntil` with
 * async functions and return the result.
 *
 * @param {ExtendableEvent} event
 * @param {Function} asyncFn
 * @return {Function}
 * @private
 */
function waitUntil(event, asyncFn) {
    const returnPromise = asyncFn();
    event.waitUntil(returnPromise);
    return returnPromise;
}



/***/ }),

/***/ "./node_modules/workbox-core/_version.js":
/*!***********************************************!*\
  !*** ./node_modules/workbox-core/_version.js ***!
  \***********************************************/
/***/ (() => {


// @ts-ignore
try {
    self['workbox:core:7.0.0'] && _();
}
catch (e) { }


/***/ }),

/***/ "./node_modules/workbox-core/copyResponse.js":
/*!***************************************************!*\
  !*** ./node_modules/workbox-core/copyResponse.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   copyResponse: () => (/* binding */ copyResponse)
/* harmony export */ });
/* harmony import */ var _private_canConstructResponseFromBodyStream_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_private/canConstructResponseFromBodyStream.js */ "./node_modules/workbox-core/_private/canConstructResponseFromBodyStream.js");
/* harmony import */ var _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_2__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/



/**
 * Allows developers to copy a response and modify its `headers`, `status`,
 * or `statusText` values (the values settable via a
 * [`ResponseInit`]{@link https://developer.mozilla.org/en-US/docs/Web/API/Response/Response#Syntax}
 * object in the constructor).
 * To modify these values, pass a function as the second argument. That
 * function will be invoked with a single object with the response properties
 * `{headers, status, statusText}`. The return value of this function will
 * be used as the `ResponseInit` for the new `Response`. To change the values
 * either modify the passed parameter(s) and return it, or return a totally
 * new object.
 *
 * This method is intentionally limited to same-origin responses, regardless of
 * whether CORS was used or not.
 *
 * @param {Response} response
 * @param {Function} modifier
 * @memberof workbox-core
 */
async function copyResponse(response, modifier) {
    let origin = null;
    // If response.url isn't set, assume it's cross-origin and keep origin null.
    if (response.url) {
        const responseURL = new URL(response.url);
        origin = responseURL.origin;
    }
    if (origin !== self.location.origin) {
        throw new _private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_1__.WorkboxError('cross-origin-copy-response', { origin });
    }
    const clonedResponse = response.clone();
    // Create a fresh `ResponseInit` object by cloning the headers.
    const responseInit = {
        headers: new Headers(clonedResponse.headers),
        status: clonedResponse.status,
        statusText: clonedResponse.statusText,
    };
    // Apply any user modifications.
    const modifiedResponseInit = modifier ? modifier(responseInit) : responseInit;
    // Create the new response from the body stream and `ResponseInit`
    // modifications. Note: not all browsers support the Response.body stream,
    // so fall back to reading the entire body into memory as a blob.
    const body = (0,_private_canConstructResponseFromBodyStream_js__WEBPACK_IMPORTED_MODULE_0__.canConstructResponseFromBodyStream)()
        ? clonedResponse.body
        : await clonedResponse.blob();
    return new Response(body, modifiedResponseInit);
}



/***/ }),

/***/ "./node_modules/workbox-core/models/messages/messageGenerator.js":
/*!***********************************************************************!*\
  !*** ./node_modules/workbox-core/models/messages/messageGenerator.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   messageGenerator: () => (/* binding */ messageGenerator)
/* harmony export */ });
/* harmony import */ var _messages_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messages.js */ "./node_modules/workbox-core/models/messages/messages.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


const fallback = (code, ...args) => {
    let msg = code;
    if (args.length > 0) {
        msg += ` :: ${JSON.stringify(args)}`;
    }
    return msg;
};
const generatorFunction = (code, details = {}) => {
    const message = _messages_js__WEBPACK_IMPORTED_MODULE_0__.messages[code];
    if (!message) {
        throw new Error(`Unable to find message for code '${code}'.`);
    }
    return message(details);
};
const messageGenerator =  false ? 0 : generatorFunction;


/***/ }),

/***/ "./node_modules/workbox-core/models/messages/messages.js":
/*!***************************************************************!*\
  !*** ./node_modules/workbox-core/models/messages/messages.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   messages: () => (/* binding */ messages)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const messages = {
    'invalid-value': ({ paramName, validValueDescription, value }) => {
        if (!paramName || !validValueDescription) {
            throw new Error(`Unexpected input to 'invalid-value' error.`);
        }
        return (`The '${paramName}' parameter was given a value with an ` +
            `unexpected value. ${validValueDescription} Received a value of ` +
            `${JSON.stringify(value)}.`);
    },
    'not-an-array': ({ moduleName, className, funcName, paramName }) => {
        if (!moduleName || !className || !funcName || !paramName) {
            throw new Error(`Unexpected input to 'not-an-array' error.`);
        }
        return (`The parameter '${paramName}' passed into ` +
            `'${moduleName}.${className}.${funcName}()' must be an array.`);
    },
    'incorrect-type': ({ expectedType, paramName, moduleName, className, funcName, }) => {
        if (!expectedType || !paramName || !moduleName || !funcName) {
            throw new Error(`Unexpected input to 'incorrect-type' error.`);
        }
        const classNameStr = className ? `${className}.` : '';
        return (`The parameter '${paramName}' passed into ` +
            `'${moduleName}.${classNameStr}` +
            `${funcName}()' must be of type ${expectedType}.`);
    },
    'incorrect-class': ({ expectedClassName, paramName, moduleName, className, funcName, isReturnValueProblem, }) => {
        if (!expectedClassName || !moduleName || !funcName) {
            throw new Error(`Unexpected input to 'incorrect-class' error.`);
        }
        const classNameStr = className ? `${className}.` : '';
        if (isReturnValueProblem) {
            return (`The return value from ` +
                `'${moduleName}.${classNameStr}${funcName}()' ` +
                `must be an instance of class ${expectedClassName}.`);
        }
        return (`The parameter '${paramName}' passed into ` +
            `'${moduleName}.${classNameStr}${funcName}()' ` +
            `must be an instance of class ${expectedClassName}.`);
    },
    'missing-a-method': ({ expectedMethod, paramName, moduleName, className, funcName, }) => {
        if (!expectedMethod ||
            !paramName ||
            !moduleName ||
            !className ||
            !funcName) {
            throw new Error(`Unexpected input to 'missing-a-method' error.`);
        }
        return (`${moduleName}.${className}.${funcName}() expected the ` +
            `'${paramName}' parameter to expose a '${expectedMethod}' method.`);
    },
    'add-to-cache-list-unexpected-type': ({ entry }) => {
        return (`An unexpected entry was passed to ` +
            `'workbox-precaching.PrecacheController.addToCacheList()' The entry ` +
            `'${JSON.stringify(entry)}' isn't supported. You must supply an array of ` +
            `strings with one or more characters, objects with a url property or ` +
            `Request objects.`);
    },
    'add-to-cache-list-conflicting-entries': ({ firstEntry, secondEntry }) => {
        if (!firstEntry || !secondEntry) {
            throw new Error(`Unexpected input to ` + `'add-to-cache-list-duplicate-entries' error.`);
        }
        return (`Two of the entries passed to ` +
            `'workbox-precaching.PrecacheController.addToCacheList()' had the URL ` +
            `${firstEntry} but different revision details. Workbox is ` +
            `unable to cache and version the asset correctly. Please remove one ` +
            `of the entries.`);
    },
    'plugin-error-request-will-fetch': ({ thrownErrorMessage }) => {
        if (!thrownErrorMessage) {
            throw new Error(`Unexpected input to ` + `'plugin-error-request-will-fetch', error.`);
        }
        return (`An error was thrown by a plugins 'requestWillFetch()' method. ` +
            `The thrown error message was: '${thrownErrorMessage}'.`);
    },
    'invalid-cache-name': ({ cacheNameId, value }) => {
        if (!cacheNameId) {
            throw new Error(`Expected a 'cacheNameId' for error 'invalid-cache-name'`);
        }
        return (`You must provide a name containing at least one character for ` +
            `setCacheDetails({${cacheNameId}: '...'}). Received a value of ` +
            `'${JSON.stringify(value)}'`);
    },
    'unregister-route-but-not-found-with-method': ({ method }) => {
        if (!method) {
            throw new Error(`Unexpected input to ` +
                `'unregister-route-but-not-found-with-method' error.`);
        }
        return (`The route you're trying to unregister was not  previously ` +
            `registered for the method type '${method}'.`);
    },
    'unregister-route-route-not-registered': () => {
        return (`The route you're trying to unregister was not previously ` +
            `registered.`);
    },
    'queue-replay-failed': ({ name }) => {
        return `Replaying the background sync queue '${name}' failed.`;
    },
    'duplicate-queue-name': ({ name }) => {
        return (`The Queue name '${name}' is already being used. ` +
            `All instances of backgroundSync.Queue must be given unique names.`);
    },
    'expired-test-without-max-age': ({ methodName, paramName }) => {
        return (`The '${methodName}()' method can only be used when the ` +
            `'${paramName}' is used in the constructor.`);
    },
    'unsupported-route-type': ({ moduleName, className, funcName, paramName }) => {
        return (`The supplied '${paramName}' parameter was an unsupported type. ` +
            `Please check the docs for ${moduleName}.${className}.${funcName} for ` +
            `valid input types.`);
    },
    'not-array-of-class': ({ value, expectedClass, moduleName, className, funcName, paramName, }) => {
        return (`The supplied '${paramName}' parameter must be an array of ` +
            `'${expectedClass}' objects. Received '${JSON.stringify(value)},'. ` +
            `Please check the call to ${moduleName}.${className}.${funcName}() ` +
            `to fix the issue.`);
    },
    'max-entries-or-age-required': ({ moduleName, className, funcName }) => {
        return (`You must define either config.maxEntries or config.maxAgeSeconds` +
            `in ${moduleName}.${className}.${funcName}`);
    },
    'statuses-or-headers-required': ({ moduleName, className, funcName }) => {
        return (`You must define either config.statuses or config.headers` +
            `in ${moduleName}.${className}.${funcName}`);
    },
    'invalid-string': ({ moduleName, funcName, paramName }) => {
        if (!paramName || !moduleName || !funcName) {
            throw new Error(`Unexpected input to 'invalid-string' error.`);
        }
        return (`When using strings, the '${paramName}' parameter must start with ` +
            `'http' (for cross-origin matches) or '/' (for same-origin matches). ` +
            `Please see the docs for ${moduleName}.${funcName}() for ` +
            `more info.`);
    },
    'channel-name-required': () => {
        return (`You must provide a channelName to construct a ` +
            `BroadcastCacheUpdate instance.`);
    },
    'invalid-responses-are-same-args': () => {
        return (`The arguments passed into responsesAreSame() appear to be ` +
            `invalid. Please ensure valid Responses are used.`);
    },
    'expire-custom-caches-only': () => {
        return (`You must provide a 'cacheName' property when using the ` +
            `expiration plugin with a runtime caching strategy.`);
    },
    'unit-must-be-bytes': ({ normalizedRangeHeader }) => {
        if (!normalizedRangeHeader) {
            throw new Error(`Unexpected input to 'unit-must-be-bytes' error.`);
        }
        return (`The 'unit' portion of the Range header must be set to 'bytes'. ` +
            `The Range header provided was "${normalizedRangeHeader}"`);
    },
    'single-range-only': ({ normalizedRangeHeader }) => {
        if (!normalizedRangeHeader) {
            throw new Error(`Unexpected input to 'single-range-only' error.`);
        }
        return (`Multiple ranges are not supported. Please use a  single start ` +
            `value, and optional end value. The Range header provided was ` +
            `"${normalizedRangeHeader}"`);
    },
    'invalid-range-values': ({ normalizedRangeHeader }) => {
        if (!normalizedRangeHeader) {
            throw new Error(`Unexpected input to 'invalid-range-values' error.`);
        }
        return (`The Range header is missing both start and end values. At least ` +
            `one of those values is needed. The Range header provided was ` +
            `"${normalizedRangeHeader}"`);
    },
    'no-range-header': () => {
        return `No Range header was found in the Request provided.`;
    },
    'range-not-satisfiable': ({ size, start, end }) => {
        return (`The start (${start}) and end (${end}) values in the Range are ` +
            `not satisfiable by the cached response, which is ${size} bytes.`);
    },
    'attempt-to-cache-non-get-request': ({ url, method }) => {
        return (`Unable to cache '${url}' because it is a '${method}' request and ` +
            `only 'GET' requests can be cached.`);
    },
    'cache-put-with-no-response': ({ url }) => {
        return (`There was an attempt to cache '${url}' but the response was not ` +
            `defined.`);
    },
    'no-response': ({ url, error }) => {
        let message = `The strategy could not generate a response for '${url}'.`;
        if (error) {
            message += ` The underlying error is ${error}.`;
        }
        return message;
    },
    'bad-precaching-response': ({ url, status }) => {
        return (`The precaching request for '${url}' failed` +
            (status ? ` with an HTTP status of ${status}.` : `.`));
    },
    'non-precached-url': ({ url }) => {
        return (`createHandlerBoundToURL('${url}') was called, but that URL is ` +
            `not precached. Please pass in a URL that is precached instead.`);
    },
    'add-to-cache-list-conflicting-integrities': ({ url }) => {
        return (`Two of the entries passed to ` +
            `'workbox-precaching.PrecacheController.addToCacheList()' had the URL ` +
            `${url} with different integrity values. Please remove one of them.`);
    },
    'missing-precache-entry': ({ cacheName, url }) => {
        return `Unable to find a precached response in ${cacheName} for ${url}.`;
    },
    'cross-origin-copy-response': ({ origin }) => {
        return (`workbox-core.copyResponse() can only be used with same-origin ` +
            `responses. It was passed a response with origin ${origin}.`);
    },
    'opaque-streams-source': ({ type }) => {
        const message = `One of the workbox-streams sources resulted in an ` +
            `'${type}' response.`;
        if (type === 'opaqueredirect') {
            return (`${message} Please do not use a navigation request that results ` +
                `in a redirect as a source.`);
        }
        return `${message} Please ensure your sources are CORS-enabled.`;
    },
};


/***/ }),

/***/ "./node_modules/workbox-core/models/quotaErrorCallbacks.js":
/*!*****************************************************************!*\
  !*** ./node_modules/workbox-core/models/quotaErrorCallbacks.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   quotaErrorCallbacks: () => (/* binding */ quotaErrorCallbacks)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-core/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

// Callbacks to be executed whenever there's a quota error.
// Can't change Function type right now.
// eslint-disable-next-line @typescript-eslint/ban-types
const quotaErrorCallbacks = new Set();



/***/ }),

/***/ "./node_modules/workbox-precaching/PrecacheController.js":
/*!***************************************************************!*\
  !*** ./node_modules/workbox-precaching/PrecacheController.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PrecacheController: () => (/* binding */ PrecacheController)
/* harmony export */ });
/* harmony import */ var workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/assert.js */ "./node_modules/workbox-core/_private/assert.js");
/* harmony import */ var workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/cacheNames.js */ "./node_modules/workbox-core/_private/cacheNames.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var workbox_core_private_waitUntil_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! workbox-core/_private/waitUntil.js */ "./node_modules/workbox-core/_private/waitUntil.js");
/* harmony import */ var _utils_createCacheKey_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/createCacheKey.js */ "./node_modules/workbox-precaching/utils/createCacheKey.js");
/* harmony import */ var _utils_PrecacheInstallReportPlugin_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/PrecacheInstallReportPlugin.js */ "./node_modules/workbox-precaching/utils/PrecacheInstallReportPlugin.js");
/* harmony import */ var _utils_PrecacheCacheKeyPlugin_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/PrecacheCacheKeyPlugin.js */ "./node_modules/workbox-precaching/utils/PrecacheCacheKeyPlugin.js");
/* harmony import */ var _utils_printCleanupDetails_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/printCleanupDetails.js */ "./node_modules/workbox-precaching/utils/printCleanupDetails.js");
/* harmony import */ var _utils_printInstallDetails_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/printInstallDetails.js */ "./node_modules/workbox-precaching/utils/printInstallDetails.js");
/* harmony import */ var _PrecacheStrategy_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./PrecacheStrategy.js */ "./node_modules/workbox-precaching/PrecacheStrategy.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_11__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/












/**
 * Performs efficient precaching of assets.
 *
 * @memberof workbox-precaching
 */
class PrecacheController {
    /**
     * Create a new PrecacheController.
     *
     * @param {Object} [options]
     * @param {string} [options.cacheName] The cache to use for precaching.
     * @param {string} [options.plugins] Plugins to use when precaching as well
     * as responding to fetch events for precached assets.
     * @param {boolean} [options.fallbackToNetwork=true] Whether to attempt to
     * get the response from the network if there's a precache miss.
     */
    constructor({ cacheName, plugins = [], fallbackToNetwork = true, } = {}) {
        this._urlsToCacheKeys = new Map();
        this._urlsToCacheModes = new Map();
        this._cacheKeysToIntegrities = new Map();
        this._strategy = new _PrecacheStrategy_js__WEBPACK_IMPORTED_MODULE_10__.PrecacheStrategy({
            cacheName: workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_1__.cacheNames.getPrecacheName(cacheName),
            plugins: [
                ...plugins,
                new _utils_PrecacheCacheKeyPlugin_js__WEBPACK_IMPORTED_MODULE_7__.PrecacheCacheKeyPlugin({ precacheController: this }),
            ],
            fallbackToNetwork,
        });
        // Bind the install and activate methods to the instance.
        this.install = this.install.bind(this);
        this.activate = this.activate.bind(this);
    }
    /**
     * @type {workbox-precaching.PrecacheStrategy} The strategy created by this controller and
     * used to cache assets and respond to fetch events.
     */
    get strategy() {
        return this._strategy;
    }
    /**
     * Adds items to the precache list, removing any duplicates and
     * stores the files in the
     * {@link workbox-core.cacheNames|"precache cache"} when the service
     * worker installs.
     *
     * This method can be called multiple times.
     *
     * @param {Array<Object|string>} [entries=[]] Array of entries to precache.
     */
    precache(entries) {
        this.addToCacheList(entries);
        if (!this._installAndActiveListenersAdded) {
            self.addEventListener('install', this.install);
            self.addEventListener('activate', this.activate);
            this._installAndActiveListenersAdded = true;
        }
    }
    /**
     * This method will add items to the precache list, removing duplicates
     * and ensuring the information is valid.
     *
     * @param {Array<workbox-precaching.PrecacheController.PrecacheEntry|string>} entries
     *     Array of entries to precache.
     */
    addToCacheList(entries) {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isArray(entries, {
                moduleName: 'workbox-precaching',
                className: 'PrecacheController',
                funcName: 'addToCacheList',
                paramName: 'entries',
            });
        }
        const urlsToWarnAbout = [];
        for (const entry of entries) {
            // See https://github.com/GoogleChrome/workbox/issues/2259
            if (typeof entry === 'string') {
                urlsToWarnAbout.push(entry);
            }
            else if (entry && entry.revision === undefined) {
                urlsToWarnAbout.push(entry.url);
            }
            const { cacheKey, url } = (0,_utils_createCacheKey_js__WEBPACK_IMPORTED_MODULE_5__.createCacheKey)(entry);
            const cacheMode = typeof entry !== 'string' && entry.revision ? 'reload' : 'default';
            if (this._urlsToCacheKeys.has(url) &&
                this._urlsToCacheKeys.get(url) !== cacheKey) {
                throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_3__.WorkboxError('add-to-cache-list-conflicting-entries', {
                    firstEntry: this._urlsToCacheKeys.get(url),
                    secondEntry: cacheKey,
                });
            }
            if (typeof entry !== 'string' && entry.integrity) {
                if (this._cacheKeysToIntegrities.has(cacheKey) &&
                    this._cacheKeysToIntegrities.get(cacheKey) !== entry.integrity) {
                    throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_3__.WorkboxError('add-to-cache-list-conflicting-integrities', {
                        url,
                    });
                }
                this._cacheKeysToIntegrities.set(cacheKey, entry.integrity);
            }
            this._urlsToCacheKeys.set(url, cacheKey);
            this._urlsToCacheModes.set(url, cacheMode);
            if (urlsToWarnAbout.length > 0) {
                const warningMessage = `Workbox is precaching URLs without revision ` +
                    `info: ${urlsToWarnAbout.join(', ')}\nThis is generally NOT safe. ` +
                    `Learn more at https://bit.ly/wb-precache`;
                if (false) // removed by dead control flow
{}
                else {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_2__.logger.warn(warningMessage);
                }
            }
        }
    }
    /**
     * Precaches new and updated assets. Call this method from the service worker
     * install event.
     *
     * Note: this method calls `event.waitUntil()` for you, so you do not need
     * to call it yourself in your event handlers.
     *
     * @param {ExtendableEvent} event
     * @return {Promise<workbox-precaching.InstallResult>}
     */
    install(event) {
        // waitUntil returns Promise<any>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return (0,workbox_core_private_waitUntil_js__WEBPACK_IMPORTED_MODULE_4__.waitUntil)(event, async () => {
            const installReportPlugin = new _utils_PrecacheInstallReportPlugin_js__WEBPACK_IMPORTED_MODULE_6__.PrecacheInstallReportPlugin();
            this.strategy.plugins.push(installReportPlugin);
            // Cache entries one at a time.
            // See https://github.com/GoogleChrome/workbox/issues/2528
            for (const [url, cacheKey] of this._urlsToCacheKeys) {
                const integrity = this._cacheKeysToIntegrities.get(cacheKey);
                const cacheMode = this._urlsToCacheModes.get(url);
                const request = new Request(url, {
                    integrity,
                    cache: cacheMode,
                    credentials: 'same-origin',
                });
                await Promise.all(this.strategy.handleAll({
                    params: { cacheKey },
                    request,
                    event,
                }));
            }
            const { updatedURLs, notUpdatedURLs } = installReportPlugin;
            if (true) {
                (0,_utils_printInstallDetails_js__WEBPACK_IMPORTED_MODULE_9__.printInstallDetails)(updatedURLs, notUpdatedURLs);
            }
            return { updatedURLs, notUpdatedURLs };
        });
    }
    /**
     * Deletes assets that are no longer present in the current precache manifest.
     * Call this method from the service worker activate event.
     *
     * Note: this method calls `event.waitUntil()` for you, so you do not need
     * to call it yourself in your event handlers.
     *
     * @param {ExtendableEvent} event
     * @return {Promise<workbox-precaching.CleanupResult>}
     */
    activate(event) {
        // waitUntil returns Promise<any>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return (0,workbox_core_private_waitUntil_js__WEBPACK_IMPORTED_MODULE_4__.waitUntil)(event, async () => {
            const cache = await self.caches.open(this.strategy.cacheName);
            const currentlyCachedRequests = await cache.keys();
            const expectedCacheKeys = new Set(this._urlsToCacheKeys.values());
            const deletedURLs = [];
            for (const request of currentlyCachedRequests) {
                if (!expectedCacheKeys.has(request.url)) {
                    await cache.delete(request);
                    deletedURLs.push(request.url);
                }
            }
            if (true) {
                (0,_utils_printCleanupDetails_js__WEBPACK_IMPORTED_MODULE_8__.printCleanupDetails)(deletedURLs);
            }
            return { deletedURLs };
        });
    }
    /**
     * Returns a mapping of a precached URL to the corresponding cache key, taking
     * into account the revision information for the URL.
     *
     * @return {Map<string, string>} A URL to cache key mapping.
     */
    getURLsToCacheKeys() {
        return this._urlsToCacheKeys;
    }
    /**
     * Returns a list of all the URLs that have been precached by the current
     * service worker.
     *
     * @return {Array<string>} The precached URLs.
     */
    getCachedURLs() {
        return [...this._urlsToCacheKeys.keys()];
    }
    /**
     * Returns the cache key used for storing a given URL. If that URL is
     * unversioned, like `/index.html', then the cache key will be the original
     * URL with a search parameter appended to it.
     *
     * @param {string} url A URL whose cache key you want to look up.
     * @return {string} The versioned URL that corresponds to a cache key
     * for the original URL, or undefined if that URL isn't precached.
     */
    getCacheKeyForURL(url) {
        const urlObject = new URL(url, location.href);
        return this._urlsToCacheKeys.get(urlObject.href);
    }
    /**
     * @param {string} url A cache key whose SRI you want to look up.
     * @return {string} The subresource integrity associated with the cache key,
     * or undefined if it's not set.
     */
    getIntegrityForCacheKey(cacheKey) {
        return this._cacheKeysToIntegrities.get(cacheKey);
    }
    /**
     * This acts as a drop-in replacement for
     * [`cache.match()`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match)
     * with the following differences:
     *
     * - It knows what the name of the precache is, and only checks in that cache.
     * - It allows you to pass in an "original" URL without versioning parameters,
     * and it will automatically look up the correct cache key for the currently
     * active revision of that URL.
     *
     * E.g., `matchPrecache('index.html')` will find the correct precached
     * response for the currently active service worker, even if the actual cache
     * key is `'/index.html?__WB_REVISION__=1234abcd'`.
     *
     * @param {string|Request} request The key (without revisioning parameters)
     * to look up in the precache.
     * @return {Promise<Response|undefined>}
     */
    async matchPrecache(request) {
        const url = request instanceof Request ? request.url : request;
        const cacheKey = this.getCacheKeyForURL(url);
        if (cacheKey) {
            const cache = await self.caches.open(this.strategy.cacheName);
            return cache.match(cacheKey);
        }
        return undefined;
    }
    /**
     * Returns a function that looks up `url` in the precache (taking into
     * account revision information), and returns the corresponding `Response`.
     *
     * @param {string} url The precached URL which will be used to lookup the
     * `Response`.
     * @return {workbox-routing~handlerCallback}
     */
    createHandlerBoundToURL(url) {
        const cacheKey = this.getCacheKeyForURL(url);
        if (!cacheKey) {
            throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_3__.WorkboxError('non-precached-url', { url });
        }
        return (options) => {
            options.request = new Request(url);
            options.params = Object.assign({ cacheKey }, options.params);
            return this.strategy.handle(options);
        };
    }
}



/***/ }),

/***/ "./node_modules/workbox-precaching/PrecacheFallbackPlugin.js":
/*!*******************************************************************!*\
  !*** ./node_modules/workbox-precaching/PrecacheFallbackPlugin.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PrecacheFallbackPlugin: () => (/* binding */ PrecacheFallbackPlugin)
/* harmony export */ });
/* harmony import */ var _utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/getOrCreatePrecacheController.js */ "./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * `PrecacheFallbackPlugin` allows you to specify an "offline fallback"
 * response to be used when a given strategy is unable to generate a response.
 *
 * It does this by intercepting the `handlerDidError` plugin callback
 * and returning a precached response, taking the expected revision parameter
 * into account automatically.
 *
 * Unless you explicitly pass in a `PrecacheController` instance to the
 * constructor, the default instance will be used. Generally speaking, most
 * developers will end up using the default.
 *
 * @memberof workbox-precaching
 */
class PrecacheFallbackPlugin {
    /**
     * Constructs a new PrecacheFallbackPlugin with the associated fallbackURL.
     *
     * @param {Object} config
     * @param {string} config.fallbackURL A precached URL to use as the fallback
     *     if the associated strategy can't generate a response.
     * @param {PrecacheController} [config.precacheController] An optional
     *     PrecacheController instance. If not provided, the default
     *     PrecacheController will be used.
     */
    constructor({ fallbackURL, precacheController, }) {
        /**
         * @return {Promise<Response>} The precache response for the fallback URL.
         *
         * @private
         */
        this.handlerDidError = () => this._precacheController.matchPrecache(this._fallbackURL);
        this._fallbackURL = fallbackURL;
        this._precacheController =
            precacheController || (0,_utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__.getOrCreatePrecacheController)();
    }
}



/***/ }),

/***/ "./node_modules/workbox-precaching/PrecacheRoute.js":
/*!**********************************************************!*\
  !*** ./node_modules/workbox-precaching/PrecacheRoute.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PrecacheRoute: () => (/* binding */ PrecacheRoute)
/* harmony export */ });
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/getFriendlyURL.js */ "./node_modules/workbox-core/_private/getFriendlyURL.js");
/* harmony import */ var workbox_routing_Route_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workbox-routing/Route.js */ "./node_modules/workbox-routing/Route.js");
/* harmony import */ var _utils_generateURLVariations_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/generateURLVariations.js */ "./node_modules/workbox-precaching/utils/generateURLVariations.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_4__);
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/





/**
 * A subclass of {@link workbox-routing.Route} that takes a
 * {@link workbox-precaching.PrecacheController}
 * instance and uses it to match incoming requests and handle fetching
 * responses from the precache.
 *
 * @memberof workbox-precaching
 * @extends workbox-routing.Route
 */
class PrecacheRoute extends workbox_routing_Route_js__WEBPACK_IMPORTED_MODULE_2__.Route {
    /**
     * @param {PrecacheController} precacheController A `PrecacheController`
     * instance used to both match requests and respond to fetch events.
     * @param {Object} [options] Options to control how requests are matched
     * against the list of precached URLs.
     * @param {string} [options.directoryIndex=index.html] The `directoryIndex` will
     * check cache entries for a URLs ending with '/' to see if there is a hit when
     * appending the `directoryIndex` value.
     * @param {Array<RegExp>} [options.ignoreURLParametersMatching=[/^utm_/, /^fbclid$/]] An
     * array of regex's to remove search params when looking for a cache match.
     * @param {boolean} [options.cleanURLs=true] The `cleanURLs` option will
     * check the cache for the URL with a `.html` added to the end of the end.
     * @param {workbox-precaching~urlManipulation} [options.urlManipulation]
     * This is a function that should take a URL and return an array of
     * alternative URLs that should be checked for precache matches.
     */
    constructor(precacheController, options) {
        const match = ({ request, }) => {
            const urlsToCacheKeys = precacheController.getURLsToCacheKeys();
            for (const possibleURL of (0,_utils_generateURLVariations_js__WEBPACK_IMPORTED_MODULE_3__.generateURLVariations)(request.url, options)) {
                const cacheKey = urlsToCacheKeys.get(possibleURL);
                if (cacheKey) {
                    const integrity = precacheController.getIntegrityForCacheKey(cacheKey);
                    return { cacheKey, integrity };
                }
            }
            if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.debug(`Precaching did not find a match for ` + (0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__.getFriendlyURL)(request.url));
            }
            return;
        };
        super(match, precacheController.strategy);
    }
}



/***/ }),

/***/ "./node_modules/workbox-precaching/PrecacheStrategy.js":
/*!*************************************************************!*\
  !*** ./node_modules/workbox-precaching/PrecacheStrategy.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PrecacheStrategy: () => (/* binding */ PrecacheStrategy)
/* harmony export */ });
/* harmony import */ var workbox_core_copyResponse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/copyResponse.js */ "./node_modules/workbox-core/copyResponse.js");
/* harmony import */ var workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/cacheNames.js */ "./node_modules/workbox-core/_private/cacheNames.js");
/* harmony import */ var workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workbox-core/_private/getFriendlyURL.js */ "./node_modules/workbox-core/_private/getFriendlyURL.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var workbox_strategies_Strategy_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! workbox-strategies/Strategy.js */ "./node_modules/workbox-strategies/Strategy.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_6__);
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/







/**
 * A {@link workbox-strategies.Strategy} implementation
 * specifically designed to work with
 * {@link workbox-precaching.PrecacheController}
 * to both cache and fetch precached assets.
 *
 * Note: an instance of this class is created automatically when creating a
 * `PrecacheController`; it's generally not necessary to create this yourself.
 *
 * @extends workbox-strategies.Strategy
 * @memberof workbox-precaching
 */
class PrecacheStrategy extends workbox_strategies_Strategy_js__WEBPACK_IMPORTED_MODULE_5__.Strategy {
    /**
     *
     * @param {Object} [options]
     * @param {string} [options.cacheName] Cache name to store and retrieve
     * requests. Defaults to the cache names provided by
     * {@link workbox-core.cacheNames}.
     * @param {Array<Object>} [options.plugins] {@link https://developers.google.com/web/tools/workbox/guides/using-plugins|Plugins}
     * to use in conjunction with this caching strategy.
     * @param {Object} [options.fetchOptions] Values passed along to the
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters|init}
     * of all fetch() requests made by this strategy.
     * @param {Object} [options.matchOptions] The
     * {@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions|CacheQueryOptions}
     * for any `cache.match()` or `cache.put()` calls made by this strategy.
     * @param {boolean} [options.fallbackToNetwork=true] Whether to attempt to
     * get the response from the network if there's a precache miss.
     */
    constructor(options = {}) {
        options.cacheName = workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_1__.cacheNames.getPrecacheName(options.cacheName);
        super(options);
        this._fallbackToNetwork =
            options.fallbackToNetwork === false ? false : true;
        // Redirected responses cannot be used to satisfy a navigation request, so
        // any redirected response must be "copied" rather than cloned, so the new
        // response doesn't contain the `redirected` flag. See:
        // https://bugs.chromium.org/p/chromium/issues/detail?id=669363&desc=2#c1
        this.plugins.push(PrecacheStrategy.copyRedirectedCacheableResponsesPlugin);
    }
    /**
     * @private
     * @param {Request|string} request A request to run this strategy for.
     * @param {workbox-strategies.StrategyHandler} handler The event that
     *     triggered the request.
     * @return {Promise<Response>}
     */
    async _handle(request, handler) {
        const response = await handler.cacheMatch(request);
        if (response) {
            return response;
        }
        // If this is an `install` event for an entry that isn't already cached,
        // then populate the cache.
        if (handler.event && handler.event.type === 'install') {
            return await this._handleInstall(request, handler);
        }
        // Getting here means something went wrong. An entry that should have been
        // precached wasn't found in the cache.
        return await this._handleFetch(request, handler);
    }
    async _handleFetch(request, handler) {
        let response;
        const params = (handler.params || {});
        // Fall back to the network if we're configured to do so.
        if (this._fallbackToNetwork) {
            if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.warn(`The precached response for ` +
                    `${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_2__.getFriendlyURL)(request.url)} in ${this.cacheName} was not ` +
                    `found. Falling back to the network.`);
            }
            const integrityInManifest = params.integrity;
            const integrityInRequest = request.integrity;
            const noIntegrityConflict = !integrityInRequest || integrityInRequest === integrityInManifest;
            // Do not add integrity if the original request is no-cors
            // See https://github.com/GoogleChrome/workbox/issues/3096
            response = await handler.fetch(new Request(request, {
                integrity: request.mode !== 'no-cors'
                    ? integrityInRequest || integrityInManifest
                    : undefined,
            }));
            // It's only "safe" to repair the cache if we're using SRI to guarantee
            // that the response matches the precache manifest's expectations,
            // and there's either a) no integrity property in the incoming request
            // or b) there is an integrity, and it matches the precache manifest.
            // See https://github.com/GoogleChrome/workbox/issues/2858
            // Also if the original request users no-cors we don't use integrity.
            // See https://github.com/GoogleChrome/workbox/issues/3096
            if (integrityInManifest &&
                noIntegrityConflict &&
                request.mode !== 'no-cors') {
                this._useDefaultCacheabilityPluginIfNeeded();
                const wasCached = await handler.cachePut(request, response.clone());
                if (true) {
                    if (wasCached) {
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.log(`A response for ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_2__.getFriendlyURL)(request.url)} ` +
                            `was used to "repair" the precache.`);
                    }
                }
            }
        }
        else {
            // This shouldn't normally happen, but there are edge cases:
            // https://github.com/GoogleChrome/workbox/issues/1441
            throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_4__.WorkboxError('missing-precache-entry', {
                cacheName: this.cacheName,
                url: request.url,
            });
        }
        if (true) {
            const cacheKey = params.cacheKey || (await handler.getCacheKey(request, 'read'));
            // Workbox is going to handle the route.
            // print the routing details to the console.
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupCollapsed(`Precaching is responding to: ` + (0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_2__.getFriendlyURL)(request.url));
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.log(`Serving the precached url: ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_2__.getFriendlyURL)(cacheKey instanceof Request ? cacheKey.url : cacheKey)}`);
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupCollapsed(`View request details here.`);
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.log(request);
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupEnd();
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupCollapsed(`View response details here.`);
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.log(response);
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupEnd();
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupEnd();
        }
        return response;
    }
    async _handleInstall(request, handler) {
        this._useDefaultCacheabilityPluginIfNeeded();
        const response = await handler.fetch(request);
        // Make sure we defer cachePut() until after we know the response
        // should be cached; see https://github.com/GoogleChrome/workbox/issues/2737
        const wasCached = await handler.cachePut(request, response.clone());
        if (!wasCached) {
            // Throwing here will lead to the `install` handler failing, which
            // we want to do if *any* of the responses aren't safe to cache.
            throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_4__.WorkboxError('bad-precaching-response', {
                url: request.url,
                status: response.status,
            });
        }
        return response;
    }
    /**
     * This method is complex, as there a number of things to account for:
     *
     * The `plugins` array can be set at construction, and/or it might be added to
     * to at any time before the strategy is used.
     *
     * At the time the strategy is used (i.e. during an `install` event), there
     * needs to be at least one plugin that implements `cacheWillUpdate` in the
     * array, other than `copyRedirectedCacheableResponsesPlugin`.
     *
     * - If this method is called and there are no suitable `cacheWillUpdate`
     * plugins, we need to add `defaultPrecacheCacheabilityPlugin`.
     *
     * - If this method is called and there is exactly one `cacheWillUpdate`, then
     * we don't have to do anything (this might be a previously added
     * `defaultPrecacheCacheabilityPlugin`, or it might be a custom plugin).
     *
     * - If this method is called and there is more than one `cacheWillUpdate`,
     * then we need to check if one is `defaultPrecacheCacheabilityPlugin`. If so,
     * we need to remove it. (This situation is unlikely, but it could happen if
     * the strategy is used multiple times, the first without a `cacheWillUpdate`,
     * and then later on after manually adding a custom `cacheWillUpdate`.)
     *
     * See https://github.com/GoogleChrome/workbox/issues/2737 for more context.
     *
     * @private
     */
    _useDefaultCacheabilityPluginIfNeeded() {
        let defaultPluginIndex = null;
        let cacheWillUpdatePluginCount = 0;
        for (const [index, plugin] of this.plugins.entries()) {
            // Ignore the copy redirected plugin when determining what to do.
            if (plugin === PrecacheStrategy.copyRedirectedCacheableResponsesPlugin) {
                continue;
            }
            // Save the default plugin's index, in case it needs to be removed.
            if (plugin === PrecacheStrategy.defaultPrecacheCacheabilityPlugin) {
                defaultPluginIndex = index;
            }
            if (plugin.cacheWillUpdate) {
                cacheWillUpdatePluginCount++;
            }
        }
        if (cacheWillUpdatePluginCount === 0) {
            this.plugins.push(PrecacheStrategy.defaultPrecacheCacheabilityPlugin);
        }
        else if (cacheWillUpdatePluginCount > 1 && defaultPluginIndex !== null) {
            // Only remove the default plugin; multiple custom plugins are allowed.
            this.plugins.splice(defaultPluginIndex, 1);
        }
        // Nothing needs to be done if cacheWillUpdatePluginCount is 1
    }
}
PrecacheStrategy.defaultPrecacheCacheabilityPlugin = {
    async cacheWillUpdate({ response }) {
        if (!response || response.status >= 400) {
            return null;
        }
        return response;
    },
};
PrecacheStrategy.copyRedirectedCacheableResponsesPlugin = {
    async cacheWillUpdate({ response }) {
        return response.redirected ? await (0,workbox_core_copyResponse_js__WEBPACK_IMPORTED_MODULE_0__.copyResponse)(response) : response;
    },
};



/***/ }),

/***/ "./node_modules/workbox-precaching/_types.js":
/*!***************************************************!*\
  !*** ./node_modules/workbox-precaching/_types.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

// * * * IMPORTANT! * * *
// ------------------------------------------------------------------------- //
// jdsoc type definitions cannot be declared above TypeScript definitions or
// they'll be stripped from the built `.js` files, and they'll only be in the
// `d.ts` files, which aren't read by the jsdoc generator. As a result we
// have to put declare them below.
/**
 * @typedef {Object} InstallResult
 * @property {Array<string>} updatedURLs List of URLs that were updated during
 * installation.
 * @property {Array<string>} notUpdatedURLs List of URLs that were already up to
 * date.
 *
 * @memberof workbox-precaching
 */
/**
 * @typedef {Object} CleanupResult
 * @property {Array<string>} deletedCacheRequests List of URLs that were deleted
 * while cleaning up the cache.
 *
 * @memberof workbox-precaching
 */
/**
 * @typedef {Object} PrecacheEntry
 * @property {string} url URL to precache.
 * @property {string} [revision] Revision information for the URL.
 * @property {string} [integrity] Integrity metadata that will be used when
 * making the network request for the URL.
 *
 * @memberof workbox-precaching
 */
/**
 * The "urlManipulation" callback can be used to determine if there are any
 * additional permutations of a URL that should be used to check against
 * the available precached files.
 *
 * For example, Workbox supports checking for '/index.html' when the URL
 * '/' is provided. This callback allows additional, custom checks.
 *
 * @callback ~urlManipulation
 * @param {Object} context
 * @param {URL} context.url The request's URL.
 * @return {Array<URL>} To add additional urls to test, return an Array of
 * URLs. Please note that these **should not be strings**, but URL objects.
 *
 * @memberof workbox-precaching
 */


/***/ }),

/***/ "./node_modules/workbox-precaching/_version.js":
/*!*****************************************************!*\
  !*** ./node_modules/workbox-precaching/_version.js ***!
  \*****************************************************/
/***/ (() => {


// @ts-ignore
try {
    self['workbox:precaching:7.0.0'] && _();
}
catch (e) { }


/***/ }),

/***/ "./node_modules/workbox-precaching/addPlugins.js":
/*!*******************************************************!*\
  !*** ./node_modules/workbox-precaching/addPlugins.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addPlugins: () => (/* binding */ addPlugins)
/* harmony export */ });
/* harmony import */ var _utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/getOrCreatePrecacheController.js */ "./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * Adds plugins to the precaching strategy.
 *
 * @param {Array<Object>} plugins
 *
 * @memberof workbox-precaching
 */
function addPlugins(plugins) {
    const precacheController = (0,_utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__.getOrCreatePrecacheController)();
    precacheController.strategy.plugins.push(...plugins);
}



/***/ }),

/***/ "./node_modules/workbox-precaching/addRoute.js":
/*!*****************************************************!*\
  !*** ./node_modules/workbox-precaching/addRoute.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addRoute: () => (/* binding */ addRoute)
/* harmony export */ });
/* harmony import */ var workbox_routing_registerRoute_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-routing/registerRoute.js */ "./node_modules/workbox-routing/registerRoute.js");
/* harmony import */ var _utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/getOrCreatePrecacheController.js */ "./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js");
/* harmony import */ var _PrecacheRoute_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PrecacheRoute.js */ "./node_modules/workbox-precaching/PrecacheRoute.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_3__);
/*
  Copyright 2019 Google LLC
  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/




/**
 * Add a `fetch` listener to the service worker that will
 * respond to
 * [network requests]{@link https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers#Custom_responses_to_requests}
 * with precached assets.
 *
 * Requests for assets that aren't precached, the `FetchEvent` will not be
 * responded to, allowing the event to fall through to other `fetch` event
 * listeners.
 *
 * @param {Object} [options] See the {@link workbox-precaching.PrecacheRoute}
 * options.
 *
 * @memberof workbox-precaching
 */
function addRoute(options) {
    const precacheController = (0,_utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_1__.getOrCreatePrecacheController)();
    const precacheRoute = new _PrecacheRoute_js__WEBPACK_IMPORTED_MODULE_2__.PrecacheRoute(precacheController, options);
    (0,workbox_routing_registerRoute_js__WEBPACK_IMPORTED_MODULE_0__.registerRoute)(precacheRoute);
}



/***/ }),

/***/ "./node_modules/workbox-precaching/cleanupOutdatedCaches.js":
/*!******************************************************************!*\
  !*** ./node_modules/workbox-precaching/cleanupOutdatedCaches.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cleanupOutdatedCaches: () => (/* binding */ cleanupOutdatedCaches)
/* harmony export */ });
/* harmony import */ var workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/cacheNames.js */ "./node_modules/workbox-core/_private/cacheNames.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var _utils_deleteOutdatedCaches_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/deleteOutdatedCaches.js */ "./node_modules/workbox-precaching/utils/deleteOutdatedCaches.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_3__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/




/**
 * Adds an `activate` event listener which will clean up incompatible
 * precaches that were created by older versions of Workbox.
 *
 * @memberof workbox-precaching
 */
function cleanupOutdatedCaches() {
    // See https://github.com/Microsoft/TypeScript/issues/28357#issuecomment-436484705
    self.addEventListener('activate', ((event) => {
        const cacheName = workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_0__.cacheNames.getPrecacheName();
        event.waitUntil((0,_utils_deleteOutdatedCaches_js__WEBPACK_IMPORTED_MODULE_2__.deleteOutdatedCaches)(cacheName).then((cachesDeleted) => {
            if (true) {
                if (cachesDeleted.length > 0) {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_1__.logger.log(`The following out-of-date precaches were cleaned up ` +
                        `automatically:`, cachesDeleted);
                }
            }
        }));
    }));
}



/***/ }),

/***/ "./node_modules/workbox-precaching/createHandlerBoundToURL.js":
/*!********************************************************************!*\
  !*** ./node_modules/workbox-precaching/createHandlerBoundToURL.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createHandlerBoundToURL: () => (/* binding */ createHandlerBoundToURL)
/* harmony export */ });
/* harmony import */ var _utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/getOrCreatePrecacheController.js */ "./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * Helper function that calls
 * {@link PrecacheController#createHandlerBoundToURL} on the default
 * {@link PrecacheController} instance.
 *
 * If you are creating your own {@link PrecacheController}, then call the
 * {@link PrecacheController#createHandlerBoundToURL} on that instance,
 * instead of using this function.
 *
 * @param {string} url The precached URL which will be used to lookup the
 * `Response`.
 * @param {boolean} [fallbackToNetwork=true] Whether to attempt to get the
 * response from the network if there's a precache miss.
 * @return {workbox-routing~handlerCallback}
 *
 * @memberof workbox-precaching
 */
function createHandlerBoundToURL(url) {
    const precacheController = (0,_utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__.getOrCreatePrecacheController)();
    return precacheController.createHandlerBoundToURL(url);
}



/***/ }),

/***/ "./node_modules/workbox-precaching/getCacheKeyForURL.js":
/*!**************************************************************!*\
  !*** ./node_modules/workbox-precaching/getCacheKeyForURL.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCacheKeyForURL: () => (/* binding */ getCacheKeyForURL)
/* harmony export */ });
/* harmony import */ var _utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/getOrCreatePrecacheController.js */ "./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * Takes in a URL, and returns the corresponding URL that could be used to
 * lookup the entry in the precache.
 *
 * If a relative URL is provided, the location of the service worker file will
 * be used as the base.
 *
 * For precached entries without revision information, the cache key will be the
 * same as the original URL.
 *
 * For precached entries with revision information, the cache key will be the
 * original URL with the addition of a query parameter used for keeping track of
 * the revision info.
 *
 * @param {string} url The URL whose cache key to look up.
 * @return {string} The cache key that corresponds to that URL.
 *
 * @memberof workbox-precaching
 */
function getCacheKeyForURL(url) {
    const precacheController = (0,_utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__.getOrCreatePrecacheController)();
    return precacheController.getCacheKeyForURL(url);
}



/***/ }),

/***/ "./node_modules/workbox-precaching/index.js":
/*!**************************************************!*\
  !*** ./node_modules/workbox-precaching/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PrecacheController: () => (/* reexport safe */ _PrecacheController_js__WEBPACK_IMPORTED_MODULE_8__.PrecacheController),
/* harmony export */   PrecacheFallbackPlugin: () => (/* reexport safe */ _PrecacheFallbackPlugin_js__WEBPACK_IMPORTED_MODULE_11__.PrecacheFallbackPlugin),
/* harmony export */   PrecacheRoute: () => (/* reexport safe */ _PrecacheRoute_js__WEBPACK_IMPORTED_MODULE_9__.PrecacheRoute),
/* harmony export */   PrecacheStrategy: () => (/* reexport safe */ _PrecacheStrategy_js__WEBPACK_IMPORTED_MODULE_10__.PrecacheStrategy),
/* harmony export */   addPlugins: () => (/* reexport safe */ _addPlugins_js__WEBPACK_IMPORTED_MODULE_0__.addPlugins),
/* harmony export */   addRoute: () => (/* reexport safe */ _addRoute_js__WEBPACK_IMPORTED_MODULE_1__.addRoute),
/* harmony export */   cleanupOutdatedCaches: () => (/* reexport safe */ _cleanupOutdatedCaches_js__WEBPACK_IMPORTED_MODULE_2__.cleanupOutdatedCaches),
/* harmony export */   createHandlerBoundToURL: () => (/* reexport safe */ _createHandlerBoundToURL_js__WEBPACK_IMPORTED_MODULE_3__.createHandlerBoundToURL),
/* harmony export */   getCacheKeyForURL: () => (/* reexport safe */ _getCacheKeyForURL_js__WEBPACK_IMPORTED_MODULE_4__.getCacheKeyForURL),
/* harmony export */   matchPrecache: () => (/* reexport safe */ _matchPrecache_js__WEBPACK_IMPORTED_MODULE_5__.matchPrecache),
/* harmony export */   precache: () => (/* reexport safe */ _precache_js__WEBPACK_IMPORTED_MODULE_6__.precache),
/* harmony export */   precacheAndRoute: () => (/* reexport safe */ _precacheAndRoute_js__WEBPACK_IMPORTED_MODULE_7__.precacheAndRoute)
/* harmony export */ });
/* harmony import */ var _addPlugins_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addPlugins.js */ "./node_modules/workbox-precaching/addPlugins.js");
/* harmony import */ var _addRoute_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addRoute.js */ "./node_modules/workbox-precaching/addRoute.js");
/* harmony import */ var _cleanupOutdatedCaches_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cleanupOutdatedCaches.js */ "./node_modules/workbox-precaching/cleanupOutdatedCaches.js");
/* harmony import */ var _createHandlerBoundToURL_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createHandlerBoundToURL.js */ "./node_modules/workbox-precaching/createHandlerBoundToURL.js");
/* harmony import */ var _getCacheKeyForURL_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getCacheKeyForURL.js */ "./node_modules/workbox-precaching/getCacheKeyForURL.js");
/* harmony import */ var _matchPrecache_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./matchPrecache.js */ "./node_modules/workbox-precaching/matchPrecache.js");
/* harmony import */ var _precache_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./precache.js */ "./node_modules/workbox-precaching/precache.js");
/* harmony import */ var _precacheAndRoute_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./precacheAndRoute.js */ "./node_modules/workbox-precaching/precacheAndRoute.js");
/* harmony import */ var _PrecacheController_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./PrecacheController.js */ "./node_modules/workbox-precaching/PrecacheController.js");
/* harmony import */ var _PrecacheRoute_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./PrecacheRoute.js */ "./node_modules/workbox-precaching/PrecacheRoute.js");
/* harmony import */ var _PrecacheStrategy_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./PrecacheStrategy.js */ "./node_modules/workbox-precaching/PrecacheStrategy.js");
/* harmony import */ var _PrecacheFallbackPlugin_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./PrecacheFallbackPlugin.js */ "./node_modules/workbox-precaching/PrecacheFallbackPlugin.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./_types.js */ "./node_modules/workbox-precaching/_types.js");
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/













/**
 * Most consumers of this module will want to use the
 * {@link workbox-precaching.precacheAndRoute}
 * method to add assets to the cache and respond to network requests with these
 * cached assets.
 *
 * If you require more control over caching and routing, you can use the
 * {@link workbox-precaching.PrecacheController}
 * interface.
 *
 * @module workbox-precaching
 */




/***/ }),

/***/ "./node_modules/workbox-precaching/index.mjs":
/*!***************************************************!*\
  !*** ./node_modules/workbox-precaching/index.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PrecacheController: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.PrecacheController),
/* harmony export */   PrecacheFallbackPlugin: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.PrecacheFallbackPlugin),
/* harmony export */   PrecacheRoute: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.PrecacheRoute),
/* harmony export */   PrecacheStrategy: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.PrecacheStrategy),
/* harmony export */   addPlugins: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.addPlugins),
/* harmony export */   addRoute: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.addRoute),
/* harmony export */   cleanupOutdatedCaches: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.cleanupOutdatedCaches),
/* harmony export */   createHandlerBoundToURL: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.createHandlerBoundToURL),
/* harmony export */   getCacheKeyForURL: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.getCacheKeyForURL),
/* harmony export */   matchPrecache: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.matchPrecache),
/* harmony export */   precache: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.precache),
/* harmony export */   precacheAndRoute: () => (/* reexport safe */ _index_js__WEBPACK_IMPORTED_MODULE_0__.precacheAndRoute)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/workbox-precaching/index.js");


/***/ }),

/***/ "./node_modules/workbox-precaching/matchPrecache.js":
/*!**********************************************************!*\
  !*** ./node_modules/workbox-precaching/matchPrecache.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   matchPrecache: () => (/* binding */ matchPrecache)
/* harmony export */ });
/* harmony import */ var _utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/getOrCreatePrecacheController.js */ "./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * Helper function that calls
 * {@link PrecacheController#matchPrecache} on the default
 * {@link PrecacheController} instance.
 *
 * If you are creating your own {@link PrecacheController}, then call
 * {@link PrecacheController#matchPrecache} on that instance,
 * instead of using this function.
 *
 * @param {string|Request} request The key (without revisioning parameters)
 * to look up in the precache.
 * @return {Promise<Response|undefined>}
 *
 * @memberof workbox-precaching
 */
function matchPrecache(request) {
    const precacheController = (0,_utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__.getOrCreatePrecacheController)();
    return precacheController.matchPrecache(request);
}



/***/ }),

/***/ "./node_modules/workbox-precaching/precache.js":
/*!*****************************************************!*\
  !*** ./node_modules/workbox-precaching/precache.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   precache: () => (/* binding */ precache)
/* harmony export */ });
/* harmony import */ var _utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/getOrCreatePrecacheController.js */ "./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * Adds items to the precache list, removing any duplicates and
 * stores the files in the
 * {@link workbox-core.cacheNames|"precache cache"} when the service
 * worker installs.
 *
 * This method can be called multiple times.
 *
 * Please note: This method **will not** serve any of the cached files for you.
 * It only precaches files. To respond to a network request you call
 * {@link workbox-precaching.addRoute}.
 *
 * If you have a single array of files to precache, you can just call
 * {@link workbox-precaching.precacheAndRoute}.
 *
 * @param {Array<Object|string>} [entries=[]] Array of entries to precache.
 *
 * @memberof workbox-precaching
 */
function precache(entries) {
    const precacheController = (0,_utils_getOrCreatePrecacheController_js__WEBPACK_IMPORTED_MODULE_0__.getOrCreatePrecacheController)();
    precacheController.precache(entries);
}



/***/ }),

/***/ "./node_modules/workbox-precaching/precacheAndRoute.js":
/*!*************************************************************!*\
  !*** ./node_modules/workbox-precaching/precacheAndRoute.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   precacheAndRoute: () => (/* binding */ precacheAndRoute)
/* harmony export */ });
/* harmony import */ var _addRoute_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addRoute.js */ "./node_modules/workbox-precaching/addRoute.js");
/* harmony import */ var _precache_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./precache.js */ "./node_modules/workbox-precaching/precache.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_2__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/



/**
 * This method will add entries to the precache list and add a route to
 * respond to fetch events.
 *
 * This is a convenience method that will call
 * {@link workbox-precaching.precache} and
 * {@link workbox-precaching.addRoute} in a single call.
 *
 * @param {Array<Object|string>} entries Array of entries to precache.
 * @param {Object} [options] See the
 * {@link workbox-precaching.PrecacheRoute} options.
 *
 * @memberof workbox-precaching
 */
function precacheAndRoute(entries, options) {
    (0,_precache_js__WEBPACK_IMPORTED_MODULE_1__.precache)(entries);
    (0,_addRoute_js__WEBPACK_IMPORTED_MODULE_0__.addRoute)(options);
}



/***/ }),

/***/ "./node_modules/workbox-precaching/utils/PrecacheCacheKeyPlugin.js":
/*!*************************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/PrecacheCacheKeyPlugin.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PrecacheCacheKeyPlugin: () => (/* binding */ PrecacheCacheKeyPlugin)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * A plugin, designed to be used with PrecacheController, to translate URLs into
 * the corresponding cache key, based on the current revision info.
 *
 * @private
 */
class PrecacheCacheKeyPlugin {
    constructor({ precacheController }) {
        this.cacheKeyWillBeUsed = async ({ request, params, }) => {
            // Params is type any, can't change right now.
            /* eslint-disable */
            const cacheKey = (params === null || params === void 0 ? void 0 : params.cacheKey) ||
                this._precacheController.getCacheKeyForURL(request.url);
            /* eslint-enable */
            return cacheKey
                ? new Request(cacheKey, { headers: request.headers })
                : request;
        };
        this._precacheController = precacheController;
    }
}



/***/ }),

/***/ "./node_modules/workbox-precaching/utils/PrecacheInstallReportPlugin.js":
/*!******************************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/PrecacheInstallReportPlugin.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PrecacheInstallReportPlugin: () => (/* binding */ PrecacheInstallReportPlugin)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * A plugin, designed to be used with PrecacheController, to determine the
 * of assets that were updated (or not updated) during the install event.
 *
 * @private
 */
class PrecacheInstallReportPlugin {
    constructor() {
        this.updatedURLs = [];
        this.notUpdatedURLs = [];
        this.handlerWillStart = async ({ request, state, }) => {
            // TODO: `state` should never be undefined...
            if (state) {
                state.originalRequest = request;
            }
        };
        this.cachedResponseWillBeUsed = async ({ event, state, cachedResponse, }) => {
            if (event.type === 'install') {
                if (state &&
                    state.originalRequest &&
                    state.originalRequest instanceof Request) {
                    // TODO: `state` should never be undefined...
                    const url = state.originalRequest.url;
                    if (cachedResponse) {
                        this.notUpdatedURLs.push(url);
                    }
                    else {
                        this.updatedURLs.push(url);
                    }
                }
            }
            return cachedResponse;
        };
    }
}



/***/ }),

/***/ "./node_modules/workbox-precaching/utils/createCacheKey.js":
/*!*****************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/createCacheKey.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCacheKey: () => (/* binding */ createCacheKey)
/* harmony export */ });
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


// Name of the search parameter used to store revision info.
const REVISION_SEARCH_PARAM = '__WB_REVISION__';
/**
 * Converts a manifest entry into a versioned URL suitable for precaching.
 *
 * @param {Object|string} entry
 * @return {string} A URL with versioning info.
 *
 * @private
 * @memberof workbox-precaching
 */
function createCacheKey(entry) {
    if (!entry) {
        throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('add-to-cache-list-unexpected-type', { entry });
    }
    // If a precache manifest entry is a string, it's assumed to be a versioned
    // URL, like '/app.abcd1234.js'. Return as-is.
    if (typeof entry === 'string') {
        const urlObject = new URL(entry, location.href);
        return {
            cacheKey: urlObject.href,
            url: urlObject.href,
        };
    }
    const { revision, url } = entry;
    if (!url) {
        throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_0__.WorkboxError('add-to-cache-list-unexpected-type', { entry });
    }
    // If there's just a URL and no revision, then it's also assumed to be a
    // versioned URL.
    if (!revision) {
        const urlObject = new URL(url, location.href);
        return {
            cacheKey: urlObject.href,
            url: urlObject.href,
        };
    }
    // Otherwise, construct a properly versioned URL using the custom Workbox
    // search parameter along with the revision info.
    const cacheKeyURL = new URL(url, location.href);
    const originalURL = new URL(url, location.href);
    cacheKeyURL.searchParams.set(REVISION_SEARCH_PARAM, revision);
    return {
        cacheKey: cacheKeyURL.href,
        url: originalURL.href,
    };
}


/***/ }),

/***/ "./node_modules/workbox-precaching/utils/deleteOutdatedCaches.js":
/*!***********************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/deleteOutdatedCaches.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deleteOutdatedCaches: () => (/* binding */ deleteOutdatedCaches)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

const SUBSTRING_TO_FIND = '-precache-';
/**
 * Cleans up incompatible precaches that were created by older versions of
 * Workbox, by a service worker registered under the current scope.
 *
 * This is meant to be called as part of the `activate` event.
 *
 * This should be safe to use as long as you don't include `substringToFind`
 * (defaulting to `-precache-`) in your non-precache cache names.
 *
 * @param {string} currentPrecacheName The cache name currently in use for
 * precaching. This cache won't be deleted.
 * @param {string} [substringToFind='-precache-'] Cache names which include this
 * substring will be deleted (excluding `currentPrecacheName`).
 * @return {Array<string>} A list of all the cache names that were deleted.
 *
 * @private
 * @memberof workbox-precaching
 */
const deleteOutdatedCaches = async (currentPrecacheName, substringToFind = SUBSTRING_TO_FIND) => {
    const cacheNames = await self.caches.keys();
    const cacheNamesToDelete = cacheNames.filter((cacheName) => {
        return (cacheName.includes(substringToFind) &&
            cacheName.includes(self.registration.scope) &&
            cacheName !== currentPrecacheName);
    });
    await Promise.all(cacheNamesToDelete.map((cacheName) => self.caches.delete(cacheName)));
    return cacheNamesToDelete;
};



/***/ }),

/***/ "./node_modules/workbox-precaching/utils/generateURLVariations.js":
/*!************************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/generateURLVariations.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateURLVariations: () => (/* binding */ generateURLVariations)
/* harmony export */ });
/* harmony import */ var _removeIgnoredSearchParams_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./removeIgnoredSearchParams.js */ "./node_modules/workbox-precaching/utils/removeIgnoredSearchParams.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * Generator function that yields possible variations on the original URL to
 * check, one at a time.
 *
 * @param {string} url
 * @param {Object} options
 *
 * @private
 * @memberof workbox-precaching
 */
function* generateURLVariations(url, { ignoreURLParametersMatching = [/^utm_/, /^fbclid$/], directoryIndex = 'index.html', cleanURLs = true, urlManipulation, } = {}) {
    const urlObject = new URL(url, location.href);
    urlObject.hash = '';
    yield urlObject.href;
    const urlWithoutIgnoredParams = (0,_removeIgnoredSearchParams_js__WEBPACK_IMPORTED_MODULE_0__.removeIgnoredSearchParams)(urlObject, ignoreURLParametersMatching);
    yield urlWithoutIgnoredParams.href;
    if (directoryIndex && urlWithoutIgnoredParams.pathname.endsWith('/')) {
        const directoryURL = new URL(urlWithoutIgnoredParams.href);
        directoryURL.pathname += directoryIndex;
        yield directoryURL.href;
    }
    if (cleanURLs) {
        const cleanURL = new URL(urlWithoutIgnoredParams.href);
        cleanURL.pathname += '.html';
        yield cleanURL.href;
    }
    if (urlManipulation) {
        const additionalURLs = urlManipulation({ url: urlObject });
        for (const urlToAttempt of additionalURLs) {
            yield urlToAttempt.href;
        }
    }
}


/***/ }),

/***/ "./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js":
/*!********************************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/getOrCreatePrecacheController.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getOrCreatePrecacheController: () => (/* binding */ getOrCreatePrecacheController)
/* harmony export */ });
/* harmony import */ var _PrecacheController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../PrecacheController.js */ "./node_modules/workbox-precaching/PrecacheController.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


let precacheController;
/**
 * @return {PrecacheController}
 * @private
 */
const getOrCreatePrecacheController = () => {
    if (!precacheController) {
        precacheController = new _PrecacheController_js__WEBPACK_IMPORTED_MODULE_0__.PrecacheController();
    }
    return precacheController;
};


/***/ }),

/***/ "./node_modules/workbox-precaching/utils/printCleanupDetails.js":
/*!**********************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/printCleanupDetails.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   printCleanupDetails: () => (/* binding */ printCleanupDetails)
/* harmony export */ });
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * @param {string} groupTitle
 * @param {Array<string>} deletedURLs
 *
 * @private
 */
const logGroup = (groupTitle, deletedURLs) => {
    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupCollapsed(groupTitle);
    for (const url of deletedURLs) {
        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.log(url);
    }
    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupEnd();
};
/**
 * @param {Array<string>} deletedURLs
 *
 * @private
 * @memberof workbox-precaching
 */
function printCleanupDetails(deletedURLs) {
    const deletionCount = deletedURLs.length;
    if (deletionCount > 0) {
        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupCollapsed(`During precaching cleanup, ` +
            `${deletionCount} cached ` +
            `request${deletionCount === 1 ? ' was' : 's were'} deleted.`);
        logGroup('Deleted Cache Requests', deletedURLs);
        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupEnd();
    }
}


/***/ }),

/***/ "./node_modules/workbox-precaching/utils/printInstallDetails.js":
/*!**********************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/printInstallDetails.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   printInstallDetails: () => (/* binding */ printInstallDetails)
/* harmony export */ });
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * @param {string} groupTitle
 * @param {Array<string>} urls
 *
 * @private
 */
function _nestedGroup(groupTitle, urls) {
    if (urls.length === 0) {
        return;
    }
    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupCollapsed(groupTitle);
    for (const url of urls) {
        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.log(url);
    }
    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupEnd();
}
/**
 * @param {Array<string>} urlsToPrecache
 * @param {Array<string>} urlsAlreadyPrecached
 *
 * @private
 * @memberof workbox-precaching
 */
function printInstallDetails(urlsToPrecache, urlsAlreadyPrecached) {
    const precachedCount = urlsToPrecache.length;
    const alreadyPrecachedCount = urlsAlreadyPrecached.length;
    if (precachedCount || alreadyPrecachedCount) {
        let message = `Precaching ${precachedCount} file${precachedCount === 1 ? '' : 's'}.`;
        if (alreadyPrecachedCount > 0) {
            message +=
                ` ${alreadyPrecachedCount} ` +
                    `file${alreadyPrecachedCount === 1 ? ' is' : 's are'} already cached.`;
        }
        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupCollapsed(message);
        _nestedGroup(`View newly precached URLs.`, urlsToPrecache);
        _nestedGroup(`View previously precached URLs.`, urlsAlreadyPrecached);
        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.groupEnd();
    }
}


/***/ }),

/***/ "./node_modules/workbox-precaching/utils/removeIgnoredSearchParams.js":
/*!****************************************************************************!*\
  !*** ./node_modules/workbox-precaching/utils/removeIgnoredSearchParams.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   removeIgnoredSearchParams: () => (/* binding */ removeIgnoredSearchParams)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-precaching/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * Removes any URL search parameters that should be ignored.
 *
 * @param {URL} urlObject The original URL.
 * @param {Array<RegExp>} ignoreURLParametersMatching RegExps to test against
 * each search parameter name. Matches mean that the search parameter should be
 * ignored.
 * @return {URL} The URL with any ignored search parameters removed.
 *
 * @private
 * @memberof workbox-precaching
 */
function removeIgnoredSearchParams(urlObject, ignoreURLParametersMatching = []) {
    // Convert the iterable into an array at the start of the loop to make sure
    // deletion doesn't mess up iteration.
    for (const paramName of [...urlObject.searchParams.keys()]) {
        if (ignoreURLParametersMatching.some((regExp) => regExp.test(paramName))) {
            urlObject.searchParams.delete(paramName);
        }
    }
    return urlObject;
}


/***/ }),

/***/ "./node_modules/workbox-routing/RegExpRoute.js":
/*!*****************************************************!*\
  !*** ./node_modules/workbox-routing/RegExpRoute.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RegExpRoute: () => (/* binding */ RegExpRoute)
/* harmony export */ });
/* harmony import */ var workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/assert.js */ "./node_modules/workbox-core/_private/assert.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var _Route_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Route.js */ "./node_modules/workbox-routing/Route.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-routing/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_3__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/




/**
 * RegExpRoute makes it easy to create a regular expression based
 * {@link workbox-routing.Route}.
 *
 * For same-origin requests the RegExp only needs to match part of the URL. For
 * requests against third-party servers, you must define a RegExp that matches
 * the start of the URL.
 *
 * @memberof workbox-routing
 * @extends workbox-routing.Route
 */
class RegExpRoute extends _Route_js__WEBPACK_IMPORTED_MODULE_2__.Route {
    /**
     * If the regular expression contains
     * [capture groups]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#grouping-back-references},
     * the captured values will be passed to the
     * {@link workbox-routing~handlerCallback} `params`
     * argument.
     *
     * @param {RegExp} regExp The regular expression to match against URLs.
     * @param {workbox-routing~handlerCallback} handler A callback
     * function that returns a Promise resulting in a Response.
     * @param {string} [method='GET'] The HTTP method to match the Route
     * against.
     */
    constructor(regExp, handler, method) {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isInstance(regExp, RegExp, {
                moduleName: 'workbox-routing',
                className: 'RegExpRoute',
                funcName: 'constructor',
                paramName: 'pattern',
            });
        }
        const match = ({ url }) => {
            const result = regExp.exec(url.href);
            // Return immediately if there's no match.
            if (!result) {
                return;
            }
            // Require that the match start at the first character in the URL string
            // if it's a cross-origin request.
            // See https://github.com/GoogleChrome/workbox/issues/281 for the context
            // behind this behavior.
            if (url.origin !== location.origin && result.index !== 0) {
                if (true) {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_1__.logger.debug(`The regular expression '${regExp.toString()}' only partially matched ` +
                        `against the cross-origin URL '${url.toString()}'. RegExpRoute's will only ` +
                        `handle cross-origin requests if they match the entire URL.`);
                }
                return;
            }
            // If the route matches, but there aren't any capture groups defined, then
            // this will return [], which is truthy and therefore sufficient to
            // indicate a match.
            // If there are capture groups, then it will return their values.
            return result.slice(1);
        };
        super(match, handler, method);
    }
}



/***/ }),

/***/ "./node_modules/workbox-routing/Route.js":
/*!***********************************************!*\
  !*** ./node_modules/workbox-routing/Route.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Route: () => (/* binding */ Route)
/* harmony export */ });
/* harmony import */ var workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/assert.js */ "./node_modules/workbox-core/_private/assert.js");
/* harmony import */ var _utils_constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/constants.js */ "./node_modules/workbox-routing/utils/constants.js");
/* harmony import */ var _utils_normalizeHandler_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/normalizeHandler.js */ "./node_modules/workbox-routing/utils/normalizeHandler.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-routing/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_3__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/




/**
 * A `Route` consists of a pair of callback functions, "match" and "handler".
 * The "match" callback determine if a route should be used to "handle" a
 * request by returning a non-falsy value if it can. The "handler" callback
 * is called when there is a match and should return a Promise that resolves
 * to a `Response`.
 *
 * @memberof workbox-routing
 */
class Route {
    /**
     * Constructor for Route class.
     *
     * @param {workbox-routing~matchCallback} match
     * A callback function that determines whether the route matches a given
     * `fetch` event by returning a non-falsy value.
     * @param {workbox-routing~handlerCallback} handler A callback
     * function that returns a Promise resolving to a Response.
     * @param {string} [method='GET'] The HTTP method to match the Route
     * against.
     */
    constructor(match, handler, method = _utils_constants_js__WEBPACK_IMPORTED_MODULE_1__.defaultMethod) {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isType(match, 'function', {
                moduleName: 'workbox-routing',
                className: 'Route',
                funcName: 'constructor',
                paramName: 'match',
            });
            if (method) {
                workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isOneOf(method, _utils_constants_js__WEBPACK_IMPORTED_MODULE_1__.validMethods, { paramName: 'method' });
            }
        }
        // These values are referenced directly by Router so cannot be
        // altered by minificaton.
        this.handler = (0,_utils_normalizeHandler_js__WEBPACK_IMPORTED_MODULE_2__.normalizeHandler)(handler);
        this.match = match;
        this.method = method;
    }
    /**
     *
     * @param {workbox-routing-handlerCallback} handler A callback
     * function that returns a Promise resolving to a Response
     */
    setCatchHandler(handler) {
        this.catchHandler = (0,_utils_normalizeHandler_js__WEBPACK_IMPORTED_MODULE_2__.normalizeHandler)(handler);
    }
}



/***/ }),

/***/ "./node_modules/workbox-routing/Router.js":
/*!************************************************!*\
  !*** ./node_modules/workbox-routing/Router.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Router: () => (/* binding */ Router)
/* harmony export */ });
/* harmony import */ var workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/assert.js */ "./node_modules/workbox-core/_private/assert.js");
/* harmony import */ var workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/getFriendlyURL.js */ "./node_modules/workbox-core/_private/getFriendlyURL.js");
/* harmony import */ var _utils_constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/constants.js */ "./node_modules/workbox-routing/utils/constants.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var _utils_normalizeHandler_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/normalizeHandler.js */ "./node_modules/workbox-routing/utils/normalizeHandler.js");
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-routing/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_6__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/







/**
 * The Router can be used to process a `FetchEvent` using one or more
 * {@link workbox-routing.Route}, responding with a `Response` if
 * a matching route exists.
 *
 * If no route matches a given a request, the Router will use a "default"
 * handler if one is defined.
 *
 * Should the matching Route throw an error, the Router will use a "catch"
 * handler if one is defined to gracefully deal with issues and respond with a
 * Request.
 *
 * If a request matches multiple routes, the **earliest** registered route will
 * be used to respond to the request.
 *
 * @memberof workbox-routing
 */
class Router {
    /**
     * Initializes a new Router.
     */
    constructor() {
        this._routes = new Map();
        this._defaultHandlerMap = new Map();
    }
    /**
     * @return {Map<string, Array<workbox-routing.Route>>} routes A `Map` of HTTP
     * method name ('GET', etc.) to an array of all the corresponding `Route`
     * instances that are registered.
     */
    get routes() {
        return this._routes;
    }
    /**
     * Adds a fetch event listener to respond to events when a route matches
     * the event's request.
     */
    addFetchListener() {
        // See https://github.com/Microsoft/TypeScript/issues/28357#issuecomment-436484705
        self.addEventListener('fetch', ((event) => {
            const { request } = event;
            const responsePromise = this.handleRequest({ request, event });
            if (responsePromise) {
                event.respondWith(responsePromise);
            }
        }));
    }
    /**
     * Adds a message event listener for URLs to cache from the window.
     * This is useful to cache resources loaded on the page prior to when the
     * service worker started controlling it.
     *
     * The format of the message data sent from the window should be as follows.
     * Where the `urlsToCache` array may consist of URL strings or an array of
     * URL string + `requestInit` object (the same as you'd pass to `fetch()`).
     *
     * ```
     * {
     *   type: 'CACHE_URLS',
     *   payload: {
     *     urlsToCache: [
     *       './script1.js',
     *       './script2.js',
     *       ['./script3.js', {mode: 'no-cors'}],
     *     ],
     *   },
     * }
     * ```
     */
    addCacheListener() {
        // See https://github.com/Microsoft/TypeScript/issues/28357#issuecomment-436484705
        self.addEventListener('message', ((event) => {
            // event.data is type 'any'
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (event.data && event.data.type === 'CACHE_URLS') {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const { payload } = event.data;
                if (true) {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.debug(`Caching URLs from the window`, payload.urlsToCache);
                }
                const requestPromises = Promise.all(payload.urlsToCache.map((entry) => {
                    if (typeof entry === 'string') {
                        entry = [entry];
                    }
                    const request = new Request(...entry);
                    return this.handleRequest({ request, event });
                    // TODO(philipwalton): TypeScript errors without this typecast for
                    // some reason (probably a bug). The real type here should work but
                    // doesn't: `Array<Promise<Response> | undefined>`.
                })); // TypeScript
                event.waitUntil(requestPromises);
                // If a MessageChannel was used, reply to the message on success.
                if (event.ports && event.ports[0]) {
                    void requestPromises.then(() => event.ports[0].postMessage(true));
                }
            }
        }));
    }
    /**
     * Apply the routing rules to a FetchEvent object to get a Response from an
     * appropriate Route's handler.
     *
     * @param {Object} options
     * @param {Request} options.request The request to handle.
     * @param {ExtendableEvent} options.event The event that triggered the
     *     request.
     * @return {Promise<Response>|undefined} A promise is returned if a
     *     registered route can handle the request. If there is no matching
     *     route and there's no `defaultHandler`, `undefined` is returned.
     */
    handleRequest({ request, event, }) {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isInstance(request, Request, {
                moduleName: 'workbox-routing',
                className: 'Router',
                funcName: 'handleRequest',
                paramName: 'options.request',
            });
        }
        const url = new URL(request.url, location.href);
        if (!url.protocol.startsWith('http')) {
            if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.debug(`Workbox Router only supports URLs that start with 'http'.`);
            }
            return;
        }
        const sameOrigin = url.origin === location.origin;
        const { params, route } = this.findMatchingRoute({
            event,
            request,
            sameOrigin,
            url,
        });
        let handler = route && route.handler;
        const debugMessages = [];
        if (true) {
            if (handler) {
                debugMessages.push([`Found a route to handle this request:`, route]);
                if (params) {
                    debugMessages.push([
                        `Passing the following params to the route's handler:`,
                        params,
                    ]);
                }
            }
        }
        // If we don't have a handler because there was no matching route, then
        // fall back to defaultHandler if that's defined.
        const method = request.method;
        if (!handler && this._defaultHandlerMap.has(method)) {
            if (true) {
                debugMessages.push(`Failed to find a matching route. Falling ` +
                    `back to the default handler for ${method}.`);
            }
            handler = this._defaultHandlerMap.get(method);
        }
        if (!handler) {
            if (true) {
                // No handler so Workbox will do nothing. If logs is set of debug
                // i.e. verbose, we should print out this information.
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.debug(`No route found for: ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__.getFriendlyURL)(url)}`);
            }
            return;
        }
        if (true) {
            // We have a handler, meaning Workbox is going to handle the route.
            // print the routing details to the console.
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupCollapsed(`Router is responding to: ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__.getFriendlyURL)(url)}`);
            debugMessages.forEach((msg) => {
                if (Array.isArray(msg)) {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.log(...msg);
                }
                else {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.log(msg);
                }
            });
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupEnd();
        }
        // Wrap in try and catch in case the handle method throws a synchronous
        // error. It should still callback to the catch handler.
        let responsePromise;
        try {
            responsePromise = handler.handle({ url, request, event, params });
        }
        catch (err) {
            responsePromise = Promise.reject(err);
        }
        // Get route's catch handler, if it exists
        const catchHandler = route && route.catchHandler;
        if (responsePromise instanceof Promise &&
            (this._catchHandler || catchHandler)) {
            responsePromise = responsePromise.catch(async (err) => {
                // If there's a route catch handler, process that first
                if (catchHandler) {
                    if (true) {
                        // Still include URL here as it will be async from the console group
                        // and may not make sense without the URL
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupCollapsed(`Error thrown when responding to: ` +
                            ` ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__.getFriendlyURL)(url)}. Falling back to route's Catch Handler.`);
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.error(`Error thrown by:`, route);
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.error(err);
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupEnd();
                    }
                    try {
                        return await catchHandler.handle({ url, request, event, params });
                    }
                    catch (catchErr) {
                        if (catchErr instanceof Error) {
                            err = catchErr;
                        }
                    }
                }
                if (this._catchHandler) {
                    if (true) {
                        // Still include URL here as it will be async from the console group
                        // and may not make sense without the URL
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupCollapsed(`Error thrown when responding to: ` +
                            ` ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__.getFriendlyURL)(url)}. Falling back to global Catch Handler.`);
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.error(`Error thrown by:`, route);
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.error(err);
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.groupEnd();
                    }
                    return this._catchHandler.handle({ url, request, event });
                }
                throw err;
            });
        }
        return responsePromise;
    }
    /**
     * Checks a request and URL (and optionally an event) against the list of
     * registered routes, and if there's a match, returns the corresponding
     * route along with any params generated by the match.
     *
     * @param {Object} options
     * @param {URL} options.url
     * @param {boolean} options.sameOrigin The result of comparing `url.origin`
     *     against the current origin.
     * @param {Request} options.request The request to match.
     * @param {Event} options.event The corresponding event.
     * @return {Object} An object with `route` and `params` properties.
     *     They are populated if a matching route was found or `undefined`
     *     otherwise.
     */
    findMatchingRoute({ url, sameOrigin, request, event, }) {
        const routes = this._routes.get(request.method) || [];
        for (const route of routes) {
            let params;
            // route.match returns type any, not possible to change right now.
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const matchResult = route.match({ url, sameOrigin, request, event });
            if (matchResult) {
                if (true) {
                    // Warn developers that using an async matchCallback is almost always
                    // not the right thing to do.
                    if (matchResult instanceof Promise) {
                        workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_3__.logger.warn(`While routing ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_1__.getFriendlyURL)(url)}, an async ` +
                            `matchCallback function was used. Please convert the ` +
                            `following route to use a synchronous matchCallback function:`, route);
                    }
                }
                // See https://github.com/GoogleChrome/workbox/issues/2079
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                params = matchResult;
                if (Array.isArray(params) && params.length === 0) {
                    // Instead of passing an empty array in as params, use undefined.
                    params = undefined;
                }
                else if (matchResult.constructor === Object && // eslint-disable-line
                    Object.keys(matchResult).length === 0) {
                    // Instead of passing an empty object in as params, use undefined.
                    params = undefined;
                }
                else if (typeof matchResult === 'boolean') {
                    // For the boolean value true (rather than just something truth-y),
                    // don't set params.
                    // See https://github.com/GoogleChrome/workbox/pull/2134#issuecomment-513924353
                    params = undefined;
                }
                // Return early if have a match.
                return { route, params };
            }
        }
        // If no match was found above, return and empty object.
        return {};
    }
    /**
     * Define a default `handler` that's called when no routes explicitly
     * match the incoming request.
     *
     * Each HTTP method ('GET', 'POST', etc.) gets its own default handler.
     *
     * Without a default handler, unmatched requests will go against the
     * network as if there were no service worker present.
     *
     * @param {workbox-routing~handlerCallback} handler A callback
     * function that returns a Promise resulting in a Response.
     * @param {string} [method='GET'] The HTTP method to associate with this
     * default handler. Each method has its own default.
     */
    setDefaultHandler(handler, method = _utils_constants_js__WEBPACK_IMPORTED_MODULE_2__.defaultMethod) {
        this._defaultHandlerMap.set(method, (0,_utils_normalizeHandler_js__WEBPACK_IMPORTED_MODULE_4__.normalizeHandler)(handler));
    }
    /**
     * If a Route throws an error while handling a request, this `handler`
     * will be called and given a chance to provide a response.
     *
     * @param {workbox-routing~handlerCallback} handler A callback
     * function that returns a Promise resulting in a Response.
     */
    setCatchHandler(handler) {
        this._catchHandler = (0,_utils_normalizeHandler_js__WEBPACK_IMPORTED_MODULE_4__.normalizeHandler)(handler);
    }
    /**
     * Registers a route with the router.
     *
     * @param {workbox-routing.Route} route The route to register.
     */
    registerRoute(route) {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isType(route, 'object', {
                moduleName: 'workbox-routing',
                className: 'Router',
                funcName: 'registerRoute',
                paramName: 'route',
            });
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.hasMethod(route, 'match', {
                moduleName: 'workbox-routing',
                className: 'Router',
                funcName: 'registerRoute',
                paramName: 'route',
            });
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isType(route.handler, 'object', {
                moduleName: 'workbox-routing',
                className: 'Router',
                funcName: 'registerRoute',
                paramName: 'route',
            });
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.hasMethod(route.handler, 'handle', {
                moduleName: 'workbox-routing',
                className: 'Router',
                funcName: 'registerRoute',
                paramName: 'route.handler',
            });
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isType(route.method, 'string', {
                moduleName: 'workbox-routing',
                className: 'Router',
                funcName: 'registerRoute',
                paramName: 'route.method',
            });
        }
        if (!this._routes.has(route.method)) {
            this._routes.set(route.method, []);
        }
        // Give precedence to all of the earlier routes by adding this additional
        // route to the end of the array.
        this._routes.get(route.method).push(route);
    }
    /**
     * Unregisters a route with the router.
     *
     * @param {workbox-routing.Route} route The route to unregister.
     */
    unregisterRoute(route) {
        if (!this._routes.has(route.method)) {
            throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_5__.WorkboxError('unregister-route-but-not-found-with-method', {
                method: route.method,
            });
        }
        const routeIndex = this._routes.get(route.method).indexOf(route);
        if (routeIndex > -1) {
            this._routes.get(route.method).splice(routeIndex, 1);
        }
        else {
            throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_5__.WorkboxError('unregister-route-route-not-registered');
        }
    }
}



/***/ }),

/***/ "./node_modules/workbox-routing/_version.js":
/*!**************************************************!*\
  !*** ./node_modules/workbox-routing/_version.js ***!
  \**************************************************/
/***/ (() => {


// @ts-ignore
try {
    self['workbox:routing:7.0.0'] && _();
}
catch (e) { }


/***/ }),

/***/ "./node_modules/workbox-routing/registerRoute.js":
/*!*******************************************************!*\
  !*** ./node_modules/workbox-routing/registerRoute.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   registerRoute: () => (/* binding */ registerRoute)
/* harmony export */ });
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var _Route_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Route.js */ "./node_modules/workbox-routing/Route.js");
/* harmony import */ var _RegExpRoute_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RegExpRoute.js */ "./node_modules/workbox-routing/RegExpRoute.js");
/* harmony import */ var _utils_getOrCreateDefaultRouter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/getOrCreateDefaultRouter.js */ "./node_modules/workbox-routing/utils/getOrCreateDefaultRouter.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-routing/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_5__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/






/**
 * Easily register a RegExp, string, or function with a caching
 * strategy to a singleton Router instance.
 *
 * This method will generate a Route for you if needed and
 * call {@link workbox-routing.Router#registerRoute}.
 *
 * @param {RegExp|string|workbox-routing.Route~matchCallback|workbox-routing.Route} capture
 * If the capture param is a `Route`, all other arguments will be ignored.
 * @param {workbox-routing~handlerCallback} [handler] A callback
 * function that returns a Promise resulting in a Response. This parameter
 * is required if `capture` is not a `Route` object.
 * @param {string} [method='GET'] The HTTP method to match the Route
 * against.
 * @return {workbox-routing.Route} The generated `Route`.
 *
 * @memberof workbox-routing
 */
function registerRoute(capture, handler, method) {
    let route;
    if (typeof capture === 'string') {
        const captureUrl = new URL(capture, location.href);
        if (true) {
            if (!(capture.startsWith('/') || capture.startsWith('http'))) {
                throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_1__.WorkboxError('invalid-string', {
                    moduleName: 'workbox-routing',
                    funcName: 'registerRoute',
                    paramName: 'capture',
                });
            }
            // We want to check if Express-style wildcards are in the pathname only.
            // TODO: Remove this log message in v4.
            const valueToCheck = capture.startsWith('http')
                ? captureUrl.pathname
                : capture;
            // See https://github.com/pillarjs/path-to-regexp#parameters
            const wildcards = '[*:?+]';
            if (new RegExp(`${wildcards}`).exec(valueToCheck)) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.debug(`The '$capture' parameter contains an Express-style wildcard ` +
                    `character (${wildcards}). Strings are now always interpreted as ` +
                    `exact matches; use a RegExp for partial or wildcard matches.`);
            }
        }
        const matchCallback = ({ url }) => {
            if (true) {
                if (url.pathname === captureUrl.pathname &&
                    url.origin !== captureUrl.origin) {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_0__.logger.debug(`${capture} only partially matches the cross-origin URL ` +
                        `${url.toString()}. This route will only handle cross-origin requests ` +
                        `if they match the entire URL.`);
                }
            }
            return url.href === captureUrl.href;
        };
        // If `capture` is a string then `handler` and `method` must be present.
        route = new _Route_js__WEBPACK_IMPORTED_MODULE_2__.Route(matchCallback, handler, method);
    }
    else if (capture instanceof RegExp) {
        // If `capture` is a `RegExp` then `handler` and `method` must be present.
        route = new _RegExpRoute_js__WEBPACK_IMPORTED_MODULE_3__.RegExpRoute(capture, handler, method);
    }
    else if (typeof capture === 'function') {
        // If `capture` is a function then `handler` and `method` must be present.
        route = new _Route_js__WEBPACK_IMPORTED_MODULE_2__.Route(capture, handler, method);
    }
    else if (capture instanceof _Route_js__WEBPACK_IMPORTED_MODULE_2__.Route) {
        route = capture;
    }
    else {
        throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_1__.WorkboxError('unsupported-route-type', {
            moduleName: 'workbox-routing',
            funcName: 'registerRoute',
            paramName: 'capture',
        });
    }
    const defaultRouter = (0,_utils_getOrCreateDefaultRouter_js__WEBPACK_IMPORTED_MODULE_4__.getOrCreateDefaultRouter)();
    defaultRouter.registerRoute(route);
    return route;
}



/***/ }),

/***/ "./node_modules/workbox-routing/utils/constants.js":
/*!*********************************************************!*\
  !*** ./node_modules/workbox-routing/utils/constants.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultMethod: () => (/* binding */ defaultMethod),
/* harmony export */   validMethods: () => (/* binding */ validMethods)
/* harmony export */ });
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-routing/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_0__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/

/**
 * The default HTTP method, 'GET', used when there's no specific method
 * configured for a route.
 *
 * @type {string}
 *
 * @private
 */
const defaultMethod = 'GET';
/**
 * The list of valid HTTP methods associated with requests that could be routed.
 *
 * @type {Array<string>}
 *
 * @private
 */
const validMethods = [
    'DELETE',
    'GET',
    'HEAD',
    'PATCH',
    'POST',
    'PUT',
];


/***/ }),

/***/ "./node_modules/workbox-routing/utils/getOrCreateDefaultRouter.js":
/*!************************************************************************!*\
  !*** ./node_modules/workbox-routing/utils/getOrCreateDefaultRouter.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getOrCreateDefaultRouter: () => (/* binding */ getOrCreateDefaultRouter)
/* harmony export */ });
/* harmony import */ var _Router_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Router.js */ "./node_modules/workbox-routing/Router.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-routing/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2019 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


let defaultRouter;
/**
 * Creates a new, singleton Router instance if one does not exist. If one
 * does already exist, that instance is returned.
 *
 * @private
 * @return {Router}
 */
const getOrCreateDefaultRouter = () => {
    if (!defaultRouter) {
        defaultRouter = new _Router_js__WEBPACK_IMPORTED_MODULE_0__.Router();
        // The helpers that use the default Router assume these listeners exist.
        defaultRouter.addFetchListener();
        defaultRouter.addCacheListener();
    }
    return defaultRouter;
};


/***/ }),

/***/ "./node_modules/workbox-routing/utils/normalizeHandler.js":
/*!****************************************************************!*\
  !*** ./node_modules/workbox-routing/utils/normalizeHandler.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   normalizeHandler: () => (/* binding */ normalizeHandler)
/* harmony export */ });
/* harmony import */ var workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/assert.js */ "./node_modules/workbox-core/_private/assert.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_version.js */ "./node_modules/workbox-routing/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_1__);
/*
  Copyright 2018 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/


/**
 * @param {function()|Object} handler Either a function, or an object with a
 * 'handle' method.
 * @return {Object} An object with a handle method.
 *
 * @private
 */
const normalizeHandler = (handler) => {
    if (handler && typeof handler === 'object') {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.hasMethod(handler, 'handle', {
                moduleName: 'workbox-routing',
                className: 'Route',
                funcName: 'constructor',
                paramName: 'handler',
            });
        }
        return handler;
    }
    else {
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isType(handler, 'function', {
                moduleName: 'workbox-routing',
                className: 'Route',
                funcName: 'constructor',
                paramName: 'handler',
            });
        }
        return { handle: handler };
    }
};


/***/ }),

/***/ "./node_modules/workbox-strategies/Strategy.js":
/*!*****************************************************!*\
  !*** ./node_modules/workbox-strategies/Strategy.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Strategy: () => (/* binding */ Strategy)
/* harmony export */ });
/* harmony import */ var workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/cacheNames.js */ "./node_modules/workbox-core/_private/cacheNames.js");
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! workbox-core/_private/getFriendlyURL.js */ "./node_modules/workbox-core/_private/getFriendlyURL.js");
/* harmony import */ var _StrategyHandler_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./StrategyHandler.js */ "./node_modules/workbox-strategies/StrategyHandler.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-strategies/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_5__);
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/






/**
 * An abstract base class that all other strategy classes must extend from:
 *
 * @memberof workbox-strategies
 */
class Strategy {
    /**
     * Creates a new instance of the strategy and sets all documented option
     * properties as public instance properties.
     *
     * Note: if a custom strategy class extends the base Strategy class and does
     * not need more than these properties, it does not need to define its own
     * constructor.
     *
     * @param {Object} [options]
     * @param {string} [options.cacheName] Cache name to store and retrieve
     * requests. Defaults to the cache names provided by
     * {@link workbox-core.cacheNames}.
     * @param {Array<Object>} [options.plugins] [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
     * to use in conjunction with this caching strategy.
     * @param {Object} [options.fetchOptions] Values passed along to the
     * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
     * of [non-navigation](https://github.com/GoogleChrome/workbox/issues/1796)
     * `fetch()` requests made by this strategy.
     * @param {Object} [options.matchOptions] The
     * [`CacheQueryOptions`]{@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions}
     * for any `cache.match()` or `cache.put()` calls made by this strategy.
     */
    constructor(options = {}) {
        /**
         * Cache name to store and retrieve
         * requests. Defaults to the cache names provided by
         * {@link workbox-core.cacheNames}.
         *
         * @type {string}
         */
        this.cacheName = workbox_core_private_cacheNames_js__WEBPACK_IMPORTED_MODULE_0__.cacheNames.getRuntimeName(options.cacheName);
        /**
         * The list
         * [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
         * used by this strategy.
         *
         * @type {Array<Object>}
         */
        this.plugins = options.plugins || [];
        /**
         * Values passed along to the
         * [`init`]{@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters}
         * of all fetch() requests made by this strategy.
         *
         * @type {Object}
         */
        this.fetchOptions = options.fetchOptions;
        /**
         * The
         * [`CacheQueryOptions`]{@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions}
         * for any `cache.match()` or `cache.put()` calls made by this strategy.
         *
         * @type {Object}
         */
        this.matchOptions = options.matchOptions;
    }
    /**
     * Perform a request strategy and returns a `Promise` that will resolve with
     * a `Response`, invoking all relevant plugin callbacks.
     *
     * When a strategy instance is registered with a Workbox
     * {@link workbox-routing.Route}, this method is automatically
     * called when the route matches.
     *
     * Alternatively, this method can be used in a standalone `FetchEvent`
     * listener by passing it to `event.respondWith()`.
     *
     * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
     *     properties listed below.
     * @param {Request|string} options.request A request to run this strategy for.
     * @param {ExtendableEvent} options.event The event associated with the
     *     request.
     * @param {URL} [options.url]
     * @param {*} [options.params]
     */
    handle(options) {
        const [responseDone] = this.handleAll(options);
        return responseDone;
    }
    /**
     * Similar to {@link workbox-strategies.Strategy~handle}, but
     * instead of just returning a `Promise` that resolves to a `Response` it
     * it will return an tuple of `[response, done]` promises, where the former
     * (`response`) is equivalent to what `handle()` returns, and the latter is a
     * Promise that will resolve once any promises that were added to
     * `event.waitUntil()` as part of performing the strategy have completed.
     *
     * You can await the `done` promise to ensure any extra work performed by
     * the strategy (usually caching responses) completes successfully.
     *
     * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
     *     properties listed below.
     * @param {Request|string} options.request A request to run this strategy for.
     * @param {ExtendableEvent} options.event The event associated with the
     *     request.
     * @param {URL} [options.url]
     * @param {*} [options.params]
     * @return {Array<Promise>} A tuple of [response, done]
     *     promises that can be used to determine when the response resolves as
     *     well as when the handler has completed all its work.
     */
    handleAll(options) {
        // Allow for flexible options to be passed.
        if (options instanceof FetchEvent) {
            options = {
                event: options,
                request: options.request,
            };
        }
        const event = options.event;
        const request = typeof options.request === 'string'
            ? new Request(options.request)
            : options.request;
        const params = 'params' in options ? options.params : undefined;
        const handler = new _StrategyHandler_js__WEBPACK_IMPORTED_MODULE_4__.StrategyHandler(this, { event, request, params });
        const responseDone = this._getResponse(handler, request, event);
        const handlerDone = this._awaitComplete(responseDone, handler, request, event);
        // Return an array of promises, suitable for use with Promise.all().
        return [responseDone, handlerDone];
    }
    async _getResponse(handler, request, event) {
        await handler.runCallbacks('handlerWillStart', { event, request });
        let response = undefined;
        try {
            response = await this._handle(request, handler);
            // The "official" Strategy subclasses all throw this error automatically,
            // but in case a third-party Strategy doesn't, ensure that we have a
            // consistent failure when there's no response or an error response.
            if (!response || response.type === 'error') {
                throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_1__.WorkboxError('no-response', { url: request.url });
            }
        }
        catch (error) {
            if (error instanceof Error) {
                for (const callback of handler.iterateCallbacks('handlerDidError')) {
                    response = await callback({ error, event, request });
                    if (response) {
                        break;
                    }
                }
            }
            if (!response) {
                throw error;
            }
            else if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_2__.logger.log(`While responding to '${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_3__.getFriendlyURL)(request.url)}', ` +
                    `an ${error instanceof Error ? error.toString() : ''} error occurred. Using a fallback response provided by ` +
                    `a handlerDidError plugin.`);
            }
        }
        for (const callback of handler.iterateCallbacks('handlerWillRespond')) {
            response = await callback({ event, request, response });
        }
        return response;
    }
    async _awaitComplete(responseDone, handler, request, event) {
        let response;
        let error;
        try {
            response = await responseDone;
        }
        catch (error) {
            // Ignore errors, as response errors should be caught via the `response`
            // promise above. The `done` promise will only throw for errors in
            // promises passed to `handler.waitUntil()`.
        }
        try {
            await handler.runCallbacks('handlerDidRespond', {
                event,
                request,
                response,
            });
            await handler.doneWaiting();
        }
        catch (waitUntilError) {
            if (waitUntilError instanceof Error) {
                error = waitUntilError;
            }
        }
        await handler.runCallbacks('handlerDidComplete', {
            event,
            request,
            response,
            error: error,
        });
        handler.destroy();
        if (error) {
            throw error;
        }
    }
}

/**
 * Classes extending the `Strategy` based class should implement this method,
 * and leverage the {@link workbox-strategies.StrategyHandler}
 * arg to perform all fetching and cache logic, which will ensure all relevant
 * cache, cache options, fetch options and plugins are used (per the current
 * strategy instance).
 *
 * @name _handle
 * @instance
 * @abstract
 * @function
 * @param {Request} request
 * @param {workbox-strategies.StrategyHandler} handler
 * @return {Promise<Response>}
 *
 * @memberof workbox-strategies.Strategy
 */


/***/ }),

/***/ "./node_modules/workbox-strategies/StrategyHandler.js":
/*!************************************************************!*\
  !*** ./node_modules/workbox-strategies/StrategyHandler.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StrategyHandler: () => (/* binding */ StrategyHandler)
/* harmony export */ });
/* harmony import */ var workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-core/_private/assert.js */ "./node_modules/workbox-core/_private/assert.js");
/* harmony import */ var workbox_core_private_cacheMatchIgnoreParams_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! workbox-core/_private/cacheMatchIgnoreParams.js */ "./node_modules/workbox-core/_private/cacheMatchIgnoreParams.js");
/* harmony import */ var workbox_core_private_Deferred_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! workbox-core/_private/Deferred.js */ "./node_modules/workbox-core/_private/Deferred.js");
/* harmony import */ var workbox_core_private_executeQuotaErrorCallbacks_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! workbox-core/_private/executeQuotaErrorCallbacks.js */ "./node_modules/workbox-core/_private/executeQuotaErrorCallbacks.js");
/* harmony import */ var workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! workbox-core/_private/getFriendlyURL.js */ "./node_modules/workbox-core/_private/getFriendlyURL.js");
/* harmony import */ var workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! workbox-core/_private/logger.js */ "./node_modules/workbox-core/_private/logger.js");
/* harmony import */ var workbox_core_private_timeout_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! workbox-core/_private/timeout.js */ "./node_modules/workbox-core/_private/timeout.js");
/* harmony import */ var workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! workbox-core/_private/WorkboxError.js */ "./node_modules/workbox-core/_private/WorkboxError.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./_version.js */ "./node_modules/workbox-strategies/_version.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_version_js__WEBPACK_IMPORTED_MODULE_8__);
/*
  Copyright 2020 Google LLC

  Use of this source code is governed by an MIT-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/MIT.
*/









function toRequest(input) {
    return typeof input === 'string' ? new Request(input) : input;
}
/**
 * A class created every time a Strategy instance instance calls
 * {@link workbox-strategies.Strategy~handle} or
 * {@link workbox-strategies.Strategy~handleAll} that wraps all fetch and
 * cache actions around plugin callbacks and keeps track of when the strategy
 * is "done" (i.e. all added `event.waitUntil()` promises have resolved).
 *
 * @memberof workbox-strategies
 */
class StrategyHandler {
    /**
     * Creates a new instance associated with the passed strategy and event
     * that's handling the request.
     *
     * The constructor also initializes the state that will be passed to each of
     * the plugins handling this request.
     *
     * @param {workbox-strategies.Strategy} strategy
     * @param {Object} options
     * @param {Request|string} options.request A request to run this strategy for.
     * @param {ExtendableEvent} options.event The event associated with the
     *     request.
     * @param {URL} [options.url]
     * @param {*} [options.params] The return value from the
     *     {@link workbox-routing~matchCallback} (if applicable).
     */
    constructor(strategy, options) {
        this._cacheKeys = {};
        /**
         * The request the strategy is performing (passed to the strategy's
         * `handle()` or `handleAll()` method).
         * @name request
         * @instance
         * @type {Request}
         * @memberof workbox-strategies.StrategyHandler
         */
        /**
         * The event associated with this request.
         * @name event
         * @instance
         * @type {ExtendableEvent}
         * @memberof workbox-strategies.StrategyHandler
         */
        /**
         * A `URL` instance of `request.url` (if passed to the strategy's
         * `handle()` or `handleAll()` method).
         * Note: the `url` param will be present if the strategy was invoked
         * from a workbox `Route` object.
         * @name url
         * @instance
         * @type {URL|undefined}
         * @memberof workbox-strategies.StrategyHandler
         */
        /**
         * A `param` value (if passed to the strategy's
         * `handle()` or `handleAll()` method).
         * Note: the `param` param will be present if the strategy was invoked
         * from a workbox `Route` object and the
         * {@link workbox-routing~matchCallback} returned
         * a truthy value (it will be that value).
         * @name params
         * @instance
         * @type {*|undefined}
         * @memberof workbox-strategies.StrategyHandler
         */
        if (true) {
            workbox_core_private_assert_js__WEBPACK_IMPORTED_MODULE_0__.assert.isInstance(options.event, ExtendableEvent, {
                moduleName: 'workbox-strategies',
                className: 'StrategyHandler',
                funcName: 'constructor',
                paramName: 'options.event',
            });
        }
        Object.assign(this, options);
        this.event = options.event;
        this._strategy = strategy;
        this._handlerDeferred = new workbox_core_private_Deferred_js__WEBPACK_IMPORTED_MODULE_2__.Deferred();
        this._extendLifetimePromises = [];
        // Copy the plugins list (since it's mutable on the strategy),
        // so any mutations don't affect this handler instance.
        this._plugins = [...strategy.plugins];
        this._pluginStateMap = new Map();
        for (const plugin of this._plugins) {
            this._pluginStateMap.set(plugin, {});
        }
        this.event.waitUntil(this._handlerDeferred.promise);
    }
    /**
     * Fetches a given request (and invokes any applicable plugin callback
     * methods) using the `fetchOptions` (for non-navigation requests) and
     * `plugins` defined on the `Strategy` object.
     *
     * The following plugin lifecycle methods are invoked when using this method:
     * - `requestWillFetch()`
     * - `fetchDidSucceed()`
     * - `fetchDidFail()`
     *
     * @param {Request|string} input The URL or request to fetch.
     * @return {Promise<Response>}
     */
    async fetch(input) {
        const { event } = this;
        let request = toRequest(input);
        if (request.mode === 'navigate' &&
            event instanceof FetchEvent &&
            event.preloadResponse) {
            const possiblePreloadResponse = (await event.preloadResponse);
            if (possiblePreloadResponse) {
                if (true) {
                    workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.log(`Using a preloaded navigation response for ` +
                        `'${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(request.url)}'`);
                }
                return possiblePreloadResponse;
            }
        }
        // If there is a fetchDidFail plugin, we need to save a clone of the
        // original request before it's either modified by a requestWillFetch
        // plugin or before the original request's body is consumed via fetch().
        const originalRequest = this.hasCallback('fetchDidFail')
            ? request.clone()
            : null;
        try {
            for (const cb of this.iterateCallbacks('requestWillFetch')) {
                request = await cb({ request: request.clone(), event });
            }
        }
        catch (err) {
            if (err instanceof Error) {
                throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_7__.WorkboxError('plugin-error-request-will-fetch', {
                    thrownErrorMessage: err.message,
                });
            }
        }
        // The request can be altered by plugins with `requestWillFetch` making
        // the original request (most likely from a `fetch` event) different
        // from the Request we make. Pass both to `fetchDidFail` to aid debugging.
        const pluginFilteredRequest = request.clone();
        try {
            let fetchResponse;
            // See https://github.com/GoogleChrome/workbox/issues/1796
            fetchResponse = await fetch(request, request.mode === 'navigate' ? undefined : this._strategy.fetchOptions);
            if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.debug(`Network request for ` +
                    `'${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(request.url)}' returned a response with ` +
                    `status '${fetchResponse.status}'.`);
            }
            for (const callback of this.iterateCallbacks('fetchDidSucceed')) {
                fetchResponse = await callback({
                    event,
                    request: pluginFilteredRequest,
                    response: fetchResponse,
                });
            }
            return fetchResponse;
        }
        catch (error) {
            if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.log(`Network request for ` +
                    `'${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(request.url)}' threw an error.`, error);
            }
            // `originalRequest` will only exist if a `fetchDidFail` callback
            // is being used (see above).
            if (originalRequest) {
                await this.runCallbacks('fetchDidFail', {
                    error: error,
                    event,
                    originalRequest: originalRequest.clone(),
                    request: pluginFilteredRequest.clone(),
                });
            }
            throw error;
        }
    }
    /**
     * Calls `this.fetch()` and (in the background) runs `this.cachePut()` on
     * the response generated by `this.fetch()`.
     *
     * The call to `this.cachePut()` automatically invokes `this.waitUntil()`,
     * so you do not have to manually call `waitUntil()` on the event.
     *
     * @param {Request|string} input The request or URL to fetch and cache.
     * @return {Promise<Response>}
     */
    async fetchAndCachePut(input) {
        const response = await this.fetch(input);
        const responseClone = response.clone();
        void this.waitUntil(this.cachePut(input, responseClone));
        return response;
    }
    /**
     * Matches a request from the cache (and invokes any applicable plugin
     * callback methods) using the `cacheName`, `matchOptions`, and `plugins`
     * defined on the strategy object.
     *
     * The following plugin lifecycle methods are invoked when using this method:
     * - cacheKeyWillByUsed()
     * - cachedResponseWillByUsed()
     *
     * @param {Request|string} key The Request or URL to use as the cache key.
     * @return {Promise<Response|undefined>} A matching response, if found.
     */
    async cacheMatch(key) {
        const request = toRequest(key);
        let cachedResponse;
        const { cacheName, matchOptions } = this._strategy;
        const effectiveRequest = await this.getCacheKey(request, 'read');
        const multiMatchOptions = Object.assign(Object.assign({}, matchOptions), { cacheName });
        cachedResponse = await caches.match(effectiveRequest, multiMatchOptions);
        if (true) {
            if (cachedResponse) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.debug(`Found a cached response in '${cacheName}'.`);
            }
            else {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.debug(`No cached response found in '${cacheName}'.`);
            }
        }
        for (const callback of this.iterateCallbacks('cachedResponseWillBeUsed')) {
            cachedResponse =
                (await callback({
                    cacheName,
                    matchOptions,
                    cachedResponse,
                    request: effectiveRequest,
                    event: this.event,
                })) || undefined;
        }
        return cachedResponse;
    }
    /**
     * Puts a request/response pair in the cache (and invokes any applicable
     * plugin callback methods) using the `cacheName` and `plugins` defined on
     * the strategy object.
     *
     * The following plugin lifecycle methods are invoked when using this method:
     * - cacheKeyWillByUsed()
     * - cacheWillUpdate()
     * - cacheDidUpdate()
     *
     * @param {Request|string} key The request or URL to use as the cache key.
     * @param {Response} response The response to cache.
     * @return {Promise<boolean>} `false` if a cacheWillUpdate caused the response
     * not be cached, and `true` otherwise.
     */
    async cachePut(key, response) {
        const request = toRequest(key);
        // Run in the next task to avoid blocking other cache reads.
        // https://github.com/w3c/ServiceWorker/issues/1397
        await (0,workbox_core_private_timeout_js__WEBPACK_IMPORTED_MODULE_6__.timeout)(0);
        const effectiveRequest = await this.getCacheKey(request, 'write');
        if (true) {
            if (effectiveRequest.method && effectiveRequest.method !== 'GET') {
                throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_7__.WorkboxError('attempt-to-cache-non-get-request', {
                    url: (0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(effectiveRequest.url),
                    method: effectiveRequest.method,
                });
            }
            // See https://github.com/GoogleChrome/workbox/issues/2818
            const vary = response.headers.get('Vary');
            if (vary) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.debug(`The response for ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(effectiveRequest.url)} ` +
                    `has a 'Vary: ${vary}' header. ` +
                    `Consider setting the {ignoreVary: true} option on your strategy ` +
                    `to ensure cache matching and deletion works as expected.`);
            }
        }
        if (!response) {
            if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.error(`Cannot cache non-existent response for ` +
                    `'${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(effectiveRequest.url)}'.`);
            }
            throw new workbox_core_private_WorkboxError_js__WEBPACK_IMPORTED_MODULE_7__.WorkboxError('cache-put-with-no-response', {
                url: (0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(effectiveRequest.url),
            });
        }
        const responseToCache = await this._ensureResponseSafeToCache(response);
        if (!responseToCache) {
            if (true) {
                workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.debug(`Response '${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(effectiveRequest.url)}' ` +
                    `will not be cached.`, responseToCache);
            }
            return false;
        }
        const { cacheName, matchOptions } = this._strategy;
        const cache = await self.caches.open(cacheName);
        const hasCacheUpdateCallback = this.hasCallback('cacheDidUpdate');
        const oldResponse = hasCacheUpdateCallback
            ? await (0,workbox_core_private_cacheMatchIgnoreParams_js__WEBPACK_IMPORTED_MODULE_1__.cacheMatchIgnoreParams)(
            // TODO(philipwalton): the `__WB_REVISION__` param is a precaching
            // feature. Consider into ways to only add this behavior if using
            // precaching.
            cache, effectiveRequest.clone(), ['__WB_REVISION__'], matchOptions)
            : null;
        if (true) {
            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.debug(`Updating the '${cacheName}' cache with a new Response ` +
                `for ${(0,workbox_core_private_getFriendlyURL_js__WEBPACK_IMPORTED_MODULE_4__.getFriendlyURL)(effectiveRequest.url)}.`);
        }
        try {
            await cache.put(effectiveRequest, hasCacheUpdateCallback ? responseToCache.clone() : responseToCache);
        }
        catch (error) {
            if (error instanceof Error) {
                // See https://developer.mozilla.org/en-US/docs/Web/API/DOMException#exception-QuotaExceededError
                if (error.name === 'QuotaExceededError') {
                    await (0,workbox_core_private_executeQuotaErrorCallbacks_js__WEBPACK_IMPORTED_MODULE_3__.executeQuotaErrorCallbacks)();
                }
                throw error;
            }
        }
        for (const callback of this.iterateCallbacks('cacheDidUpdate')) {
            await callback({
                cacheName,
                oldResponse,
                newResponse: responseToCache.clone(),
                request: effectiveRequest,
                event: this.event,
            });
        }
        return true;
    }
    /**
     * Checks the list of plugins for the `cacheKeyWillBeUsed` callback, and
     * executes any of those callbacks found in sequence. The final `Request`
     * object returned by the last plugin is treated as the cache key for cache
     * reads and/or writes. If no `cacheKeyWillBeUsed` plugin callbacks have
     * been registered, the passed request is returned unmodified
     *
     * @param {Request} request
     * @param {string} mode
     * @return {Promise<Request>}
     */
    async getCacheKey(request, mode) {
        const key = `${request.url} | ${mode}`;
        if (!this._cacheKeys[key]) {
            let effectiveRequest = request;
            for (const callback of this.iterateCallbacks('cacheKeyWillBeUsed')) {
                effectiveRequest = toRequest(await callback({
                    mode,
                    request: effectiveRequest,
                    event: this.event,
                    // params has a type any can't change right now.
                    params: this.params, // eslint-disable-line
                }));
            }
            this._cacheKeys[key] = effectiveRequest;
        }
        return this._cacheKeys[key];
    }
    /**
     * Returns true if the strategy has at least one plugin with the given
     * callback.
     *
     * @param {string} name The name of the callback to check for.
     * @return {boolean}
     */
    hasCallback(name) {
        for (const plugin of this._strategy.plugins) {
            if (name in plugin) {
                return true;
            }
        }
        return false;
    }
    /**
     * Runs all plugin callbacks matching the given name, in order, passing the
     * given param object (merged ith the current plugin state) as the only
     * argument.
     *
     * Note: since this method runs all plugins, it's not suitable for cases
     * where the return value of a callback needs to be applied prior to calling
     * the next callback. See
     * {@link workbox-strategies.StrategyHandler#iterateCallbacks}
     * below for how to handle that case.
     *
     * @param {string} name The name of the callback to run within each plugin.
     * @param {Object} param The object to pass as the first (and only) param
     *     when executing each callback. This object will be merged with the
     *     current plugin state prior to callback execution.
     */
    async runCallbacks(name, param) {
        for (const callback of this.iterateCallbacks(name)) {
            // TODO(philipwalton): not sure why `any` is needed. It seems like
            // this should work with `as WorkboxPluginCallbackParam[C]`.
            await callback(param);
        }
    }
    /**
     * Accepts a callback and returns an iterable of matching plugin callbacks,
     * where each callback is wrapped with the current handler state (i.e. when
     * you call each callback, whatever object parameter you pass it will
     * be merged with the plugin's current state).
     *
     * @param {string} name The name fo the callback to run
     * @return {Array<Function>}
     */
    *iterateCallbacks(name) {
        for (const plugin of this._strategy.plugins) {
            if (typeof plugin[name] === 'function') {
                const state = this._pluginStateMap.get(plugin);
                const statefulCallback = (param) => {
                    const statefulParam = Object.assign(Object.assign({}, param), { state });
                    // TODO(philipwalton): not sure why `any` is needed. It seems like
                    // this should work with `as WorkboxPluginCallbackParam[C]`.
                    return plugin[name](statefulParam);
                };
                yield statefulCallback;
            }
        }
    }
    /**
     * Adds a promise to the
     * [extend lifetime promises]{@link https://w3c.github.io/ServiceWorker/#extendableevent-extend-lifetime-promises}
     * of the event event associated with the request being handled (usually a
     * `FetchEvent`).
     *
     * Note: you can await
     * {@link workbox-strategies.StrategyHandler~doneWaiting}
     * to know when all added promises have settled.
     *
     * @param {Promise} promise A promise to add to the extend lifetime promises
     *     of the event that triggered the request.
     */
    waitUntil(promise) {
        this._extendLifetimePromises.push(promise);
        return promise;
    }
    /**
     * Returns a promise that resolves once all promises passed to
     * {@link workbox-strategies.StrategyHandler~waitUntil}
     * have settled.
     *
     * Note: any work done after `doneWaiting()` settles should be manually
     * passed to an event's `waitUntil()` method (not this handler's
     * `waitUntil()` method), otherwise the service worker thread my be killed
     * prior to your work completing.
     */
    async doneWaiting() {
        let promise;
        while ((promise = this._extendLifetimePromises.shift())) {
            await promise;
        }
    }
    /**
     * Stops running the strategy and immediately resolves any pending
     * `waitUntil()` promises.
     */
    destroy() {
        this._handlerDeferred.resolve(null);
    }
    /**
     * This method will call cacheWillUpdate on the available plugins (or use
     * status === 200) to determine if the Response is safe and valid to cache.
     *
     * @param {Request} options.request
     * @param {Response} options.response
     * @return {Promise<Response|undefined>}
     *
     * @private
     */
    async _ensureResponseSafeToCache(response) {
        let responseToCache = response;
        let pluginsUsed = false;
        for (const callback of this.iterateCallbacks('cacheWillUpdate')) {
            responseToCache =
                (await callback({
                    request: this.request,
                    response: responseToCache,
                    event: this.event,
                })) || undefined;
            pluginsUsed = true;
            if (!responseToCache) {
                break;
            }
        }
        if (!pluginsUsed) {
            if (responseToCache && responseToCache.status !== 200) {
                responseToCache = undefined;
            }
            if (true) {
                if (responseToCache) {
                    if (responseToCache.status !== 200) {
                        if (responseToCache.status === 0) {
                            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.warn(`The response for '${this.request.url}' ` +
                                `is an opaque response. The caching strategy that you're ` +
                                `using will not cache opaque responses by default.`);
                        }
                        else {
                            workbox_core_private_logger_js__WEBPACK_IMPORTED_MODULE_5__.logger.debug(`The response for '${this.request.url}' ` +
                                `returned a status code of '${response.status}' and won't ` +
                                `be cached as a result.`);
                        }
                    }
                }
            }
        }
        return responseToCache;
    }
}



/***/ }),

/***/ "./node_modules/workbox-strategies/_version.js":
/*!*****************************************************!*\
  !*** ./node_modules/workbox-strategies/_version.js ***!
  \*****************************************************/
/***/ (() => {


// @ts-ignore
try {
    self['workbox:strategies:7.0.0'] && _();
}
catch (e) { }


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*******************************************************!*\
  !*** ./node_modules/@docusaurus/plugin-pwa/lib/sw.js ***!
  \*******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var workbox_precaching__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! workbox-precaching */ "./node_modules/workbox-precaching/index.mjs");
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-disable no-restricted-globals */

function parseSwParams() {
    const params = JSON.parse(new URLSearchParams(self.location.search).get('params'));
    if (params.debug) {
        console.log('[Docusaurus-PWA][SW]: Service Worker params:', params);
    }
    return params;
}
// Doc advises against dynamic imports in SW
// https://developers.google.com/web/tools/workbox/guides/using-bundlers#code_splitting_and_dynamic_imports
// https://x.com/sebastienlorber/status/1280155204575518720
// but looks it's working fine as it's inlined by webpack, need to double check
async function runSWCustomCode(params) {
    if (false) // removed by dead control flow
{}
}
/**
 * Gets different possible variations for a request URL. Similar to
 * https://git.io/JvixK
 */
function getPossibleURLs(url) {
    const urlObject = new URL(url, self.location.href);
    if (urlObject.origin !== self.location.origin) {
        return [];
    }
    // Ignore search params and hash
    urlObject.search = '';
    urlObject.hash = '';
    return [
        // /blog.html
        urlObject.href,
        // /blog/ => /blog/index.html
        // /blog => /blog/index.html
        `${urlObject.href}${urlObject.pathname.endsWith('/') ? '' : '/'}index.html`,
    ];
}
(async () => {
    const params = parseSwParams();
    // eslint-disable-next-line no-underscore-dangle
    const precacheManifest = [{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"404.html"},{"revision":"39e0cf2de2b1a6c7345d364b4af420de","url":"assets/css/styles.b8bcc0c2.css"},{"revision":"4d6e7f10127ad353d2a67ea88f682bf5","url":"assets/js/00201fa6.d26d726d.js"},{"revision":"ebc6d195220e3b172481a8abd15b2027","url":"assets/js/006e620f.35ec6717.js"},{"revision":"b933df058b252e5914f7fcd00ebbe07a","url":"assets/js/00cf63fa.429dc36f.js"},{"revision":"a8b53e2a668766c47bc1dfbcf844b940","url":"assets/js/0106ae21.40368d90.js"},{"revision":"a3b7f5b24fee570e67d4a4dd4f1fe727","url":"assets/js/019aaf7e.10bf68e1.js"},{"revision":"d2b1fb3896d802b1995ce029da2f9ef7","url":"assets/js/01a85c17.6f5df017.js"},{"revision":"a32e2048e1d85fca2c5b488f530cd66a","url":"assets/js/0257e577.2c4e32e0.js"},{"revision":"74893898e43fbc3bbcfa28358573af1e","url":"assets/js/025febc9.d8e41ac9.js"},{"revision":"137a48a31899ae513e647f89d4a93281","url":"assets/js/037faba7.62f75147.js"},{"revision":"75d43ae0c30dee8ddb126bc271080133","url":"assets/js/0389d844.f3545f88.js"},{"revision":"c81f98bb8e88a313bb55a70bdbde51bd","url":"assets/js/03daa2c9.a8e1e8f2.js"},{"revision":"3713eedefc454922ed0dc9445d801b70","url":"assets/js/041b9dca.ad66e6b5.js"},{"revision":"286e9401f13bec2309a16fc3366c304b","url":"assets/js/04e5f246.4f884c66.js"},{"revision":"ad0c260e34832b461369cc7079560a82","url":"assets/js/0560e601.bcdf3edb.js"},{"revision":"db16d7b428a7c012cabb6639c56a79ee","url":"assets/js/059c2319.d936cdcf.js"},{"revision":"4dfa98a56c77597c112560f367e01265","url":"assets/js/05e542f0.b7c5399e.js"},{"revision":"9e582467dbf7a45113b7284bdb402665","url":"assets/js/0652620f.4a505915.js"},{"revision":"d5b7d7c470b23cb477be6c035a450bac","url":"assets/js/0704eb1d.96f8a7b1.js"},{"revision":"1699843d1c848b5c17c4bcbaad262c9b","url":"assets/js/07128e61.d800d1ad.js"},{"revision":"c6a3a8e1f5287c72df2bacda1b9357cc","url":"assets/js/07234853.c0411167.js"},{"revision":"28fab08b96d73dd8d06b64b6ae8488f3","url":"assets/js/07247961.e8a3a783.js"},{"revision":"7eda45de1de2e31b5c73824fc1e06221","url":"assets/js/07366a38.d64ac36d.js"},{"revision":"222060f283767eed33f2dc7a3f3b9220","url":"assets/js/07f403b9.34cf407f.js"},{"revision":"9c22d4626d1df8062ac6cbf685c7f9d3","url":"assets/js/094c9f0e.177ed7ad.js"},{"revision":"01d6081ba1c3412177794d9052ca86bb","url":"assets/js/0a220288.33244c45.js"},{"revision":"61b4d5b0b4f8eb9ba86e654761ad3091","url":"assets/js/0a5523d5.d837bce6.js"},{"revision":"dcbfb4e3c48c0f850c90fe51b8a4ea84","url":"assets/js/0a96c120.367ea0cf.js"},{"revision":"a19e0da1ca1809c8c47adac32cdbb1ff","url":"assets/js/0abf49b1.a89596b8.js"},{"revision":"1a343dc6a75b70aec0ee4c8fb7367494","url":"assets/js/0ae7d1a7.1d8c3680.js"},{"revision":"934eb39e28e51b63ef52d0be788096cd","url":"assets/js/0b22143e.7370d1f8.js"},{"revision":"ad44d221afe0f0a1e28ae13fd5db7f6e","url":"assets/js/0b4eaf08.9273063b.js"},{"revision":"40d04dc83028450a9fae3b787021c13c","url":"assets/js/0d2f8dc8.37a2000e.js"},{"revision":"ceba8ece3a563e9be4dd80fd94d2e56a","url":"assets/js/0d64abaa.55f1fb35.js"},{"revision":"44a959212256af6f1c975600d5be3365","url":"assets/js/0e0448f5.f53097b5.js"},{"revision":"741ab3474e5ccf037fe488616a90afb3","url":"assets/js/0e3ca961.9baa4408.js"},{"revision":"b0e43ca36d78c167b4b9d88dba9e78a8","url":"assets/js/0f537bbc.65a4e2ff.js"},{"revision":"c8c0cf98155eaa7c06945e940d30a4a4","url":"assets/js/0fad2dea.58007652.js"},{"revision":"45d406c9cea832fcc252985f0a8a6cd7","url":"assets/js/1004a119.a3d3c943.js"},{"revision":"6e69c3a894b4d637ffe0a5dd5f11ae2a","url":"assets/js/1039.768f85c5.js"},{"revision":"5b71263bfda485afcb203ea73091082e","url":"assets/js/114d8a42.3e45df47.js"},{"revision":"7d1282a634631af764afeebd62b1fd4e","url":"assets/js/123.0608e4a2.js"},{"revision":"7e666e8fd3b0e79ac539ffab85172286","url":"assets/js/12c822c8.236a5b49.js"},{"revision":"6fc73c5110075526ab641aad8f064f26","url":"assets/js/135.71edc52d.js"},{"revision":"4b61dc88f8aef802a807e90c3968fcee","url":"assets/js/135736f8.16f4d980.js"},{"revision":"4578e8d65752743182a30b1eed36292e","url":"assets/js/14eb3368.115f5b24.js"},{"revision":"768406d9dcd64711f3a6febc501b201d","url":"assets/js/15178caa.be01568a.js"},{"revision":"c2ea50151e3853adebed332fff80e3dd","url":"assets/js/15de2688.f115f975.js"},{"revision":"302e84f5de3c112636e1434864d3bca4","url":"assets/js/165.1c09e293.js"},{"revision":"36d425c0a3ebd66f0515527295eb7940","url":"assets/js/165db591.8a6a67ba.js"},{"revision":"16710c90b20ecdfdff4a81589bb024ee","url":"assets/js/169722d7.d4ec2bfa.js"},{"revision":"c9bd3aff878a93dc7ef5f820c1952051","url":"assets/js/1706ddda.fbbeff53.js"},{"revision":"f1514e9482661efcf34492a7d236bb57","url":"assets/js/1786.f91b9823.js"},{"revision":"f2e829ff91a76b1124aedf2ad6be2f0f","url":"assets/js/17896441.82d1dca7.js"},{"revision":"166bbb66ec4255ef7729448bc9295507","url":"assets/js/1822ef7b.5a46e4fe.js"},{"revision":"65801f5b8cae3b4972b6793d9d61a747","url":"assets/js/190910c1.956fff2f.js"},{"revision":"a2b9b426bb58984a16dda94fd25f40e9","url":"assets/js/1990ca48.507b718a.js"},{"revision":"7db834620f125b9c28662285fef3523a","url":"assets/js/19d9cdcf.476ed151.js"},{"revision":"132f0f7a227b1425ee505515fb791a36","url":"assets/js/1a4e3797.65013e45.js"},{"revision":"affe833c7b4d28d212347db37d360f59","url":"assets/js/1ae08d6c.4938aee3.js"},{"revision":"2710f8d98cc9b47118b44efb0077233b","url":"assets/js/1d3c8abb.ed24ae0f.js"},{"revision":"b708e87e8707031fb10053115a2bd2b6","url":"assets/js/1df93b7f.34179af0.js"},{"revision":"a543c74683339f5af6a74a1d445b5e2d","url":"assets/js/1f391b9e.12542f32.js"},{"revision":"fd8ee294b45566dcdd915d44fa9465f3","url":"assets/js/205c6594.7c271e80.js"},{"revision":"4f438d93d77421e24139f89456db9277","url":"assets/js/205cd860.e6c5b015.js"},{"revision":"9e04f2a22f89d5bf08689e77932c4388","url":"assets/js/2068.f5e910a3.js"},{"revision":"4f3309579e52a6c8561ac1032186f1e8","url":"assets/js/2076.38ccae7d.js"},{"revision":"81f70b88e62c8536332228348ad1f00b","url":"assets/js/2078bf5c.dbd1250d.js"},{"revision":"9eefac6b5047b4482dda23fd03b38c29","url":"assets/js/2159.9e220289.js"},{"revision":"c22a77ee4dd6d8937e2a60fa53230f1e","url":"assets/js/215c2f31.ff158612.js"},{"revision":"32967c88a64753a67955eb8b9f3f2461","url":"assets/js/2165b26f.60c0c52a.js"},{"revision":"e337887f6a4ab89629420dc3b6876128","url":"assets/js/21ad7b3b.74288130.js"},{"revision":"28b69231f441577c56e7e7aca0df6832","url":"assets/js/224c278e.5db83fbd.js"},{"revision":"c6c65379751393bb3c97f202120d69f0","url":"assets/js/22ef0abd.2a5734b4.js"},{"revision":"6597527b092dfe674fca6a01d62acadb","url":"assets/js/22f9ffc3.934ff254.js"},{"revision":"1ca53e30baea0ba2cc3f44b71a70d9a9","url":"assets/js/232a227a.551b1ac6.js"},{"revision":"2fd8b8415ff2b838111fafa33697f490","url":"assets/js/2334.24ea8b49.js"},{"revision":"d4c20d65fbfaac90095658291c5f1759","url":"assets/js/23fa270b.1d06fbbf.js"},{"revision":"66bcbaed7000176b4352da0bba36b811","url":"assets/js/2491d8bb.76fa4dde.js"},{"revision":"587596a3de8d9eb481825f64fea0cace","url":"assets/js/2498.75411535.js"},{"revision":"4e66db96c74efe82d8a79fe0d122fa02","url":"assets/js/24b96856.7d93440a.js"},{"revision":"b1671070e66e00b97144306c84e97230","url":"assets/js/24bf6bfe.9591d0e7.js"},{"revision":"8b4a42d04cf075b10fbe79e5d06f7244","url":"assets/js/24d2a767.2274036f.js"},{"revision":"5292d4ac355283945178a0f8c0d19a0e","url":"assets/js/2544.f01519b5.js"},{"revision":"149fabbfaf9238fba0aa3e7a780d0e51","url":"assets/js/25518101.e5f3f3e7.js"},{"revision":"b2cd37a45b5c0132a7b3619493ee8e21","url":"assets/js/2560.0f43bbd5.js"},{"revision":"27fec81b0a8c35031eee630b72b95abd","url":"assets/js/272f8189.d1ffc422.js"},{"revision":"672876f6432ed61d7ae6f725adc1b15b","url":"assets/js/277579f7.cdece53c.js"},{"revision":"1218f3e0847bc32563b014e028d80eba","url":"assets/js/2822.2314848e.js"},{"revision":"26dfe3f24e69e4887e8e9b48c30eac28","url":"assets/js/2833a959.375f90c7.js"},{"revision":"f68724ff20efb479cac43103fb1cc0b1","url":"assets/js/291be6ab.11c9bbe2.js"},{"revision":"1f6938db5a15a885224a6346ac127dc0","url":"assets/js/29414d48.15505446.js"},{"revision":"18890ca3ba7a7a1a11064c1b3894458f","url":"assets/js/29663a51.763c36d5.js"},{"revision":"60e61bc84f8ed13a4e1a3dc8c5ff2280","url":"assets/js/2a131839.282e259e.js"},{"revision":"73c4343809d8099981db72c7c4036423","url":"assets/js/2a18da78.e30012a0.js"},{"revision":"9df8ac2ce20fe243018cf7bc4025f2f6","url":"assets/js/2a37bbbe.eaa9eb74.js"},{"revision":"a75459fbc9a043369ff99edaec1fff57","url":"assets/js/2b2bc7e9.6b621eb1.js"},{"revision":"4aa335787949443a271a73b4e4a8d61e","url":"assets/js/2bee332f.b21743a5.js"},{"revision":"bb568d2e01ff290fbb9ce4c23eed63cd","url":"assets/js/2cbe5367.4682422f.js"},{"revision":"07a19366f5765f92753b495fc2a5454b","url":"assets/js/2e9f6fad.08da3b1c.js"},{"revision":"bb5ce885779f5c1d50ce7518c2bd68ca","url":"assets/js/2f597691.d5807326.js"},{"revision":"a19d51921811ac11a94f64ee58731d9e","url":"assets/js/2f7c4d6e.3d11274b.js"},{"revision":"0011e568ccada2a33825ec39fd90e26a","url":"assets/js/2fba9e2b.93dc3715.js"},{"revision":"4725031e131f0dacfb3d2f33b2e4dbfd","url":"assets/js/310.9f549d05.js"},{"revision":"7455d2b98a6102e5ab00b2102c67b80e","url":"assets/js/323c6894.bebf87a0.js"},{"revision":"56052f5414ff560d83da7fed6f45fec1","url":"assets/js/33470b6c.c448b80a.js"},{"revision":"79e0d622dea14970135cae7e0e4e2c97","url":"assets/js/33711b49.178646b0.js"},{"revision":"313f1025f84c43568e173623a474063e","url":"assets/js/3624.c1ba6cac.js"},{"revision":"3bb897c04daf4f84f6ecc94eb96376d4","url":"assets/js/36503af1.a8ae8794.js"},{"revision":"b74b680eeaf05817e32dfb39e96e582c","url":"assets/js/36994c47.90f363f2.js"},{"revision":"4eb3e5fcda35a60e74002ed48797e167","url":"assets/js/3720c009.61b01b84.js"},{"revision":"3b2622acefd8c7c7ac7119724b1dd306","url":"assets/js/3736.76a10fad.js"},{"revision":"b8fe3e626680333685be30ea5e2f2c72","url":"assets/js/375.a9cc1223.js"},{"revision":"bee1a8130146d5f5fd8ea1003e0081b9","url":"assets/js/38183762.2c830e05.js"},{"revision":"7e713dc6838e7372ffafd04e54f4bcc1","url":"assets/js/381d31cf.a0d33416.js"},{"revision":"a621bdf7236294d9f7d3362519878b28","url":"assets/js/3956.31fdea45.js"},{"revision":"3f77dfce40bfdc41b2ee5b9c594c2ea7","url":"assets/js/397dd0f1.93af1cac.js"},{"revision":"ef4a51582f942a55c140b1719bb471a5","url":"assets/js/3a5c72a5.6350b2b5.js"},{"revision":"f0d7d60e27bb239f5691f64800a7ede5","url":"assets/js/3dee1c96.069eaff4.js"},{"revision":"f21c5a9b84ce6d134eb3f5ed29f789b1","url":"assets/js/3e901731.22977cf4.js"},{"revision":"5d00376ef5cb4ff5920163dcf96f932f","url":"assets/js/3f1a05ef.53eb1429.js"},{"revision":"d7f3a7436459da43792e07e2a1f2189c","url":"assets/js/3f405222.72b2388a.js"},{"revision":"82f8b921c5cb3d026e27af4b637616a2","url":"assets/js/3fccdd47.9c2e90fd.js"},{"revision":"b821f9de883fe1426010100af2f2727d","url":"assets/js/412746b9.fb7636a3.js"},{"revision":"9d9b8fbfe7e997593721004242348a48","url":"assets/js/416ffc1d.69ef77ad.js"},{"revision":"27826d55db732a4179f4512f6ba77a1f","url":"assets/js/41ac4761.c84cb8a6.js"},{"revision":"d415cb87dbb2d1373f348ff7e5fc79d4","url":"assets/js/4458.752ea139.js"},{"revision":"c39769e1872edb01f04e65c00c0e4214","url":"assets/js/446e7b1a.9cef9f61.js"},{"revision":"aac192b735be2122266c80dc7cc7c7bb","url":"assets/js/4504.570f92a5.js"},{"revision":"2dca61a2d59f6e1c1a7a7533caafd630","url":"assets/js/45b4d846.f7134d18.js"},{"revision":"697a69e20de561f99d1c459da759b14e","url":"assets/js/463c7f50.62aa108b.js"},{"revision":"70af709cd88cc6ac12cb9d4ffcaf7305","url":"assets/js/466fe9b5.6fbf64e3.js"},{"revision":"56e5e2380c55ed4fce1b1568435e7050","url":"assets/js/46fbbb9e.1da6491c.js"},{"revision":"a9854fbcb35b4c9a59ad747cc790ff75","url":"assets/js/47207492.284caabc.js"},{"revision":"82e9bd30fadd20b933bec382348d6e3c","url":"assets/js/483a4532.60d7bb76.js"},{"revision":"51294f1fa47b8398d8c8c6e1f7494d1e","url":"assets/js/484fbe2c.39553d63.js"},{"revision":"89139c638a130fa959eea1affc1fa37d","url":"assets/js/4866.1c698be6.js"},{"revision":"b319f6595cb313d25e7db5d95cd36118","url":"assets/js/4914.cd02ebcc.js"},{"revision":"11c3b54db52f495a9ec5a61ff586b40c","url":"assets/js/4aff2580.e9858097.js"},{"revision":"a7f4dfe6ec29719aa22e8e271b3f9e27","url":"assets/js/4bacd6c8.8eb80cba.js"},{"revision":"3acc35d025a794dd92bbe92ad491f46b","url":"assets/js/4cdece3f.7f178bcb.js"},{"revision":"fbe06580918b6ba05f92c5d3077d4acc","url":"assets/js/4d36b178.95aaf618.js"},{"revision":"99ff79a6d0ec94b9abc0861c82331793","url":"assets/js/4edc808e.66de6f29.js"},{"revision":"22247c611e0f6f28f754d56cfe3108bf","url":"assets/js/4f742e08.d69cf4d9.js"},{"revision":"553d3b75e245dcbe8d197dff3cab4c27","url":"assets/js/4fc66f97.5732968e.js"},{"revision":"883e4dc55fe424f08870cf60e1ec4849","url":"assets/js/5078535f.0cd7b334.js"},{"revision":"17ffa1f669b9d2d98cb39ea3a18a80c8","url":"assets/js/5203d579.417137f2.js"},{"revision":"d94152be27b1cec58ee36dc591c40bd3","url":"assets/js/5311454b.35ad84fe.js"},{"revision":"aef8c5d8cddba28bfc8093ae26e55761","url":"assets/js/5388.19b9fe58.js"},{"revision":"6a7e54b7f17c7ea7d377c02ef42bfff7","url":"assets/js/5392.b702b952.js"},{"revision":"6058165f0e78090fc5c55ff9e1277fb7","url":"assets/js/541dc54f.35f4bb02.js"},{"revision":"88ce1daefb7e53e40ef526798a041e75","url":"assets/js/54c6327d.68cc162a.js"},{"revision":"0167aa4a2275a4757e933ae54f42c165","url":"assets/js/54ee02bf.9c2663ce.js"},{"revision":"cfb50370d5a2552ba56a0369c03b5213","url":"assets/js/55592dfe.73355052.js"},{"revision":"68ce6a50089996da6fdbb31b27a7e7f7","url":"assets/js/55884505.7922df7d.js"},{"revision":"f4b9918ecdf6c65a6e92284fef8f1bb6","url":"assets/js/55a50c2a.c349a5fd.js"},{"revision":"d88fb50a0ded7363f7f13aabebd068c9","url":"assets/js/55d31e45.9ec8a1b3.js"},{"revision":"3f941e37e9efec38c25af6f28d682a39","url":"assets/js/570bdb69.6b3f8af5.js"},{"revision":"d27101062c8aa3d8f09d9b859c730e97","url":"assets/js/5759.04de7d7d.js"},{"revision":"b44131cb784ad34c53abc6ec94804f7e","url":"assets/js/5775.4ee68d20.js"},{"revision":"689d8655567cba7d6873aeae9b9b746c","url":"assets/js/5864.9ec61bdb.js"},{"revision":"a6b8bf3ae22abb6b471deb2a1e78c4aa","url":"assets/js/58d862c5.40ccf6a4.js"},{"revision":"51ef0e1ce9741c53fe7d9ae07f3652ec","url":"assets/js/592debef.89f2dfe7.js"},{"revision":"70fcf388461e628daa97bdc6e5e347a4","url":"assets/js/59ae1c80.f016921c.js"},{"revision":"571b5f796f43d979368d4947b069c3d2","url":"assets/js/5adc2a07.7edf25ba.js"},{"revision":"10158f7faa879dbc87ab177c0f3e0eb1","url":"assets/js/5c67068b.1aef3d8d.js"},{"revision":"01131ab7bee42a6c20c2b091eb101326","url":"assets/js/5c77fa6b.e10eef02.js"},{"revision":"77733631be61b45c9ed5276f559b6674","url":"assets/js/5cabaa8e.b04f8363.js"},{"revision":"9ba33061a4a041e070c6b1bb546c3162","url":"assets/js/5d5e9bab.3ef2fc1e.js"},{"revision":"f3b54073fbd20722de93e0b465560843","url":"assets/js/5e478645.0fdd4496.js"},{"revision":"4b4277040c20c59626485a9bc81bb2e2","url":"assets/js/5e5f05c2.c47d89a6.js"},{"revision":"cb6b3da9ee8e2703e5a70fb2805b16a9","url":"assets/js/5e95c892.513051ce.js"},{"revision":"8c655b3499804bb84b4b5fd77f2a7bad","url":"assets/js/5f6787f8.294c4234.js"},{"revision":"4e270ba24d3e0d54a66636d49d425910","url":"assets/js/60deff6f.e12d1d6b.js"},{"revision":"68f24776d5abde9b25a7c46fc6028937","url":"assets/js/6143.b5097813.js"},{"revision":"4cd3197994d4e84467487b60f1497e65","url":"assets/js/61bee14b.219a703d.js"},{"revision":"5293cea2f8d89e1cd803ad9bc0fb192b","url":"assets/js/621db11d.f7680bb7.js"},{"revision":"2a6dd88403da205a0a8cb8044246de89","url":"assets/js/62764f0e.5c471d4f.js"},{"revision":"7e1241c5c5f54f21f86db858870ba3f8","url":"assets/js/635072fb.e13cc55e.js"},{"revision":"c5b2e91dc4dae3c190ac545f7810aa4a","url":"assets/js/63695758.98bc691f.js"},{"revision":"23e2774879010aa2407dfa68d4218f2d","url":"assets/js/636f7fa8.e7a7a486.js"},{"revision":"01c1166357b16bd859f9e6b8014ab63f","url":"assets/js/6433.6cba5df9.js"},{"revision":"13e545e352c67a7ee1d560ee68ad1b2f","url":"assets/js/667913af.604803be.js"},{"revision":"f5f99e04f49b076d05f499bb68764693","url":"assets/js/6679e5ca.919ce733.js"},{"revision":"6a59145784071bb0114be7fb1520141a","url":"assets/js/6687841a.01173e4a.js"},{"revision":"2f9b3f383bfb2228c0cf6085ee5b8dc4","url":"assets/js/668af07a.e33b8ea6.js"},{"revision":"f7665640475a82181bdc04e95b46974c","url":"assets/js/6796.3f668016.js"},{"revision":"ca172d46d324f25b9097268737e62811","url":"assets/js/67d4d816.2cdcb137.js"},{"revision":"f1362fb63efa4c3b804cbf440fea10f2","url":"assets/js/6875c492.c43148cf.js"},{"revision":"90bcda35b6d37ba2ad684eed15cc4174","url":"assets/js/6892.4b17bbdb.js"},{"revision":"069aa0f606ffad793540e6749723b499","url":"assets/js/69461239.e4472f94.js"},{"revision":"a01826d85eb3282b1a1d429c7504b7d3","url":"assets/js/697b08af.2ff6f131.js"},{"revision":"9ea888cab08a1b20e76bf2231f344fcc","url":"assets/js/69d53084.f5acd948.js"},{"revision":"16fe64e6adf0146cdf7a13f3d9044c59","url":"assets/js/6a070342.e305edf2.js"},{"revision":"3a86072d7d1a63a209266cb25010d925","url":"assets/js/6a805296.746be484.js"},{"revision":"a0369ed3f7f25cd784520e0a3b7ed832","url":"assets/js/6af70912.71cecf49.js"},{"revision":"707a02fadeffe04b7a2ad6f41db0c726","url":"assets/js/6afbe231.9a137907.js"},{"revision":"09771d76b1aecf683a8fb375165719f9","url":"assets/js/6c49aff3.98f20fbc.js"},{"revision":"a436ae276e749d1c9ab8bb2ae18e7d42","url":"assets/js/6cb38577.f80bacb1.js"},{"revision":"723cfc5ab2c6d8960d6420f99bf15a8b","url":"assets/js/6d421a59.43593713.js"},{"revision":"956a6d2554dd62c161cd9b98512a2811","url":"assets/js/6dc59b59.d6fcbbcc.js"},{"revision":"e6cd874005c7b2dca90f051497537208","url":"assets/js/6e38c5fd.40e312cc.js"},{"revision":"fa31145bfe880898035391014ebbb329","url":"assets/js/705e27b6.6aa7b185.js"},{"revision":"ddb580510dbe5a797eb6108998db0df6","url":"assets/js/708a5b4b.fa6a2c23.js"},{"revision":"fc708c4138005724ac0345b836b3331d","url":"assets/js/70ab0ade.0663201a.js"},{"revision":"d01f855dc1ec2c3032b7935c680b8d80","url":"assets/js/70ca3990.a3d9ee5d.js"},{"revision":"c009a879bfe1aa9aaae3c5e35dfaff80","url":"assets/js/71bd0066.80e7b1c3.js"},{"revision":"c1a182dc497762360185933c9c29c847","url":"assets/js/71d78465.51dc9a3f.js"},{"revision":"22e0ab8fa28a4af1400c057c9fbb1623","url":"assets/js/725.4a94504e.js"},{"revision":"4fbc050bbe86a75240c83e2eb9ccc25b","url":"assets/js/72b79257.c0abcafb.js"},{"revision":"dd56daaf3b9b73d17372b3b9edacd9af","url":"assets/js/72e61864.6e2c4aa3.js"},{"revision":"b80c334b14e11164c29b222db90ec562","url":"assets/js/7340.aa42bcb2.js"},{"revision":"a0720df95b03ae1f88d9ab97c36f95fb","url":"assets/js/74947de6.a60b53cf.js"},{"revision":"f8c320ab6142f37c3b6a54abe39ca402","url":"assets/js/753a0f2d.790c35c2.js"},{"revision":"4129d130f6f21dd26a5548747132992c","url":"assets/js/75f00a30.f16a29b5.js"},{"revision":"b75c6c8ed4fcc2d35a9e2de48268a57b","url":"assets/js/770645dd.9c4ff1b2.js"},{"revision":"9fe50bae8dc8233ebd0f58af7d793ee5","url":"assets/js/773bda2f.edaf44f3.js"},{"revision":"a396f8bf917b19d76a283408ea618ca5","url":"assets/js/7777894d.c7f4faf2.js"},{"revision":"2b69c621c2f0ce5e732a90dbf3fbbf12","url":"assets/js/7835.2ffab4ee.js"},{"revision":"71215c871365e44b438d74925dbde775","url":"assets/js/7900.5278f052.js"},{"revision":"4a6389677475ab4422a69f1f7f94c050","url":"assets/js/7a12fd0e.b9bce734.js"},{"revision":"4db70e102093e4004ae97c5fb6e86ae2","url":"assets/js/7ab084a2.7e6cba3e.js"},{"revision":"161e8c290964cd9de5ddc6bfad03a518","url":"assets/js/7ac98436.b87a00c5.js"},{"revision":"29c23b37c7d4f4e79d20532cd3164dd2","url":"assets/js/7dd63a09.38437a1d.js"},{"revision":"462f918b8ae4ed17a0ac3c78bda9c461","url":"assets/js/7dfb83d7.07094ce2.js"},{"revision":"2de40d249c55561694b50fba57904b81","url":"assets/js/8072.92b96385.js"},{"revision":"5cb5fad09588a3df072240b8e439bfab","url":"assets/js/814f3328.2767086b.js"},{"revision":"781c47eb0eafc0a39c0772c2128aebab","url":"assets/js/8158.65d77a37.js"},{"revision":"b68d76b6caf66ee2504aeb3f32f6a47b","url":"assets/js/8188.8759a303.js"},{"revision":"2d178f745b23464297865a8323ab477b","url":"assets/js/818add3f.2c1a53ee.js"},{"revision":"eedfb8778ea1fc61a28eaeabeaaba382","url":"assets/js/81ec5f34.8acd3140.js"},{"revision":"eac384d753ecf24a352ae2369036fe10","url":"assets/js/827ef1ec.3cad55e1.js"},{"revision":"2155df41e8e6db2fa40675df7bb317a4","url":"assets/js/82b23c44.9eb151b3.js"},{"revision":"ec7a4afc5d8f53a1fecd6dd32ed38584","url":"assets/js/82c0e4ee.ef30df0f.js"},{"revision":"218251b47d107a031039ffb330f8f923","url":"assets/js/8379.52c53a40.js"},{"revision":"20ff2f8b03f607d05a6a4c024fed4099","url":"assets/js/83cc8885.61c2f6e1.js"},{"revision":"fdb7fc3311deabbfeff8e74bbf365296","url":"assets/js/84297e0c.6977a50f.js"},{"revision":"534dd61f3d8fae7d1021d4291c75430c","url":"assets/js/846a798e.48872064.js"},{"revision":"b63a1f5ed93f612a4130e125d1267ad4","url":"assets/js/84766ab3.4983bac1.js"},{"revision":"6f1234c3779bf5c99144bee796a4331c","url":"assets/js/853f5c2a.b471e338.js"},{"revision":"3f983c3f86ebdaf87e0d96c97aa5f7ff","url":"assets/js/854cbb4e.e5281e5d.js"},{"revision":"6491417f1f1f21646d92548a856393f0","url":"assets/js/8583.39377a33.js"},{"revision":"a1127f9d9583383025a614aca9bba1c3","url":"assets/js/862ada37.b0948e48.js"},{"revision":"0a9f807d715052dbc9ac70923fad5637","url":"assets/js/8665.d7940118.js"},{"revision":"8ac6b2487dcd84f5b751b81b106625fa","url":"assets/js/8716.55c11afa.js"},{"revision":"d5c0665fe09c5c135b15cc7bb730684b","url":"assets/js/8731.4b636552.js"},{"revision":"603bbacd2498b4b779ca0e711ab3acc0","url":"assets/js/8743b5dc.6e3c4f8b.js"},{"revision":"01131f377bc73eeb1154e1e9eb97f852","url":"assets/js/879eb5f6.914e9a43.js"},{"revision":"9eae4f9be51733a644e8d2923989c49d","url":"assets/js/882.0601112b.js"},{"revision":"9de3fe3bb359a5cbdfd6e786688f2a63","url":"assets/js/88bc9684.eaecefa5.js"},{"revision":"8b0c5b3fee2eaf74fae0ec44fd81e52a","url":"assets/js/88c11f2b.ea2d83c2.js"},{"revision":"61c611a4ff1d31f74a7b98179b6e1c17","url":"assets/js/8913.4a26b01c.js"},{"revision":"e206da3e9884ae24204dfd4fec0d2005","url":"assets/js/8a2dafd0.49d43610.js"},{"revision":"61fe64eb92b324cb82037fab67688e40","url":"assets/js/8a6ebdf5.b4d67f90.js"},{"revision":"e6db25be805ce1493f298087b7216501","url":"assets/js/8b7055b4.4cdf9535.js"},{"revision":"a53317c4ac049891b3faa8ab2dd12bee","url":"assets/js/8c0e7962.fa76e285.js"},{"revision":"d17c9661f39b57d3ef2e7be016ed2230","url":"assets/js/8ca17574.0909df5f.js"},{"revision":"7c21c084953ec8ffd2828b47095a3e76","url":"assets/js/900a7b53.311c9e1b.js"},{"revision":"a3d2b0af22d08508fd2f9cf9c0963e35","url":"assets/js/90d35d83.4bb0e888.js"},{"revision":"699f14036a520e0760dd91cfa326e382","url":"assets/js/9107.91600a09.js"},{"revision":"2d25913d4be2d30b68926fc4ee8b7a31","url":"assets/js/9157.756f0ae4.js"},{"revision":"3e1f42959960fc180fc7503f83a72a36","url":"assets/js/9165.e02a3dff.js"},{"revision":"899bd893db00c50988ec5e48edd37887","url":"assets/js/9176.77b59f2b.js"},{"revision":"e83dc6c16ae88f14161a2368aa40bf42","url":"assets/js/92be6b7e.d2095dfd.js"},{"revision":"c46884e2c5105493bf53d3590ff43876","url":"assets/js/9349.02c160f3.js"},{"revision":"ed31139a7f635b44bff8d7c26b6bed2e","url":"assets/js/9416.6d3336c2.js"},{"revision":"53475466c16d48b018ec294447a890d2","url":"assets/js/9572d870.b96291c4.js"},{"revision":"986f5dcc4e06b742ce316b0043e3f389","url":"assets/js/96c4a91d.a6cf1650.js"},{"revision":"c3e1a3c06a7059926ecf8d932eb19ff4","url":"assets/js/9730.35faa0ed.js"},{"revision":"76414ce7d208a21d5503989779bdd7d1","url":"assets/js/98a6cd97.b7ae169d.js"},{"revision":"6816a1e312f6e4e1bfeeb1518e0aae1b","url":"assets/js/98ce5465.55d73d07.js"},{"revision":"c50eb637a97f51e8f16de295d32e4fff","url":"assets/js/98d2debf.b9d32a49.js"},{"revision":"2df45c9497c11d2d49f77ebc33ab6988","url":"assets/js/98d8f079.f700e1ac.js"},{"revision":"0c6779326cf6b8b43b8a8486879aff73","url":"assets/js/990e922e.2e31837e.js"},{"revision":"6c3f086898b5ab604bce75261861692e","url":"assets/js/9b84d159.fe3bd2e3.js"},{"revision":"9b81ab7d893925130aec325ea62a758b","url":"assets/js/9bb16181.bf6ad22a.js"},{"revision":"cc6970ebf4b5c4d114e4f97cbd79ddb4","url":"assets/js/9c2ce98f.7bb5f405.js"},{"revision":"9d1780d79496315741fb205f80878bb3","url":"assets/js/9c4b8c73.50e9d724.js"},{"revision":"763d9329344ec0f694a5455d6e3bc8bc","url":"assets/js/9c6bd3bc.659b1e7d.js"},{"revision":"f085714b3da8015e6d2832936296f842","url":"assets/js/9d82235e.a834bc65.js"},{"revision":"5a0778c2454f29ca575bd2f55f194080","url":"assets/js/9e4087bc.41098284.js"},{"revision":"404d9fd71d7dd3411b417510fa3ba72a","url":"assets/js/9eb54f37.4dc23655.js"},{"revision":"dfc9f6b15bad2f01872b259033708fb3","url":"assets/js/9ef137dd.29a31609.js"},{"revision":"ca447f9140ffe17109c7d9454488d04f","url":"assets/js/9f1fe725.b0fed425.js"},{"revision":"5e24d88b7cfbda7f288f3994c9f5da58","url":"assets/js/9f302205.40e1edf7.js"},{"revision":"c4c0460ac211ee570306da5ba823a209","url":"assets/js/a1a4d5d7.d4b8fb7e.js"},{"revision":"973ae896a494b81c82daad3a4b1093a6","url":"assets/js/a2e66e04.4f3c3f10.js"},{"revision":"50cadb42d014def092825ec612e0573f","url":"assets/js/a5a771ea.3bea67cd.js"},{"revision":"b18dd8134d1e11c969ee9a0289e5cac9","url":"assets/js/a6aa9e1f.edf7fb16.js"},{"revision":"f84da3eda6f8bc07cb66f13f1f2e21a4","url":"assets/js/a6af755b.b03967b6.js"},{"revision":"744f0788e94591d9b8a42aa189d75208","url":"assets/js/a71dbfe1.fab8d362.js"},{"revision":"c4b672e0bf31347a3bf889f93841da5a","url":"assets/js/a7456010.fc8c5d95.js"},{"revision":"6e77f55b2906477fa8965f86a77e96ea","url":"assets/js/a773f331.2dcfcb03.js"},{"revision":"d448b9115a04ddff34094eff747d8a8d","url":"assets/js/a7bd4aaa.fd05d436.js"},{"revision":"a54faa22b191a8458ea86e2b1f0302e6","url":"assets/js/a7ff2c6a.a1921ffb.js"},{"revision":"4527895f03c6db7adc48475464728aaa","url":"assets/js/a87d1e82.0c27faf3.js"},{"revision":"631924d73829358500c153fa7c3d9eae","url":"assets/js/a94703ab.b70477ef.js"},{"revision":"1460b50b3d9b525378fcb2ca79b4d566","url":"assets/js/a97bfa0e.5fe7c7b6.js"},{"revision":"8be5507e83c370e9efc21535403b7040","url":"assets/js/a9ea0ef8.5da33640.js"},{"revision":"b20bb30f9248d3f613b218bfad1549e3","url":"assets/js/aa552193.9e50fc47.js"},{"revision":"744398c58c12143894a63ece3ea4de3f","url":"assets/js/aba21aa0.88de7cf7.js"},{"revision":"ffc828d0302b5451230a1433d2cbd5f7","url":"assets/js/acecf23e.515b7041.js"},{"revision":"4385a85fc9f7415e8b28bf7634b1a38a","url":"assets/js/acf05769.89d977c2.js"},{"revision":"bc9a2b08c4b660e4e8262c22b1494d05","url":"assets/js/ad058c8f.a5674385.js"},{"revision":"9d05c7b0d4d1bd70d9811b47da8f0568","url":"assets/js/b29c1b83.82b8dea5.js"},{"revision":"c23bd592ce55bfb6536dab2bb0662c87","url":"assets/js/b3aa34b5.ba071415.js"},{"revision":"3ff7cb65e6af6cd0ab7eca8527b31d5e","url":"assets/js/b4c6372a.7844e7bd.js"},{"revision":"d43ae3803609e16fd6a02c99390780aa","url":"assets/js/b4ce57ec.8331a032.js"},{"revision":"b078904fbbfb3c27718c31a50b19aa24","url":"assets/js/b513b5b2.0ce01b55.js"},{"revision":"7fe54e37452c32c24ed8244c9b526797","url":"assets/js/b5261892.5354e2d7.js"},{"revision":"2f25816a42b7724ef351e5a741dbbc6d","url":"assets/js/b58b44b9.dc639f9a.js"},{"revision":"3f333e9fe28a815f3586e8c3861d425d","url":"assets/js/b836ac65.8959e5f6.js"},{"revision":"ef362289bf58bf5e01d688bfe5c8c854","url":"assets/js/b97d271f.88f7887b.js"},{"revision":"9fef1ac7f8699f7566ec8dc893ac78a3","url":"assets/js/ba6899d1.4fe496f6.js"},{"revision":"06068c759803ecf9b2434699e084cbaa","url":"assets/js/bac24c2b.4eeabb6d.js"},{"revision":"a44d8594ddf384adbf03db8379d6d603","url":"assets/js/bcecf3c1.230a8397.js"},{"revision":"67a9062344aa3531e03e4b16caeba052","url":"assets/js/bd7e3384.cd19634a.js"},{"revision":"b60abbf0675f934b21d0ffb229df542f","url":"assets/js/bf42b36c.e8896826.js"},{"revision":"b2454ac4119885a5da0a757f0487d9f9","url":"assets/js/c0318d12.1a248667.js"},{"revision":"ab6d0118cf6a2aefd23831312f5420f8","url":"assets/js/c141421f.3812986f.js"},{"revision":"0a0a18a9dc65f9aaa7fd10454b757e5d","url":"assets/js/c150837f.56e20d85.js"},{"revision":"b27ad7ce4813e8aa126a7d1cf6e28224","url":"assets/js/c21bfcba.7a0d699a.js"},{"revision":"edf9827a592a5348fe312f14d5c2e9fa","url":"assets/js/c302cd74.3b2a9994.js"},{"revision":"219713546d7c32a7b08cbc3cf555fbc6","url":"assets/js/c3238a3f.847f393b.js"},{"revision":"f6f41699dd397e92fc92a6d3dbd0156f","url":"assets/js/c3d4aa48.ebbacfdd.js"},{"revision":"f5aafc1041b106d65180f0b4bfeb1128","url":"assets/js/c413bf43.f89bd0ad.js"},{"revision":"c61bec2456da3c00a03b54bd46748b7f","url":"assets/js/c49fee2b.3fee27d2.js"},{"revision":"e0320016813e25c957138a902df2cddf","url":"assets/js/c4cd576b.954e60cd.js"},{"revision":"db9d9fb61295689da0939be5c8dfd5cc","url":"assets/js/c5ebe9cd.c113e220.js"},{"revision":"887d50ee9730ede5f59e4eef902aa6c1","url":"assets/js/c5fd9dbb.af96786b.js"},{"revision":"f5a0433311e175137dd2c4fdc18d9b8a","url":"assets/js/c7134e26.c64ea417.js"},{"revision":"b4a66f437af11b21ac768cc3e65941ad","url":"assets/js/c8110f91.71deb183.js"},{"revision":"7b885835a238141b2994d892196b88a9","url":"assets/js/c81395f0.0fe3b993.js"},{"revision":"03e904ff9c834da1f9fc68f8fe6f5003","url":"assets/js/c994c368.c98c86d8.js"},{"revision":"47e9de66a122bfb918423e99ca183be9","url":"assets/js/cb068bd3.47cfb246.js"},{"revision":"e89522b813a3b5376f92a93091c56e5c","url":"assets/js/cc306792.95d32850.js"},{"revision":"3629c7837b92a106ad1c961bd49b691c","url":"assets/js/ccc49370.bee0393b.js"},{"revision":"d0a1e79ef02bc9ba1107a0500f6b3b2d","url":"assets/js/cce54672.5ca0fe4f.js"},{"revision":"a32901b27ce6cbb08a86d81f4a0c69a4","url":"assets/js/cf688362.714aaa01.js"},{"revision":"747bb77aaadf76a19c0308fdafae39e9","url":"assets/js/d076cf9c.33b322e7.js"},{"revision":"35354119a99beed4c205a54800504b98","url":"assets/js/d09b0b86.65068aaa.js"},{"revision":"7fc699df1c01ed750fe2e3f0346ee84b","url":"assets/js/d0bfe5ef.6ac564ba.js"},{"revision":"6a0eed4adfd1d7b2f80344d70fae62c7","url":"assets/js/d1851eeb.5f39469e.js"},{"revision":"05b9b963ba09e5e8e90ee1642118c663","url":"assets/js/d403092a.9d00e8d7.js"},{"revision":"028ff921c282955e054d29fddf721ee3","url":"assets/js/d52df55e.ed0a1804.js"},{"revision":"ef595ced0f36be118fe78314fe640a71","url":"assets/js/d52ee848.d646d9f8.js"},{"revision":"55651f72f082f6a3ced92cb5dbfc23c4","url":"assets/js/d5bb0aab.b8df53ce.js"},{"revision":"bcc8970d8b736ba927c051852348e360","url":"assets/js/d83bac57.28a56e2e.js"},{"revision":"09f08b6f62c70b87e91991cb482e5761","url":"assets/js/dd02774f.b4b4689f.js"},{"revision":"ace1f1166bdacda9721061803eb3bfeb","url":"assets/js/de54bfe1.fe5d78b1.js"},{"revision":"24a62ff48e02d80e87d08788d375df32","url":"assets/js/de9bc772.6b86b560.js"},{"revision":"47475fc55ca411bf520ac2e602e79a90","url":"assets/js/defcf0b2.ea9230e2.js"},{"revision":"571ede3be6c66ab3db14f197d505292d","url":"assets/js/df175a00.1a59e900.js"},{"revision":"f1eaff165420d5ca767e1d8f800b71f9","url":"assets/js/df203c0f.e5fdac71.js"},{"revision":"3fe11cb0cc99013c43781776af35c4cb","url":"assets/js/e00b8ec0.8137015e.js"},{"revision":"8f4c0fdcf5be66ffdc41c9061c6267d3","url":"assets/js/e0cfdd99.6395d7d5.js"},{"revision":"38004ec5779ede76bdaa2c4e43923558","url":"assets/js/e1677bdc.a61f991a.js"},{"revision":"671207b39824438e0d978a538ef025c1","url":"assets/js/e2893b5a.4f48c4b2.js"},{"revision":"0c7666d29dc29695d6081d94bba13dfb","url":"assets/js/e3ee938f.bf6b8cfb.js"},{"revision":"1ab6fcd69b686037cf8e904aceceb861","url":"assets/js/e43cdfd9.df40decc.js"},{"revision":"44d9e949cfc0f398420cc924c857da50","url":"assets/js/e487ed24.959978d9.js"},{"revision":"7c51a49ea3a8e687e63b4d3fe858bc4c","url":"assets/js/e4ef49f6.ac3388f0.js"},{"revision":"0e38f1bcb1e0e062b21145d4dd9ed014","url":"assets/js/e598f45f.b3ed4d1d.js"},{"revision":"330fbbe3c52621413ca8be46dbae546c","url":"assets/js/e59fb04a.eda3467d.js"},{"revision":"6afbb71cbe987e6ad51d020892773d14","url":"assets/js/e60268e7.ed928fe6.js"},{"revision":"f4c89cc0bce5cc21791ae3a02fcf4e1f","url":"assets/js/e72c859e.f7aa3078.js"},{"revision":"c460ac95cf0c39284f3dfa93338eee9a","url":"assets/js/e84c93f2.8daa768e.js"},{"revision":"efac2e28fb9945f1a658b6246d500747","url":"assets/js/e8cbb4fb.aa904597.js"},{"revision":"7a709b2243491f97cc18605c20e217c6","url":"assets/js/e9d45c7f.b5348c1b.js"},{"revision":"3c303a493537eeb76af37f3ac0f77c13","url":"assets/js/ea35e032.ca40e4c4.js"},{"revision":"41bcaa5e664b761df9226d90fc3d4309","url":"assets/js/eaf0a858.8f9d6137.js"},{"revision":"d1a0f6ca3757240ee4b4163c14500440","url":"assets/js/eb4bb8e4.b84fcf62.js"},{"revision":"d693829ea2addba82679ce01dec2396a","url":"assets/js/ecf35624.cde233ed.js"},{"revision":"e9219f89db51b467ab74b47cd59aa848","url":"assets/js/ed78745b.00ca54f2.js"},{"revision":"4de126532b3d335e6223d0b996fe3204","url":"assets/js/f08bfa0c.ead2a027.js"},{"revision":"cbba9515e6d6efc20ae3a146b7fe486b","url":"assets/js/f246b1f3.64f878f0.js"},{"revision":"8f8594acd1a75d3075801dbefb9d0559","url":"assets/js/f371564e.1b7489db.js"},{"revision":"6f251705a2895a5cff3f204ffff10c1c","url":"assets/js/f42ab6d9.74ff7b97.js"},{"revision":"202f4f344362e450b712d131715b683c","url":"assets/js/f450ddb7.bb2333b5.js"},{"revision":"ef992221a935260c17009e38b330cc5d","url":"assets/js/f45c4eba.57e7fb97.js"},{"revision":"078a7b65e44418d4a71726abc712141c","url":"assets/js/f4c9e298.6225c212.js"},{"revision":"7c9c7efaeb635027210b9849a7910ba8","url":"assets/js/f574129e.db94f5f5.js"},{"revision":"a29f5de1a8fa915eb0946f0b69dc694b","url":"assets/js/f630490c.87aad753.js"},{"revision":"8f016fe61ff8f91e43d1d5093a64034a","url":"assets/js/f647964b.6c16768f.js"},{"revision":"8958beac4f23579f74af50c5efa73e15","url":"assets/js/f78ef31b.8098fd38.js"},{"revision":"528817b1a1a5ef55904f2d8b17eb7cd3","url":"assets/js/f8a347f7.45966123.js"},{"revision":"1e6b7480b14cefa5e66a26641760d1b8","url":"assets/js/f8aa1131.d01942f7.js"},{"revision":"03a390675ef73ccc00ac0fad058e4aff","url":"assets/js/f8fabc63.94f49226.js"},{"revision":"89651593be4ea4bb519fa16d89b32875","url":"assets/js/f916d5dd.c32b1af7.js"},{"revision":"351101f11a4e6b017fbe3f65604b619f","url":"assets/js/fa2fde8c.9764c5a2.js"},{"revision":"4ae86e52fc4c8fccdcad12f5e6509f5e","url":"assets/js/fa70a2dd.72210dfb.js"},{"revision":"08cf5f5f86aa22e0a06a4a9d045fcf0d","url":"assets/js/faf078a6.e664e715.js"},{"revision":"dbbf7ff4aa7188f7dbd2eb5249cff7ef","url":"assets/js/faf289c4.15f002a4.js"},{"revision":"f0264e5d9cfc4ac5adc65f2d171b30f2","url":"assets/js/fd306a2f.efc57572.js"},{"revision":"7eb3a5e1e046a85d4dfb54a7249935cc","url":"assets/js/fedaeb58.109c4f26.js"},{"revision":"a735ff335c46dbc3669afb2fea56e663","url":"assets/js/main.e4be8f70.js"},{"revision":"58056d8c30d7b87cc0c22b50d5d60978","url":"assets/js/runtime~main.bf5ba8bf.js"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/api-testing-types.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/archive.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/authors.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/best-extensions-for-vs-code.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/best-websites-to-learn-javascript.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/character-sets-and-collations-in-mysql.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/data-representation.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/frontend-libraries-angular.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/gioi-thieu-dbml-database-markup-language.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/gioi-thieu-uuid-universally-unique-identifier.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/github-badges.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/github-profile.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/google-generative-ai-courses.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/helpful-javascript-utility-functions.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/improve-angular-build-time.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/install-zeppelin-on-windows.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/introduction-to-rabbitmq.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/markdown-cheat-sheet.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/page/2.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/page/3.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/page/4.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/page/5.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/phat-trien-phan-mem-ai-driven-development-phan-1.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/phat-trien-phan-mem-ai-driven-development-phan-2.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/phat-trien-phan-mem-ai-driven-development-phan-3.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/phat-trien-phan-mem-ai-driven-development-phan-4.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/phat-trien-phan-mem-ai-driven-development.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/programming-paradigm.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/ai-dd.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/ai-dlc.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/ai.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/angular-18.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/angular-cli.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/angular.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/ant-design.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/apache.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/api.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/autonomous-coding.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/badges.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/best-practices.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/binary.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/bootstrap.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/build-optimization.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/build-time.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/caal.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/character-sets.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/chat-gpt.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/cheatsheet.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/collations.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/cong-nghệ-phần-mềm.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/csharp.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/cursor.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/data-representation.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/database.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/dbml.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/decimal.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/deep-learning.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/developer.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/documentation.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/dotnet.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/e-commerce-dashboard.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/esbuild.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/extensions.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/follow.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/free-course.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/frontend.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/generative-ai.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/git-hub-copilot.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/git.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/github.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/google.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/hexadecimal.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/identifier.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/installation.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/javascript.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/kết-luận.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/lập-trinh-ai.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/learning.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/linkedin.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/machine-learning.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/markdown.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/material-design.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/mc-kinsey.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/message-broker.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/metrics.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/microservices.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/mysql.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/nang-suất-lập-trinh.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/natural-language-programming.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/net-8.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/nghien-cứu-tinh-huống.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/number-system.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/performance.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/primeng.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/programming.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/rabbitmq.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/readme.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/resources.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/risk-management.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/schema.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/series.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/software-development.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/tailwind.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/testing.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/tips-and-tricks.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/tools.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/tương-lai-ai.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/tutorial.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/types.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/ui-libraries.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/unique-id.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/unsigned-integer.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/uuid.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/vite.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/vscode.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/webpack.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/windows.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/tags/zeppelin.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/top-linked-accounts-to-follow-for-developers.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"blog/unsigned-integer-representation.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"community.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"community/gdsc-hcmute.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"community/yit-hcmute.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"contact.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/aws-cloud-practitioner-essentials/module-1-introduction-to-the-cloud.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/category/a1---broken-access-control.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/category/a5---security-misconfiguration.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/category/algorithm.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/category/aws-cloud-practitioner-essentials.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/category/bảo-mật-web.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/category/bit-manipulation.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/category/database-1.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/category/database.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/category/dynamic-programming.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/category/hệ-điều-hành.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/category/injection-flaws.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/category/k6-load-testing.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/category/learn-sql-in-30-days.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/category/leetcode.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/category/webgoat-20238.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/category/webgoat-7.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/01-intro-to-sql-and-dbms.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/02-table-structure-and-data-types.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/03-select-where.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/04-order-by-limit.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/05-operators-and-expressions.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/06-insert-update-delete.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/07-review-1.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/08-aggregate-functions.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/09-group-by-having.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/10-join.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/11-subquery.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/12-union-intersect.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/13-case-when.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/14-review-2.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/15-index.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/16-transactions-acid.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/17-stored-procedures-functions.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/18-triggers.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/19-views.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/20-query-performance.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/21-review-3.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/22-sql-json-practice.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/23-sql-connect-apps.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/24-import-export-data.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/25-big-data.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/26-sql-nosql.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/27-database-design-best-practices.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/28-sql-query-optimization.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/29-recursive-queries-window-functions.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/30-database-security.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/30-day-sql-learning-roadmap.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/database/learn-sql-in-30-days/summary.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/k6/load-testing-restful-apis-with-k6-part-01.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/k6/load-testing-restful-apis-with-k6-part-02.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/k6/load-testing-restful-apis-with-k6-part-03.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/k6/load-testing-restful-apis-with-k6-part-04.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/k6/load-testing-restful-apis-with-k6-part-05.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/leetcode/algorithm/141-linked-list-cycle.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/leetcode/bit-manipulation/136-single-number.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/leetcode/bit-manipulation/191-number-of-1-bits.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/leetcode/bit-manipulation/338-counting-bits.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/leetcode/database/175-combine-two-tables.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/leetcode/database/176-second-highest-salary.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/leetcode/database/177-nth-highest-salary.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/leetcode/database/178-rank-scores.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/leetcode/database/181-employees-earning-more-than-their-managers.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/leetcode/database/182-duplicate-emails.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/leetcode/database/183-customers-who-never-order.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/leetcode/database/196-delete-duplicate-emails.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/leetcode/database/197-rising-temperature.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/leetcode/database/511-game-play-analysis-i.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/leetcode/database/607-sales-person.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/leetcode/dynamic-programming/62-unique-paths.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/operating-system/bankers-algorithm.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/operating-system/dos-debug.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/operating-system/page-replacement-algorithms.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/operating-system/process-scheduling-algorithms.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/algorithm.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/ascii.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/assembly.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/aws-certification.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/aws-cloud-practitioner.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/aws.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/banker.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/bankers-algorithm.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/bit-manipulation.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/broken-access-control.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/clock.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/cloud-computing.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/cloud-deployment.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/cloud-fundamentals.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/command-injection.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/database.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/dbms.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/debug.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/dos.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/dynamic-programming.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/fcfs.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/fifo.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/git.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/github.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/grafana.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/hijack-a-session.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/influxdb.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/injection-flaws.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/insecure-direct-object-references.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/it-resources.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/k-6.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/learn-sql.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/leetcode.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/load-testing.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/lru.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/missing-function-level-access-control.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/on-demand-computing.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/operating-system.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/optimal.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/os.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/page-replacement-algorithms.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/performance-testing.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/process-scheduling-algorithms.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/restful-api.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/roadmap.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/round-robin.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/security-misconfiguration.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/setup.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/sjf.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/solution.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/spoofing-an-authentication-cookie.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/sql-injection.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/sql.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/tutorial.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/visualization.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/web-security.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/webgoat-2023-8.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/webgoat-7.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/webgoat.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/tags/xxe.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/hijack-a-session-01.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/hijack-a-session-02.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-01.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-02.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-03.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-04.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-05.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/insecure-direct-object-references-06.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/missing-function-level-access-control-01.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/missing-function-level-access-control-02.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/missing-function-level-access-control-03.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/missing-function-level-access-control-04.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/spoofing-an-authentication-cookie-01.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/web-security/webgoat-2023.8/A1-Broken-Access-Control/spoofing-an-authentication-cookie-02.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-01.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-02.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-03.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-04.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-05.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-06.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-07.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-08.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-09.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-10.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-11.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-12.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/web-security/webgoat-2023.8/A5-Security-Misconfiguration/XXE-13.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/web-security/webgoat-7/injection-flaws/command-injection.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/web-security/webgoat-7/injection-flaws/log-spoofing.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"docs/web-security/webgoat-7/injection-flaws/numeric-sql-injection.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"index.html"},{"revision":"92fe3cb2fa98422997de11d19d69bb86","url":"manifest.json"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"my-cv.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"resume.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"search.html"},{"revision":"bcf6e32f10a6d0bc8a7b45fc46588490","url":"showcase.html"},{"revision":"e5669ddfd1b43a7870bf304fd0dafa30","url":"assets/images/after-improve-build-angular-e786238076ebd864c8034672f6513d8d.png"},{"revision":"b15bc2e625c8f9b6e53394d009f5e820","url":"assets/images/api-testing-types-214c1a2ff25c0f72d9fcf647e1487649.gif"},{"revision":"90cc205c5b13bdd12d314b847aa8d708","url":"assets/images/before-improve-build-angular-a653fc829b06ceb1739b9e3bdd99552b.png"},{"revision":"e184759ca592b262f48b4f5b3fe96fe3","url":"assets/images/M01_L2_DefinitionCloudv2-3a2b07d7d336fb5431a6f64786016907.png"},{"revision":"1656466e1385733e5f8f138793cd01c4","url":"assets/images/screenshot-d23430e6fea9a65dec8c039bf1221677.png"},{"revision":"fc8ee301992a6f9bcced1a5a0bed068c","url":"assets/images/zeppelin-spark-67253fbdf08c227c6ebd2e3e71a7c914.png"},{"revision":"e5669ddfd1b43a7870bf304fd0dafa30","url":"img/blogs/after-improve-build-angular.png"},{"revision":"90cc205c5b13bdd12d314b847aa8d708","url":"img/blogs/before-improve-build-angular.png"},{"revision":"e54ccbd4487f67749dcfd10c6d95e43a","url":"img/blogs/ux-design-principles.png"},{"revision":"39592e5f3d87d7a7c8fc8730203b96bd","url":"img/community/workshop-git-github.jpg"},{"revision":"3817c5c9269fa209fb67210501834692","url":"img/cv/1.png"},{"revision":"5973afe3d5c9bbbdd3db0b78f7936766","url":"img/cv/2.png"},{"revision":"a8dc978f53d35dffe233239643913af3","url":"img/cv/3.png"},{"revision":"e184759ca592b262f48b4f5b3fe96fe3","url":"img/docs/AWS-Cloud-Practitioner-Essentials/M01_L2_DefinitionCloudv2.png"},{"revision":"db8979c1b9abd20fd8f9a2bde7cf5a76","url":"img/docs/database.jpg"},{"revision":"dc1c8af6eefe9fc0b43e0807042a6337","url":"img/favicon.ico"},{"revision":"aebb0c1cdb1a38747662029fe6ed1f43","url":"img/logo/email.svg"},{"revision":"e59aee21556458dccfa4cb9616eebcbd","url":"img/logo/facebook.svg"},{"revision":"88f4587a57e7432b89e00950ff327fb5","url":"img/logo/github.svg"},{"revision":"25af99ced0b6672444771c9434383d58","url":"img/logo/linkedin.svg"},{"revision":"afc6a74822da429f2207ff0c0e0c87c2","url":"img/logo/phone.svg"},{"revision":"bdee6519c8c31928b272ab7aec6d382f","url":"img/logo/skype.svg"},{"revision":"2ed1f6b42471c5f4f1c3aee365a9c9ee","url":"img/logo/youtube.svg"},{"revision":"5270b6f90570bd34550b845f8baee576","url":"img/TienNHM-project.png"},{"revision":"2a9d95d3f073b718b4cc7c1f64d9e800","url":"img/TienNHM.png"}];
    const controller = new workbox_precaching__WEBPACK_IMPORTED_MODULE_0__.PrecacheController({
        // Safer to turn this true?
        fallbackToNetwork: true,
    });
    if (params.offlineMode) {
        controller.addToCacheList(precacheManifest);
        if (params.debug) {
            console.log('[Docusaurus-PWA][SW]: addToCacheList', { precacheManifest });
        }
    }
    await runSWCustomCode(params);
    self.addEventListener('install', (event) => {
        if (params.debug) {
            console.log('[Docusaurus-PWA][SW]: install event', { event });
        }
        event.waitUntil(controller.install(event));
    });
    self.addEventListener('activate', (event) => {
        if (params.debug) {
            console.log('[Docusaurus-PWA][SW]: activate event', { event });
        }
        event.waitUntil(controller.activate(event));
    });
    self.addEventListener('fetch', async (event) => {
        if (params.offlineMode) {
            const requestURL = event.request.url;
            const possibleURLs = getPossibleURLs(requestURL);
            for (const possibleURL of possibleURLs) {
                const cacheKey = controller.getCacheKeyForURL(possibleURL);
                if (cacheKey) {
                    const cachedResponse = caches.match(cacheKey);
                    if (params.debug) {
                        console.log('[Docusaurus-PWA][SW]: serving cached asset', {
                            requestURL,
                            possibleURL,
                            possibleURLs,
                            cacheKey,
                            cachedResponse,
                        });
                    }
                    event.respondWith(cachedResponse);
                    break;
                }
            }
        }
    });
    self.addEventListener('message', async (event) => {
        if (params.debug) {
            console.log('[Docusaurus-PWA][SW]: message event', { event });
        }
        const type = event.data?.type;
        if (type === 'SKIP_WAITING') {
            // lib def bug, see https://github.com/microsoft/TypeScript/issues/14877
            self.skipWaiting();
        }
    });
})();

})();

/******/ })()
;
//# sourceMappingURL=sw.js.map