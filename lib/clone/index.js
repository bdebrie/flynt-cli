'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cmds = undefined;
exports.run = run;

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _cloneDb = require('./cloneDb');

var cloneDb = _interopRequireWildcard(_cloneDb);

var _cloneUploads = require('./cloneUploads');

var cloneUploads = _interopRequireWildcard(_cloneUploads);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var cmdsObject = {
  cloneDb: cloneDb,
  cloneUploads: cloneUploads
};

var cmds = exports.cmds = Object.keys(cmdsObject);

function run(step, config) {
  var steps = !step ? cmds : [].concat(step);
  steps = steps.filter(function (step) {
    return !!cmdsObject[step];
  });
  var requirements = steps.map(function (step) {
    return cmdsObject[step].requirements;
  });
  requirements = _lodash2.default.union.apply(_lodash2.default, _toConsumableArray(requirements));
  var prompts = steps.map(function (step) {
    return cmdsObject[step].prompts;
  });
  prompts = _lodash2.default.union.apply(_lodash2.default, _toConsumableArray(prompts)).filter(function (prompt) {
    return !_lodash2.default.has(config, prompt.name);
  });
  var runs = steps.map(function (step) {
    return cmdsObject[step].run;
  });

  return _bluebird2.default.all(requirements.map(function (fn) {
    return fn();
  })).then(function () {
    return _inquirer2.default.prompt(prompts);
  }).then(function (answers) {
    config = _lodash2.default.merge({}, config, answers);
    var allRuns = _bluebird2.default.resolve();
    runs.forEach(function (fn) {
      allRuns = allRuns.then(function () {
        return fn(config);
      });
    });
    return allRuns;
  }, function (err) {
    console.log(err);
  }).then(function () {
    return config;
  });
}