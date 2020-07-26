let globalObj = require("get-global");

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
const curry = require("lodash/curry");
const format = curry(require("nanoid-good/format"));
const generate = curry(require("nanoid-good/generate"));
const nonsecure = curry(require("nanoid-good/non-secure"));

/**
 * nanoidr
 * @alias global.nanoidr
 * @global
 * @namespace
 */
const nanoidr = {
  methods: {
    cformat(locales) {
      return format(locales);
    },
    cgenerate(locales) {
      return generate(locales);
    },
    cnonsecure(locales) {
      return nonsecure(locales);
    }
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

(function(global) {
  globalObj.nanoidr = nanoidr;
  Object.assign(global, globalObj);
})(global);
