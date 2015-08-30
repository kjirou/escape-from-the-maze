import chalk from 'chalk';
import querystring from 'querystring';
import request from 'request';
import _s from 'underscore.string';

import conf from 'conf';
import {stageList, stages} from 'lib/stages';


export function _restructGameResultRowsForRanking(gameResultRows) {
  let rankingData = {};

  gameResultRows.forEach((row) => {
    let { created_at, stage, name, score } = row;
    if (!rankingData[stage]) {
      rankingData[stage] = [];
    }
    rankingData[stage].push(row);
  });

  let nowTime = (new Date()).getTime();
  Object.keys(rankingData).forEach((stageTypeId) => {
    let rows =  rankingData[stageTypeId]
      .sort((a, b) => {
        let compared = b.score - a.score;
        if (compared !== 0) {
          return compared;
        };
        return a.created_at - b.created_at;
      })
    ;
    rankingData[stageTypeId] = {
      last30Days: rows.filter((v) => v.created_at >= nowTime - 86400000 * 30).slice(0, 10),
      last7Days: rows.filter((v) => v.created_at >= nowTime - 86400000 * 7).slice(0, 10),
      last1Day: rows.filter((v) => v.created_at >= nowTime - 86400000).slice(0, 10),
      // Don't use "all" in production, because game-results are already filtered by last 30 days in server
      // It is for testing
      all: rows,
    };
  });

  return rankingData;
}

export function _formatRankingDataToText(rankingData) {
  let lines = [];
  stageList
    .slice()
    .forEach((Stage) => {

      // title
      let title = chalk.magenta(Stage.getName());
      ['last30Days', 'last7Days', 'last1Day'].forEach((timeWindowKey) => {

        // sub title
        let subTitle = {
          last30Days: 'Last 30 days',
          last7Days: 'Last 7 days',
          last1Day: 'Last day',
        }[timeWindowKey];
        subTitle = chalk.yellow(subTitle);
        lines.push(title + ' - ' + subTitle);
        lines.push('');

        if (!(Stage.typeId in rankingData)) {
          return;
        }

        // rows
        let rows = rankingData[Stage.typeId][timeWindowKey];
        if (rows) {
          rows.forEach(({ name, score }, idx) => {
            let line = [
              _s.lpad(idx + 1, 2, '') + '.',
              _s.rpad(name, 16, ' '),
              chalk.underline(_s.numberFormat(score)) + ' pts',
            ].join(' ');
            lines.push('  ' + line);
          });
          lines.push('');
        }
      });
    })
  ;
  return lines.join('\n');
}

export function requestRanking(callback) {
  let params = {
    api_mode: 'get_ranking'
  };
  let url = conf.apiUrl + '?' + querystring.stringify(params);
  request(url, function onRequested(err, response, body) {
    if (err) {
      return callback(err);
    } else if (response.statusCode !== 200) {
      return callback(new Error(`Returned HTTP status ${response.statusCode} from AWS API Gateway`));
    }
    let gameResultRows = JSON.parse(body.toString());
    let rankingData = _restructGameResultRowsForRanking(gameResultRows);
    let text = _formatRankingDataToText(rankingData);
    callback(null, text);
  });
}

export function requestAddingGameResult({ stageTypeId, playerName, score }, callback = function(){}) {
  let url = conf.apiUrl + '?' + querystring.stringify({
    api_mode: 'add_game_result',
    stage: stageTypeId,
    name: playerName,
    score: score
  });
  request(url, function onRequested(err, response, body) {
    if (err) {
      return callback(err);
    } else if (response.statusCode !== 200) {
      return callback(new Error(`Returned HTTP status ${response.statusCode} from AWS API Gateway`));
    }
    callback();
  });
}
