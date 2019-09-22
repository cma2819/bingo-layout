'use strict'

// Replicant
const title = nodecg.Replicant('title', {defaultValue: ""});
const runners = nodecg.Replicant('runners', {defaultValue: [{},{},{},{},{},{},{},{}]});
const bingoList = nodecg.Replicant('bingoList', {defaultValue: []});
const options = nodecg.Replicant('options', {defaultValue: {}});

nodecg.readReplicant('title', title => {
    nodecg.readReplicant('runners', runners => {
        nodecg.readReplicant('options', options => {
            riot.update({title: title, runners: runners});
        })
    })
})

/*
    基本情報の更新
*/
observer.on('update-basic-information', (basicInfo) => {
    // タイトル部
    title.value = basicInfo.title;
    const seed = basicInfo.seed;
    // ビンゴ情報
    if (seed) {
        const isSrl = basicInfo.game.source === 'srl';
        const baseUrl = isSrl ? 'http://www.speedrunslive.com/tools/' : '';
        const gameUrl = basicInfo.game.url;
        const seedQuery = '?seed=' + basicInfo.seed;
        const modeQuery = basicInfo.mode == 'normal' ? '' : ('&mode=' + basicInfo.mode);
        const langQuery = '&lang=jp';
        const bingoUrl = baseUrl + gameUrl + seedQuery + modeQuery + langQuery;
        // Extentionに投げる
        nodecg.sendMessage('getBingoList', bingoUrl)
        .then(result => {
            bingoList.value = result;
        })
        .catch(error => {
            console.log(error);
        });
    }
});

/*
    走者情報の更新
*/
observer.on('update-runners-info', (runnersInfo) => {
    // 名前が入ってない場合は整形する
    for (var i = 0; i < runnersInfo.length; i++) {
        if (!runnersInfo[i].name) {
            runnersInfo[i] = {};
        }
    }
    runners.value = runnersInfo;
});

/*
    走者Finish時
*/
observer.on('update-finish-runner', runnerIdx => {
    const time = stopwatch.value.time.formatted;
    runners.value[runnerIdx].time = time;
    observer.trigger('send-time', {time: time, idx: runnerIdx});
})

/*
    走者再開時
*/
observer.on('update-resume-runner', runnerIdx => {
    runners.value[runnerIdx].time = '';
})

/*
    オプション情報の更新
*/
observer.on('update-option', option => {
    // optionのキーに値をセット
    options.value[option.name] = option.checked;
});