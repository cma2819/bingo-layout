'use strict'

const stopwatch = nodecg.Replicant('stopwatch');

/*
    タイマー開始
*/
observer.on('time-start', () => {
    console.log('timekeeper: start');
    nodecg.sendMessage('startTimer');
});

/*
    タイマー停止
*/
observer.on('time-stop', () => {
    console.log('timekeeper: stop');
    nodecg.sendMessage('stopTimer');
})

/*
    タイマーリセット
*/
observer.on('time-reset', () => {
    console.log('timekeeper: reset');
    nodecg.sendMessage('resetTimer');
})

/*
    タイマープレビュー
*/
stopwatch.on('change', newVal => {
    const formatted_time = newVal.time.formatted;
    observer.trigger('time-changed', formatted_time);
})