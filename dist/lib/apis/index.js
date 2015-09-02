'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports._restructGameResultRowsForRanking = _restructGameResultRowsForRanking;
exports._formatRankingDataToText = _formatRankingDataToText;
exports.requestRanking = requestRanking;
exports.requestAddingGameResult = requestAddingGameResult;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _underscoreString = require('underscore.string');

var _underscoreString2 = _interopRequireDefault(_underscoreString);

var _conf = require('conf');

var _conf2 = _interopRequireDefault(_conf);

var _libStages = require('lib/stages');

function _restructGameResultRowsForRanking(gameResultRows) {
  var rankingData = {};

  gameResultRows.forEach(function (row) {
    var created_at = row.created_at;
    var stage = row.stage;
    var name = row.name;
    var score = row.score;

    if (!rankingData[stage]) {
      rankingData[stage] = [];
    }
    rankingData[stage].push(row);
  });

  var nowTime = new Date().getTime();
  Object.keys(rankingData).forEach(function (stageTypeId) {
    var rows = rankingData[stageTypeId].sort(function (a, b) {
      var compared = b.score - a.score;
      if (compared !== 0) {
        return compared;
      };
      return a.created_at - b.created_at;
    });
    rankingData[stageTypeId] = {
      last30Days: rows.filter(function (v) {
        return v.created_at >= nowTime - 86400000 * 30;
      }).slice(0, 10),
      last7Days: rows.filter(function (v) {
        return v.created_at >= nowTime - 86400000 * 7;
      }).slice(0, 10),
      last1Day: rows.filter(function (v) {
        return v.created_at >= nowTime - 86400000;
      }).slice(0, 10),
      // Don't use "all" in production, because game-results are already filtered by last 30 days in server
      // It is for testing
      all: rows
    };
  });

  return rankingData;
}

function _formatRankingDataToText(rankingData) {
  var lines = [];
  _libStages.stageList.slice().forEach(function (Stage) {

    // title
    var title = _chalk2['default'].magenta(Stage.getName());
    ['last30Days', 'last7Days', 'last1Day'].forEach(function (timeWindowKey) {

      // sub title
      var subTitle = ({
        last30Days: 'Last 30 days',
        last7Days: 'Last 7 days',
        last1Day: 'Last day'
      })[timeWindowKey];
      subTitle = _chalk2['default'].yellow(subTitle);
      lines.push(title + ' - ' + subTitle);
      lines.push('');

      if (!(Stage.typeId in rankingData)) {
        return;
      }

      // rows
      var rows = rankingData[Stage.typeId][timeWindowKey];
      if (rows) {
        rows.forEach(function (_ref, idx) {
          var name = _ref.name;
          var score = _ref.score;

          var line = [_underscoreString2['default'].lpad(idx + 1, 2, '') + '.', _underscoreString2['default'].rpad(name, 16, ' '), _chalk2['default'].underline(_underscoreString2['default'].numberFormat(score)) + ' pts'].join(' ');
          lines.push('  ' + line);
        });
        lines.push('');
      }
    });
  });
  return lines.join('\n');
}

function requestRanking(callback) {
  var params = {
    api_mode: 'get_ranking'
  };
  var url = _conf2['default'].apiUrl + '?' + _querystring2['default'].stringify(params);
  (0, _request2['default'])(url, function onRequested(err, response, body) {
    if (err) {
      return callback(err);
    } else if (response.statusCode !== 200) {
      return callback(new Error('Returned HTTP status ' + response.statusCode + ' from AWS API Gateway'));
    }
    var gameResultRows = JSON.parse(body.toString());
    var rankingData = _restructGameResultRowsForRanking(gameResultRows);
    var text = _formatRankingDataToText(rankingData);
    callback(null, text);
  });
}

function requestAddingGameResult(_ref2) {
  var stageTypeId = _ref2.stageTypeId;
  var playerName = _ref2.playerName;
  var score = _ref2.score;
  var callback = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];

  var url = _conf2['default'].apiUrl + '?' + _querystring2['default'].stringify({
    api_mode: 'add_game_result',
    stage: stageTypeId,
    name: playerName,
    score: score
  });
  (0, _request2['default'])(url, function onRequested(err, response, body) {
    if (err) {
      return callback(err);
    } else if (response.statusCode !== 200) {
      return callback(new Error('Returned HTTP status ' + response.statusCode + ' from AWS API Gateway'));
    }
    callback();
  });
}