'use strict'

const observer = riot.observable();

// Replicant
const title = nodecg.Replicant('title');
const runners = nodecg.Replicant('runners');
const bingoList = nodecg.Replicant('bingoList');
const options = nodecg.Replicant('options')

// 初期処理
let _rowClass;
nodecg.readReplicant('runners', value => {
    const calcResult = calcRunnerList(value);
    const left_runners = calcResult[0];
    const right_runners = calcResult[1];
    const center_runners = calcResult[2];
    const rowClass = calcResult[3];
    // 外側のパネルにも反映
    $('.frame').addClass(rowClass);
    // riotタグのマウント
    riot.mount('#left-view', { runners: left_runners, rows: rowClass, type: 'left' });
    riot.mount('#right-view', { runners: right_runners, rows: rowClass, type: 'right' });
    riot.mount('#center-view', { runners: center_runners, rows: rowClass, type: 'center' });
    _rowClass = rowClass;
});
nodecg.readReplicant('bingoList', value => {
    nodecg.readReplicant('options', option => {
        riot.mount('bingo', { bingoList: value, rowClass: _rowClass, enable: option['bingo_enable'] });
    })
});
nodecg.readReplicant('title', value => {
    nodecg.readReplicant('options', option => {
        riot.mount('info-view', { data: value, enable: option['title_enable'] });
    })
});

// タイトル情報更新時
title.on('change', newVal => {
    observer.trigger('update-info', newVal);
})

// 走者情報更新時
runners.on('change', newVal => {
    // パネルの再計算
    const calcResult = calcRunnerList(newVal);
    const left_runners = calcResult[0];
    const right_runners = calcResult[1];
    const center_runners = calcResult[2];
    const rowClass = calcResult[3];
    const removeClass = calcResult[4];
    // 外側のパネルにも反映
    $('.frame').removeClass(removeClass).addClass(rowClass);
    $('.info').removeClass(removeClass).addClass(rowClass);
    // 変更を通知
    observer.trigger('update-runners', { runners: left_runners, rows: rowClass, type: 'left' });
    observer.trigger('update-runners', { runners: right_runners, rows: rowClass, type: 'right' });
    observer.trigger('update-runners', { runners: center_runners, rows: rowClass, type: 'center' });
    observer.trigger('update-class', rowClass);
});

// ビンゴ情報更新時
bingoList.on('change', newVal => {
    observer.trigger('update-bingo', newVal);
});

// オプション情報更新
options.on('change', newVal => {
    observer.trigger('update-bingo-enable', newVal['bingo_enable']);
    observer.trigger('update-title-enable', newVal['title_enable']);
})

function calcRunnerList(runners) {
    const left_runners = [];
    const right_runners = [];
    const center_runners = [];
    let runnerCnt = 0;
    for (var i = 0; i < runners.length; i++) {
        if (runners[i].enable) {
            if (runnerCnt >= 6) {
                center_runners.push(runners[i]);
            } else if (runnerCnt % 2 == 0) {
                left_runners.push(runners[i]);
            } else {
                right_runners.push(runners[i]);
            }
            runnerCnt++;
        }
    }
    // 行数の判定
    let rowClass = '';
    let removeClass = '';
    if (runnerCnt > 4) {
        rowClass = 'r3';
        removeClass = 'r2';
    } else {
        rowClass = 'r2';
        removeClass = 'r3';
    }
    return [left_runners, right_runners, center_runners, rowClass, removeClass];
}
