'use strict'

const observer = riot.observable();

// Replicant
const title = nodecg.Replicant('title', {defaultValue: ""});
const runners = nodecg.Replicant('runners', {defaultValue: []});
const bingoList = nodecg.Replicant('bingoList', {defaultValue: []});

// 初期処理
let _rowClass;
nodecg.readReplicant('runners', value => {
    const calcResult = calcRunnerList(value);
    const left_runners = calcResult[0];
    const right_runners = calcResult[1];
    const rowClass = calcResult[2];
    // 外側のパネルにも反映
    $('.frame').addClass(rowClass);
    // riotタグのマウント
    riot.mount('#left-view', { runners: left_runners, rows: rowClass, type: 'left'});
    riot.mount('#right-view', { runners: right_runners, rows: rowClass, type: 'right'});
    _rowClass = rowClass;
});
nodecg.readReplicant('bingoList', value => {
    riot.mount('bingo', { bingoList: value, rowClass: _rowClass });
});

// 走者情報更新時
runners.on('change', newVal => {
    // パネルの再計算
    const calcResult = calcRunnerList(newVal);
    const left_runners = calcResult[0];
    const right_runners = calcResult[1];
    const rowClass = calcResult[2];
    // 外側のパネルにも反映
    $('.frame').addClass(rowClass);
    $('.info').addClass(rowClass);
    // 変更を通知
    observer.trigger('update-runners', {runners:left_runners, rows: rowClass, type:'left'});
    observer.trigger('update-runners', {runners:right_runners, rows: rowClass, type:'right'});
    observer.trigger('update-class', rowClass);
});

// ビンゴ情報更新時
bingoList.on('change', newVal => {
    observer.trigger('update-bingo', newVal);
});

function calcRunnerList(runners) {
    const left_runners = [];
    const right_runners = [];
    let runnerCnt = 0;
    for (var i = 0; i < runners.length; i++) {
        if (runners[i].enable) {
            if (runnerCnt % 2 == 0) {
                left_runners.push(runners[i]);
            } else {
                right_runners.push(runners[i]);
            }
            runnerCnt++;
        }
    }
    // 行数の判定
    let rowClass = '';
    if (runnerCnt > 4) {
        rowClass = 'r3';
    } else {
        rowClass = 'r2';
    }
    return [left_runners, right_runners, rowClass];
}
