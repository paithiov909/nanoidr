(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
var globalObj = global;

// nanoid-good locales
const ar = require("nanoid-good/locale/ar");
const cs = require("nanoid-good/locale/cs");
const da = require("nanoid-good/locale/da");
const de = require("nanoid-good/locale/de");
const en = require("nanoid-good/locale/en");
const eo = require("nanoid-good/locale/eo");
const es = require("nanoid-good/locale/es");
const fa = require("nanoid-good/locale/fa");
const fi = require("nanoid-good/locale/fi");
const fr = require("nanoid-good/locale/fr");
const hi = require("nanoid-good/locale/hi");
const hu = require("nanoid-good/locale/it");
const ja = require("nanoid-good/locale/ja");
const ko = require("nanoid-good/locale/ko");
const nl = require("nanoid-good/locale/nl");
const no = require("nanoid-good/locale/no");
const pl = require("nanoid-good/locale/pl");
const pt = require("nanoid-good/locale/pt");
const ru = require("nanoid-good/locale/ru");
const sv = require("nanoid-good/locale/sv");
const th = require("nanoid-good/locale/th");
const tlh = require("nanoid-good/locale/tlh");
const tr = require("nanoid-good/locale/tr");
const zh = require("nanoid-good/locale/zh");

// nanoid-dictionary
const url = require("nanoid/url");
const numbers = require("nanoid-dictionary/numbers");
const lowercase = require("nanoid-dictionary/lowercase");
const uppercase = require("nanoid-dictionary/uppercase");
const nolookalikes = require("nanoid-dictionary/nolookalikes");

// nanoid-good
const format = require("nanoid-good/format");
const generate = require("nanoid-good/generate");
const nonsecure = require("nanoid-good/non-secure");

/**
 * lodash/curry
 * @alias global._.curry
 */
const curry = require("lodash/curry");

/**
 * nanoidr.methods.format_curried
 * @function
 * @param {String[]} locales - set of locales to be enabled.
 */
function format_curried(locales) {
  return curry(format(...locales));
}

/**
 * nanoidr.methods.generate_curried
 * @function
 * @param {String[]} locales - set of locales to be enabled.
 */
function generate_curried(locales) {
  return curry(generate(...locales));
}

/**
 * nanoidr.methods.nonsecure_curried
 * @function
 * @param {String[]} locales - set of locales to be enabled.
 */
function nonsecure_curried(locales) {
  return curry(nonsecure(...locales));
}

/**
 * nanoidr
 * @alias global.nanoidr
 * @global
 * @namespace
 */
const nanoidr = {
  methods: {
    format: format_curried,
    generate: generate_curried,
    nonsecure: nonsecure_curried
  },
  locales: {
    ar: ar,
    cs: cs,
    da: da,
    de: de,
    en: en,
    eo: eo,
    es: es,
    fa: fa,
    fi: fi,
    fr: fr,
    hi: hi,
    hu: hu,
    ja: ja,
    ko: ko,
    nl: nl,
    no: no,
    pl: pl,
    pt: pt,
    ru: ru,
    sv: sv,
    th: th,
    tlh: tlh,
    tr: tr,
    zh: zh
  },
  dict: {
    url: url,
    numbers: numbers,
    lowercase: lowercase,
    uppercase: uppercase,
    nolookalikes: nolookalikes
  }
};

global.curry = curry;
global.nanoidr = nanoidr;



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"lodash/curry":59,"nanoid-dictionary/lowercase":71,"nanoid-dictionary/nolookalikes":72,"nanoid-dictionary/numbers":73,"nanoid-dictionary/uppercase":74,"nanoid-good/format":75,"nanoid-good/generate":76,"nanoid-good/locale/ar":78,"nanoid-good/locale/cs":79,"nanoid-good/locale/da":80,"nanoid-good/locale/de":81,"nanoid-good/locale/en":82,"nanoid-good/locale/eo":83,"nanoid-good/locale/es":84,"nanoid-good/locale/fa":85,"nanoid-good/locale/fi":86,"nanoid-good/locale/fr":87,"nanoid-good/locale/hi":88,"nanoid-good/locale/it":89,"nanoid-good/locale/ja":90,"nanoid-good/locale/ko":91,"nanoid-good/locale/nl":92,"nanoid-good/locale/no":93,"nanoid-good/locale/pl":94,"nanoid-good/locale/pt":95,"nanoid-good/locale/ru":96,"nanoid-good/locale/sv":97,"nanoid-good/locale/th":98,"nanoid-good/locale/tlh":99,"nanoid-good/locale/tr":100,"nanoid-good/locale/zh":101,"nanoid-good/non-secure":102,"nanoid/url":108}],2:[function(require,module,exports){
var baseCreate = require('./_baseCreate'),
    baseLodash = require('./_baseLodash');

/** Used as references for the maximum length and index of an array. */
var MAX_ARRAY_LENGTH = 4294967295;

/**
 * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
 *
 * @private
 * @constructor
 * @param {*} value The value to wrap.
 */
function LazyWrapper(value) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__dir__ = 1;
  this.__filtered__ = false;
  this.__iteratees__ = [];
  this.__takeCount__ = MAX_ARRAY_LENGTH;
  this.__views__ = [];
}

// Ensure `LazyWrapper` is an instance of `baseLodash`.
LazyWrapper.prototype = baseCreate(baseLodash.prototype);
LazyWrapper.prototype.constructor = LazyWrapper;

module.exports = LazyWrapper;

},{"./_baseCreate":9,"./_baseLodash":15}],3:[function(require,module,exports){
var baseCreate = require('./_baseCreate'),
    baseLodash = require('./_baseLodash');

/**
 * The base constructor for creating `lodash` wrapper objects.
 *
 * @private
 * @param {*} value The value to wrap.
 * @param {boolean} [chainAll] Enable explicit method chain sequences.
 */
function LodashWrapper(value, chainAll) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__chain__ = !!chainAll;
  this.__index__ = 0;
  this.__values__ = undefined;
}

LodashWrapper.prototype = baseCreate(baseLodash.prototype);
LodashWrapper.prototype.constructor = LodashWrapper;

module.exports = LodashWrapper;

},{"./_baseCreate":9,"./_baseLodash":15}],4:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":49}],5:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;

},{"./_getNative":35,"./_root":49}],6:[function(require,module,exports){
/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;

},{}],7:[function(require,module,exports){
/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],8:[function(require,module,exports){
var baseIndexOf = require('./_baseIndexOf');

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;

},{"./_baseIndexOf":12}],9:[function(require,module,exports){
var isObject = require('./isObject');

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;

},{"./isObject":63}],10:[function(require,module,exports){
/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;

},{}],11:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":4,"./_getRawTag":36,"./_objectToString":45}],12:[function(require,module,exports){
var baseFindIndex = require('./_baseFindIndex'),
    baseIsNaN = require('./_baseIsNaN'),
    strictIndexOf = require('./_strictIndexOf');

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

module.exports = baseIndexOf;

},{"./_baseFindIndex":10,"./_baseIsNaN":13,"./_strictIndexOf":54}],13:[function(require,module,exports){
/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

module.exports = baseIsNaN;

},{}],14:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isMasked = require('./_isMasked'),
    isObject = require('./isObject'),
    toSource = require('./_toSource');

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;

},{"./_isMasked":42,"./_toSource":55,"./isFunction":62,"./isObject":63}],15:[function(require,module,exports){
/**
 * The function whose prototype chain sequence wrappers inherit from.
 *
 * @private
 */
function baseLodash() {
  // No operation performed.
}

module.exports = baseLodash;

},{}],16:[function(require,module,exports){
var identity = require('./identity'),
    metaMap = require('./_metaMap');

/**
 * The base implementation of `setData` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */
var baseSetData = !metaMap ? identity : function(func, data) {
  metaMap.set(func, data);
  return func;
};

module.exports = baseSetData;

},{"./_metaMap":44,"./identity":60}],17:[function(require,module,exports){
var constant = require('./constant'),
    defineProperty = require('./_defineProperty'),
    identity = require('./identity');

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;

},{"./_defineProperty":30,"./constant":58,"./identity":60}],18:[function(require,module,exports){
/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates an array that is the composition of partially applied arguments,
 * placeholders, and provided arguments into a single array of arguments.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to prepend to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgs(args, partials, holders, isCurried) {
  var argsIndex = -1,
      argsLength = args.length,
      holdersLength = holders.length,
      leftIndex = -1,
      leftLength = partials.length,
      rangeLength = nativeMax(argsLength - holdersLength, 0),
      result = Array(leftLength + rangeLength),
      isUncurried = !isCurried;

  while (++leftIndex < leftLength) {
    result[leftIndex] = partials[leftIndex];
  }
  while (++argsIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[holders[argsIndex]] = args[argsIndex];
    }
  }
  while (rangeLength--) {
    result[leftIndex++] = args[argsIndex++];
  }
  return result;
}

module.exports = composeArgs;

},{}],19:[function(require,module,exports){
/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * This function is like `composeArgs` except that the arguments composition
 * is tailored for `_.partialRight`.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to append to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgsRight(args, partials, holders, isCurried) {
  var argsIndex = -1,
      argsLength = args.length,
      holdersIndex = -1,
      holdersLength = holders.length,
      rightIndex = -1,
      rightLength = partials.length,
      rangeLength = nativeMax(argsLength - holdersLength, 0),
      result = Array(rangeLength + rightLength),
      isUncurried = !isCurried;

  while (++argsIndex < rangeLength) {
    result[argsIndex] = args[argsIndex];
  }
  var offset = argsIndex;
  while (++rightIndex < rightLength) {
    result[offset + rightIndex] = partials[rightIndex];
  }
  while (++holdersIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[offset + holders[holdersIndex]] = args[argsIndex++];
    }
  }
  return result;
}

module.exports = composeArgsRight;

},{}],20:[function(require,module,exports){
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;

},{}],21:[function(require,module,exports){
var root = require('./_root');

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;

},{"./_root":49}],22:[function(require,module,exports){
/**
 * Gets the number of `placeholder` occurrences in `array`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} placeholder The placeholder to search for.
 * @returns {number} Returns the placeholder count.
 */
function countHolders(array, placeholder) {
  var length = array.length,
      result = 0;

  while (length--) {
    if (array[length] === placeholder) {
      ++result;
    }
  }
  return result;
}

module.exports = countHolders;

},{}],23:[function(require,module,exports){
var createCtor = require('./_createCtor'),
    root = require('./_root');

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1;

/**
 * Creates a function that wraps `func` to invoke it with the optional `this`
 * binding of `thisArg`.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createBind(func, bitmask, thisArg) {
  var isBind = bitmask & WRAP_BIND_FLAG,
      Ctor = createCtor(func);

  function wrapper() {
    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
    return fn.apply(isBind ? thisArg : this, arguments);
  }
  return wrapper;
}

module.exports = createBind;

},{"./_createCtor":24,"./_root":49}],24:[function(require,module,exports){
var baseCreate = require('./_baseCreate'),
    isObject = require('./isObject');

/**
 * Creates a function that produces an instance of `Ctor` regardless of
 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
 *
 * @private
 * @param {Function} Ctor The constructor to wrap.
 * @returns {Function} Returns the new wrapped function.
 */
function createCtor(Ctor) {
  return function() {
    // Use a `switch` statement to work with class constructors. See
    // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
    // for more details.
    var args = arguments;
    switch (args.length) {
      case 0: return new Ctor;
      case 1: return new Ctor(args[0]);
      case 2: return new Ctor(args[0], args[1]);
      case 3: return new Ctor(args[0], args[1], args[2]);
      case 4: return new Ctor(args[0], args[1], args[2], args[3]);
      case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
      case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
      case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
    }
    var thisBinding = baseCreate(Ctor.prototype),
        result = Ctor.apply(thisBinding, args);

    // Mimic the constructor's `return` behavior.
    // See https://es5.github.io/#x13.2.2 for more details.
    return isObject(result) ? result : thisBinding;
  };
}

module.exports = createCtor;

},{"./_baseCreate":9,"./isObject":63}],25:[function(require,module,exports){
var apply = require('./_apply'),
    createCtor = require('./_createCtor'),
    createHybrid = require('./_createHybrid'),
    createRecurry = require('./_createRecurry'),
    getHolder = require('./_getHolder'),
    replaceHolders = require('./_replaceHolders'),
    root = require('./_root');

/**
 * Creates a function that wraps `func` to enable currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {number} arity The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createCurry(func, bitmask, arity) {
  var Ctor = createCtor(func);

  function wrapper() {
    var length = arguments.length,
        args = Array(length),
        index = length,
        placeholder = getHolder(wrapper);

    while (index--) {
      args[index] = arguments[index];
    }
    var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
      ? []
      : replaceHolders(args, placeholder);

    length -= holders.length;
    if (length < arity) {
      return createRecurry(
        func, bitmask, createHybrid, wrapper.placeholder, undefined,
        args, holders, undefined, undefined, arity - length);
    }
    var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
    return apply(fn, this, args);
  }
  return wrapper;
}

module.exports = createCurry;

},{"./_apply":6,"./_createCtor":24,"./_createHybrid":26,"./_createRecurry":28,"./_getHolder":34,"./_replaceHolders":48,"./_root":49}],26:[function(require,module,exports){
var composeArgs = require('./_composeArgs'),
    composeArgsRight = require('./_composeArgsRight'),
    countHolders = require('./_countHolders'),
    createCtor = require('./_createCtor'),
    createRecurry = require('./_createRecurry'),
    getHolder = require('./_getHolder'),
    reorder = require('./_reorder'),
    replaceHolders = require('./_replaceHolders'),
    root = require('./_root');

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_BIND_KEY_FLAG = 2,
    WRAP_CURRY_FLAG = 8,
    WRAP_CURRY_RIGHT_FLAG = 16,
    WRAP_ARY_FLAG = 128,
    WRAP_FLIP_FLAG = 512;

/**
 * Creates a function that wraps `func` to invoke it with optional `this`
 * binding of `thisArg`, partial application, and currying.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to
 *  the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [partialsRight] The arguments to append to those provided
 *  to the new function.
 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
  var isAry = bitmask & WRAP_ARY_FLAG,
      isBind = bitmask & WRAP_BIND_FLAG,
      isBindKey = bitmask & WRAP_BIND_KEY_FLAG,
      isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
      isFlip = bitmask & WRAP_FLIP_FLAG,
      Ctor = isBindKey ? undefined : createCtor(func);

  function wrapper() {
    var length = arguments.length,
        args = Array(length),
        index = length;

    while (index--) {
      args[index] = arguments[index];
    }
    if (isCurried) {
      var placeholder = getHolder(wrapper),
          holdersCount = countHolders(args, placeholder);
    }
    if (partials) {
      args = composeArgs(args, partials, holders, isCurried);
    }
    if (partialsRight) {
      args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
    }
    length -= holdersCount;
    if (isCurried && length < arity) {
      var newHolders = replaceHolders(args, placeholder);
      return createRecurry(
        func, bitmask, createHybrid, wrapper.placeholder, thisArg,
        args, newHolders, argPos, ary, arity - length
      );
    }
    var thisBinding = isBind ? thisArg : this,
        fn = isBindKey ? thisBinding[func] : func;

    length = args.length;
    if (argPos) {
      args = reorder(args, argPos);
    } else if (isFlip && length > 1) {
      args.reverse();
    }
    if (isAry && ary < length) {
      args.length = ary;
    }
    if (this && this !== root && this instanceof wrapper) {
      fn = Ctor || createCtor(fn);
    }
    return fn.apply(thisBinding, args);
  }
  return wrapper;
}

module.exports = createHybrid;

},{"./_composeArgs":18,"./_composeArgsRight":19,"./_countHolders":22,"./_createCtor":24,"./_createRecurry":28,"./_getHolder":34,"./_reorder":47,"./_replaceHolders":48,"./_root":49}],27:[function(require,module,exports){
var apply = require('./_apply'),
    createCtor = require('./_createCtor'),
    root = require('./_root');

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1;

/**
 * Creates a function that wraps `func` to invoke it with the `this` binding
 * of `thisArg` and `partials` prepended to the arguments it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} partials The arguments to prepend to those provided to
 *  the new function.
 * @returns {Function} Returns the new wrapped function.
 */
function createPartial(func, bitmask, thisArg, partials) {
  var isBind = bitmask & WRAP_BIND_FLAG,
      Ctor = createCtor(func);

  function wrapper() {
    var argsIndex = -1,
        argsLength = arguments.length,
        leftIndex = -1,
        leftLength = partials.length,
        args = Array(leftLength + argsLength),
        fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

    while (++leftIndex < leftLength) {
      args[leftIndex] = partials[leftIndex];
    }
    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }
    return apply(fn, isBind ? thisArg : this, args);
  }
  return wrapper;
}

module.exports = createPartial;

},{"./_apply":6,"./_createCtor":24,"./_root":49}],28:[function(require,module,exports){
var isLaziable = require('./_isLaziable'),
    setData = require('./_setData'),
    setWrapToString = require('./_setWrapToString');

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_BIND_KEY_FLAG = 2,
    WRAP_CURRY_BOUND_FLAG = 4,
    WRAP_CURRY_FLAG = 8,
    WRAP_PARTIAL_FLAG = 32,
    WRAP_PARTIAL_RIGHT_FLAG = 64;

/**
 * Creates a function that wraps `func` to continue currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {Function} wrapFunc The function to create the `func` wrapper.
 * @param {*} placeholder The placeholder value.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to
 *  the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
  var isCurry = bitmask & WRAP_CURRY_FLAG,
      newHolders = isCurry ? holders : undefined,
      newHoldersRight = isCurry ? undefined : holders,
      newPartials = isCurry ? partials : undefined,
      newPartialsRight = isCurry ? undefined : partials;

  bitmask |= (isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG);
  bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);

  if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
    bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
  }
  var newData = [
    func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
    newHoldersRight, argPos, ary, arity
  ];

  var result = wrapFunc.apply(undefined, newData);
  if (isLaziable(func)) {
    setData(result, newData);
  }
  result.placeholder = placeholder;
  return setWrapToString(result, func, bitmask);
}

module.exports = createRecurry;

},{"./_isLaziable":41,"./_setData":50,"./_setWrapToString":52}],29:[function(require,module,exports){
var baseSetData = require('./_baseSetData'),
    createBind = require('./_createBind'),
    createCurry = require('./_createCurry'),
    createHybrid = require('./_createHybrid'),
    createPartial = require('./_createPartial'),
    getData = require('./_getData'),
    mergeData = require('./_mergeData'),
    setData = require('./_setData'),
    setWrapToString = require('./_setWrapToString'),
    toInteger = require('./toInteger');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_BIND_KEY_FLAG = 2,
    WRAP_CURRY_FLAG = 8,
    WRAP_CURRY_RIGHT_FLAG = 16,
    WRAP_PARTIAL_FLAG = 32,
    WRAP_PARTIAL_RIGHT_FLAG = 64;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that either curries or invokes `func` with optional
 * `this` binding and partially applied arguments.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask flags.
 *    1 - `_.bind`
 *    2 - `_.bindKey`
 *    4 - `_.curry` or `_.curryRight` of a bound function
 *    8 - `_.curry`
 *   16 - `_.curryRight`
 *   32 - `_.partial`
 *   64 - `_.partialRight`
 *  128 - `_.rearg`
 *  256 - `_.ary`
 *  512 - `_.flip`
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to be partially applied.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
  var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
  if (!isBindKey && typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var length = partials ? partials.length : 0;
  if (!length) {
    bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
    partials = holders = undefined;
  }
  ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
  arity = arity === undefined ? arity : toInteger(arity);
  length -= holders ? holders.length : 0;

  if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
    var partialsRight = partials,
        holdersRight = holders;

    partials = holders = undefined;
  }
  var data = isBindKey ? undefined : getData(func);

  var newData = [
    func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
    argPos, ary, arity
  ];

  if (data) {
    mergeData(newData, data);
  }
  func = newData[0];
  bitmask = newData[1];
  thisArg = newData[2];
  partials = newData[3];
  holders = newData[4];
  arity = newData[9] = newData[9] === undefined
    ? (isBindKey ? 0 : func.length)
    : nativeMax(newData[9] - length, 0);

  if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
    bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
  }
  if (!bitmask || bitmask == WRAP_BIND_FLAG) {
    var result = createBind(func, bitmask, thisArg);
  } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
    result = createCurry(func, bitmask, arity);
  } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
    result = createPartial(func, bitmask, thisArg, partials);
  } else {
    result = createHybrid.apply(undefined, newData);
  }
  var setter = data ? baseSetData : setData;
  return setWrapToString(setter(result, newData), func, bitmask);
}

module.exports = createWrap;

},{"./_baseSetData":16,"./_createBind":23,"./_createCurry":25,"./_createHybrid":26,"./_createPartial":27,"./_getData":32,"./_mergeData":43,"./_setData":50,"./_setWrapToString":52,"./toInteger":68}],30:[function(require,module,exports){
var getNative = require('./_getNative');

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;

},{"./_getNative":35}],31:[function(require,module,exports){
(function (global){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],32:[function(require,module,exports){
var metaMap = require('./_metaMap'),
    noop = require('./noop');

/**
 * Gets metadata for `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {*} Returns the metadata for `func`.
 */
var getData = !metaMap ? noop : function(func) {
  return metaMap.get(func);
};

module.exports = getData;

},{"./_metaMap":44,"./noop":66}],33:[function(require,module,exports){
var realNames = require('./_realNames');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the name of `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {string} Returns the function name.
 */
function getFuncName(func) {
  var result = (func.name + ''),
      array = realNames[result],
      length = hasOwnProperty.call(realNames, result) ? array.length : 0;

  while (length--) {
    var data = array[length],
        otherFunc = data.func;
    if (otherFunc == null || otherFunc == func) {
      return data.name;
    }
  }
  return result;
}

module.exports = getFuncName;

},{"./_realNames":46}],34:[function(require,module,exports){
/**
 * Gets the argument placeholder value for `func`.
 *
 * @private
 * @param {Function} func The function to inspect.
 * @returns {*} Returns the placeholder value.
 */
function getHolder(func) {
  var object = func;
  return object.placeholder;
}

module.exports = getHolder;

},{}],35:[function(require,module,exports){
var baseIsNative = require('./_baseIsNative'),
    getValue = require('./_getValue');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;

},{"./_baseIsNative":14,"./_getValue":37}],36:[function(require,module,exports){
var Symbol = require('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

},{"./_Symbol":4}],37:[function(require,module,exports){
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;

},{}],38:[function(require,module,exports){
/** Used to match wrap detail comments. */
var reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
    reSplitDetails = /,? & /;

/**
 * Extracts wrapper details from the `source` body comment.
 *
 * @private
 * @param {string} source The source to inspect.
 * @returns {Array} Returns the wrapper details.
 */
function getWrapDetails(source) {
  var match = source.match(reWrapDetails);
  return match ? match[1].split(reSplitDetails) : [];
}

module.exports = getWrapDetails;

},{}],39:[function(require,module,exports){
/** Used to match wrap detail comments. */
var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;

/**
 * Inserts wrapper `details` in a comment at the top of the `source` body.
 *
 * @private
 * @param {string} source The source to modify.
 * @returns {Array} details The details to insert.
 * @returns {string} Returns the modified source.
 */
function insertWrapDetails(source, details) {
  var length = details.length;
  if (!length) {
    return source;
  }
  var lastIndex = length - 1;
  details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
  details = details.join(length > 2 ? ', ' : ' ');
  return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
}

module.exports = insertWrapDetails;

},{}],40:[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;

},{}],41:[function(require,module,exports){
var LazyWrapper = require('./_LazyWrapper'),
    getData = require('./_getData'),
    getFuncName = require('./_getFuncName'),
    lodash = require('./wrapperLodash');

/**
 * Checks if `func` has a lazy counterpart.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
 *  else `false`.
 */
function isLaziable(func) {
  var funcName = getFuncName(func),
      other = lodash[funcName];

  if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
    return false;
  }
  if (func === other) {
    return true;
  }
  var data = getData(other);
  return !!data && func === data[0];
}

module.exports = isLaziable;

},{"./_LazyWrapper":2,"./_getData":32,"./_getFuncName":33,"./wrapperLodash":70}],42:[function(require,module,exports){
var coreJsData = require('./_coreJsData');

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;

},{"./_coreJsData":21}],43:[function(require,module,exports){
var composeArgs = require('./_composeArgs'),
    composeArgsRight = require('./_composeArgsRight'),
    replaceHolders = require('./_replaceHolders');

/** Used as the internal argument placeholder. */
var PLACEHOLDER = '__lodash_placeholder__';

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_BIND_KEY_FLAG = 2,
    WRAP_CURRY_BOUND_FLAG = 4,
    WRAP_CURRY_FLAG = 8,
    WRAP_ARY_FLAG = 128,
    WRAP_REARG_FLAG = 256;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * Merges the function metadata of `source` into `data`.
 *
 * Merging metadata reduces the number of wrappers used to invoke a function.
 * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
 * may be applied regardless of execution order. Methods like `_.ary` and
 * `_.rearg` modify function arguments, making the order in which they are
 * executed important, preventing the merging of metadata. However, we make
 * an exception for a safe combined case where curried functions have `_.ary`
 * and or `_.rearg` applied.
 *
 * @private
 * @param {Array} data The destination metadata.
 * @param {Array} source The source metadata.
 * @returns {Array} Returns `data`.
 */
function mergeData(data, source) {
  var bitmask = data[1],
      srcBitmask = source[1],
      newBitmask = bitmask | srcBitmask,
      isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);

  var isCombo =
    ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_CURRY_FLAG)) ||
    ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_REARG_FLAG) && (data[7].length <= source[8])) ||
    ((srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG));

  // Exit early if metadata can't be merged.
  if (!(isCommon || isCombo)) {
    return data;
  }
  // Use source `thisArg` if available.
  if (srcBitmask & WRAP_BIND_FLAG) {
    data[2] = source[2];
    // Set when currying a bound function.
    newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
  }
  // Compose partial arguments.
  var value = source[3];
  if (value) {
    var partials = data[3];
    data[3] = partials ? composeArgs(partials, value, source[4]) : value;
    data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
  }
  // Compose partial right arguments.
  value = source[5];
  if (value) {
    partials = data[5];
    data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
    data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
  }
  // Use source `argPos` if available.
  value = source[7];
  if (value) {
    data[7] = value;
  }
  // Use source `ary` if it's smaller.
  if (srcBitmask & WRAP_ARY_FLAG) {
    data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
  }
  // Use source `arity` if one is not provided.
  if (data[9] == null) {
    data[9] = source[9];
  }
  // Use source `func` and merge bitmasks.
  data[0] = source[0];
  data[1] = newBitmask;

  return data;
}

module.exports = mergeData;

},{"./_composeArgs":18,"./_composeArgsRight":19,"./_replaceHolders":48}],44:[function(require,module,exports){
var WeakMap = require('./_WeakMap');

/** Used to store function metadata. */
var metaMap = WeakMap && new WeakMap;

module.exports = metaMap;

},{"./_WeakMap":5}],45:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

},{}],46:[function(require,module,exports){
/** Used to lookup unminified function names. */
var realNames = {};

module.exports = realNames;

},{}],47:[function(require,module,exports){
var copyArray = require('./_copyArray'),
    isIndex = require('./_isIndex');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * Reorder `array` according to the specified indexes where the element at
 * the first index is assigned as the first element, the element at
 * the second index is assigned as the second element, and so on.
 *
 * @private
 * @param {Array} array The array to reorder.
 * @param {Array} indexes The arranged array indexes.
 * @returns {Array} Returns `array`.
 */
function reorder(array, indexes) {
  var arrLength = array.length,
      length = nativeMin(indexes.length, arrLength),
      oldArray = copyArray(array);

  while (length--) {
    var index = indexes[length];
    array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
  }
  return array;
}

module.exports = reorder;

},{"./_copyArray":20,"./_isIndex":40}],48:[function(require,module,exports){
/** Used as the internal argument placeholder. */
var PLACEHOLDER = '__lodash_placeholder__';

/**
 * Replaces all `placeholder` elements in `array` with an internal placeholder
 * and returns an array of their indexes.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {*} placeholder The placeholder to replace.
 * @returns {Array} Returns the new array of placeholder indexes.
 */
function replaceHolders(array, placeholder) {
  var index = -1,
      length = array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (value === placeholder || value === PLACEHOLDER) {
      array[index] = PLACEHOLDER;
      result[resIndex++] = index;
    }
  }
  return result;
}

module.exports = replaceHolders;

},{}],49:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":31}],50:[function(require,module,exports){
var baseSetData = require('./_baseSetData'),
    shortOut = require('./_shortOut');

/**
 * Sets metadata for `func`.
 *
 * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
 * period of time, it will trip its breaker and transition to an identity
 * function to avoid garbage collection pauses in V8. See
 * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
 * for more details.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */
var setData = shortOut(baseSetData);

module.exports = setData;

},{"./_baseSetData":16,"./_shortOut":53}],51:[function(require,module,exports){
var baseSetToString = require('./_baseSetToString'),
    shortOut = require('./_shortOut');

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;

},{"./_baseSetToString":17,"./_shortOut":53}],52:[function(require,module,exports){
var getWrapDetails = require('./_getWrapDetails'),
    insertWrapDetails = require('./_insertWrapDetails'),
    setToString = require('./_setToString'),
    updateWrapDetails = require('./_updateWrapDetails');

/**
 * Sets the `toString` method of `wrapper` to mimic the source of `reference`
 * with wrapper details in a comment at the top of the source body.
 *
 * @private
 * @param {Function} wrapper The function to modify.
 * @param {Function} reference The reference function.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Function} Returns `wrapper`.
 */
function setWrapToString(wrapper, reference, bitmask) {
  var source = (reference + '');
  return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
}

module.exports = setWrapToString;

},{"./_getWrapDetails":38,"./_insertWrapDetails":39,"./_setToString":51,"./_updateWrapDetails":56}],53:[function(require,module,exports){
/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;

},{}],54:[function(require,module,exports){
/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = strictIndexOf;

},{}],55:[function(require,module,exports){
/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;

},{}],56:[function(require,module,exports){
var arrayEach = require('./_arrayEach'),
    arrayIncludes = require('./_arrayIncludes');

/** Used to compose bitmasks for function metadata. */
var WRAP_BIND_FLAG = 1,
    WRAP_BIND_KEY_FLAG = 2,
    WRAP_CURRY_FLAG = 8,
    WRAP_CURRY_RIGHT_FLAG = 16,
    WRAP_PARTIAL_FLAG = 32,
    WRAP_PARTIAL_RIGHT_FLAG = 64,
    WRAP_ARY_FLAG = 128,
    WRAP_REARG_FLAG = 256,
    WRAP_FLIP_FLAG = 512;

/** Used to associate wrap methods with their bit flags. */
var wrapFlags = [
  ['ary', WRAP_ARY_FLAG],
  ['bind', WRAP_BIND_FLAG],
  ['bindKey', WRAP_BIND_KEY_FLAG],
  ['curry', WRAP_CURRY_FLAG],
  ['curryRight', WRAP_CURRY_RIGHT_FLAG],
  ['flip', WRAP_FLIP_FLAG],
  ['partial', WRAP_PARTIAL_FLAG],
  ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],
  ['rearg', WRAP_REARG_FLAG]
];

/**
 * Updates wrapper `details` based on `bitmask` flags.
 *
 * @private
 * @returns {Array} details The details to modify.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Array} Returns `details`.
 */
function updateWrapDetails(details, bitmask) {
  arrayEach(wrapFlags, function(pair) {
    var value = '_.' + pair[0];
    if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
      details.push(value);
    }
  });
  return details.sort();
}

module.exports = updateWrapDetails;

},{"./_arrayEach":7,"./_arrayIncludes":8}],57:[function(require,module,exports){
var LazyWrapper = require('./_LazyWrapper'),
    LodashWrapper = require('./_LodashWrapper'),
    copyArray = require('./_copyArray');

/**
 * Creates a clone of `wrapper`.
 *
 * @private
 * @param {Object} wrapper The wrapper to clone.
 * @returns {Object} Returns the cloned wrapper.
 */
function wrapperClone(wrapper) {
  if (wrapper instanceof LazyWrapper) {
    return wrapper.clone();
  }
  var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
  result.__actions__ = copyArray(wrapper.__actions__);
  result.__index__  = wrapper.__index__;
  result.__values__ = wrapper.__values__;
  return result;
}

module.exports = wrapperClone;

},{"./_LazyWrapper":2,"./_LodashWrapper":3,"./_copyArray":20}],58:[function(require,module,exports){
/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;

},{}],59:[function(require,module,exports){
var createWrap = require('./_createWrap');

/** Used to compose bitmasks for function metadata. */
var WRAP_CURRY_FLAG = 8;

/**
 * Creates a function that accepts arguments of `func` and either invokes
 * `func` returning its result, if at least `arity` number of arguments have
 * been provided, or returns a function that accepts the remaining `func`
 * arguments, and so on. The arity of `func` may be specified if `func.length`
 * is not sufficient.
 *
 * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
 * may be used as a placeholder for provided arguments.
 *
 * **Note:** This method doesn't set the "length" property of curried functions.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Function
 * @param {Function} func The function to curry.
 * @param {number} [arity=func.length] The arity of `func`.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Function} Returns the new curried function.
 * @example
 *
 * var abc = function(a, b, c) {
 *   return [a, b, c];
 * };
 *
 * var curried = _.curry(abc);
 *
 * curried(1)(2)(3);
 * // => [1, 2, 3]
 *
 * curried(1, 2)(3);
 * // => [1, 2, 3]
 *
 * curried(1, 2, 3);
 * // => [1, 2, 3]
 *
 * // Curried with placeholders.
 * curried(1)(_, 3)(2);
 * // => [1, 2, 3]
 */
function curry(func, arity, guard) {
  arity = guard ? undefined : arity;
  var result = createWrap(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
  result.placeholder = curry.placeholder;
  return result;
}

// Assign default placeholders.
curry.placeholder = {};

module.exports = curry;

},{"./_createWrap":29}],60:[function(require,module,exports){
/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],61:[function(require,module,exports){
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

},{}],62:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObject = require('./isObject');

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;

},{"./_baseGetTag":11,"./isObject":63}],63:[function(require,module,exports){
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],64:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],65:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;

},{"./_baseGetTag":11,"./isObjectLike":64}],66:[function(require,module,exports){
/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;

},{}],67:[function(require,module,exports){
var toNumber = require('./toNumber');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

module.exports = toFinite;

},{"./toNumber":69}],68:[function(require,module,exports){
var toFinite = require('./toFinite');

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

module.exports = toInteger;

},{"./toFinite":67}],69:[function(require,module,exports){
var isObject = require('./isObject'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;

},{"./isObject":63,"./isSymbol":65}],70:[function(require,module,exports){
var LazyWrapper = require('./_LazyWrapper'),
    LodashWrapper = require('./_LodashWrapper'),
    baseLodash = require('./_baseLodash'),
    isArray = require('./isArray'),
    isObjectLike = require('./isObjectLike'),
    wrapperClone = require('./_wrapperClone');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates a `lodash` object which wraps `value` to enable implicit method
 * chain sequences. Methods that operate on and return arrays, collections,
 * and functions can be chained together. Methods that retrieve a single value
 * or may return a primitive value will automatically end the chain sequence
 * and return the unwrapped value. Otherwise, the value must be unwrapped
 * with `_#value`.
 *
 * Explicit chain sequences, which must be unwrapped with `_#value`, may be
 * enabled using `_.chain`.
 *
 * The execution of chained methods is lazy, that is, it's deferred until
 * `_#value` is implicitly or explicitly called.
 *
 * Lazy evaluation allows several methods to support shortcut fusion.
 * Shortcut fusion is an optimization to merge iteratee calls; this avoids
 * the creation of intermediate arrays and can greatly reduce the number of
 * iteratee executions. Sections of a chain sequence qualify for shortcut
 * fusion if the section is applied to an array and iteratees accept only
 * one argument. The heuristic for whether a section qualifies for shortcut
 * fusion is subject to change.
 *
 * Chaining is supported in custom builds as long as the `_#value` method is
 * directly or indirectly included in the build.
 *
 * In addition to lodash methods, wrappers have `Array` and `String` methods.
 *
 * The wrapper `Array` methods are:
 * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
 *
 * The wrapper `String` methods are:
 * `replace` and `split`
 *
 * The wrapper methods that support shortcut fusion are:
 * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
 * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
 * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
 *
 * The chainable wrapper methods are:
 * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
 * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
 * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
 * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
 * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
 * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
 * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
 * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
 * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
 * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
 * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
 * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
 * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
 * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
 * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
 * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
 * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
 * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
 * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
 * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
 * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
 * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
 * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
 * `zipObject`, `zipObjectDeep`, and `zipWith`
 *
 * The wrapper methods that are **not** chainable by default are:
 * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
 * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
 * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
 * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
 * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
 * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
 * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
 * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
 * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
 * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
 * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
 * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
 * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
 * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
 * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
 * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
 * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
 * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
 * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
 * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
 * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
 * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
 * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
 * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
 * `upperFirst`, `value`, and `words`
 *
 * @name _
 * @constructor
 * @category Seq
 * @param {*} value The value to wrap in a `lodash` instance.
 * @returns {Object} Returns the new `lodash` wrapper instance.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * var wrapped = _([1, 2, 3]);
 *
 * // Returns an unwrapped value.
 * wrapped.reduce(_.add);
 * // => 6
 *
 * // Returns a wrapped value.
 * var squares = wrapped.map(square);
 *
 * _.isArray(squares);
 * // => false
 *
 * _.isArray(squares.value());
 * // => true
 */
function lodash(value) {
  if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
    if (value instanceof LodashWrapper) {
      return value;
    }
    if (hasOwnProperty.call(value, '__wrapped__')) {
      return wrapperClone(value);
    }
  }
  return new LodashWrapper(value);
}

// Ensure wrappers are instances of `baseLodash`.
lodash.prototype = baseLodash.prototype;
lodash.prototype.constructor = lodash;

module.exports = lodash;

},{"./_LazyWrapper":2,"./_LodashWrapper":3,"./_baseLodash":15,"./_wrapperClone":57,"./isArray":61,"./isObjectLike":64}],71:[function(require,module,exports){
module.exports = 'abcdefghijklmnopqrstuvwxyz';
},{}],72:[function(require,module,exports){
module.exports = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstwxyz';
},{}],73:[function(require,module,exports){
module.exports = '0123456789';
},{}],74:[function(require,module,exports){
module.exports = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
},{}],75:[function(require,module,exports){
var format = require('nanoid/format');
var wrapper = require('./wrapper');

module.exports = wrapper(format);
},{"./wrapper":103,"nanoid/format":104}],76:[function(require,module,exports){
var generate = require('nanoid/generate');
var wrapper = require('./wrapper');

module.exports = wrapper(generate);
},{"./wrapper":103,"nanoid/generate":105}],77:[function(require,module,exports){
function checkByList(input, bad_words) {
    for (var i = 0; i < bad_words.length; i++) {
        if (new RegExp(bad_words[i], "gi").test(input)) return true;
    }
    return false;
}

var hasProfanityFactory = function () {
    var list = [].slice.call(arguments);
    if (list.length == 0 || typeof list[0] === 'string') {
        console.warn("No locales were added to nanoid-good. Maybe you forgot to add `require('nanoid-good/locale/en')`?")
        return false;
    }
    return function (input) {
        for (var i = 0; i < list.length; i++) {
            if (checkByList(input, list[i])) return true;
        }
        return false;
    };
};

module.exports = hasProfanityFactory;
},{}],78:[function(require,module,exports){
module.exports = require("naughty-words/ar.json");
},{"naughty-words/ar.json":109}],79:[function(require,module,exports){
module.exports = require("naughty-words/cs.json");
},{"naughty-words/cs.json":110}],80:[function(require,module,exports){
module.exports = require("naughty-words/da.json");
},{"naughty-words/da.json":111}],81:[function(require,module,exports){

module.exports = require("naughty-words/de.json");
},{"naughty-words/de.json":112}],82:[function(require,module,exports){

module.exports = require("naughty-words/en.json");
},{"naughty-words/en.json":113}],83:[function(require,module,exports){

module.exports = require("naughty-words/eo.json");
},{"naughty-words/eo.json":114}],84:[function(require,module,exports){

module.exports = require("naughty-words/es.json");
},{"naughty-words/es.json":115}],85:[function(require,module,exports){

module.exports = require("naughty-words/fa.json");
},{"naughty-words/fa.json":116}],86:[function(require,module,exports){

module.exports = require("naughty-words/fi.json");
},{"naughty-words/fi.json":117}],87:[function(require,module,exports){

module.exports = require("naughty-words/fr.json");
},{"naughty-words/fr.json":118}],88:[function(require,module,exports){

module.exports = require("naughty-words/hi.json");
},{"naughty-words/hi.json":119}],89:[function(require,module,exports){

module.exports = require("naughty-words/it.json");
},{"naughty-words/it.json":120}],90:[function(require,module,exports){

module.exports = require("naughty-words/ja.json");
},{"naughty-words/ja.json":121}],91:[function(require,module,exports){

module.exports = require("naughty-words/ko.json");
},{"naughty-words/ko.json":122}],92:[function(require,module,exports){

module.exports = require("naughty-words/nl.json");
},{"naughty-words/nl.json":123}],93:[function(require,module,exports){

module.exports = require("naughty-words/no.json");
},{"naughty-words/no.json":124}],94:[function(require,module,exports){

module.exports = require("naughty-words/pl.json");
},{"naughty-words/pl.json":125}],95:[function(require,module,exports){

module.exports = require("naughty-words/pt.json");
},{"naughty-words/pt.json":126}],96:[function(require,module,exports){

module.exports = require("naughty-words/ru.json");
},{"naughty-words/ru.json":127}],97:[function(require,module,exports){

module.exports = require("naughty-words/sv.json");
},{"naughty-words/sv.json":128}],98:[function(require,module,exports){

module.exports = require("naughty-words/th.json");
},{"naughty-words/th.json":129}],99:[function(require,module,exports){

module.exports = require("naughty-words/tlh.json");
},{"naughty-words/tlh.json":130}],100:[function(require,module,exports){

module.exports = require("naughty-words/tr.json");
},{"naughty-words/tr.json":131}],101:[function(require,module,exports){

module.exports = require("naughty-words/zh.json");
},{"naughty-words/zh.json":132}],102:[function(require,module,exports){
var nonSecure = require('nanoid/non-secure');
var wrapper = require('./wrapper');

module.exports = wrapper(nonSecure);
},{"./wrapper":103,"nanoid/non-secure":106}],103:[function(require,module,exports){
var hasProfanity = require("./hasProfanity");

var wrapper = function (fn) {
    return function (locales) {
        return function () {
            while (true) {
                var id = fn.apply(this, arguments);
                if (!hasProfanity(locales)(id)) return id;
            }
        }
    };
};

module.exports = wrapper;
},{"./hasProfanity":77}],104:[function(require,module,exports){
module.exports = function (random, alphabet, size) {
  var mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1
  var step = Math.ceil(1.6 * mask * size / alphabet.length)
  var id = ''

  while (true) {
    var i = step
    var bytes = random(i)
    while (i--) {
      id += alphabet[bytes[i] & mask] || ''
      if (id.length === +size) return id
    }
  }
}

},{}],105:[function(require,module,exports){
var random = require('./random')
var format = require('./format')

/**
 * Low-level function to change alphabet and ID size.
 *
 * Alphabet must contain 256 symbols or less. Otherwise, the generator
 * will not be secure.
 *
 * @param {string} alphabet Symbols to be used in ID.
 * @param {number} size The number of symbols in ID.
 *
 * @return {string} Unique ID.
 *
 * @example
 * const generate = require('nanoid/generate')
 * model.id = generate('0123456789абвгдеё', 5) //=> "8ё56а"
 *
 * @name generate
 * @function
 */
module.exports = format.bind(null, random)

},{"./format":104,"./random":107}],106:[function(require,module,exports){
var url = 'sOwnPropMN49CEiq-hXvHJdSymlFURTag61GQfuD8YIWz2Zk5xKB7LV30_Abject'

/**
 * Generate URL-friendly unique ID. This method use non-secure predictable
 * random generator with bigger collision probability.
 *
 * @param {number} [size=21] The number of symbols in ID.
 *
 * @return {string} Random string.
 *
 * @example
 * const nanoid = require('nanoid/non-secure')
 * model.id = nanoid() //=> "Uakgb_J5m9g-0JDMbcJqL"
 *
 * @name nonSecure
 * @function
 */
module.exports = function (size) {
  size = size || 21
  var id = ''
  while (size--) {
    id += url[Math.random() * 64 | 0]
  }
  return id
}

},{}],107:[function(require,module,exports){
var crypto = self.crypto || self.msCrypto

module.exports = function (bytes) {
  return crypto.getRandomValues(new Uint8Array(bytes))
}

},{}],108:[function(require,module,exports){
/**
 * URL safe symbols.
 *
 * This alphabet uses a-z A-Z 0-9 _- symbols.
 * Symbols order was changed for better gzip compression.
 *
 * @name url
 * @type {string}
 *
 * @example
 * const url = require('nanoid/url')
 * generate(url, 10) //=> "Uakgb_J5m9"
 */
module.exports =
  'ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW'

},{}],109:[function(require,module,exports){
module.exports=[
  "سكس",
  "طيز",
  "شرج",
  "لعق",
  "لحس",
  "مص",
  "تمص",
  "بيضان",
  "ثدي",
  "بز",
  "بزاز",
  "حلمة",
  "مفلقسة",
  "بظر",
  "كس",
  "فرج",
  "شهوة",
  "شاذ",
  "مبادل",
  "عاهرة",
  "جماع",
  "قضيب",
  "زب",
  "لوطي",
  "لواط",
  "سحاق",
  "سحاقية",
  "اغتصاب",
  "خنثي",
  "احتلام",
  "نيك",
  "متناك",
  "متناكة",
  "شرموطة",
  "عرص",
  "خول",
  "قحبة",
  "لبوة"
]

},{}],110:[function(require,module,exports){
module.exports=[
  "bordel",
  "buzna",
  "čumět",
  "čurák",
  "debil",
  "do piče",
  "do prdele",
  "dršťka",
  "držka",
  "flundra",
  "hajzl",
  "hovno",
  "chcanky",
  "chuj",
  "jebat",
  "kokot",
  "kokotina",
  "koňomrd",
  "kunda",
  "kurva",
  "mamrd",
  "mrdat",
  "mrdka",
  "mrdník",
  "oslošoust",
  "piča",
  "píčus",
  "píchat",
  "pizda",
  "prcat",
  "prdel",
  "prdelka",
  "sračka",
  "srát",
  "šoustat",
  "šulin",
  "vypíčenec",
  "zkurvit",
  "zkurvysyn",
  "zmrd",
  "žrát"
]

},{}],111:[function(require,module,exports){
module.exports=[
  "anus",
  "bøsserøv",
  "cock",
  "fisse",
  "fissehår",
  "fuck",
  "hestepik",
  "kussekryller",
  "lort",
  "luder",
  "pik",
  "pikhår",
  "pikslugeri",
  "piksutteri",
  "pis",
  "røv",
  "røvhul",
  "røvskæg",
  "røvspræke",
  "shit"
]

},{}],112:[function(require,module,exports){
module.exports=[
  "analritter",
  "arsch",
  "arschficker",
  "arschlecker",
  "arschloch",
  "bimbo",
  "bratze",
  "bumsen",
  "bonze",
  "dödel",
  "fick",
  "ficken",
  "flittchen",
  "fotze",
  "fratze",
  "hackfresse",
  "hure",
  "hurensohn",
  "ische",
  "kackbratze",
  "kacke",
  "kacken",
  "kackwurst",
  "kampflesbe",
  "kanake",
  "kimme",
  "lümmel",
  "MILF",
  "möpse",
  "morgenlatte",
  "möse",
  "mufti",
  "muschi",
  "nackt",
  "neger",
  "nigger",
  "nippel",
  "nutte",
  "onanieren",
  "orgasmus",
  "pimmel",
  "pimpern",
  "pinkeln",
  "pissen",
  "pisser",
  "popel",
  "poppen",
  "porno",
  "reudig",
  "rosette",
  "schabracke",
  "schlampe",
  "scheiße",
  "scheisser",
  "schiesser",
  "schnackeln",
  "schwanzlutscher",
  "schwuchtel",
  "tittchen",
  "titten",
  "vögeln",
  "vollpfosten",
  "wichse",
  "wichsen",
  "wichser"
]

},{}],113:[function(require,module,exports){
module.exports=[
  "2g1c",
  "2 girls 1 cup",
  "acrotomophilia",
  "alabama hot pocket",
  "alaskan pipeline",
  "anal",
  "anilingus",
  "anus",
  "apeshit",
  "arsehole",
  "ass",
  "asshole",
  "assmunch",
  "auto erotic",
  "autoerotic",
  "babeland",
  "baby batter",
  "baby juice",
  "ball gag",
  "ball gravy",
  "ball kicking",
  "ball licking",
  "ball sack",
  "ball sucking",
  "bangbros",
  "bareback",
  "barely legal",
  "barenaked",
  "bastard",
  "bastardo",
  "bastinado",
  "bbw",
  "bdsm",
  "beaner",
  "beaners",
  "beaver cleaver",
  "beaver lips",
  "bestiality",
  "big black",
  "big breasts",
  "big knockers",
  "big tits",
  "bimbos",
  "birdlock",
  "bitch",
  "bitches",
  "black cock",
  "blonde action",
  "blonde on blonde action",
  "blowjob",
  "blow job",
  "blow your load",
  "blue waffle",
  "blumpkin",
  "bollocks",
  "bondage",
  "boner",
  "boob",
  "boobs",
  "booty call",
  "brown showers",
  "brunette action",
  "bukkake",
  "bulldyke",
  "bullet vibe",
  "bullshit",
  "bung hole",
  "bunghole",
  "busty",
  "butt",
  "buttcheeks",
  "butthole",
  "camel toe",
  "camgirl",
  "camslut",
  "camwhore",
  "carpet muncher",
  "carpetmuncher",
  "chocolate rosebuds",
  "circlejerk",
  "cleveland steamer",
  "clit",
  "clitoris",
  "clover clamps",
  "clusterfuck",
  "cock",
  "cocks",
  "coprolagnia",
  "coprophilia",
  "cornhole",
  "coon",
  "coons",
  "creampie",
  "cum",
  "cumming",
  "cunnilingus",
  "cunt",
  "darkie",
  "date rape",
  "daterape",
  "deep throat",
  "deepthroat",
  "dendrophilia",
  "dick",
  "dildo",
  "dingleberry",
  "dingleberries",
  "dirty pillows",
  "dirty sanchez",
  "doggie style",
  "doggiestyle",
  "doggy style",
  "doggystyle",
  "dog style",
  "dolcett",
  "domination",
  "dominatrix",
  "dommes",
  "donkey punch",
  "double dong",
  "double penetration",
  "dp action",
  "dry hump",
  "dvda",
  "eat my ass",
  "ecchi",
  "ejaculation",
  "erotic",
  "erotism",
  "escort",
  "eunuch",
  "faggot",
  "fecal",
  "felch",
  "fellatio",
  "feltch",
  "female squirting",
  "femdom",
  "figging",
  "fingerbang",
  "fingering",
  "fisting",
  "foot fetish",
  "footjob",
  "frotting",
  "fuck",
  "fuck buttons",
  "fuckin",
  "fucking",
  "fucktards",
  "fudge packer",
  "fudgepacker",
  "futanari",
  "gang bang",
  "gay sex",
  "genitals",
  "giant cock",
  "girl on",
  "girl on top",
  "girls gone wild",
  "goatcx",
  "goatse",
  "god damn",
  "gokkun",
  "golden shower",
  "goodpoop",
  "goo girl",
  "goregasm",
  "grope",
  "group sex",
  "g-spot",
  "guro",
  "hand job",
  "handjob",
  "hard core",
  "hardcore",
  "hentai",
  "homoerotic",
  "honkey",
  "hooker",
  "hot carl",
  "hot chick",
  "how to kill",
  "how to murder",
  "huge fat",
  "humping",
  "incest",
  "intercourse",
  "jack off",
  "jail bait",
  "jailbait",
  "jelly donut",
  "jerk off",
  "jigaboo",
  "jiggaboo",
  "jiggerboo",
  "jizz",
  "juggs",
  "kike",
  "kinbaku",
  "kinkster",
  "kinky",
  "knobbing",
  "leather restraint",
  "leather straight jacket",
  "lemon party",
  "lolita",
  "lovemaking",
  "make me come",
  "male squirting",
  "masturbate",
  "menage a trois",
  "milf",
  "missionary position",
  "motherfucker",
  "mound of venus",
  "mr hands",
  "muff diver",
  "muffdiving",
  "nambla",
  "nawashi",
  "negro",
  "neonazi",
  "nigga",
  "nigger",
  "nig nog",
  "nimphomania",
  "nipple",
  "nipples",
  "nsfw images",
  "nude",
  "nudity",
  "nympho",
  "nymphomania",
  "octopussy",
  "omorashi",
  "one cup two girls",
  "one guy one jar",
  "orgasm",
  "orgy",
  "paedophile",
  "paki",
  "panties",
  "panty",
  "pedobear",
  "pedophile",
  "pegging",
  "penis",
  "phone sex",
  "piece of shit",
  "pissing",
  "piss pig",
  "pisspig",
  "playboy",
  "pleasure chest",
  "pole smoker",
  "ponyplay",
  "poof",
  "poon",
  "poontang",
  "punany",
  "poop chute",
  "poopchute",
  "porn",
  "porno",
  "pornography",
  "prince albert piercing",
  "pthc",
  "pubes",
  "pussy",
  "queaf",
  "queef",
  "quim",
  "raghead",
  "raging boner",
  "rape",
  "raping",
  "rapist",
  "rectum",
  "reverse cowgirl",
  "rimjob",
  "rimming",
  "rosy palm",
  "rosy palm and her 5 sisters",
  "rusty trombone",
  "sadism",
  "santorum",
  "scat",
  "schlong",
  "scissoring",
  "semen",
  "sex",
  "sexo",
  "sexy",
  "shaved beaver",
  "shaved pussy",
  "shemale",
  "shibari",
  "shit",
  "shitblimp",
  "shitty",
  "shota",
  "shrimping",
  "skeet",
  "slanteye",
  "slut",
  "s&m",
  "smut",
  "snatch",
  "snowballing",
  "sodomize",
  "sodomy",
  "spic",
  "splooge",
  "splooge moose",
  "spooge",
  "spread legs",
  "spunk",
  "strap on",
  "strapon",
  "strappado",
  "strip club",
  "style doggy",
  "suck",
  "sucks",
  "suicide girls",
  "sultry women",
  "swastika",
  "swinger",
  "tainted love",
  "taste my",
  "tea bagging",
  "threesome",
  "throating",
  "tied up",
  "tight white",
  "tit",
  "tits",
  "titties",
  "titty",
  "tongue in a",
  "topless",
  "tosser",
  "towelhead",
  "tranny",
  "tribadism",
  "tub girl",
  "tubgirl",
  "tushy",
  "twat",
  "twink",
  "twinkie",
  "two girls one cup",
  "undressing",
  "upskirt",
  "urethra play",
  "urophilia",
  "vagina",
  "venus mound",
  "vibrator",
  "violet wand",
  "vorarephilia",
  "voyeur",
  "vulva",
  "wank",
  "wetback",
  "wet dream",
  "white power",
  "wrapping men",
  "wrinkled starfish",
  "xx",
  "xxx",
  "yaoi",
  "yellow showers",
  "yiffy",
  "zoophilia",
  "🖕"
]

},{}],114:[function(require,module,exports){
module.exports=[
  "bugren",
  "bugri",
  "bugru",
  "ĉiesulino",
  "ĉiesulo",
  "diofek",
  "diofeka",
  "fek",
  "feken",
  "fekfikanto",
  "feklekulo",
  "fekulo",
  "fik",
  "fikado",
  "fikema",
  "fikfek",
  "fiki",
  "fikiĝi",
  "fikiĝu",
  "fikilo",
  "fikklaŭno",
  "fikota",
  "fiku",
  "forfiki",
  "forfikiĝu",
  "forfiku",
  "forfurzu",
  "forpisi",
  "forpisu",
  "furzulo",
  "kacen",
  "kaco",
  "kacsuĉulo",
  "kojono",
  "piĉen",
  "piĉo",
  "zamenfek"
]

},{}],115:[function(require,module,exports){
module.exports=[
  "Asesinato",
  "asno",
  "bastardo",
  "Bollera",
  "Cabron",
  "Cabrón",
  "Caca",
  "Chupada",
  "Chupapollas",
  "Chupetón",
  "concha",
  "Concha de tu madre",
  "Coño",
  "Coprofagía",
  "Culo",
  "Drogas",
  "Esperma",
  "Fiesta de salchichas",
  "Follador",
  "Follar",
  "Gilipichis",
  "Gilipollas",
  "Hacer una paja",
  "Haciendo el amor",
  "Heroína",
  "Hija de puta",
  "Hijaputa",
  "Hijo de puta",
  "Hijoputa",
  "Idiota",
  "Imbécil",
  "infierno",
  "Jilipollas",
  "Kapullo",
  "Lameculos",
  "Maciza",
  "Macizorra",
  "maldito",
  "Mamada",
  "Marica",
  "Maricón",
  "Mariconazo",
  "martillo",
  "Mierda",
  "Nazi",
  "Orina",
  "Pedo",
  "Pervertido",
  "Pezón",
  "Pinche",
  "Pis",
  "Prostituta",
  "Puta",
  "Racista",
  "Ramera",
  "Sádico",
  "Semen",
  "Sexo",
  "Sexo oral",
  "Soplagaitas",
  "Soplapollas",
  "Tetas grandes",
  "Tía buena",
  "Travesti",
  "Trio",
  "Verga",
  "vete a la mierda",
  "Vulva"
]

},{}],116:[function(require,module,exports){
module.exports=[
  "آب کیر",
  "ارگاسم",
  "برهنه",
  "پورن",
  "پورنو",
  "تجاوز",
  "تخمی",
  "جق",
  "جقی",
  "جلق",
  "جنده",
  "چوچول",
  "حشر",
  "حشری",
  "داف",
  "دودول",
  "ساک زدن",
  "سکس",
  "سکس کردن",
  "سکسی",
  "سوپر",
  "شق کردن",
  "شهوت",
  "شهوتی",
  "شونبول",
  "فیلم سوپر",
  "کس",
  "کس دادن",
  "کس کردن",
  "کسکش",
  "کوس",
  "کون",
  "کون دادن",
  "کون کردن",
  "کونکش",
  "کونی",
  "کیر",
  "کیری",
  "لاپا",
  "لاپایی",
  "لاشی",
  "لخت",
  "لش",
  "منی",
  "هرزه"
]

},{}],117:[function(require,module,exports){
module.exports=[
  "alfred nussi",
  "bylsiä",
  "haahka",
  "haista paska",
  "haista vittu",
  "hatullinen",
  "helvetisti",
  "hevonkuusi",
  "hevonpaska",
  "hevonperse",
  "hevonvittu",
  "hevonvitunperse",
  "hitosti",
  "hitto",
  "huorata",
  "hässiä",
  "juosten kustu",
  "jutku",
  "jutsku",
  "jätkä",
  "kananpaska",
  "koiranpaska",
  "kuin esterin perseestä",
  "kulli",
  "kullinluikaus",
  "kuppainen",
  "kusaista",
  "kuseksia",
  "kusettaa",
  "kusi",
  "kusipää",
  "kusta",
  "kyrpiintynyt",
  "kyrpiintyä",
  "kyrpiä",
  "kyrpä",
  "kyrpänaama",
  "kyrvitys",
  "lahtari",
  "lutka",
  "molo",
  "molopää",
  "mulkero",
  "mulkku",
  "mulkvisti",
  "muna",
  "munapää",
  "munaton",
  "mutakuono",
  "mutiainen",
  "naida",
  "nainti",
  "narttu",
  "neekeri",
  "nekru",
  "nuolla persettä",
  "nussia",
  "nussija",
  "nussinta",
  "paljaalla",
  "palli",
  "pallit",
  "paneskella",
  "panettaa",
  "panna",
  "pano",
  "pantava",
  "paska",
  "paskainen",
  "paskamainen",
  "paskanmarjat",
  "paskantaa",
  "paskapuhe",
  "paskapää",
  "paskattaa",
  "paskiainen",
  "paskoa",
  "pehko",
  "pentele",
  "perkele",
  "perkeleesti",
  "persaukinen",
  "perse",
  "perseennuolija",
  "perseet olalla",
  "persereikä",
  "perseääliö",
  "persläpi",
  "perspano",
  "persvako",
  "pilkunnussija",
  "pillu",
  "pillut",
  "pipari",
  "piru",
  "pistää",
  "pyllyvako",
  "reikä",
  "reva",
  "ripsipiirakka",
  "runkata",
  "runkkari",
  "runkkaus",
  "runkku",
  "ryssä",
  "rättipää",
  "saatanasti",
  "suklaaosasto",
  "tavara",
  "toosa",
  "tuhkaluukku",
  "tumputtaa",
  "turpasauna",
  "tussu",
  "tussukka",
  "tussut",
  "vakipano",
  "vetää käteen",
  "viiksi",
  "vittu",
  "vittuilla",
  "vittuilu",
  "vittumainen",
  "vittuuntua",
  "vittuuntunut",
  "vitun",
  "vitusti",
  "vituttaa",
  "vitutus",
  "äpärä"
]

},{}],118:[function(require,module,exports){
module.exports=[
  "baiser",
  "bander",
  "bigornette",
  "bite",
  "bitte",
  "bloblos",
  "bordel",
  "bosser",
  "bourré",
  "bourrée",
  "brackmard",
  "branlage",
  "branler",
  "branlette",
  "branleur",
  "branleuse",
  "brouter le cresson",
  "caca",
  "cailler",
  "chatte",
  "chiasse",
  "chier",
  "chiottes",
  "clito",
  "clitoris",
  "con",
  "connard",
  "connasse",
  "conne",
  "couilles",
  "cramouille",
  "cul",
  "déconne",
  "déconner",
  "drague",
  "emmerdant",
  "emmerder",
  "emmerdeur",
  "emmerdeuse",
  "enculé",
  "enculée",
  "enculeur",
  "enculeurs",
  "enfoiré",
  "enfoirée",
  "étron",
  "fille de pute",
  "fils de pute",
  "folle",
  "foutre",
  "gerbe",
  "gerber",
  "gouine",
  "grande folle",
  "grogniasse",
  "gueule",
  "jouir",
  "la putain de ta mère",
  "MALPT",
  "ménage à trois",
  "merde",
  "merdeuse",
  "merdeux",
  "meuf",
  "nègre",
  "nique ta mère",
  "nique ta race",
  "palucher",
  "pédale",
  "pédé",
  "péter",
  "pipi",
  "pisser",
  "pouffiasse",
  "pousse-crotte",
  "putain",
  "pute",
  "ramoner",
  "sac à merde",
  "salaud",
  "salope",
  "suce",
  "tapette",
  "teuf",
  "tringler",
  "trique",
  "trou du cul",
  "turlute",
  "veuve",
  "zigounette",
  "zizi"
]

},{}],119:[function(require,module,exports){
module.exports=[
  "aand",
  "aandu",
  "balatkar",
  "beti chod",
  "bhadva",
  "bhadve",
  "bhandve",
  "bhootni ke",
  "bhosad",
  "bhosadi ke",
  "boobe",
  "chakke",
  "chinaal",
  "chinki",
  "chod",
  "chodu",
  "chodu bhagat",
  "chooche",
  "choochi",
  "choot",
  "choot ke baal",
  "chootia",
  "chootiya",
  "chuche",
  "chuchi",
  "chudai khanaa",
  "chudan chudai",
  "chut",
  "chut ke baal",
  "chut ke dhakkan",
  "chut maarli",
  "chutad",
  "chutadd",
  "chutan",
  "chutia",
  "chutiya",
  "gaand",
  "gaandfat",
  "gaandmasti",
  "gaandufad",
  "gandu",
  "gashti",
  "gasti",
  "ghassa",
  "ghasti",
  "harami",
  "haramzade",
  "hawas",
  "hawas ke pujari",
  "hijda",
  "hijra",
  "jhant",
  "jhant chaatu",
  "jhant ke baal",
  "jhantu",
  "kamine",
  "kaminey",
  "kanjar",
  "kutta",
  "kutta kamina",
  "kutte ki aulad",
  "kutte ki jat",
  "kuttiya",
  "loda",
  "lodu",
  "lund",
  "lund choos",
  "lund khajoor",
  "lundtopi",
  "lundure",
  "maa ki chut",
  "maal",
  "madar chod",
  "mooh mein le",
  "mutth",
  "najayaz",
  "najayaz aulaad",
  "najayaz paidaish",
  "paki",
  "pataka",
  "patakha",
  "raand",
  "randi",
  "saala",
  "saala kutta",
  "saali kutti",
  "saali randi",
  "suar",
  "suar ki aulad",
  "tatte",
  "tatti",
  "teri maa ka bhosada",
  "teri maa ka boba chusu",
  "teri maa ki chut",
  "tharak",
  "tharki"
]

},{}],120:[function(require,module,exports){
module.exports=[
  "allupato",
  "ammucchiata",
  "anale",
  "arrapato",
  "arrusa",
  "arruso",
  "assatanato",
  "bagascia",
  "bagassa",
  "bagnarsi",
  "baldracca",
  "balle",
  "battere",
  "battona",
  "belino",
  "biga",
  "bocchinara",
  "bocchino",
  "bofilo",
  "boiata",
  "bordello",
  "brinca",
  "bucaiolo",
  "budiùlo",
  "buona donna",
  "busone",
  "cacca",
  "caccati in mano e prenditi a schiaffi",
  "caciocappella",
  "cadavere",
  "cagare",
  "cagata",
  "cagna",
  "cammello",
  "cappella",
  "carciofo",
  "carità",
  "casci",
  "cazzata",
  "cazzimma",
  "cazzo",
  "checca",
  "chiappa",
  "chiavare",
  "chiavata",
  "ciospo",
  "ciucciami il cazzo",
  "coglione",
  "coglioni",
  "cornuto",
  "cozza",
  "culattina",
  "culattone",
  "culo",
  "di merda",
  "ditalino",
  "duro",
  "fare unaŠ",
  "fava",
  "femminuccia",
  "fica",
  "figa",
  "figlio di buona donna",
  "figlio di puttana",
  "figone",
  "finocchio",
  "fottere",
  "fottersi",
  "fracicone",
  "fregna",
  "frocio",
  "froscio",
  "fuori come un balcone",
  "goldone",
  "grilletto",
  "guanto",
  "guardone",
  "incazzarsi",
  "incoglionirsi",
  "ingoio",
  "l'arte bolognese",
  "leccaculo",
  "lecchino",
  "lofare",
  "loffa",
  "loffare",
  "lumaca",
  "manico",
  "mannaggia",
  "merda",
  "merdata",
  "merdoso",
  "mignotta",
  "minchia",
  "minchione",
  "mona",
  "monta",
  "montare",
  "mussa",
  "nave scuola",
  "nerchia",
  "nudo",
  "padulo",
  "palle",
  "palloso",
  "patacca",
  "patonza",
  "pecorina",
  "pesce",
  "picio",
  "pincare",
  "pipa",
  "pipì",
  "pippone",
  "pirla",
  "pisciare",
  "piscio",
  "pisello",
  "pistola",
  "pistolotto",
  "pomiciare",
  "pompa",
  "pompino",
  "porca",
  "porca madonna",
  "porca miseria",
  "porca puttana",
  "porco due",
  "porco zio",
  "potta",
  "puppami",
  "puttana",
  "quaglia",
  "recchione",
  "regina",
  "rincoglionire",
  "rizzarsi",
  "rompiballe",
  "ruffiano",
  "sbattere",
  "sbattersi",
  "sborra",
  "sborrata",
  "sborrone",
  "sbrodolata",
  "scopare",
  "scopata",
  "scorreggiare",
  "sega",
  "slinguare",
  "slinguata",
  "smandrappata",
  "soccia",
  "socmel",
  "sorca",
  "spagnola",
  "spompinare",
  "sticchio",
  "stronza",
  "stronzata",
  "stronzo",
  "succhiami",
  "sveltina",
  "sverginare",
  "tarzanello",
  "terrone",
  "testa di cazzo",
  "tette",
  "tirare",
  "topa",
  "troia",
  "trombare",
  "uccello",
  "vacca",
  "vaffanculo",
  "vangare",
  "venire",
  "zinne",
  "zio cantante",
  "zoccola"
]

},{}],121:[function(require,module,exports){
module.exports=[
  "3p",
  "g スポット",
  "s ＆ m",
  "sm",
  "sm女王",
  "xx",
  "アジアのかわいい女の子",
  "アスホール",
  "アナリングス",
  "アナル",
  "いたずら",
  "イラマチオ",
  "ウェブカメラ",
  "エクスタシー",
  "エスコート",
  "エッチ",
  "エロティズム",
  "エロティック",
  "オーガズム",
  "オカマ",
  "おしっこ",
  "おしり",
  "オシリ",
  "おしりのあな",
  "おっぱい",
  "オッパイ",
  "オナニー",
  "オマンコ",
  "おもらし",
  "お尻",
  "カーマスートラ",
  "カント",
  "クリトリス",
  "グループ・セックス",
  "グロ",
  "クンニリングス",
  "ゲイ・セックス",
  "ゲイの男性",
  "ゲイボーイ",
  "ゴールデンシャワー",
  "コカイン",
  "ゴックン",
  "サディズム",
  "しばり",
  "スウィンガー",
  "スカートの中",
  "スカトロ",
  "ストラップオン",
  "ストリップ劇場",
  "スラット",
  "スリット",
  "セクシーな",
  "セクシーな 10 代",
  "セックス",
  "ソドミー",
  "ちんこ",
  "ディープ・スロート",
  "ディック",
  "ディルド",
  "デートレイプ",
  "デブ",
  "テレフォンセックス",
  "ドッグスタイル",
  "トップレス",
  "なめ",
  "ニガー",
  "ヌード",
  "ネオ・ナチ",
  "ハードコア",
  "パイパン",
  "バイブレーター",
  "バック・スタイル",
  "パンティー",
  "ビッチ",
  "ファック",
  "ファンタジー",
  "フィスト",
  "フェティッシュ",
  "フェラチオ",
  "ふたなり",
  "ぶっかけ",
  "フック",
  "プリンス アルバート ピアス",
  "プレイボーイ",
  "ベアバック",
  "ペニス",
  "ペニスバンド",
  "ボーイズラブ",
  "ボールギャグ",
  "ボールを蹴る",
  "ぽっちゃり",
  "ホモ",
  "ポルノ",
  "ポルノグラフィー",
  "ボンテージ",
  "マザー・ファッカー",
  "マスターベーション",
  "まんこ",
  "やおい",
  "やりまん",
  "ユダヤ人",
  "ラティーナ",
  "ラバー",
  "ランジェリー",
  "レイプ",
  "レズビアン",
  "ローター",
  "ロリータ",
  "淫乱",
  "陰毛",
  "革抑制",
  "騎上位",
  "巨根",
  "巨乳",
  "強姦犯",
  "玉なめ",
  "玉舐め",
  "緊縛",
  "近親相姦",
  "嫌い",
  "後背位",
  "合意の性交",
  "拷問",
  "殺し方",
  "殺人事件",
  "殺人方法",
  "支配",
  "児童性虐待",
  "自己愛性",
  "射精",
  "手コキ",
  "獣姦",
  "女の子",
  "女王様",
  "女子高生",
  "女装",
  "新しいポルノ",
  "人妻",
  "人種",
  "性交",
  "正常位",
  "生殖器",
  "精液",
  "挿入",
  "足フェチ",
  "足を広げる",
  "大陰唇",
  "脱衣",
  "茶色のシャワー",
  "中出し",
  "潮吹き女",
  "潮吹き男性",
  "直腸",
  "剃毛",
  "貞操帯",
  "奴隷",
  "二穴",
  "乳首",
  "尿道プレイ",
  "覗き",
  "売春婦",
  "縛り",
  "噴出",
  "糞",
  "糞尿愛好症",
  "糞便",
  "平手打ち",
  "変態",
  "勃起する",
  "夢精",
  "毛深い",
  "誘惑",
  "幼児",
  "幼児性愛者",
  "裸",
  "裸の女性",
  "乱交",
  "両性",
  "両性具有",
  "両刀",
  "輪姦",
  "卍",
  "宦官",
  "肛門",
  "膣"
]

},{}],122:[function(require,module,exports){
module.exports=[
  "강간",
  "개새끼",
  "개자식",
  "개좆",
  "개차반",
  "거유",
  "계집년",
  "고자",
  "근친",
  "노모",
  "니기미",
  "뒤질래",
  "딸딸이",
  "때씹",
  "또라이",
  "뙤놈",
  "로리타",
  "망가",
  "몰카",
  "미친",
  "미친새끼",
  "바바리맨",
  "변태",
  "병신",
  "보지",
  "불알",
  "빠구리",
  "사까시",
  "섹스",
  "스와핑",
  "쌍놈",
  "씨발",
  "씨발놈",
  "씨팔",
  "씹",
  "씹물",
  "씹빨",
  "씹새끼",
  "씹알",
  "씹창",
  "씹팔",
  "암캐",
  "애자",
  "야동",
  "야사",
  "야애니",
  "엄창",
  "에로",
  "염병",
  "옘병",
  "유모",
  "육갑",
  "은꼴",
  "자위",
  "자지",
  "잡년",
  "종간나",
  "좆",
  "좆만",
  "죽일년",
  "쥐좆",
  "직촬",
  "짱깨",
  "쪽바리",
  "창녀",
  "포르노",
  "하드코어",
  "호로",
  "화냥년",
  "후레아들",
  "후장",
  "희쭈그리"
]

},{}],123:[function(require,module,exports){
module.exports=[
  "aardappels afgieteng",
  "achter het raam zitten",
  "afberen",
  "aflebberen",
  "afrossen",
  "afrukken",
  "aftrekken",
  "afwerkplaats",
  "afzeiken",
  "afzuigen",
  "anderhalve man en een paardekop",
  "anita",
  "asbak",
  "aso",
  "bagger schijten",
  "balen",
  "bedonderen",
  "befborstelg",
  "beffen",
  "bekken",
  "belazeren",
  "besodemieterd zijn",
  "besodemieteren",
  "beurt",
  "boemelen",
  "boerelul",
  "boerenpummelg",
  "bokkelul",
  "botergeil",
  "broekhoesten",
  "brugpieperg",
  "buffelen",
  "buiten de pot piesen",
  "da's kloten van de bok",
  "de ballen",
  "de hoer spelen",
  "de hond uitlaten",
  "de koffer induiken",
  "delg",
  "de pijp aan maarten geven",
  "de pijp uitgaan",
  "dombo",
  "draaikontg",
  "driehoog achter wonen",
  "drolg",
  "drooggeiler",
  "droogkloot",
  "een beurt geven",
  "een nummertje maken",
  "een wip maken",
  "eikel",
  "engerd",
  "flamoes",
  "flikken",
  "flikker",
  "gadverdamme",
  "galbak",
  "gat",
  "gedoogzone",
  "geilneef",
  "gesodemieter",
  "godverdomme",
  "graftak",
  "gras maaien",
  "gratenkutg",
  "greppeldel",
  "griet",
  "hoempert",
  "hoer",
  "hoerenbuurt",
  "hoerenloper",
  "hoerig",
  "hol",
  "hufter",
  "huisdealer",
  "johny",
  "kanen",
  "kettingzeugg",
  "klaarkomen",
  "klerebeer",
  "klojo",
  "klooien",
  "klootjesvolk",
  "klootoog",
  "klootzak",
  "kloten",
  "knor",
  "kontg",
  "kontneuken",
  "krentekakker",
  "kut",
  "kuttelikkertje",
  "kwakkieg",
  "liefdesgrot",
  "lul",
  "lul-de-behanger",
  "lulhannes",
  "lummel",
  "mafketel",
  "matennaaierg",
  "matje",
  "mof",
  "mutsg",
  "naaien",
  "naakt",
  "neuken",
  "neukstier",
  "nicht",
  "oetlul",
  "opgeilen",
  "opkankeren",
  "oprotten",
  "opsodemieteren",
  "op z'n hondjes",
  "op z'n sodemieter geven",
  "opzouten",
  "ouwehoer",
  "ouwehoeren",
  "ouwe rukker",
  "paal",
  "paardelul",
  "palen",
  "penozeg",
  "piesen",
  "pijpbekkieg",
  "pijpen",
  "pik",
  "pleurislaaier",
  "poep",
  "poepen",
  "poot",
  "portiekslet",
  "pot",
  "potverdorie",
  "publiciteitsgeil",
  "raaskallen",
  "reet",
  "reetridder",
  "reet trappen, voor zijn",
  "remsporeng",
  "reutelen",
  "rothoer",
  "rotzak",
  "rukhond",
  "rukken",
  "schatje",
  "schijt",
  "schijten",
  "schoft",
  "schuinsmarcheerder",
  "shit",
  "slempen",
  "sletg",
  "sletterig",
  "slik mijn zaad",
  "snolg",
  "spuiten",
  "standje",
  "standje-69g",
  "stoephoer",
  "stootje",
  "strontg",
  "sufferdg",
  "tapijtnek",
  "teefg",
  "temeier",
  "teringlijer",
  "toeter",
  "tongzoeng",
  "triootjeg",
  "trottoir prostituée",
  "trottoirteef",
  "vergallen",
  "verkloten",
  "verneuken",
  "viespeuk",
  "vingeren",
  "vleesroos",
  "voor jan lul",
  "voor jan-met-de-korte-achternaam",
  "watje",
  "welzijnsmafia",
  "wijf",
  "wippen",
  "wuftje",
  "zaadje",
  "zakkenwasser",
  "zeiken",
  "zeiker",
  "zuigen",
  "zuiplap"
]

},{}],124:[function(require,module,exports){
module.exports=[
  "drittsekk",
  "faen i helvete",
  "fitte",
  "jævla",
  "kuk",
  "kukene",
  "kuker",
  "nigger",
  "pikk",
  "sotrør",
  "ståpikk",
  "ståpikkene",
  "ståpikker"
]

},{}],125:[function(require,module,exports){
module.exports=[
  "burdel",
  "burdelmama",
  "chuj",
  "chujnia",
  "ciota",
  "cipa",
  "cyc",
  "debil",
  "dmuchać",
  "do kurwy nędzy",
  "dupa",
  "dupek",
  "duperele",
  "dziwka",
  "fiut",
  "gówno",
  "gówno prawda",
  "huj",
  "jajco",
  "jajeczko",
  "jajko",
  "jajo",
  "ja pierdolę",
  "jebać",
  "jebany",
  "kurwa",
  "kurwy",
  "kutafon",
  "kutas",
  "lizać pałę",
  "obciągać chuja",
  "obciągać fiuta",
  "obciągać loda",
  "pieprzyć",
  "pierdolec",
  "pierdolić",
  "pierdolnięty",
  "pierdoła",
  "pierdzieć",
  "pizda",
  "pojeb",
  "popierdolony",
  "robic loda",
  "robić loda",
  "ruchać",
  "rzygać",
  "skurwysyn",
  "sraczka",
  "srać",
  "suka",
  "syf",
  "wkurwiać",
  "zajebisty"
]

},{}],126:[function(require,module,exports){
module.exports=[
  "aborto",
  "amador",
  "ânus",
  "aranha",
  "ariano",
  "balalao",
  "bastardo",
  "bicha",
  "biscate",
  "bissexual",
  "boceta",
  "boob",
  "bosta",
  "braulio de borracha",
  "bumbum",
  "burro",
  "cabrao",
  "cacete",
  "cagar",
  "camisinha",
  "caralho",
  "cerveja",
  "chochota",
  "chupar",
  "clitoris",
  "cocaína",
  "colhoes",
  "comer",
  "cona",
  "consolo",
  "corno",
  "cu",
  "dar o rabo",
  "dum raio",
  "esporra",
  "fecal",
  "filho da puta",
  "foda",
  "foda-se",
  "foder",
  "frango assado",
  "gozar",
  "grelho",
  "heroína",
  "heterosexual",
  "homem gay",
  "homoerótico",
  "homosexual",
  "inferno",
  "lésbica",
  "lolita",
  "mama",
  "merda",
  "paneleiro",
  "passar um cheque",
  "pau",
  "peidar",
  "pênis",
  "pinto",
  "porra",
  "puta",
  "puta que pariu",
  "puta que te pariu",
  "queca",
  "sacanagem",
  "saco",
  "torneira",
  "transar",
  "vai-te foder",
  "vai tomar no cu",
  "veado",
  "vibrador",
  "xana",
  "xochota"
]

},{}],127:[function(require,module,exports){
module.exports=[
  "bychara",
  "byk",
  "chernozhopyi",
  "dolboy'eb",
  "ebalnik",
  "ebalo",
  "ebalom sch'elkat",
  "gol",
  "mudack",
  "opizdenet",
  "osto'eblo",
  "ostokhuitel'no",
  "ot'ebis",
  "otmudohat",
  "otpizdit",
  "otsosi",
  "padlo",
  "pedik",
  "perdet",
  "petuh",
  "pidar gnoinyj",
  "pizda",
  "pizdato",
  "pizdatyi",
  "piz'det",
  "pizdetc",
  "pizdoi nakryt'sja",
  "pizd'uk",
  "piz`dyulina",
  "podi ku'evo",
  "poeben",
  "po'imat' na konchik",
  "po'iti posrat",
  "po khuy",
  "poluchit pizdy",
  "pososi moyu konfetku",
  "prissat",
  "proebat",
  "promudobl'adsksya pizdopro'ebina",
  "propezdoloch",
  "prosrat",
  "raspeezdeyi",
  "raspizdatyi",
  "raz'yebuy",
  "raz'yoba",
  "s'ebat'sya",
  "shalava",
  "styervo",
  "sukin syn",
  "svodit posrat",
  "svoloch",
  "trakhat'sya",
  "trimandoblydskiy pizdoproyob",
  "ubl'yudok",
  "uboy",
  "u'ebitsche",
  "vafl'a",
  "vafli lovit",
  "v pizdu",
  "vyperdysh",
  "vzdrochennyi",
  "yeb vas",
  "za'ebat",
  "zaebis",
  "zalupa",
  "zalupat",
  "zasranetc",
  "zassat",
  "zlo'ebuchy",
  "бардак",
  "бздёнок",
  "блядки",
  "блядовать",
  "блядство",
  "блядь",
  "бугор",
  "во пизду",
  "встать раком",
  "выёбываться",
  "гандон",
  "говно",
  "говнюк",
  "голый",
  "дать пизды",
  "дерьмо",
  "дрочить",
  "другой дразнится",
  "ёбарь",
  "ебать",
  "ебать-копать",
  "ебло",
  "ебнуть",
  "ёб твою мать",
  "жопа",
  "жополиз",
  "играть на кожаной флейте",
  "измудохать",
  "каждый дрочит как он хочет",
  "какая разница",
  "как два пальца обоссать",
  "курите мою трубку",
  "лысого в кулаке гонять",
  "малофя",
  "манда",
  "мандавошка",
  "мент",
  "муда",
  "мудило",
  "мудозмон",
  "наебать",
  "наебениться",
  "наебнуться",
  "на фиг",
  "на хуй",
  "на хую вертеть",
  "на хуя",
  "нахуячиться",
  "невебенный",
  "не ебет",
  "ни за хуй собачу",
  "ни хуя",
  "обнаженный",
  "обоссаться можно",
  "один ебётся",
  "опесдол",
  "офигеть",
  "охуеть",
  "охуйтельно",
  "половое сношение",
  "секс",
  "сиски",
  "спиздить",
  "срать",
  "ссать",
  "траxать",
  "ты мне ваньку не валяй",
  "фига",
  "хапать",
  "хер с ней",
  "хер с ним",
  "хохол",
  "хрен",
  "хуёво",
  "хуёвый",
  "хуем груши околачивать",
  "хуеплет",
  "хуило",
  "хуиней страдать",
  "хуиня",
  "хуй",
  "хуйнуть",
  "хуй пинать"
]

},{}],128:[function(require,module,exports){
module.exports=[
  "arsle",
  "brutta",
  "discofitta",
  "dra åt helvete",
  "fan",
  "fitta",
  "fittig",
  "för helvete",
  "helvete",
  "hård",
  "jävlar",
  "knulla",
  "kuk",
  "kuksås",
  "kötthuvud",
  "köttnacke",
  "moona",
  "moonade",
  "moonar",
  "moonat",
  "mutta",
  "nigger",
  "neger",
  "olla",
  "pippa",
  "pitt",
  "prutt",
  "pök",
  "runka",
  "röv",
  "rövhål",
  "rövknulla",
  "satan",
  "skita",
  "skit ner dig",
  "skäggbiff",
  "snedfitta",
  "snefitta",
  "stake",
  "subba",
  "sås",
  "sätta på",
  "tusan"
]

},{}],129:[function(require,module,exports){
module.exports=[
  "กระดอ",
  "กระเด้า",
  "กระหรี่",
  "กะปิ",
  "กู",
  "ขี้",
  "ควย",
  "จิ๋ม",
  "จู๋",
  "เจ๊ก",
  "เจี๊ยว",
  "ดอกทอง",
  "ตอแหล",
  "ตูด",
  "น้ําแตก",
  "มึง",
  "แม่ง",
  "เย็ด",
  "รูตูด",
  "ล้างตู้เย็น",
  "ส้นตีน",
  "สัด",
  "เสือก",
  "หญิงชาติชั่ว",
  "หลั่ง",
  "ห่า",
  "หํา",
  "หี",
  "เหี้ย",
  "อมนกเขา",
  "ไอ้ควาย"
]

},{}],130:[function(require,module,exports){
module.exports=[
  "ghuy'cha'",
  "QI'yaH",
  "Qu'vatlh"
]

},{}],131:[function(require,module,exports){
module.exports=[
  "am",
  "amcığa",
  "amcığı",
  "amcığın",
  "amcık",
  "amcıklar",
  "amcıklara",
  "amcıklarda",
  "amcıklardan",
  "amcıkları",
  "amcıkların",
  "amcıkta",
  "amcıktan",
  "amı",
  "amlar",
  "çingene",
  "Çingenede",
  "Çingeneden",
  "Çingeneler",
  "Çingenelerde",
  "Çingenelerden",
  "Çingenelere",
  "Çingeneleri",
  "Çingenelerin",
  "Çingenenin",
  "Çingeneye",
  "Çingeneyi",
  "göt",
  "göte",
  "götler",
  "götlerde",
  "götlerden",
  "götlere",
  "götleri",
  "götlerin",
  "götte",
  "götten",
  "götü",
  "götün",
  "götveren",
  "götverende",
  "götverenden",
  "götverene",
  "götvereni",
  "götverenin",
  "götverenler",
  "götverenlerde",
  "götverenlerden",
  "götverenlere",
  "götverenleri",
  "götverenlerin",
  "kaltağa",
  "kaltağı",
  "kaltağın",
  "kaltak",
  "kaltaklar",
  "kaltaklara",
  "kaltaklarda",
  "kaltaklardan",
  "kaltakları",
  "kaltakların",
  "kaltakta",
  "kaltaktan",
  "orospu",
  "orospuda",
  "orospudan",
  "orospular",
  "orospulara",
  "orospularda",
  "orospulardan",
  "orospuları",
  "orospuların",
  "orospunun",
  "orospuya",
  "orospuyu",
  "otuz birci",
  "otuz bircide",
  "otuz birciden",
  "otuz birciler",
  "otuz bircilerde",
  "otuz bircilerden",
  "otuz bircilere",
  "otuz bircileri",
  "otuz bircilerin",
  "otuz bircinin",
  "otuz birciye",
  "otuz birciyi",
  "saksocu",
  "saksocuda",
  "saksocudan",
  "saksocular",
  "saksoculara",
  "saksocularda",
  "saksoculardan",
  "saksocuları",
  "saksocuların",
  "saksocunun",
  "saksocuya",
  "saksocuyu",
  "sıçmak",
  "sik",
  "sike",
  "siker sikmez",
  "siki",
  "sikilir sikilmez",
  "sikin",
  "sikler",
  "siklerde",
  "siklerden",
  "siklere",
  "sikleri",
  "siklerin",
  "sikmek",
  "sikmemek",
  "sikte",
  "sikten",
  "siktir",
  "siktirir siktirmez",
  "taşağa",
  "taşağı",
  "taşağın",
  "taşak",
  "taşaklar",
  "taşaklara",
  "taşaklarda",
  "taşaklardan",
  "taşakları",
  "taşakların",
  "taşakta",
  "taşaktan",
  "yarağa",
  "yarağı",
  "yarağın",
  "yarak",
  "yaraklar",
  "yaraklara",
  "yaraklarda",
  "yaraklardan",
  "yarakları",
  "yarakların",
  "yarakta",
  "yaraktan"
]

},{}],132:[function(require,module,exports){
module.exports=[
  "13.",
  "13点",
  "三级片",
  "下三烂",
  "下贱",
  "个老子的",
  "九游",
  "乳",
  "乳交",
  "乳头",
  "乳房",
  "乳波臀浪",
  "交配",
  "仆街",
  "他奶奶",
  "他奶奶的",
  "他奶娘的",
  "他妈",
  "他妈ㄉ王八蛋",
  "他妈地",
  "他妈的",
  "他娘",
  "他马的",
  "你个傻比",
  "你他马的",
  "你全家",
  "你奶奶的",
  "你她马的",
  "你妈",
  "你妈的",
  "你娘",
  "你娘卡好",
  "你娘咧",
  "你它妈的",
  "你它马的",
  "你是鸡",
  "你是鸭",
  "你马的",
  "做爱",
  "傻比",
  "傻逼",
  "册那",
  "军妓",
  "几八",
  "几叭",
  "几巴",
  "几芭",
  "刚度",
  "刚瘪三",
  "包皮",
  "十三点",
  "卖B",
  "卖比",
  "卖淫",
  "卵",
  "卵子",
  "双峰微颤",
  "口交",
  "口肯",
  "叫床",
  "吃屎",
  "后庭",
  "吹箫",
  "塞你公",
  "塞你娘",
  "塞你母",
  "塞你爸",
  "塞你老师",
  "塞你老母",
  "处女",
  "外阴",
  "大卵子",
  "大卵泡",
  "大鸡巴",
  "奶",
  "奶奶的熊",
  "奶子",
  "奸",
  "奸你",
  "她妈地",
  "她妈的",
  "她马的",
  "妈B",
  "妈个B",
  "妈个比",
  "妈个老比",
  "妈妈的",
  "妈比",
  "妈的",
  "妈的B",
  "妈逼",
  "妓",
  "妓女",
  "妓院",
  "妳她妈的",
  "妳妈的",
  "妳娘的",
  "妳老母的",
  "妳马的",
  "姘头",
  "姣西",
  "姦",
  "娘个比",
  "娘的",
  "婊子",
  "婊子养的",
  "嫖娼",
  "嫖客",
  "它妈地",
  "它妈的",
  "密洞",
  "射你",
  "射精",
  "小乳头",
  "小卵子",
  "小卵泡",
  "小瘪三",
  "小肉粒",
  "小骚比",
  "小骚货",
  "小鸡巴",
  "小鸡鸡",
  "屁眼",
  "屁股",
  "屄",
  "屌",
  "巨乳",
  "干x娘",
  "干七八",
  "干你",
  "干你妈",
  "干你娘",
  "干你老母",
  "干你良",
  "干妳妈",
  "干妳娘",
  "干妳老母",
  "干妳马",
  "干您娘",
  "干机掰",
  "干死CS",
  "干死GM",
  "干死你",
  "干死客服",
  "幹",
  "强奸",
  "强奸你",
  "性",
  "性交",
  "性器",
  "性无能",
  "性爱",
  "情色",
  "想上你",
  "懆您妈",
  "懆您娘",
  "懒8",
  "懒八",
  "懒叫",
  "懒教",
  "成人",
  "我操你祖宗十八代",
  "扒光",
  "打炮",
  "打飞机",
  "抽插",
  "招妓",
  "插你",
  "插死你",
  "撒尿",
  "操你",
  "操你全家",
  "操你奶奶",
  "操你妈",
  "操你娘",
  "操你祖宗",
  "操你老妈",
  "操你老母",
  "操妳",
  "操妳全家",
  "操妳妈",
  "操妳娘",
  "操妳祖宗",
  "操机掰",
  "操比",
  "操逼",
  "放荡",
  "日他娘",
  "日你",
  "日你妈",
  "日你老娘",
  "日你老母",
  "日批",
  "月经",
  "机八",
  "机巴",
  "机机歪歪",
  "杂种",
  "浪叫",
  "淫",
  "淫乱",
  "淫妇",
  "淫棍",
  "淫水",
  "淫秽",
  "淫荡",
  "淫西",
  "湿透的内裤",
  "激情",
  "灨你娘",
  "烂货",
  "烂逼",
  "爛",
  "狗屁",
  "狗日",
  "狗狼养的",
  "玉杵",
  "王八蛋",
  "瓜娃子",
  "瓜婆娘",
  "瓜批",
  "瘪三",
  "白烂",
  "白痴",
  "白癡",
  "祖宗",
  "私服",
  "笨蛋",
  "精子",
  "老二",
  "老味",
  "老母",
  "老瘪三",
  "老骚比",
  "老骚货",
  "肉壁",
  "肉棍子",
  "肉棒",
  "肉缝",
  "肏",
  "肛交",
  "肥西",
  "色情",
  "花柳",
  "荡妇",
  "賤",
  "贝肉",
  "贱B",
  "贱人",
  "贱货",
  "贼你妈",
  "赛你老母",
  "赛妳阿母",
  "赣您娘",
  "轮奸",
  "迷药",
  "逼",
  "逼样",
  "野鸡",
  "阳具",
  "阳萎",
  "阴唇",
  "阴户",
  "阴核",
  "阴毛",
  "阴茎",
  "阴道",
  "阴部",
  "雞巴",
  "靠北",
  "靠母",
  "靠爸",
  "靠背",
  "靠腰",
  "驶你公",
  "驶你娘",
  "驶你母",
  "驶你爸",
  "驶你老师",
  "驶你老母",
  "骚比",
  "骚货",
  "骚逼",
  "鬼公",
  "鸡8",
  "鸡八",
  "鸡叭",
  "鸡吧",
  "鸡奸",
  "鸡巴",
  "鸡芭",
  "鸡鸡",
  "龟儿子",
  "龟头"
]

},{}]},{},[1]);
